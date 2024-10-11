from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserProfile, Event, Skill
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["is_staff"] = user.is_staff

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

#create a profile whenever a user is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
  if created:
    UserProfile.objects.create(user=instance)

@api_view(["POST"])
def register(request):
  serializer = UserRegistrationSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAdminUser])
def view_all_user(request):
  users = UserProfile.objects.all()
  serializer = UserProfileSerializer(users, many= True)
  return Response(serializer.data, status=status.HTTP_200_OK)

#admin get and delete user
@api_view(["GET", "DELETE"])
@permission_classes([IsAdminUser])
def user_detail(request, user_id):
  user  = get_object_or_404(User, pk=user_id)
  if request.method == "GET":
    serializer = UserProfileSerializer(user.user_profile)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
  if request.method == "DELETE":
    user.delete()
    return Response({"message": "user deleted"}, status=status.HTTP_202_ACCEPTED)


@api_view(["GET", "POST", "PATCH"])
@permission_classes([IsAuthenticated])
def user_profile(request):
  user = get_object_or_404(User, pk = request.user.id) 
  
  #get profile
  if request.method == "GET":
    # serializer = UserSerializer(user)
    serializer = UserProfileSerializer(user.user_profile)
    return Response(serializer.data)
  
  #update profile
  elif request.method == "PATCH":
    serializer = UserProfileSerializer(user.user_profile, data=request.data, partial=True)
    if serializer.is_valid(): 
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([AllowAny])
def get_events(request):
  events = Event.objects.all()
  serializer = MinimalEventSerializer(events, many = True)
  return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAdminUser])
def create_event(request):
  serializer = EventSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "PUT", "DELETE"])
@permission_classes([AllowAny]) 
def event_detail(request, event_id):
    event = get_object_or_404(Event, pk=event_id)
    if request.method == "GET":
        serializer = EventSerializer(event, context = {"request": request})
        return Response(serializer.data)
      
    elif request.method == "PUT":
        if not request.user.is_staff:
            return Response({"detail": "Permission denied. Admin access required."}, status=status.HTTP_403_FORBIDDEN)
        serializer = EventSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        if not request.user.is_staff:
            return Response({"detail": "Permission denied. Admin access required."}, status=status.HTTP_403_FORBIDDEN)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(["GET"])
def view_all_skill(request):
  skills = Skill.objects.all()
  serializer = SkillSerializer(skills, many = True)
  return Response(serializer.data, status=status.HTTP_200_OK)

#apply event
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def apply_event(request, event_id):
  event = get_object_or_404(Event, id=event_id)
  profile = request.user.user_profile
  if profile not in event.participants.all() and profile not in event.applicants.all():
    event.applicants.add(profile)
    event.save()
    return Response({"status": "applied"}, status=status.HTTP_200_OK)
  return Response({"error": "Unable to apply"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def join_event(request, event_id):
  event = get_object_or_404(event_id)
  profile = request.user.user_profile
  if profile in event.applicants.all() and  profile not in event.particiapants.all():
    event.participants.add(profile)
    event.applicants.remove(profile)
    event.save()
    return Response({"status": "joined"}, status=status.HTTP_200_OK)
  return Response({"error": "Unable to join"}, status=status.HTTP_400_BAD_REQUEST)
  
  
#leave event
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def leave_event(request, event_id):
  event = get_object_or_404(Event, id=event_id)
  profile = request.user.user_profile
  if profile in event.participants.all():
    event.participants.remove(profile)
  if profile in event.applicants.all():
    event.applicants.remove(profile)
  event.save()
  return Response({"status": "left"}, status=status.HTTP_200_OK)


