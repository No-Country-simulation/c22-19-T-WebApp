from rest_framework import serializers
from django.db.models import Sum
from .models import Sucursal, Meta, Venta, Perfil

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

    
    def get_acumulado_semanal(self, obj):
        hoy =  datetime.now().date()
        inicio_semana = hoy - timedelta(days=today.weekday())
        fin_semana = inicio_semana + timedelta(days=6)
        return ventas.obj.filter(fecha__gte=inicio_semana, fecha__lte=fin_semana).aggregate(total=Sum('monto'))['total'] or 0 
    
    def get_acumulado_mensual(self, obj):
        today = timezone.localdate()
        inicio_mes = today.replace(day=1)
        fin_mes = (today.replace(day=28) + timedelta(days=4)).replace(day=1)
        
        return ventas.obj.filter(fecha__gte=start_of_month, fecha__lt=end_of_month).aggregate(total=Sum('monto'))['total'] or 0      

    def get_acumulado_anual(self, obj):
        today = timezone.localdate()
        inicio_año = today.replace(month=1, day=1)
        fin_año = today.replace(month=12, day=31)
        
        return ventas.obj.filter(fecha__gte=inicio_año, fecha__lte=fin_año).aggregate(total=Sum('monto'))['total'] or 0  






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
