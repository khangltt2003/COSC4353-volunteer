# Generated by Django 5.1 on 2024-10-17 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0028_notification_userprofile_notifications'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]