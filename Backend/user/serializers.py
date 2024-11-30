from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from negocio.models import Perfil, Rol

UserModel = get_user_model()

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)  # Para evitar exponer contraseñas

    def validate(self, data): #Valida credenciales
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Credenciales inválidas.")
        if not user.is_active:
            raise serializers.ValidationError("El usuario está inactivo.")
        return user
        data['user'] = user
        return data


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ("id", "nombre")


class PerfilSerializer(serializers.ModelSerializer):
    rol = RolSerializer()  # Incluye datos del rol
    superior = serializers.SerializerMethodField()

    class Meta:
        model = Perfil
        fields = ('id', 'rol', 'superior', 'updated_at')

    def get_superior(self, obj):
        if obj.superior:
            return {
                "id": obj.superior.id,
                "username": obj.superior.user.username
            }
        return None


class UserSerializer(serializers.ModelSerializer):
    perfil = PerfilSerializer(read_only=True)  # Relación OneToOne

    class Meta:
        model = UserModel
        fields = ("id", "username", "perfil")