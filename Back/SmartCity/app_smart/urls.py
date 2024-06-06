from django.contrib import admin
from django.urls import path, include
from . import views
from app_smart.api.viewsets import CreateUserAPIViewset, SensorViewSet, SensorFilterView, TemperaturaDataViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from app_smart.api.filters import ( SensorFilterView, TemperaturaFilterView )

# routers do django
router = DefaultRouter()
router.register(r'sensores', SensorViewSet)
router.register(r'temperatura', TemperaturaDataViewSet)

urlpatterns = [
    path('', views.abre_login, name='abre_login'),
    path('api/create_user/', CreateUserAPIViewset.as_view(), name='create_user'),
    path('usuarios', views.autenticacao, name='cad_user'),
    path('cad_user', views.cad_user, name='cad_user'),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/sensor_filter/', SensorFilterView.as_view(), name='sensor_filter'),
    path('api/temperatura_filter/', TemperaturaFilterView.as_view(), name='temperatura_filter'),
]
