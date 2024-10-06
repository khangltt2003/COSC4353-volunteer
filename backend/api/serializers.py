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
    skills_needed = SkillSerializer(many=True, read_only = True)
    skill_ids = serializers.PrimaryKeyRelatedField(many=True, queryset=Skill.objects.all(), write_only = True)
    class Meta:
        model = Event
        fields = "__all__"
    
    def create(self, validated_data):
      skills_data = validated_data.pop('skill_ids', None)

      event = Event.objects.create(**validated_data)

      if skills_data is not None:
          event.skills_needed.set(skills_data)
      event.save()
      return event
    
    def update(self, instance, validated_data):
      skills_data = validated_data.pop('skill_ids', None)

      instance.name = validated_data.get('name', instance.name)
      instance.description = validated_data.get('description', instance.description)
      instance.address = validated_data.get('address', instance.address)
      instance.city = validated_data.get('city', instance.city)
      instance.state = validated_data.get('state', instance.state)
      instance.zipcode = validated_data.get('zipcode', instance.zipcode)
      instance.date = validated_data.get('date', instance.date)
      instance.time = validated_data.get('time', instance.time)
      instance.urgency = validated_data.get('urgency', instance.urgency)


      if skills_data is not None:
          instance.skills_needed.set(skills_data)
      instance.save()

      return instance
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
    events = EventSerializer(many=True, read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    
    event_ids = serializers.PrimaryKeyRelatedField(many=True, queryset=Event.objects.all(), write_only = True)
    skill_ids = serializers.PrimaryKeyRelatedField(many=True, queryset=Skill.objects.all(), write_only = True)
    
    
    class Meta:
        model = UserProfile
        fields = "__all__"

    def update(self, instance, validated_data):
      events_data = validated_data.pop('event_ids', None)
      skills_data = validated_data.pop('skill_ids', None)

      instance.fullname = validated_data.get('fullname', instance.fullname)
      instance.address1 = validated_data.get('address1', instance.address1)
      instance.address2 = validated_data.get('address2', instance.address2)
      instance.city = validated_data.get('city', instance.city)
      instance.state = validated_data.get('state', instance.state)
      instance.zipcode = validated_data.get('zipcode', instance.zipcode)
      instance.preference = validated_data.get('preference', instance.preference)
      instance.availability = validated_data.get('availability', instance.availability)

      
      if events_data is not None:
          instance.events.set(events_data)  

      if skills_data is not None:
          instance.skills.set(skills_data)
      instance.save()

      return instance

