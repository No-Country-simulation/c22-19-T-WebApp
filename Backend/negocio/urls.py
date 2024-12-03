from django.urls import path, include
from rest_framework import routers

from .views import SucursalView, VentaView, MetaView

routers = routers.DefaultRouter()
routers.register(r"sucursal", SucursalView, "sucursal")
routers.register(r"venta", VentaView, "venta")
routers.register(r"meta", MetaView, "meta")

urlpatterns = [
    path("api/v1/", include(routers.urls))
]
