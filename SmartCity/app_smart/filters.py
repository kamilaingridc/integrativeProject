import django_filters
from app_smart.models import Sensor

class SensoresFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='iexact')

    class Meta:
        model = Sensor
        fields = ['tipo', 'localizacao', 'responsavel', 'status_operacional' ]
