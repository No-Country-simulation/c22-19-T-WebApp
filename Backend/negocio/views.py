from .filters import ModelViewSetFiltered
from .filters import VENTA, SUCURSAL
from rest_framework import permissions

from .models import Sucursal, Venta, Meta
from .serializers import SucursalSerializer, VentaSerializer, MetaSerializer
from .documentations import SucursalDocumentation, VentaDocumentation, MetaDocumentation


class SucursalView(SucursalDocumentation, ModelViewSetFiltered):
    serializer_class = SucursalSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Sucursal.objects.all()
    http_method_names = ['get']

    filter_object = SUCURSAL


class VentaView(VentaDocumentation, ModelViewSetFiltered):
    serializer_class = VentaSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Venta.objects.all()
    http_method_names = ['get']

    filter_object = VENTA


class MetaView(MetaDocumentation, ModelViewSetFiltered):
    serializer_class = MetaSerializer
    queryset = Meta.objects.all()
    http_method_names = ['get']
    permission_classes = [permissions.IsAuthenticated]
