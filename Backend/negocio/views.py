from .filters import ModelViewSetFiltered
from .filters import VENTA, SUCURSAL
from rest_framework import permissions

from django.contrib.auth.models import User
from .models import Sucursal, Venta, Meta, Producto
from .serializers import (
    SucursalSerializer,
    VentaSerializer,
    MetaSerializer,
    ProductoSerializer,
    UserSerializer
)
from .documentations import (
    SucursalDocumentation,
    VentaDocumentation,
    MetaDocumentation,
    ProductoDocumentation,
    UsuarioDocumentation
)


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


class ProductoView(ProductoDocumentation, ModelViewSetFiltered):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()
    http_method_names = ['get']
    permission_classes = [permissions.IsAuthenticated]


class UserView(UsuarioDocumentation, ModelViewSetFiltered):
    serializer_class = UserSerializer
    queryset = User.objects.filter(is_superuser=False)
    http_method_names = ['get']
    permission_classes = [permissions.IsAuthenticated]
