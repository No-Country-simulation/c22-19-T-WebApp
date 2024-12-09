from django.core.exceptions import ValidationError
from rest_framework import viewsets

VENTA = {
    'allowed_filters': {
        'start_date': 'fecha__gte',  # start_date se traduce a fecha >=
        'end_date': 'fecha__lte',   # end_date se traduce a fecha <=
        #  'total_min': 'total__gte',  # total_min se traduce a total >=
        #  'total_max': 'total__lte',  # total_max se traduce a total <=
        #  'perfil': 'perfil__id',     # perfil filtra por el ID del perfil
        'sucursal': 'sucursal__id',
    },
    'allowed_order_fields': ['fecha', 'total',]
}

SUCURSAL = {
    'allowed_filters': {},
    'allowed_order_fields': ['id', 'nombre']
}


class ModelViewSetFiltered(viewsets.ModelViewSet):
    """
    Extiende ModelViewSet para añadir lógica de filtrado y ordenación.

    Atributos:
        filter_object: Un diccionario con las configuraciones de filtros y campos de orden permitidos.

    Métodos:
        get_queryset(): Sobrescribe el método para aplicar filtros y ordenación
                        según los parámetros de la solicitud.
    """
    filter_object = None

    def get_queryset(self):
        """
        Obtiene el queryset base y aplica filtros y ordenación si están configurados.

        Returns:
            Queryset filtrado y ordenado según las configuraciones definidas.
        """
        # Obtiene el queryset base desde la implementación original de ModelViewSet
        queryset = super().get_queryset()

        if self.filter_object is not None:  # Verifica si hay configuraciones de filtros
            # Filtros permitidos
            allowed_filters = self.filter_object.get('allowed_filters', None)
            # Campos de orden permitidos
            allowed_order_fields = self.filter_object.get(
                'allowed_order_fields', None)
            # Obtiene los parámetros de la solicitud (GET params)
            filters = self.request.query_params
            # Aplica filtros y ordenación al queryset
            if allowed_filters:
                queryset = self.filter_queryset(
                    queryset, filters, allowed_filters)
            if allowed_order_fields:
                queryset = self.order_queryset(
                    queryset, filters, allowed_order_fields)

        return queryset

    def filter_queryset(self, queryset, filters=None, allowed_filters=None):
        """
        Aplica filtros a un queryset basado en los filtros proporcionados y los permitidos.

        Args:
            queryset: El queryset inicial sobre el que se aplicarán los filtros.
            filters: Un diccionario con los filtros enviados (normalmente desde la URL o el request).
            allowed_filters: Un diccionario que define qué filtros son válidos y cómo mapearlos
                            a expresiones Django ORM.

        Returns:
            El queryset filtrado según los criterios válidos.

        Nota:
            Si algún filtro no pasa la validación (e.g., tipo de dato incorrecto), simplemente se ignora.
        """
        if allowed_filters is None:
            return queryset

        for filter_name, expresion in allowed_filters.items():
            # Obtiene el valor del filtro proporcionado en los parámetros de entrada
            value = filters.get(filter_name)
            if value is not None:  # Solo aplica filtros si hay un valor presente
                try:
                    # Aplica el filtro usando expresiones ORM
                    queryset = queryset.filter(**{expresion: value})
                except ValidationError:
                    # Ignora errores de validación y sigue con los demás filtros
                    continue
        return queryset

    def order_queryset(self, queryset, filters, allowed_order_fields):
        """
        Aplica ordenación a un queryset basado en los campos permitidos.

        Args:
            queryset: El queryset inicial a ordenar.
            filters: Un diccionario que contiene el campo de ordenación enviado por el cliente.
            allowed_order_fields: Una lista de nombres de campos que están permitidos para ordenar.

        Returns:
            El queryset ordenado según el campo especificado.

        Nota:
            Si el campo de ordenación no está permitido, no se realiza ninguna acción.
            Soporta ordenación descendente usando el prefijo '-'.
        """
        order_by = filters.get('order_by')

        if order_by:
            # Valida que el campo de ordenación esté en la lista de campos permitidos
            # Elimina el prefijo '-' para orden descendente
            order_field = order_by.lstrip('-')
            if order_field in allowed_order_fields:
                # Aplica la ordenación si el campo está permitido
                queryset = queryset.order_by(order_by)

        return queryset
