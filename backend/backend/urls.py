from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from backend.settings import MEDIA_ROOT, MEDIA_URL
from stories.views import StoriesListViewSet, CategoriesViewSet, StorySingleViewSet, dashboard
from stories.views import AdminCategoriesViewSet, AdminStoriesViewSet
from stories.views import download, polulatiry, dashboard
from users.views import UsersListFormViewSet

router = routers.DefaultRouter()
router.register(r'stories', StoriesListViewSet)
router.register(r'story', StorySingleViewSet, basename="story")
router.register(r'categories', CategoriesViewSet, basename='categorie')
router.register(r'admin-categories', AdminCategoriesViewSet, basename='admin-categories')
router.register(r'admin-stories', AdminStoriesViewSet, basename='admin-stories')
router.register(r'admin-users/list/select', UsersListFormViewSet, basename='admin-users')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('token-auth/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token-refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('download/',download, name="download" ),
    path('popularity/',polulatiry, name="popularity"),
    path('dashboard/',dashboard, name="dashboard"),
]

urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)
