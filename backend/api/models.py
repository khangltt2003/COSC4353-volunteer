from django.db import models
from django.contrib.auth.models import  User
from django.core.validators import RegexValidator

# Create your models here.


class CustomUser(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
  fullname = models.CharField(max_length=50)
  role = models.CharField(max_length=10)
  address = models.CharField(max_length=200)
  city = models.CharField(max_length=100)
  state = models.CharField(max_length=2)
  required_skills = models.ManyToManyField('Skill', blank=True)
  fields = models.ManyToManyField('Field', blank=True)
  events = models.ManyToManyField('Event', related_name='participants') 
  zipcode = models.CharField(max_length=9,
      validators=[
          RegexValidator(
              regex=r'^\d{5}(\d{4})?$',
              message='Zip code must be either 5 or 9 digits.',
              code='invalid_zip_code'
          )
      ]
  )
  def __str__(self) -> str:
    return self.user.username
  
class Field(models.Model):
  name = models.CharField(max_length=100)
  def __str__(self) -> str:
      return self.name
    
class Skill(models.Model):
  name = models.CharField(max_length=100)
    
  def __str__(self) -> str:
    return self.name

class Event(models.Model):
  title = models.CharField(max_length=255)
  description = models.TextField()
  address = models.CharField(max_length=255)
  city = models.CharField(max_length=100)
  state = models.CharField(max_length=100)
  zipcode = models.IntegerField()
  date = models.DateField()
  time = models.TimeField()
  max_volunteers = models.IntegerField()
  created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="events")
  participants = models.ManyToManyField(User, related_name="events")
  required_skills = models.ManyToManyField(Skill, blank=True)
  fields = models.ManyToManyField(Field, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  
  def __str__(self) -> str:
    return self.title