from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .serializers import SucursalSerializer, VentaSerializer, MetaSerializer


class SucursalDocumentation:
    @swagger_auto_schema(
        operation_summary="Listado de Sucursales",
        operation_description="Obtiene la lista de sucursales con sus datos, incluyendo ventas \
            totales filtradas opcionalmente por fechas y ordenadas por id y nombre.",
        manual_parameters=[
            openapi.Parameter(
                'start_date',
                openapi.IN_QUERY,
                description="Fecha inicial para filtrar las ventas (formato YYYY-MM-DD)",
                type=openapi.TYPE_STRING,
                format=openapi.FORMAT_DATE,
                required=False
            ),
            openapi.Parameter(
                'end_date',
                openapi.IN_QUERY,
                description="Fecha final para filtrar las ventas (formato YYYY-MM-DD)",
                type=openapi.TYPE_STRING,
                format=openapi.FORMAT_DATE,
                required=False
            ),
            openapi.Parameter(
                'order_by',
                openapi.IN_QUERY,
                description="Ordena las sucurales por id o nombre. \
                    Se puede agregar el símbolo \"-\" para alterear el orden",
                type=openapi.TYPE_STRING,
                required=False
            ),
        ],
        responses={
            200: SucursalSerializer(),
            400: 'Solicitud inválida',
            403: 'Forbidden'
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Sucursal por ID",
        operation_description="Obtiene los detalles de una sucursal específica basada en su ID.",
        manual_parameters=[
            openapi.Parameter(
                'id',
                openapi.IN_PATH,
                description="ID de la sucursal que se desea consultar",
                type=openapi.TYPE_INTEGER,
                required=True
            ),
            openapi.Parameter(
                'start_date',
                openapi.IN_QUERY,
                description="Fecha inicial para filtrar las ventas (formato YYYY-MM-DD)",
                type=openapi.TYPE_STRING,
                format=openapi.FORMAT_DATE,
                required=False
            ),
            openapi.Parameter(
                'end_date',
                openapi.IN_QUERY,
                description="Fecha final para filtrar las ventas (formato YYYY-MM-DD)",
                type=openapi.TYPE_STRING,
                format=openapi.FORMAT_DATE,
                required=False
            ),
        ],
        responses={
            200: SucursalSerializer(),
            404: 'No se encontró la sucursal con el ID proporcionado',
            401: 'No autorizado'
        }
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)


class VentaDocumentation:
    @swagger_auto_schema(
        operation_summary="Listado de Ventas",
        operation_description="Obtiene el detalle de una venta específica, \
            incluyendo el total de la transacción, la fecha en que se realizó, \
            el usuario que la procesó, la sucursal asociada, y el producto vendido.",
        manual_parameters=[
            openapi.Parameter(
                'start_date',
                openapi.IN_QUERY,
                description="Fecha inicial para filtrar las ventas (formato YYYY-MM-DD)",
                type=openapi.TYPE_STRING,
                format=openapi.FORMAT_DATE,
                required=False
            ),
            openapi.Parameter(
                'end_date',
                openapi.IN_QUERY,
                description="Fecha final para filtrar las ventas (formato YYYY-MM-DD)",
                type=openapi.TYPE_STRING,
                format=openapi.FORMAT_DATE,
                required=False
            ),
            openapi.Parameter(
                'sucursal',
                openapi.IN_QUERY,
                description="Permite filtar por id de sucursal",
                type=openapi.TYPE_STRING,
                required=False
            ),
            openapi.Parameter(
                'order_by',
                openapi.IN_QUERY,
                description="Ordena las sucurales por fecha o total. \
                    Se puede agregar el símbolo \"-\" para alterear el orden",
                type=openapi.TYPE_STRING,
                required=False
            ),
        ],
        responses={
            200: VentaSerializer(),
            400: 'Solicitud inválida',
            403: 'Forbidden'
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Venta por ID",
        operation_description="Obtiene los detalles de una venta específica basada en su ID.",
        manual_parameters=[
            openapi.Parameter(
                'id',
                openapi.IN_PATH,
                description="ID de la sucursal que se desea consultar",
                type=openapi.TYPE_INTEGER,
                required=True
            ),
        ],
        responses={
            200: VentaSerializer(),
            404: 'No se encontró la venta con el ID proporcionado',
            401: 'No autorizado'
        }
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)


class MetaDocumentation:
    @swagger_auto_schema(
        operation_summary="Listado de Metas",
        operation_description="Obtiene el detalle las metas semanales, mensuales y anuales \
            de cada sucursal. Obteniendo las metas pretendidas y las acumuladas.",
        responses={
            200: MetaSerializer(),
            400: 'Solicitud inválida',
            403: 'Forbidden'
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Venta por ID",
        operation_description="Obtiene los detalles de una meta específica basada en su ID.",
        responses={
            200: MetaSerializer(),
            404: 'No se encontró la venta con el ID proporcionado',
            401: 'No autorizado'
        }
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
