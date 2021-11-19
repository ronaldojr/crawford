from django.contrib import admin
from .models import Storie, AccessLogger, Categorie
# Register your models here.

admin.site.register(Categorie)
admin.site.register(Storie)
admin.site.register(AccessLogger)
