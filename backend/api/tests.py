from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from .models import UserProfile, Event, Skill, Notification

class UserTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(username="admin", password="adminpass", email="admin@example.com")
        self.regular_user = User.objects.create_user(username="user", password="userpass", email="user@example.com")
        self.event = Event.objects.create(name="Test Event", city="Test City", state="TS")
        self.client.login(username="admin", password="adminpass")

    def test_register_user(self):
        data = {"username": "newuser", "password": "newpass", "email": "new@example.com"}
        response = self.client.post(reverse('register'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_view_all_users_as_admin(self):
        self.client.login(username="admin", password="adminpass")
        response = self.client.get(reverse('profile'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_view_all_users_as_non_admin(self):
        self.client.login(username="user", password="userpass")
        response = self.client.get(reverse('profile'))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_user_detail(self):
        self.client.login(username="admin", password="adminpass")
        response = self.client.get(reverse('view_profile', kwargs={"user_id": self.regular_user.user_profile.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_event(self):
        data = {"name": "New Event", "city": "New City", "state": "NC"}
        response = self.client.post(reverse('create_event'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_events(self):
        response = self.client.get(reverse('view_events'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_apply_to_event(self):
        self.client.login(username="user", password="userpass")
        response = self.client.put(reverse('apply_event', kwargs={"event_id": self.event.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_approve_join_event(self):
        self.client.login(username="admin", password="adminpass")
        self.event.applicants.add(self.regular_user.user_profile)
        response = self.client.put(reverse('approve_join_event', kwargs={"event_id": self.event.id, "user_id": self.regular_user.user_profile.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_deny_join_event(self):
        self.client.login(username="admin", password="adminpass")
        self.event.applicants.add(self.regular_user.user_profile)
        response = self.client.put(reverse('deny_join_event', kwargs={"event_id": self.event.id, "user_id": self.regular_user.user_profile.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_leave_event(self):
        self.client.login(username="user", password="userpass")
        self.event.participants.add(self.regular_user.user_profile)
        response = self.client.put(reverse('leave_event', kwargs={"event_id": self.event.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_notification_detail_patch(self):
        notification = Notification.objects.create(user=self.regular_user.user_profile, event=self.event, event_name=self.event.name, type="updated")
        self.client.login(username="user", password="userpass")
        response = self.client.patch(reverse('update_notification', kwargs={"notification_id": notification.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_notification_detail_delete(self):
        notification = Notification.objects.create(user=self.regular_user.user_profile, event=self.event, event_name=self.event.name, type="deleted")
        self.client.login(username="user", password="userpass")
        response = self.client.delete(reverse('update_notification', kwargs={"notification_id": notification.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
