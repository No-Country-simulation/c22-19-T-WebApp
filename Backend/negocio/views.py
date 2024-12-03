from rest_framework import viewsets
from rest_framework import permissions

from .models import Sucursal, Venta, Meta
from .serializers import SucursalSerializer, VentaSerializer, MetaSerializer


class SucursalView(viewsets.ModelViewSet):
    serializer_class = SucursalSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Sucursal.objects.all()
    http_method_names = ['get', 'post', 'put', 'patch']  # Excluye 'delete'

class VentaView(viewsets.ModelViewSet):
    serializer_class = VentaSerializer
    queryset = Venta.objects.all()
    http_method_names = ['get', 'post', 'put', 'patch']  # Excluye 'delete'
    permission_classes = [permissions.IsAuthenticated]

class MetaView(viewsets.ModelViewSet):
    serializer_class = MetaSerializer
    queryset = Meta.objects.all()   
    http_method_names = ['get', 'post', 'put', 'patch']  # Excluye 'delete'
    permission_classes = [permissions.IsAuthenticated]