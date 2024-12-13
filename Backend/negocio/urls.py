from django.urls import path, include
from rest_framework import routers

from .views import SucursalView, VentaView, MetaView, ProductoView, UserView

routers = routers.DefaultRouter()
routers.register(r"sucursales", SucursalView, "sucursales")
routers.register(r"ventas", VentaView, "ventas")
routers.register(r"metas", MetaView, "metas")
routers.register(r"productos", ProductoView, "productos")
routers.register(r"usuarios", UserView, "usuarios")

urlpatterns = [
    path("api/v1/", include(routers.urls))
]
