from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Event

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        # fields = ['id', 'username', 'password']
        # extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'first_name', 'last_name', 'email', 'skills', 'interested_fields', 'zipcode']

    def create(self, validated_data):
        user = self.context['request'].user
        profile = UserProfile.objects.create(user=user, **validated_data)
        return profile

class EventSerializer(serializers.ModelSerializer):
    participants = UserProfileSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'address', 'city', 'state', 'zipcode', 
            'date', 'time', 'max_volunteers', 'available_slots', 'skills_needed', 
            'fields', 'participants'
        ]
