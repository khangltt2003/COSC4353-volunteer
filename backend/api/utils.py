from .models import Event, UserProfile, Notification
from django.shortcuts import get_object_or_404


def match_when_user_update(user):
  matched_events = []
  for event in Event.objects.all():
      if event in user.matched_events.all() or event in user.joined_events.all() or event in user.applied_events.all():
          continue
      #different state
      if user.state != event.state:
        continue
      
      if event.date not in user.availability:
        continue
      
      if event.skills_needed.all().count() != 0:
        if user.skills.filter(id__in=event.skills_needed.all()).count() < 2:
          continue
    
      matched_events.append(event)
      notification = Notification.objects.create(event_id = event.id, user_id = user.id, type ="matched", event_name = event.name)
      user.notifications.add(notification)
  
  user.matched_events.set(matched_events)  
  return

def match_when_event_update(event):
    matched_users = []
    for user in UserProfile.objects.all():
        #user not in matching
        if event in user.matched_events.all() or event in user.joined_events.all() or event in user.applied_events.all():
          continue
        
        #different state
        if user.state != event.state:
          continue
        
        if event.date not in user.availability:
          continue
        
        if event.skills_needed.all().count() != 0:
          if user.skills.filter(id__in=event.skills_needed.all()).count() < 2:
            continue
        
        matched_users.append(user)
        notification = Notification.objects.create(event_id = event.id, user_id = user.id, type ="matched", event_name = event.name)
        user.notifications.add(notification)
    
    event.matched_users.set(matched_users)
    return
  
def match ():
    for user in UserProfile.objects.all():
      matched_events = []
      for event in Event.objects.all():
        if event in user.matched_events.all() or event in user.joined_events.all() or event in user.applied_events.all():
            continue
        #different state
        if user.state != event.state:
          continue
        
        if event.date not in user.availability:
          continue
        
        if user.skills.filter(id__in=event.skills_needed.all()).count() < 2:
          continue
        matched_events.append(event)
        notification = Notification.objects.create(event_id = event.id, user_id = user.id, type ="matched", event_name = event.name)
        user.notifications.add(notification)
        
      user.matched_events.set(matched_events)  
    return