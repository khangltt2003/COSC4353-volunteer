# Generated by Django 5.1 on 2024-09-09 06:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_alter_userprofile_address1_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]