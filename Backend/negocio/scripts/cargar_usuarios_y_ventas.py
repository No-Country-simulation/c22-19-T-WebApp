import random
import json
from negocio.models import Venta, Sucursal, Rol, User, Producto
from datetime import date

from negocio.scripts.creadores import obtener_sucursales, obtener_productos, DATA_DIR
from negocio.scripts.utils import remover_tildes, Logger, preparar_datos_usuario, fecha_random


def run(vendedores_length=50):

    ventas, _ = Rol.objects.get_or_create(nombre=f"ventas")
    gerencia, _ = Rol.objects.get_or_create(nombre=f"gerencia")
    sucursales = Sucursal.objects.all()
    productos = Producto.objects.all()

    # Se revisa que haya sucursales, sino se crean
    if len(sucursales) == 0:
        sucursales = obtener_sucursales()

    # Se revisa que haya productos, sino se crean
    if len(productos) == 0:
        productos = obtener_productos()

    with open(DATA_DIR / 'nombres_y_apellidos.json', 'r', encoding='utf-8') as file:
        data = json.load(file)

        Logger.title('Cargando Gerentes')
        gerentes = []
        for i in range(len(data)-1, len(data)-1 - len(sucursales), -1):
            sucursales_index = len(data)-1 - i
            sucursal = sucursales[sucursales_index]

            first_name, last_name, username = preparar_datos_usuario(data[i])
            email = f"{username}@example.com"
            password = f"u_p12345"

            user, _ = User.objects.get_or_create(
                username=username,
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=password
            )

            user.perfil.rol = gerencia
            user.perfil.sucursal = sucursal
            user.perfil.save()
            gerentes.append(user)
            Logger.body(f'Gerentes {sucursales_index+1}')
        Logger.body(f'Gerentes {sucursales_index+1}', end=True)

    Logger.title('Cargando Vendedores y Ventas por Vendedor')
    for i in range(vendedores_length):
        with open(DATA_DIR / 'nombres_y_apellidos.json', 'r', encoding='utf-8') as file:
            data = json.load(file)
            first_name = data[i]['first_name']
            last_name = data[i]['last_name']
            username = remover_tildes(
                f"{first_name.lower()}_{last_name.lower()}")

        # username = f"user{i+1}"
        email = f"{username}@example.com"
        password = f"u_p12345"
        user, _ = User.objects.get_or_create(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )
        user.perfil.rol = ventas
        superior = random.choice(gerentes)
        user.perfil.superior = superior.perfil
        user.perfil.sucursal = superior.perfil.sucursal
        user.perfil.save()
        Logger.body(f'Vendedores {i+1}')

        # perfil = Perfil.objects.create(user=user, rol=ventas, sucursal=random.choice(sucursales))
        for j in range(random.randint(20, 50)):
            # total = random.randint(100, 5000)
            producto = random.choice(productos)
            total = producto.price
            venta = Venta.objects.create(
                user=user,
                total=total,
                producto=producto,
                fecha=fecha_random([2024, 1, 1])
            )
    Logger.body(f'Vendedores {i+1}', end=True)

    # print("Carga de datos completada.")
