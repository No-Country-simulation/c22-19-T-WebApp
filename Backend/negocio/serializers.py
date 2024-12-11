from rest_framework import serializers
from django.db.models import Sum
from .models import Sucursal, Meta, Venta, Perfil
from datetime import datetime, timedelta


class VentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venta
        fields = '__all__'
        http_method_names = ['get']


class MetaSerializer(serializers.ModelSerializer):

    acumulado_semanal = serializers.SerializerMethodField()
    acumulado_mensual = serializers.SerializerMethodField()
    acumulado_anual = serializers.SerializerMethodField()

    class Meta:
        model = Meta
        fields = ['id', 'sucursal',
                  'semanal', 'mensual', 'anual', 'acumulado_semanal', 'acumulado_mensual', 'acumulado_anual']

    def calcular_acumulado(self, sucursal_id, fecha_inicio, fecha_fin):
        """
        Calcula el acumulado de ventas para una sucursal en un rango de fechas.
        """
        ventas = Venta.objects.filter(
            sucursal_id=sucursal_id,
            fecha__range=(fecha_inicio, fecha_fin)
        ).aggregate(total=Sum('total'))
        return ventas.get('total') or 0

    def calcular_fechas(self, periodo):
        """
        Devuelve el rango de fechas según el período especificado.
        """
        hoy = datetime.now()

        if periodo == 'mes':
            fecha_inicio = hoy.replace(day=1)
            fecha_fin = (hoy.replace(day=28) + timedelta(days=4)
                         ).replace(day=1) - timedelta(days=1)
        elif periodo == 'anio':
            fecha_inicio = datetime(hoy.year, 1, 1)
            fecha_fin = datetime(hoy.year, 12, 31)
        else:  # Por defecto, período semanal
            fecha_inicio = hoy - timedelta(days=hoy.weekday())
            fecha_fin = fecha_inicio + timedelta(days=6)

        return fecha_inicio, fecha_fin

    def get_acumulado_semanal(self, obj):
        fecha_inicio, fecha_fin = self.calcular_fechas('semana')
        return self.calcular_acumulado(obj.sucursal.id, fecha_inicio, fecha_fin)

    def get_acumulado_mensual(self, obj):
        fecha_inicio, fecha_fin = self.calcular_fechas('mes')
        return self.calcular_acumulado(obj.sucursal.id, fecha_inicio, fecha_fin)

    def get_acumulado_anual(self, obj):
        fecha_inicio, fecha_fin = self.calcular_fechas('anio')
        return self.calcular_acumulado(obj.sucursal.id, fecha_inicio, fecha_fin)


class PerfilSerializer(serializers.ModelSerializer):
    # Devuelve el nombre de usuario del perfil
    username = serializers.StringRelatedField()
    nombre = serializers.SerializerMethodField()  # Obtiene el nombre del usuario
    apellido = serializers.SerializerMethodField()  # Obtiene el apellido del usuario
    rol = serializers.StringRelatedField()  # Devuelve el nombre del rol
    superior = serializers.SerializerMethodField()  # Incluye datos del superior

    class Meta:
        model = Perfil
        fields = ['id', 'username', 'nombre', 'apellido',
                  'rol', 'superior', 'updated_at']

    def get_nombre(self, obj):
        # Retorna el primer nombre del usuario o None si no está disponible
        return obj.user.first_name or None

    def get_apellido(self, obj):
        # Retorna el apellido del usuario o None si no está disponible
        return obj.user.last_name or None

    def get_superior(self, obj):
        # Retorna los datos del superior (si existe), incluyendo ID y username
        if not obj.superior:
            return None
        return {
            'id': obj.superior.user.id,
            'username': obj.superior.user.username
        }

# Serializador para Sucursal


class SucursalSerializer(serializers.ModelSerializer):
    # Incluye los datos de Ciudad y Provincia como campos personalizados
    ciudad = serializers.SerializerMethodField()
    provincia = serializers.SerializerMethodField()
    # Incluye los empleados asignados
    empleados = PerfilSerializer(
        source='perfil_set', many=True, read_only=True)
    ventas_totales = serializers.SerializerMethodField()

    class Meta:
        model = Sucursal
        fields = ['id', 'nombre', 'ciudad',
                  'provincia', 'empleados', 'ventas_totales']

    def get_ciudad(self, obj):
        # Retorna un diccionario con ID y nombre de la ciudad asociada
        if not obj.ciudad:
            return None
        return {
            'id': obj.ciudad.id,
            'nombre': obj.ciudad.nombre
        }

    def get_provincia(self, obj):
        # Retorna un diccionario con ID y nombre de la provincia asociada a la ciudad
        if not obj.ciudad or not obj.ciudad.provincia:
            return None
        return {
            'id': obj.ciudad.provincia.id,
            'nombre': obj.ciudad.provincia.nombre
        }

    def get_ventas_totales(self, obj):
        # Obtén los parámetros de consulta (fechas de inicio y fin)
        request = self.context.get('request')

        if not request:
            return 0  # Retorna 0 si no hay contexto de solicitud

        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        # Aplica el filtro de fechas en las ventas relacionadas
        ventas = obj.ventas.all()  # Usa el related_name para obtener las ventas
        if start_date:
            ventas = ventas.filter(fecha__gte=start_date)
        if end_date:
            ventas = ventas.filter(fecha__lte=end_date)

        # Calcula el total de las ventas
        return ventas.aggregate(total=Sum('total')).get('total') or 0
