from rest_framework import viewsets
from django.db.models import Count, F
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import Storie
from .serializers import StoriesListSerializer, CategoriesSerializer
from rest_framework import permissions

class StoriesListViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Storie.objects.all()
    serializer_class = StoriesListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['categorie']

class CategoriesViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Storie.objects.all()
    serializer_class = CategoriesSerializer

    def get_queryset(self):
        return Storie.objects.all().values(('categorie'), 'categorie__name').annotate(total=Count('categorie')).order_by('categorie')

