from rest_framework import viewsets
from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from .models import Categorie, Storie
from .serializers import StoriesListSerializer, CategoriesSerializer
from .serializers import AdminCategoriesSerliazer, AdminStoriesSerliazer
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


class AdminCategoriesViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Categorie.objects.all()
    serializer_class = AdminCategoriesSerliazer

    def get_queryset(self):
        query = super().get_queryset()
        name = self.request.query_params.get('name')
        if name:
            return query.filter(name__icontains=name)
        return query


class AdminStoriesViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Storie.objects.all()
    serializer_class = AdminStoriesSerliazer

    def get_queryset(self):
        query = super().get_queryset()
        title = self.request.query_params.get('title')
        if title:
            return query.filter(title__icontains=title)
        return query

