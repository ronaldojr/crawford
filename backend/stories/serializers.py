from rest_framework import serializers
from .models import Storie, Categorie

class StoriesListSerializer(serializers.HyperlinkedModelSerializer):
    categorie =  serializers.StringRelatedField()
    author =  serializers.StringRelatedField()
    class Meta:
        model = Storie
        fields = ['id', 'cover', 'title', 'intro', 'categorie', 'author', 'created_at' ]

class StorySingleSerializer(serializers.ModelSerializer):
    categorie =  serializers.StringRelatedField()
    author =  serializers.StringRelatedField()
    class Meta:
        model = Storie
        fields = '__all__'


class CategoriesSerializer(serializers.ModelSerializer):
    id =  serializers.IntegerField(source='categorie')
    name =  serializers.CharField(source='categorie__name')
    total = serializers.IntegerField()

    class Meta:
        model = Storie
        fields = ['id', 'name', 'total']


class AdminCategoriesSerliazer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = '__all__'


class AdminStoriesSerliazer(serializers.ModelSerializer):
    class Meta:
        model = Storie
        fields = '__all__'

