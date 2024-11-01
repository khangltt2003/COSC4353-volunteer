from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from .models import Skill, Notification, Event, UserProfile
from datetime import datetime, time


class UserAuthTests(TestCase):
    def setUp(self):
        self.signup_url = reverse('register')  # Adjust this if your URL pattern is different
        self.login_url = reverse('token_obtain_pair')  # Adjust if your URL pattern is different

    def test_signup(self):
        data = {
            'email': 'testuser@example.com',  # Email as username
            'password': 'StrongPassword123!',  # Ensure this meets your password requirements
            'password2': 'StrongPassword123!',  # Password confirmation
        }
        response = self.client.post(self.signup_url, data, format='json')
        print(response.data)  # Debugging line
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_signup_with_existing_email(self):
        """Test user registration with an existing email"""
        data = {
            'email': 'testuser@example.com',
            'password': 'StrongPassword123!',
            'password2': 'StrongPassword123!',  # Password confirmation
        }
        # Create the user first
        User.objects.create_user(username='testuser@example.com', email='testuser@example.com', password='StrongPassword123!')

        response = self.client.post(self.signup_url, data, format='json')

        # Check that the response status code is 400 (Bad Request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login(self):
        # First, create the user with email as username
        User.objects.create_user(username='testuser@example.com', email='testuser@example.com', password='StrongPassword123!')

        data = {
            'username': 'testuser@example.com',  # Use the username field here
            'password': 'StrongPassword123!',  # Correct password
        }
        response = self.client.post(self.login_url, data, format='json')  # Check endpoint for login
        print(response.data)  # Debugging line
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_with_invalid_credentials(self):
        """Test user login with invalid credentials"""
        # Create a user for testing
        User.objects.create_user(username='testuser@example.com', email='testuser@example.com', password='StrongPassword123!')

        data = {
            'username': 'wronguser@example.com',  # Invalid username
            'password': 'wrongpassword',           # Invalid password
        }
        response = self.client.post(self.login_url, data, format='json')

        # Check that the response status code is 401 (Unauthorized)
        print(response.data)  # Debugging line
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class SkillModelTest(TestCase):
    """Test the Skill model."""

    def setUp(self):
        self.skill = Skill.objects.create(name="Nursing")

    def test_skill_creation(self):
        """Test skill is created correctly."""
        self.assertEqual(self.skill.name, "Nursing")
        self.assertEqual(Skill.objects.count(), 1)

    def test_skill_unique_name(self):
        Skill.objects.create(name="First Aid")
        with self.assertRaises(Exception):  # Django should raise an IntegrityError for duplicate names
            Skill.objects.create(name="First Aid")

class NotificationModelTest(TestCase):
    """Test the Notification model."""

    def setUp(self):
        self.user = User.objects.create(username="testuser")
        self.notification = Notification.objects.create(
            user_id=self.user.id,
            event_id=1,
            event_name="Sample Event",
            type="info"
        )

    def test_notification_creation(self):
        """Test notification is created correctly."""
        self.assertEqual(self.notification.event_name, "Sample Event")
        self.assertEqual(self.notification.is_read, False)

    def test_mark_notification_as_read(self):
        notification = Notification.objects.create(
            user_id=self.user.id,
            event_id=1,
            event_name="Health Camp",
            type="Event Update"
        )
        notification.is_read = True
        notification.save()
        updated_notification = Notification.objects.get(id=notification.id)
        self.assertTrue(updated_notification.is_read)

class EventModelTest(TestCase):
    """Test the Event model."""

    def setUp(self):
        self.skill = Skill.objects.create(name="Volunteer Management")
        self.event = Event.objects.create(
            name="Health Camp",
            description="A camp for health checkups.",
            address="123 Health St",
            city="Health City",
            state="CA",
            zipcode="90210",
            date="2024-12-01",
            time="10:00:00",
            urgency='medium'
        )
        self.event.skills_needed.add(self.skill)

    def test_event_creation(self):
        """Test event is created correctly."""
        self.assertEqual(self.event.name, "Health Camp")
        self.assertEqual(self.event.skills_needed.count(), 1)

    def test_update_event(self):
        """Test updating an existing event."""
        updated_data = {
            'name': "Updated Health Camp",
            'description': "Updated description for health checkups.",
            'address': "456 New Health St",
            'city': "New Health City",
            'state': "NY",
            'zipcode': "12345",
            'date': datetime.strptime("2024-12-15", "%Y-%m-%d").date(),  # Convert string to date
            'time': datetime.strptime("11:00:00", "%H:%M:%S").time(),  # Convert string to time
            'urgency': 'high'
        }

        # Simulate the update
        self.event.name = updated_data['name']
        self.event.description = updated_data['description']
        self.event.address = updated_data['address']
        self.event.city = updated_data['city']
        self.event.state = updated_data['state']
        self.event.zipcode = updated_data['zipcode']
        self.event.date = updated_data['date']
        self.event.time = updated_data['time']  # This is now a time object
        self.event.urgency = updated_data['urgency']
        self.event.save()

        # Verify that the event was updated correctly
        self.event.refresh_from_db()  # Refresh to get the latest data from the database
        self.assertEqual(self.event.name, updated_data['name'])
        self.assertEqual(self.event.description, updated_data['description'])
        self.assertEqual(self.event.address, updated_data['address'])
        self.assertEqual(self.event.city, updated_data['city'])
        self.assertEqual(self.event.state, updated_data['state'])
        self.assertEqual(self.event.zipcode, updated_data['zipcode'])
        self.assertEqual(self.event.date, updated_data['date'])  # This should now match
        self.assertEqual(self.event.time, updated_data['time'])  # This should also now match
        self.assertEqual(self.event.urgency, updated_data['urgency'])

    def test_update_event_urgency(self):
        event = Event.objects.create(
            name="Health Workshop",
            urgency="low"
        )
        event.urgency = "medium"
        event.save()
        updated_event = Event.objects.get(id=event.id)
        self.assertEqual(updated_event.urgency, "medium")    

    def test_delete_event(self):
        """Test deleting an existing event."""
        event_count_before_deletion = Event.objects.count()

        # Delete the event
        self.event.delete()

        # Verify the event was deleted
        self.assertEqual(Event.objects.count(), event_count_before_deletion - 1)
        with self.assertRaises(Event.DoesNotExist):
            Event.objects.get(id=self.event.id)
