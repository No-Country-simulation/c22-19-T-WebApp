from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.utils.timezone import now


class Provincia(models.Model):
    nombre = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre


class Ciudad(models.Model):
    nombre = models.CharField(max_length=200)
    provincia = models.ForeignKey(
        Provincia, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name_plural = "ciudades"


class Sucursal(models.Model):
    nombre = models.CharField(max_length=200)
    ciudad = models.ForeignKey(
        Ciudad, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name_plural = "sucursales"


class Rol(models.Model):
    nombre = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "roles"

    def __str__(self):
        return self.nombre


class Perfil(models.Model):
    # Relación One-to-One con el modelo User
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="perfil")
    # Campos adicionales
    rol = models.ForeignKey(
        Rol, on_delete=models.SET_NULL, null=True, blank=True)
    sucursal = models.ForeignKey(
        Sucursal, on_delete=models.SET_NULL, null=True, blank=True)
    superior = models.ForeignKey(
        'self', on_delete=models.SET_NULL, null=True, blank=True, related_name="subordinados"
    )
    # created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "perfiles"

    def __str__(self):
        cadena = self.user.username
        if self.rol:
            cadena += f' [{self.rol.__str__().upper()}]'
        return cadena


class Producto(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    imagen = models.URLField(blank=True, unique=False)
    # imagen = models.ImageField(upload_to='portada')
    #  slug = models.SlugField(max_length=255, unique=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    # in_stock = models.BooleanField(default=True)
    #  objects = models.Manager()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        #  verbose_name = ('Producto')
        verbose_name_plural = ('Productos')

    def __str__(self):
        return self.title


class Venta(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    sucursal = models.ForeignKey(
        Sucursal, on_delete=models.CASCADE, null=True, blank=True, related_name='ventas'
    )
    total = models.DecimalField(max_digits=12, decimal_places=2)
    fecha = models.DateField()
    producto = models.ForeignKey(
        Producto, on_delete=models.CASCADE, null=True, blank=True)

    def clean(self):

        # Se encarga de verificar que el usuario sea de ventas y tenga un sucursal asignada.

        if not self.user:
            raise ValidationError('No hay usuario/perfil asignado')

        if not hasattr(self.user, 'perfil') or not self.user.perfil.rol:
            raise ValidationError('El usuario debe tener un rol asignado')

        if self.user.perfil.rol.nombre.lower() != 'ventas':
            raise ValidationError('Solo los vendedores pueden generar ventas')

        self.sucursal = self.user.perfil.sucursal

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        if self.sucursal.nombre or self.user.username or self.total or self.producto.title:
            return f'{self.producto.title[0:20]}... | ${self.total}'
        return super().__str__()


class Meta(models.Model):
    sucursal = models.ForeignKey(
        Sucursal, on_delete=models.CASCADE, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    create_at = models.DateTimeField(auto_now_add=True)
    semanal = models.DecimalField(max_digits=12, decimal_places=2)
    mensual = models.DecimalField(max_digits=12, decimal_places=2)
    anual = models.DecimalField(max_digits=12, decimal_places=2)