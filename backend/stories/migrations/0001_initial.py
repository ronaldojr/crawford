# Generated by Django 3.2.9 on 2021-11-15 23:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Storie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cover', models.ImageField(blank=True, null=True, upload_to='covers/')),
                ('title', models.CharField(max_length=250)),
                ('storie', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='AccessLogger',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('type', models.CharField(choices=[('v', 'VIEW'), ('D', 'DOWNLOAD')], max_length=1)),
                ('storie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stories.storie')),
            ],
        ),
    ]
