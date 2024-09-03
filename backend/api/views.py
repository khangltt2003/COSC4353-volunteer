from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserProfile, Event
from .serializers import UserSerializer, UserProfileSerializer, EventSerializer, UserRegistrationSerializer
from django.shortcuts import get_object_or_404

#create a profile whenever a user is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
  if created:
    UserProfile.objects.create(user=instance)

@api_view(['POST'])
def register(request):
  if request.method == 'POST':
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
  return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

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


@api_view(['GET', "POST", 'PATCH'])
@permission_classes([IsAuthenticated])
def user_profile(request):
  user = get_object_or_404(User, pk = request.user.id) 
  
  #get profile
  if request.method == 'GET':
    # serializer = UserSerializer(user)
    serializer = UserProfileSerializer(user.user_profile)
    return Response(serializer.data)
  
  #update profile
  elif request.method == 'PATCH':
    serializer = UserProfileSerializer(user.user_profile, data=request.data, partial=True)
    if serializer.is_valid(): 
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([AllowAny])
def get_events(request):
  if request.method == "GET":
    events = Event.objects.all()
    serializer = EventSerializer(events, many = True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_event(request):
  if request.method == 'POST':
    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAdminUser])
def event_detail(request, event_detail):
  event = get_object_or_404(Event, pk=event_detail)

  if request.method == 'GET':
    serializer = EventSerializer(event)
    return Response(serializer.data)

  elif request.method == 'PUT':
    serializer = EventSerializer(event, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  elif request.method == 'PATCH':
    serializer = EventSerializer(event, data=request.data, partial=True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  elif request.method == 'DELETE':
    event.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def join_event(request, event_id):
  event = get_object_or_404(Event, id=event_id)
  profile = request.user.userprofile

  if request.method == 'POST':
    if profile not in event.participants.all() and event.available_slots > 0:
      event.participants.add(profile)
      event.available_slots -= 1
      event.save()
      return Response({'status': 'participated'}, status=status.HTTP_200_OK)
    return Response({'error': 'Unable to participate'}, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def leave_event(request, event_id):
  event = get_object_or_404(Event, id=event_id)
  profile = request.user.userprofile
  if request.method == 'POST':
    if profile in event.participants.all():
      event.participants.remove(profile)
      event.available_slots += 1
      event.save()
      return Response({'status': 'left'}, status=status.HTTP_200_OK)
    return Response({'error': 'Unable to leave'}, status=status.HTTP_400_BAD_REQUEST)
