from django.db import models

# Create your models here.
class Sensor(models.Model):
    TIPO_SENSOR_CHOICE = [
        ('Temperatura', 'Temperatura'),
        ('Umidade', 'Umidade'),
        ('Contador', 'Contador'),
        ('Luminosidade', 'Luminosidade'),
    ]

    tipo = models.CharField(max_length=50, choices=TIPO_SENSOR_CHOICE)
    mac_address = models.CharField(max_length=20, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    localizacao = models.CharField(max_length=100)
    responsavel = models.CharField(max_length=100)
    unidade_medida = models.CharField(max_length=20, blank=True, null=True)
    observacao = models.TextField(blank=True)
    status_operacional = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.tipo} - {self.localizacao}"
    