"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from backend.settings import MEDIA_ROOT, MEDIA_URL
from stories.views import StoriesListViewSet, CategoriesViewSet

router = routers.DefaultRouter()
router.register(r'stories', StoriesListViewSet)
router.register(r'categories', CategoriesViewSet, basename='categorie')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('token-auth/', obtain_jwt_token),
    path('users/', include('users.urls')),
]

urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)