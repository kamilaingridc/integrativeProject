import django_filters
from app_smart.models import Sensor

class SensorFilter(django_filters.FilterSet):
    responsavel = django_filters.CharFilter(field_name='responsavel', lookup_expr='icontains')
    status_operacional = django_filters.CharFilter(field_name='status_operacional', lookup_expr='iexact')
    tipo = django_filters.CharFilter(field_name='tipo', lookup_expr='iexact')
    localizacao = django_filters.CharFilter(field_name='localizacao', lookup_expr='icontains')

    class Meta:
        model = Sensor
        fields = ['tipo', 'localizacao', 'responsavel', 'status_operacional' ]
