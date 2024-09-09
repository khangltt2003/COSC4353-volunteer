from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Event
from django.contrib.auth.password_validation import validate_password
from django.core.validators import RegexValidator

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        # fields = "__all__"

class UserRegistrationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        # validators=[
        #     RegexValidator(
        #         regex='^[a-zA-Z0-9]*$',
        #         message='invalid username',
        #         code='invalid_username'
        #     )
        # ],
        min_length=4,
        max_length=50
    )
    password = serializers.CharField(write_only=True, required=True) #, validators=[validate_password]
    password2 = serializers.CharField(write_only=True, required=True, label="Confirm Password")
    
    class Meta:
      model = User
      fields = ['id', 'username', 'password', 'password2']
      extra_kwargs = {'password': {'write_only': True}}
    
    def validate(self, data):
      if data['password'] != data['password2']:
          raise serializers.ValidationError({"password": "Passwords not match"})
      return data
    
    def validate_username(self, value):
      if User.objects.filter(username=value).exists():
        raise serializers.ValidationError("Existing username")
      return value

    def create(self, validated_data):
      user = User.objects.create_user(
          username=validated_data['username'],
          password=validated_data['password']
      )
      return user

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'first_name', 'last_name', 'email', 'skills', 'interested_fields', 'zipcode']

class EventSerializer(serializers.ModelSerializer):
    participants = UserProfileSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'address', 'city', 'state', 'zipcode', 
            'date', 'time', 'max_volunteers', 'available_slots', 'skills_needed', 
            'fields', 'participants'
        ]
    
