from django.contrib.auth.models import User
from django.db import models


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.name

class Field(models.Model):
    name = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user_profile")
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    skills = models.TextField() 
    interested_fields = models.TextField() 
    zipcode = models.CharField(max_length=10)
    skills = models.ManyToManyField(Skill, blank=True, related_name='user_profile')  
    interested_fields = models.ManyToManyField(Field, blank=True, related_name='user_profile') 
    def __str__(self):
        return f'{self.user.username} Profile'

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=10)
    date = models.DateField()
    time = models.TimeField()
    max_volunteers = models.IntegerField(default=50)
    available_slots = models.IntegerField(default=50)
    skills_needed = models.ManyToManyField(Skill, blank=True, related_name='events') 
    fields = models.ManyToManyField(Field, blank=True, related_name='events')  
    participants = models.ManyToManyField(UserProfile, blank=True, related_name='events')

    def __str__(self):
        return self.title


