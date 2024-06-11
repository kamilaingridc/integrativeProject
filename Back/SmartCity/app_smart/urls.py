from django.contrib import admin
from django.urls import path, include
from . import views
from app_smart.api.viewsets import (
    CreateUserAPIViewSet,
    SensorViewSet,
    TemperaturaDataViewSet,
    UmidadeDataViewSet,
    ContadorDataViewSet,
    LuminosidadeDataViewSet
)
from app_smart.api.filters import (
    SensorFilterView,
    TemperaturaFilterView,
    UmidadeFilterView,
    ContadorFilterView,
    LuminosidadeFilterView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter

# routers do django
router = DefaultRouter()
router.register(r'sensores', SensorViewSet)
router.register(r'temperatura', TemperaturaDataViewSet)
router.register(r'umidade', UmidadeDataViewSet)
router.register(r'luminosidade', LuminosidadeDataViewSet)
router.register(r'contador', ContadorDataViewSet)

urlpatterns = [
    path('', views.abre_index, name='abre_index'),
    path('api/', include(router.urls)),
    path('api/create_user', CreateUserAPIViewSet.as_view(), name='create_user' ),
    path('api/token/', TokenObtainPairView().as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/sensor_filter/', SensorFilterView.as_view(), name='sensor_filter'),
    path('api/temperatura_filter/', TemperaturaFilterView.as_view(), name='tempratura_filter'),
    path('api/umidade_filter/', UmidadeFilterView.as_view(), name='umidade_filter'),
    path('api/contador_filter/', ContadorFilterView.as_view(), name='contador_filter'),
    path('api/luminosidade_filter/', LuminosidadeFilterView.as_view(), name='luminosidade_filter')
]
