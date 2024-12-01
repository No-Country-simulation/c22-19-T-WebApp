import json
from random import choices

from negocio.models import Sucursal
from negocio.scripts.creadores import obtener_ciudades, DATA_DIR
from negocio.scripts.utils import Logger

BASIC_LENGTH = 10


def run(length=None, return_array=False):
    length = BASIC_LENGTH if length is None else length

    ciudades = obtener_ciudades(length)

    sucursales = []
    sucursales_totales = len(Sucursal.objects.all())

    with open(DATA_DIR / 'avenidas_y_calles.json', 'r') as file:
        data = json.load(file)
        nombres_sucursales = choices(data, k=length)

        Logger.title('Cargando Sucursales')
        Logger.body(f"Sucursales: {sucursales_totales}")
        for i in range(length):
            sucursal, created = Sucursal.objects.get_or_create(
                nombre=nombres_sucursales[i],
                ciudad=ciudades[i]
            )
            if created:
                sucursales_totales += 1
                sucursales.append(sucursal)
                Logger.body(f"Sucursales: {sucursales_totales}")

    Logger.body(f"Sucursales: {sucursales_totales}", end=True)

    if return_array:
        return sucursales
