from django.contrib import admin
from django.urls import path, include
from . import views
from app_smart.api.viewsets import CreateUserAPIViewset, SensorViewSet, SensorFilterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter

# routers do django
router = DefaultRouter()
router.register(r'sensores', SensorViewSet)

urlpatterns = [
    path('', views.abre_login, name='abre_login'),
    path('api/create_user/', CreateUserAPIViewset.as_view(), name='create_user'),
    path('api/sensor_filter/', SensorFilterView.as_view(), name='sensor_filter'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
]
