from datetime import datetime, timedelta
from random import randint
from unicodedata import normalize


def remover_tildes(str):
    """
    Elimina tildes y diéresis de las letras en una cadena.

    Args:
        str (str): Cadena de texto a procesar.

    Returns:
        str: Cadena de texto sin tildes ni diéresis.

    Fuente del código: https://es.stackoverflow.com/questions/135707/
    """
    trans_tab = dict.fromkeys(map(ord, u'\u0301\u0308'), None)
    str = normalize('NFKC', normalize('NFKD', str).translate(trans_tab))
    return str


def preparar_datos_usuario(data):
    """
    Genera un nombre de usuario basado en el primer nombre y apellido, eliminando tildes.

    Args:
        data (dict): Diccionario con las claves `first_name` y `last_name`.

    Returns:
        tuple: Una tupla con `(first_name, last_name, username)`, donde `username` 
               es el nombre de usuario generado.
    """
    first_name = data['first_name']  # Obtiene el primer nombre.
    last_name = data['last_name']  # Obtiene el apellido.
    # Genera un username sin tildes.
    username = remover_tildes(f"{first_name.lower()}_{last_name.lower()}")
    return (first_name, last_name, username)  # Retorna los datos procesados.


def normailize_price(price_str):
    """
    Convierte un precio en formato de texto a un número flotante con dos decimales.

    Args:
        price_str (str): Precio en formato de texto, por ejemplo, "$1,234.56".

    Returns:
        float: Precio convertido a número flotante, redondeado a dos decimales.
    """
    price_list = [
        float(n)
        # Elimina el signo de moneda y separa las secciones de miles.
        for m in price_str[1:].split(',')
        for n in m.split('.')  # Separa los decimales.
    ]
    if len(price_list) > 1:
        # Si hay múltiples partes, las combina para formar el número completo.
        price = sum(price_list[:-1]) + price_list[-1] / 100
    else:
        price = price_list[0]  # Si solo hay una parte, la utiliza como precio.
    return round(price, 2)  # Retorna el precio redondeado a dos decimales.


def fecha_random(fecha_inicio, fecha_fin=False):
    """
    Genera una fecha aleatoria entre `fecha_inicio` y `fecha_fin`.

    Args:
        fecha_inicio (list[int]): Fecha de inicio en formato `[Año, Mes, Día]`.
        fecha_fin (list[int], optional): Fecha de fin en formato `[Año, Mes, Día]`. 
                                         Si no se proporciona, se utiliza la fecha actual.

    Returns:
        datetime: Fecha aleatoria dentro del rango especificado.
    """
    fecha_inicio = datetime(*
                            fecha_inicio)  # Convierte la fecha de inicio a objeto datetime.
    if fecha_fin:
        # Convierte la fecha de fin a objeto datetime.
        fecha_fin = datetime(*fecha_fin)
    else:
        # Si no se proporciona, utiliza la fecha actual.
        fecha_fin = datetime.now()
    # Calcula la diferencia en días entre las fechas.
    delta = fecha_fin - fecha_inicio
    # Genera un día aleatorio dentro del rango.
    dia_random = randint(0, delta.days)
    # Retorna la fecha aleatoria.
    return fecha_inicio + timedelta(days=dia_random)


class Logger:
    """
    Utilidad para imprimir mensajes con formato y colores en la terminal.
    """

    @classmethod
    def title(self, str):
        """
        Imprime un título formateado con color cian.

        Args:
            str (str): Texto del título.
        """
        print(f'\033[1;36m{str}:\033[0m')

    @classmethod
    def body(self, str, end=False, success=True):
        """
        Imprime el cuerpo de un mensaje con formato dinámico.

        Args:
            str (str): Mensaje a imprimir.
            end (bool, optional): Si es True, el mensaje se imprime como final.
                                  Si es False, mantiene el cursor en la misma línea. 
                                  Por defecto es False.
            success (bool, optional): Indica si el mensaje final representa éxito (True)
                                       o fallo (False). Por defecto es True.
        """
        final = '...'
        if end:
            # Si es el final, limpia la línea anterior y agrega éxito o fallo.
            end = '\n'
            self.clean()
            if success:
                final += ' \033[1;32mOK\033[0m'  # Mensaje de éxito.
            else:
                final += ' \033[1;31mFAIL\033[0m'  # Mensaje de fallo.
        else:
            end = '\r'  # Mantiene el cursor en la misma línea.
        print(f'  {str} {final}', end=end)  # Imprime el mensaje formateado.

    @classmethod
    def clean(self):
        """
        Limpia la línea actual en la terminal.
        """
        print('', end='\r')
