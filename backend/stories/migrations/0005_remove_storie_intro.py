# Generated by Django 3.2.9 on 2021-11-16 01:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stories', '0004_storie_intro'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='storie',
            name='intro',
        ),
    ]