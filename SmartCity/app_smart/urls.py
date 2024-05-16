from django.contrib import admin
from django.urls import path, include
from . import views
from app_smart.api.viewsets import CreateUserAPIViewset
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', views.abre_index, name='abre_index'),
    path('api/create_user/', CreateUserAPIViewset.as_view(), name='create_user'),
    path('betman', views.cad_user, name='cad_user'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
