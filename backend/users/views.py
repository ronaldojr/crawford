from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import User
from .serializers import UsersListFormSerializer
from rest_framework import permissions


class UsersListFormViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UsersListFormSerializer



