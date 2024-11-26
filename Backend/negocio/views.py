from rest_framework import viewsets

from .models import Sucursal, Venta, Meta
from .serializers import SucursalSerializer, VentaSerializer, MetaSerializer


class SucursalView(viewsets.ModelViewSet):
    serializer_class = SucursalSerializer
    queryset = Sucursal.objects.all()

class VentaView(viewsets.ModelViewSet):
    serializer_class = VentaSerializer
    queryset = Venta.objects.all()

class MetaView(viewsets.ModelViewSet):
    serializer_class = MetaSerializer
    queryset = Meta.objects.all()   