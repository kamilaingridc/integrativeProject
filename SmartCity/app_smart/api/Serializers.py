# representa um usuário no banco de dados do django
from django.contrib.auth.models import User
# ferramentas para serializar e desserializar objetos python em json
from rest_framework import serializers
# 
from django.contrib.auth.hashers import make_password

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
