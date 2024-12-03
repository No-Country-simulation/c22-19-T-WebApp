from django.contrib import admin
from .models import (
    Perfil, Rol, Provincia, Ciudad,
    Sucursal, Venta, Meta, Producto
)


class PerfilAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.order_by('rol__nombre')


admin.site.register(Perfil, PerfilAdmin)
admin.site.register(Rol)
admin.site.register(Provincia)
admin.site.register(Ciudad)
admin.site.register(Sucursal)
admin.site.register(Producto)


class VentaAdmin(admin.ModelAdmin):
    exclude = ('sucursal',)


admin.site.register(Venta, VentaAdmin)
admin.site.register(Meta)
