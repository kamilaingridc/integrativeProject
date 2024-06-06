import django_filters
from app_smart.models import Sensor, TemperaturaData
from rest_framework import permissions, status
from app_smart.api import serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q

class SensorFilter(django_filters.FilterSet):
    responsavel = django_filters.CharFilter(field_name='responsavel', lookup_expr='icontains')
    status_operacional = django_filters.CharFilter(field_name='status_operacional', lookup_expr='iexact')
    tipo = django_filters.CharFilter(field_name='tipo', lookup_expr='iexact')
    localizacao = django_filters.CharFilter(field_name='localizacao', lookup_expr='icontains')

    class Meta:
        model = Sensor
        fields = ['tipo', 'localizacao', 'responsavel', 'status_operacional' ]

class SensorFilterView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, *args, **kwargs):
        tipo = request.data.get('tipo', None)
        localizacao = request.data.get('localizacao', None)
        responsavel = request.data.get('responsavel', None)
        status_operacional = request.data.get('status_operacional', None)
        filters = Q() # Inicializa um filtro vazio
        if tipo:
            filters &= Q(tipo__icontains=tipo)
        if localizacao:
            filters &= Q(localizacao__icontains=localizacao)
        if responsavel:
            filters &= Q(responsavel__icontains=responsavel)
        if status_operacional is not None:
            filters &= Q(status_operacional=status_operacional)
        queryset = Sensor.objects.filter(filters)
        serializer = serializers.SensorSerializer(queryset, many=True)
        return Response(serializer.data)
    
class TemperaturaDataFilter(django_filters.FilterSet):
    timestamp_gte = django_filters.DateTimeFilter(field_name='timestamp', lookup_expr='gte')
    timestamp_lte = django_filters.DateTimeFilter(field_name='timestamp', lookup_expr='lte')
    sensor = django_filters.NumberFilter(field_name='sensor')
    valor_gte = django_filters.NumberFilter(field_name='valor', lookup_expr='gte')
    valor_lte = django_filters.NumberFilter(field_name='valor', lookup_expr='lte')
    
    class Meta:
        model = TemperaturaData
        fields = ['timestamp_gte', 'timestamp_lte', 'sensor', 'valor_gte', 'valor_lte']

class TemperaturaFilterView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        sensor_id = request.data.get('sensor_id', None)
        valor_gte = request.data.get('valor_gte', None)
        valor_lt = request.data.get('valor_lt', None)
        timestamp_gte = request.data.get('timestamp_gte', None)
        timestamp_lt = request.data.get('timestamp_lt', None)

        filters = Q()
        if sensor_id:
            filters &= Q(sensor_id=sensor_id)
        if valor_gte:
            filters &= Q(valor__gte=valor_gte)
        if valor_lt:
            filters &= Q(valor__lt=valor_lt)
        if timestamp_gte:
            filters &= Q(timestamp_gte=timestamp_gte)
        if timestamp_lt:
            filters &= Q(timestamp_lt=timestamp_lt)
        queryset = TemperaturaData.objects.filter(filters)
        serializer = serializers.TemperaturaDataSerializer(queryset, many=True)
        return Response(serializer.data)