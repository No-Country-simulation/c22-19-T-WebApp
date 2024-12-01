from pathlib import Path
from random import choices
import json

from negocio.models import Sucursal, Ciudad, Producto

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / 'data'


def obtener_ciudades(length=10):
    # Se obtienen ciudades de forma aleatoria
    ciudades = Ciudad.objects.order_by('?')[0:length]

    if len(ciudades) > 0:  #  Si existen, se retorna el QuerySet
        return ciudades

    #  Si no hay ciudades, se cargan
    from negocio.scripts import cargar_ciudades
    cargar_ciudades.run()
    return obtener_ciudades(length)  #  Se llama a sí misma


def obtener_sucursales(length=10):
    sucursales = Sucursal.objects.all()

    if len(sucursales) > 0:  #  Si existen, se retorna el QuerySet
        return sucursales

    #  Si no hay sucursales, se cargan
    from negocio.scripts import cargar_sucursales
    sucursales = cargar_sucursales.run(return_array=True)
    return sucursales


def obtener_productos(length=None):
    productos = Producto.objects.all()

    if len(productos) > 0:  #  Si existen, se retorna el QuerySet
        return productos

    #  Si no hay productos, se cargan
    from negocio.scripts import cargar_productos
    productos = cargar_productos.run(return_array=True)
    return productos
