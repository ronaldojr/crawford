from rest_framework import serializers
from users.models import User


class UsersListFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name"]