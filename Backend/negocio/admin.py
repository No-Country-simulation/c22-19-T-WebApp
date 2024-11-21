from django.contrib import admin
from .models import Perfil, Rol, Provincia, Ciudad, Sucursal, Venta, Meta

admin.site.register(Perfil)
admin.site.register(Rol)
admin.site.register(Provincia)
admin.site.register(Ciudad)
admin.site.register(Sucursal)
admin.site.register(Venta)
admin.site.register(Meta)