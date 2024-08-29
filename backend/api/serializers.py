from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Event, CustomUser
from django.core.validators import RegexValidator
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = "__all__"
    
class CustomUserSerializer(serializers.ModelSerializer):
  user = UserSerializer(many=False,read_only=True)
  fullname = serializers.CharField(max_length=50)
  role = serializers.CharField(max_length=10)
  address = serializers.CharField(max_length=200)
  city = serializers.CharField(max_length=100)
  state = serializers.CharField(max_length=2)
  zipcode = serializers.CharField()
  skills = serializers.CharField(max_length=50)
  fields = serializers.CharField(max_length= 50)
  
  class Meta:
    model = CustomUser
    fields = ["user", "fullname", "role", "address", "city", "state", "zipcode", "skills", "fields"]
  
class UserRegistrationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        validators=[
            RegexValidator(
                regex='^[a-zA-Z0-9]*$',
                message='Username must be alphanumeric',
                code='invalid_username'
            )
        ],
        min_length=4,
        max_length=50
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True, label="Confirm Password")

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')
    
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return data

    def create(self, validated_data):
        validated_data.pop('password2', None)  # Remove confirm password from validated data
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

class EventSerializer(serializers.ModelSerializer):
  class Meta:
    model = Event
    fields = "__all__"
    extra_kwargs = {"created_by" : {"read_only" : True}}