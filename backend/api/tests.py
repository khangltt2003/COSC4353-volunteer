from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import UserProfile, Event, Notification
from .serializers import UserProfileSerializer

class UserTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.user_profile = UserProfile.objects.create(user=self.user)
        self.admin_user = User.objects.create_superuser(username='adminuser', password='adminpassword')
        self.register_url = reverse('register')
        self.profile_url = reverse('profile')

    def test_register_user(self):
        data = {
            'username': 'newuser',
            'password': 'newpassword',
            'email': 'newuser@example.com'
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)
        self.assertIn('id', response.data)
        self.assertEqual(response.data['username'], data['username'])

    def test_view_user_profile(self):
        self.client.login(username='testuser', password='testpassword')
        response = self.client.get(self.profile_url)
        serializer = UserProfileSerializer(self.user_profile)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_update_user_profile(self):
        self.client.login(username='testuser', password='testpassword')
        update_data = {
            'bio': 'Updated bio'
        }
        response = self.client.patch(self.profile_url, update_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user_profile.refresh_from_db()
        self.assertEqual(self.user_profile.bio, 'Updated bio')

    def test_user_profile_access_denied(self):
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class EventTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.admin_user = User.objects.create_superuser(username='adminuser', password='adminpassword')
        self.event_url = reverse('create_event')
        self.event_list_url = reverse('view_events')

        self.client.login(username='adminuser', password='adminpassword')

        self.event_data = {
            'name': 'Test Event',
            'description': 'This is a test event.',
            'date': '2024-12-31T10:00:00Z',
            'location': 'Test Location',
            'urgency': 3,
        }

    def test_create_event(self):
        response = self.client.post(self.event_url, self.event_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Event.objects.count(), 1)

    def test_get_events(self):
        self.client.post(self.event_url, self.event_data)
        response = self.client.get(self.event_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_event_detail(self):
        event_response = self.client.post(self.event_url, self.event_data)
        event_id = event_response.data['id']
        detail_url = reverse('event_detail', args=[event_id])
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.event_data['name'])
        self.assertEqual(response.data['description'], self.event_data['description'])

    def test_update_event(self):
        event_response = self.client.post(self.event_url, self.event_data)
        event_id = event_response.data['id']
        update_data = {'name': 'Updated Event Name'}
        detail_url = reverse('event_detail', args=[event_id])
        response = self.client.put(detail_url, update_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Updated Event Name')

    def test_delete_event(self):
        event_response = self.client.post(self.event_url, self.event_data)
        event_id = event_response.data['id']
        detail_url = reverse('event_detail', args=[event_id])
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Event.objects.count(), 0)


class NotificationTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.user_profile = UserProfile.objects.create(user=self.user)
        self.notification = Notification.objects.create(user=self.user_profile, event_name='Test Event', type='info')

    def test_read_notification(self):
        self.client.login(username='testuser', password='testpassword')
        response = self.client.patch(reverse('update_notification', args=[self.notification.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.notification.refresh_from_db()
        self.assertTrue(self.notification.is_read)

    def test_delete_notification(self):
        self.client.login(username='testuser', password='testpassword')
        response = self.client.delete(reverse('update_notification', args=[self.notification.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        with self.assertRaises(Notification.DoesNotExist):
            Notification.objects.get(id=self.notification.id)


class MatchTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.admin_user = User.objects.create_superuser(username='adminuser', password='adminpassword')
        self.client.login(username='adminuser', password='adminpassword')
        self.event_data = {
            'name': 'Test Event',
            'description': 'This is a test event.',
            'date': '2024-12-31T10:00:00Z',
            'location': 'Test Location',
            'urgency': 3,
        }
        self.event_url = reverse('create_event')
        self.client.post(self.event_url, self.event_data)

    def test_match_users(self):
        response = self.client.put(reverse('match_all'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
  
