from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Event, User
from .serializers import UserSerializer, EventSerializer,UserRegistrationSerializer

# Create your views here.
@api_view(["GET"])
def get_users(request):
  users = User.objects.all()
  serializer = UserSerializer(users, many= True)
  return Response(serializer.data)
  
@api_view(["POST"])
def create_user(request):
  serializer = UserSerializer(data= request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  else:
    errors = serializer.errors
    return Response(errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "POST", "DELETE"])
def user_detail(request, pk):
  try:
    user = User.objects.get(pk = pk)
  except User.DoesNotExist:
    return Response({"message": "cannot find user"}, status=status.HTTP_404_NOT_FOUND)
  
  if request.method == "GET":
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
  if request.method == "PUT":
    serializer = UserSerializer(user, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    else:
      return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
  
  if request.method == "DELETE":
    user.delete()
    return Response({"message": "user is deleted"}, status=status.HTTP_204_NO_CONTENT)
      


@api_view(['POST'])
@permission_classes([])
def register(request):
  if request.method == "POST":
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({"message": "Register successfully"}, status=status.HTTP_201_CREATED)
    else:
      errors = serializer.errors
      return Response({errors}, status=status.HTTP_400_BAD_REQUEST)
      