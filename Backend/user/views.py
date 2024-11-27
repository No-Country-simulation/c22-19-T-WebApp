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


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,) #Permisos que se le da la clase.
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data #Usuario y contraseña
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validate(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView): #Datos del usuario, como ya vimos anteriormente en el archivo urls.py.
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer_user = UserSerializer(request.user)
        perfil = request.user.perfil  # Relación OneToOne
        serializer_perfil = PerfilSerializer(perfil)

        data = {
            'user': {**serializer_user.data, **serializer_perfil.data}# Para unir ambos diccionarios
        }
        return Response(data, status=status.HTTP_200_OK)