from rest_framework import serializers
from django.db import IntegrityError
from django.contrib.auth.models import User
from .models import *
from django.contrib.auth.password_validation import validate_password
from django.core.validators import RegexValidator

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "password"]
        # fields = "__all__"

class SkillSerializer(serializers.ModelSerializer):
  class Meta:
    model = Skill
    fields = "__all__"

class EventSerializer(serializers.ModelSerializer):
    skills_needed = SkillSerializer(many=True)
    class Meta:
        model = Event
        fields = "__all__"
        
class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.CharField(
        # validators=[
        #     RegexValidator(
        #         regex="^[a-zA-Z0-9]*$",
        #         message="invalid username",
        #         code="invalid_username"
        #     )
        # ],
        min_length=4,
        max_length=50
    )
    password = serializers.CharField(write_only=True, required=True) #, validators=[validate_password]
    password2 = serializers.CharField(write_only=True, required=True, label="Confirm Password")
    
    class Meta:
      model = User
      fields = ["id", "email", "password", "password2"]
      extra_kwargs = {"password": {"write_only": True}}
    
    def validate(self, data):
      if data["password"] != data["password2"]:
          raise serializers.ValidationError({"password": "Passwords not match"})
      return data
    
    # def validate_username(self, value):
    #   if User.objects.filter(user = value).exists():
    #     raise serializers.ValidationError("Existing username")
    #   return value
        
    # def validate_email(self, value):
    #   if User.objects.filter(email=value).exists():
    #     raise serializers.ValidationError("Existing email")
    #   return value

    def create(self, validated_data):
      try:
        user = User.objects.create_user(
            username=validated_data["email"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user
      except IntegrityError:
        raise serializers.ValidationError("This email is already in use.")


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    events = EventSerializer(many=True)
    skills = SkillSerializer(many=True)
    class Meta:
        model = UserProfile
        fields = "__all__"


