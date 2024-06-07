# representa um usuário no banco de dados do django
from django.contrib.auth.models import User
# ferramentas para serializar e desserializar objetos python em json
from rest_framework import serializers
# 
from django.contrib.auth.hashers import make_password
from app_smart.models import Sensor, TemperaturaData, UmidadeData, LuminosidadeData, ContadorData

# será usada para serializar e desserializar objetos do modelo User
class UserSerializer(serializers.ModelSerializer):
    # não expoe a senha nas respostas de leitura
    password = serializers.CharField(write_only=True)

    # garantir que a senha do usuário seja criptografada antes de ser salva no banco de dados
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password']) # método do django de criptografia
        return super().create(validated_data)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = '__all__'

        # serializer traduz o model pra saída da api 
        
class TemperaturaDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemperaturaData
        fields = '__all__'

class UmidadeDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UmidadeData
        fields = '__all__'

class LuminosidadeDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = LuminosidadeData
        fields = '__all__'

class ContadorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContadorData
        fields = '__all__'

