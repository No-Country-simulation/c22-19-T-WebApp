import os
import django
import random
from datetime import datetime, timedelta

from negocio.models import Meta, Sucursal


semanal_minimo = 500
semanal_maximo = 1000

def run():
    print("Cargando metas") 
    sucursales = Sucursal.objects.all()
    metas_creadas = 0 # contador de las metas creadas

    for sucursal in sucursales: # las metas estan calculadas de forma proporcional
        semanal = round(random.uniform(semanal_minimo, semanal_maximo), 2)
        mensual = semanal * 4
        anual = mensual * 12

        # crear el objeto meta para que quede asociado a la sucursal:
        meta, created = Meta.objects.get_or_create(
            sucursal=sucursal,
            defaults={
                'semanal': semanal,
                'mensual': mensual,
                'anual': anual
            }
        )

        if created:
            metas_creadas += 1 # aumenta el contador de mis metas
            print(f"Meta creada para la sucursal: {sucursal.nombre} "
                  f"(Semanal: {semanal}, Mensual: {mensual}, Anual: {anual})")
        else:
            print(f"Meta ya existente para la sucursal: {sucursal.nombre}")

    print(f"Total de metas creadas: {metas_creadas}")