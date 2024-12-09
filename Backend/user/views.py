from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.decorators import api_view

from .serializers import (
    UserLoginSerializer,
    UserSerializer,
    PerfilSerializer
)

from django.contrib.auth.models import User

from django.middleware.csrf import get_token
from django.http import JsonResponse

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


@swagger_auto_schema(
    operation_summary="Obtener CSRF Token",
    operation_description="Obtiene un token CSRF válido para ser usado en solicitudes que requieren protección CSRF.",
    method='GET',
    responses={
        200: openapi.Response(
            description="Token CSRF generado con éxito",
            examples={
                "application/json": {
                    "csrfToken": "z5Lxyz2n...1Yw8A"
                }
            },
        ),
    },
)
@api_view(['GET'])
def csrf_token_view(request):
    """
    Retorna un token CSRF válido.
    """
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})


class UserLogin(APIView):
    # Permisos que se le da la clase.
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    http_method_names = ['get', 'post', 'put', 'patch']  # Excluye 'delete'

    @swagger_auto_schema(
        operation_summary="Iniciar sesión",
        operation_description="Autenticación de usuario mediante nombre de usuario y contraseña.",
        request_body=UserLoginSerializer,
        responses={
            200: openapi.Response("Inicio de sesión exitoso", UserLoginSerializer),
            400: "Solicitud inválida",
            401: "No autorizado",
        }
    )
    def post(self, request):
        data = request.data  # Usuario y contraseña
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validate(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    @swagger_auto_schema(
        operation_summary="Cerrar sesión",
        operation_description="Cierra la sesión del usuario autenticado. ",
        responses={
            200: "Sesión cerrada exitosamente",
            403: "No autorizado",
        }
    )
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


# Datos del usuario, como ya vimos anteriormente en el archivo urls.py.
class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    http_method_names = ['get', 'post', 'put', 'patch']  # Excluye 'delete'

    @swagger_auto_schema(
        operation_summary="Obtener datos del usuario autenticado",
        operation_description="Devuelve los datos del usuario autenticado, incluyendo su perfil.",
        responses={
            200: "Datos de Usuario",
            401: "No autorizado",
        }
    )
    def get(self, request):
        serializer_user = UserSerializer(request.user)
        perfil = request.user.perfil  # Relación OneToOne
        serializer_perfil = PerfilSerializer(perfil)

        data = {
            # Para unir ambos diccionarios
            'user': {**serializer_user.data, **serializer_perfil.data}
        }
        return Response(data, status=status.HTTP_200_OK)
