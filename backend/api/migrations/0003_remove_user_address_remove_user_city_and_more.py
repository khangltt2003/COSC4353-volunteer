# Generated by Django 5.1 on 2024-08-29 03:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_user_alter_event_created_by_alter_event_participants_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='address',
        ),
        migrations.RemoveField(
            model_name='user',
            name='city',
        ),
        migrations.RemoveField(
            model_name='user',
            name='events',
        ),
        migrations.RemoveField(
            model_name='user',
            name='fields',
        ),
        migrations.RemoveField(
            model_name='user',
            name='required_skills',
        ),
        migrations.RemoveField(
            model_name='user',
            name='state',
        ),
        migrations.RemoveField(
            model_name='user',
            name='zipcode',
        ),
    ]
