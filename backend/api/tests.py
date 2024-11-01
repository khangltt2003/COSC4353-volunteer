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
