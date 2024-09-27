# Generated by Django 5.1 on 2024-08-29 03:09

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullname', models.CharField(max_length=50)),
                ('role', models.CharField(max_length=10)),
                ('address', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=100)),
                ('state', models.CharField(max_length=2)),
                ('zipcode', models.CharField(max_length=9, validators=[django.core.validators.RegexValidator(code='invalid_zip_code', message='Zip code must be either 5 or 9 digits.', regex='^\\d{5}(\\d{4})?$')])),
                ('events', models.ManyToManyField(related_name='custom_user_participants', to='api.event')),
                ('fields', models.ManyToManyField(blank=True, to='api.field')),
                ('required_skills', models.ManyToManyField(blank=True, to='api.skill')),
            ],
        ),
        migrations.AlterField(
            model_name='event',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_events', to='api.user'),
        ),
        migrations.AlterField(
            model_name='event',
            name='participants',
            field=models.ManyToManyField(related_name='participating_events', to='api.user'),
        ),
        migrations.DeleteModel(
            name='CustomUser',
        ),
    ]