# Generated by Django 5.1 on 2024-09-09 06:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_remove_event_urgency_userprofile_address1_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='state',
        ),
    ]