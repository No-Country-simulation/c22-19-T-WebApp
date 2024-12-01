from negocio.scripts.utils import Logger
from negocio.models import Provincia, Ciudad


def run():

    # Defino un diccionario con las Provincias (clave) y sus ciudades (valor):

    datos = {
        "Buenos Aires": ["La Plata", "Mar del Plata", "Bahía Blanca"],
        "Ciudad Autónoma de Buenos Aires": ["Palermo", "Recoleta", "San Telmo"],
        "Catamarca": ["San Fernando del Valle de Catamarca", "Belén", "Tinogasta"],
        "Chaco": ["Resistencia", "Presidencia Roque Sáenz Peña", "Villa Ángela"],
        "Chubut": ["Rawson", "Comodoro Rivadavia", "Puerto Madryn"],
        "Córdoba": ["Córdoba", "Villa Carlos Paz", "Río Cuarto"],
        "Corrientes": ["Corrientes", "Goya", "Paso de los Libres"],
        "Entre Ríos": ["Paraná", "Concordia", "Gualeguaychú"],
        "Formosa": ["Formosa", "Clorinda", "Ingeniero Juárez"],
        "Jujuy": ["San Salvador de Jujuy", "Humahuaca", "Tilcara"],
        "La Pampa": ["Santa Rosa", "General Pico", "Toay"],
        "La Rioja": ["La Rioja", "Chilecito", "Villa Unión"],
        "Mendoza": ["Mendoza", "San Rafael", "Luján de Cuyo"],
        "Misiones": ["Posadas", "Puerto Iguazú", "Oberá"],
        "Neuquén": ["Neuquén", "San Martín de los Andes", "Zapala"],
        "Río Negro": ["Viedma", "San Carlos de Bariloche", "General Roca"],
        "Salta": ["Salta", "Cafayate", "Tartagal"],
        "San Juan": ["San Juan", "Caucete", "Jáchal"],
        "San Luis": ["San Luis", "Villa Mercedes", "Merlo"],
        "Santa Cruz": ["Río Gallegos", "El Calafate", "Puerto Deseado"],
        "Santa Fe": ["Rosario", "Santa Fe", "Rafaela"],
        "Santiago del Estero": ["Santiago del Estero", "La Banda", "Termas de Río Hondo"],
        "Tierra del Fuego": ["Ushuaia", "Río Grande", "Tolhuin"],
        "Tucumán": ["San Miguel de Tucumán", "Tafí del Valle", "Concepción"],
    }

    provincias_totales = len(Provincia.objects.all())
    ciudades_totales = len(Ciudad.objects.all())

    Logger.title('Cargando Provincias y Ciudades')
    Logger.body(
        f'Provincias: {provincias_totales} | Ciudades: {ciudades_totales}'
    )

    for nombre_provincia, ciudades in datos.items():
        provincia, created = Provincia.objects.get_or_create(
            nombre=nombre_provincia)

        if created:
            provincias_totales += 1
            Logger.body(
                f'Provincias: {provincias_totales} | Ciudades: {ciudades_totales}'
            )

        # if created:
        #     print(f"Provincia creada: {nombre_provincia}")
        # else:
        #     print(f"La Provincia {nombre_provincia} ya existe: ")

        for ciudad_nombre in ciudades:
            ciudad, created = Ciudad.objects.get_or_create(
                nombre=ciudad_nombre, provincia=provincia)

            if created:
                ciudades_totales += 1
                Logger.body(
                    f'Provincias: {provincias_totales} | Ciudades: {ciudades_totales}'
                )
            # if created:
            #     print(f"Ciudad creada: {ciudad_nombre}")
            # else:
            #     print(f"Ciudad ya existe: {ciudad_nombre}")
    Logger.body(
        f'Provincias: {provincias_totales} | Ciudades: {ciudades_totales}',
        end=True
    )
    #  print("Carga de datos completada.")
