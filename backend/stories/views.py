import os
from PIL import Image, ImageDraw, ImageOps, ImageFont
from django.http.response import HttpResponse
from rest_framework import viewsets
from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from .models import Categorie, Storie, AccessLogger, ImageGenerator
from .serializers import StoriesListSerializer, CategoriesSerializer
from .serializers import AdminCategoriesSerliazer, AdminStoriesSerliazer, StorySingleSerializer
from rest_framework import permissions, response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from backend.settings import BASE_DIR
import textwrap


@api_view(['GET'])
@permission_classes([AllowAny])
def download(request):
    response = HttpResponse(content_type = "image/png")
    pk = request.query_params.get('story')
    story = Storie.objects.get(pk=pk)
    access_logger = AccessLogger()

    if (story):
        access_logger.storie = story
        access_logger.type = 'D'
        access_logger.save()

        image_generator = ImageGenerator(story)
        image_generator.set_up()
        image_generator.wrap_response(response)
        return  response


@api_view(['GET'])
@permission_classes([AllowAny])
def polulatiry(request):
    pk = request.query_params.get('story')    
    downloads = AccessLogger.objects.filter(storie__pk=pk, type="D").count()
    views = AccessLogger.objects.filter(storie__pk=pk, type="v").count()
    return response.Response({"downloads": downloads, "views": views})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard(request):   
    downloads = AccessLogger.objects.filter(type="D").count()
    views = AccessLogger.objects.filter(type="v").count()
    return response.Response({
        "downloads": downloads, 
        "views": views
    })


class StoriesListViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Storie.objects.all().order_by('-id')
    serializer_class = StoriesListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['categorie']


class StorySingleViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Storie.objects.all()
    serializer_class = StorySingleSerializer
    http_method_names = ['get']

    def retrieve(self, request, *args, **kwargs):
        story = Storie.objects.get(pk=kwargs['pk'])
        access_logger = AccessLogger()
        access_logger.storie = story
        access_logger.type = 'v'
        access_logger.save()

        return viewsets.ModelViewSet.retrieve(self, request, *args, **kwargs)



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


