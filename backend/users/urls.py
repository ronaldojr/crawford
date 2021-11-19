from django.urls import path
from .views import current_user, UserList

urlpatterns = [
    path('current/', current_user),
    path('', UserList.as_view())
]