from rest_framework import viewsets

from .models import Sucursal
from .serializers import SucursalSerializer


class SucursalView(viewsets.ModelViewSet):
    serializer_class = SucursalSerializer
    queryset = Sucursal.objects.all()
