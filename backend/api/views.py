from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import UserSerializer, EventSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Event, CustomUser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
# Create your views here.
@api_view(['POST'])
@permission_classes([])
def userRegister(request):
  