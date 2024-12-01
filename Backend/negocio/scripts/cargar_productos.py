import csv

from negocio.models import Producto
from negocio.scripts.creadores import DATA_DIR
from negocio.scripts.utils import Logger, normailize_price

BASIC_LENGTH = 100
LOREM = '\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
Sed ligula lacus, tincidunt vitae risus id, consectetur porttitor ante. \
Morbi nisi mi, pretium sit amet mauris vel, pretium faucibus tortor. Integer egestas ligula facilisis ultrices sodales. \
Pellentesque fringilla elementum ex, ut.'


def run(length=None, return_array=False):
    length = BASIC_LENGTH if length is None else length

    productos = []
    productos_totales = len(Producto.objects.all())

    with open(DATA_DIR / 'products.csv', mode='r', encoding='utf8', errors='ignore') as file:
        reader = csv.reader(file)
        reader.__next__()

        Logger.title('Cargando Productos')
        Logger.body(f'Productos: {productos_totales}')

        for row in reader:
            # Dato para control de cantidad de productos
            row_id = int(row[0])
            # Datos para creación de productos
            title = row[2]
            imagen_url = row[3]
            price = normailize_price(row[4])

            producto, created = Producto.objects.get_or_create(
                title=title,
                description=LOREM,
                imagen=imagen_url,
                price=price
            )

            if created:
                productos_totales += 1
                productos.append(producto)
                Logger.body(f'Productos: {productos_totales}')

            if row_id >= length:
                break

    Logger.body(f'Productos: {productos_totales}', end=True)

    if return_array:
        return productos
