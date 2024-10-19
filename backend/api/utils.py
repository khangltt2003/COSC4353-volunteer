from .models import Event, UserProfile
from django.shortcuts import get_object_or_404


def match_when_user_update(user_id):
  user = get_object_or_404(UserProfile,pk =user_id)
  matched_event = []
  for event in Event.objects.all():
    #same location
    if user.state == event.state:
      #same date
      if event.date in user.availability:
        # > 2 matched skills
        if user.skills.filter(id__in=event.skills_needed.all()).count() > 1:
          matched_event.append(event)
  
  user.matched_events.set(matched_event)  
  return

def match_when_event_update(event_id):
    event = get_object_or_404(Event, pk=event_id)
    matched_users = []

    for user in UserProfile.objects.all():
        if user.state == event.state:
            if event.date in user.availability:
                matched_skills = user.skills.filter(id__in=event.skills_needed.all()).count()
                if matched_skills > 1:
                    matched_users.append(user)

    event.matched_users.set(matched_users)
    return