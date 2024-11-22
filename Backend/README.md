# Guía para Configurar y Ejecutar el Proyecto

Este documento describe los pasos necesarios para configurar y ejecutar este proyecto en un entorno local. **Nota:** Las instrucciones están enfocadas para sistemas Windows utilizando **Git Bash** como terminal.

---

## 1. Crear y Activar Entorno Virtual

### Paso 1: Crear el entorno virtual
Antes de crear el entorno virtual, sigue estas recomendaciones:
#### 1. Si estás trabajando en la raíz del proyecto:
Asegúrate de añadir un archivo `.gitignore` para evitar que el entorno virtual sea incluido en el control de versiones. Añade las siguientes líneas al archivo `.gitignore` si aún no está configurado:
```bash
.gitignore
venv/
```
#### 2. Ya hay un archivo .gitignore en la carpeta Backend/:
Crea el entorno virtual en la misma carpeta donde se encuentra el `.gitignore` para mantener la estructura organizada.

Luego, crea el entorno virtual ejecutando el siguiente comando: 
```bash
python -m venv venv
```
*Requiere Python 3.10 o mayor*

### Paso 2: Activar el entorno virtual
Para activar el entorno virtual usando **Git Bash**, ejecuta:  
```bash
source venv/Scripts/activate
```

Si usas otra terminal como **Command Prompt** o **PowerShell**, los comandos para activar serán diferentes:  
- **Command Prompt**:  
```bash
venv\Scripts\activate
```
- **PowerShell**:  
```bash
.\venv\Scripts\Activate.ps1
```

---

## 2. Instalar Dependencias

Asegúrate de estar en la misma carpeta que el archivo `requirements.txt`. Es decir, dentro de `Backend/`. Luego, instala las dependencias con:  
```bash
pip install -r requirements.txt
```

Este comando instalará todos los paquetes necesarios para el proyecto.

---

## 3. Configuración de la Base de Datos

### Paso 1: Crear las migraciones
Ejecuta el siguiente comando para generar los archivos de migración:  
```bash
python manage.py makemigrations
```

### Paso 2: Aplicar las migraciones
Aplica las migraciones a la base de datos con:  
```bash
python manage.py migrate
```

---

## 4. Crear un Usuario Administrador

Para poder acceder al panel de administración, crea un superusuario ejecutando:  
```bash
python manage.py createsuperuser
```

Sigue las instrucciones que aparecerán en la terminal para asignar un nombre de usuario, correo electrónico y contraseña.

---

## 5. Ejecutar el Servidor de Desarrollo

Por último, inicia el servidor de desarrollo con:  
```bash
python manage.py runserver
```

Se puede al proyecto en tu navegador en las dirección predeterminadas: 

[http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/) o [http://localhost:8000/admin/](http://localhost:8000/admin/)

[http://127.0.0.1:8000/negocio/api/v1/sucursal/](http://127.0.0.1:8000/negocio/api/v1/sucursal/) o [http://localhost:8000/negocio/api/v1/sucursal/](http://localhost:8000/negocio/api/v1/sucursal/)


---

## Notas Finales

- Si encuentras problemas, asegúrate de estar trabajando dentro del entorno virtual activado.
- Puedes desactivar el entorno virtual en cualquier momento con:  
  ```bash
  deactivate
  ```
- Para realizar cambios adicionales en el modelo o en la configuración, recuerda repetir los pasos de **makemigrations** y **migrate**.
