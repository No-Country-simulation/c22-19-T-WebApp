from django.urls import path, include
from rest_framework import routers

from .views import SucursalView, VentaView, MetaView

routers = routers.DefaultRouter()
routers.register(r"sucursales", SucursalView, "sucursales")
routers.register(r"ventas", VentaView, "ventas")
routers.register(r"metas", MetaView, "metas")

urlpatterns = [
    path("api/v1/", include(routers.urls))
]
