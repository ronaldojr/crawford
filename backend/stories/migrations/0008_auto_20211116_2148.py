# Generated by Django 3.2.9 on 2021-11-16 21:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stories', '0007_storie_author'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='storie',
            name='tag',
        ),
        migrations.DeleteModel(
            name='Tag',
        ),
    ]