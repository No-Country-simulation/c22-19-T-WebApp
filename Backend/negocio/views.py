from .filters import ModelViewSetFiltered
from .filters import VENTA, SUCURSAL
from rest_framework import permissions

from .models import Sucursal, Venta, Meta
from .serializers import SucursalSerializer, VentaSerializer, MetaSerializer


class SucursalView(ModelViewSetFiltered):
    serializer_class = SucursalSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Sucursal.objects.all()
    http_method_names = ['get']

    filter_object = SUCURSAL

    # def get_serializer_context(self):
    #     """
    #     Añade el contexto de la solicitud al serializador.
    #     """
    #     context = super().get_serializer_context()
    #     context.update({'request': self.request})
    #     return context


class VentaView(ModelViewSetFiltered):
    serializer_class = VentaSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Venta.objects.all()
    http_method_names = ['get']

    filter_object = VENTA


class MetaView(ModelViewSetFiltered):
    serializer_class = MetaSerializer
    queryset = Meta.objects.all()
    http_method_names = ['get']
    permission_classes = [permissions.IsAuthenticated]
