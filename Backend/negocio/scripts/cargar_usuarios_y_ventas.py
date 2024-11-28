import random
import django_extensions
from negocio.models import Venta, Meta, Sucursal, Rol, User
from datetime import date

def run():

    ventas, _ = Rol.objects.get_or_create(nombre = f"ventas")
    sucursales = Sucursal.objects.all()
    for i in range(50): 
        username = f"user{i+1}"
        email = f"{username}@example.com"
        password = f"u_p12345"
        user, _ = User.objects.get_or_create(username = username, email = email, password = password)
        user.perfil.rol = ventas
        user.perfil.sucursal = random.choice(sucursales)
        user.perfil.save()
        total = 5000
        #perfil = Perfil.objects.create(user=user, rol=ventas, sucursal=random.choice(sucursales))
        venta = Venta.objects.create(user = user, total = total, fecha = date.today())
        




    print("Carga de datos completada.")