from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from .serializers import (
    UserLoginSerializer,
    UserSerializer,
    PerfilSerializer
)
from django.contrib.auth.models import User

from django.middleware.csrf import get_token
from django.http import JsonResponse


def csrf_token_view(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})


class UserLogin(APIView):
    # Permisos que se le da la clase.
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    http_method_names = ['get', 'post', 'put', 'patch']  # Excluye 'delete'

    def post(self, request):
        data = request.data  # Usuario y contraseña
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validate(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


# Datos del usuario, como ya vimos anteriormente en el archivo urls.py.
class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    http_method_names = ['get', 'post', 'put', 'patch']  # Excluye 'delete'

    def get(self, request):
        serializer_user = UserSerializer(request.user)
        perfil = request.user.perfil  # Relación OneToOne
        serializer_perfil = PerfilSerializer(perfil)

        data = {
            # Para unir ambos diccionarios
            'user': {**serializer_user.data, **serializer_perfil.data}
        }
        return Response(data, status=status.HTTP_200_OK)
