import re, os
from PIL import Image, ImageDraw, ImageOps, ImageFont
from django.http.response import HttpResponse
from rest_framework import viewsets
from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from .models import Categorie, Storie, AccessLogger
from .serializers import StoriesListSerializer, CategoriesSerializer
from .serializers import AdminCategoriesSerliazer, AdminStoriesSerliazer, StorySingleSerializer
from rest_framework import permissions, response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from backend.settings import BASE_DIR
import textwrap


@api_view(['GET'])
@permission_classes([AllowAny])
def download(request):
    path_font = os.path.join(BASE_DIR, 'stories/arial.ttf')
    pk = request.query_params.get('story')
    story = Storie.objects.get(pk=pk)
    access_logger = AccessLogger()

    if (story):
        access_logger.storie = story
        access_logger.type = 'D'
        access_logger.save()

        arial_regular = ImageFont.truetype(path_font, 12)
        arial_title = ImageFont.truetype(path_font, 15)

        author_name = story.author.first_name + " " + story.author.last_name

        list_text = story.storie.split('\r\n\r\n')
        text = textwrap.wrap(story.intro, width=80)
        text += ['<#break#>']

        for p in list_text:
            text += textwrap.wrap(p, width=80)
            text += ['<#break#>']

        size = (500,(len(text) * 18) + 80)             
        image = Image.new('RGBA', size, '#ffffff') 
        draw = ImageDraw.Draw(image)
        h = 30
        draw.text((30, h), story.title, font=arial_title, fill='black') 
        h += 30  

        for line in text:
            text_pos = (30,h)
            if line.find("<#break#>") != -1:
                draw.text(text_pos, " ", fill='black')
                h += 15
            else:
                draw.text(text_pos, line, font=arial_regular, fill='black')

            h += 15

        draw.text((30, h+20), "Author: " +  author_name, font=arial_regular, fill='black')
        del draw 
        response = HttpResponse(content_type = "image/png")
        bordered = ImageOps.expand(image, border=10, fill='#eee')
        bordered.save(response, 'PNG')

        return  response


@api_view(['GET'])
@permission_classes([AllowAny])
def polulatiry(request):
    pk = request.query_params.get('story')    
    downloads = AccessLogger.objects.filter(storie__pk=pk, type="D").count()
    views = AccessLogger.objects.filter(storie__pk=pk, type="v").count()
    return response.Response({"downloads": downloads, "views": views})




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


