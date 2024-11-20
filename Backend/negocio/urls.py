from django.urls import path, include
from rest_framework import routers

from .views import SucursalView

routers = routers.DefaultRouter()
routers.register(r"sucursal", SucursalView, "sucursal")

urlpatterns = [
    path("api/v1/", include(routers.urls))
]
