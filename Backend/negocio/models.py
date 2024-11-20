from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

class Provincia(models.Model):
	nombre = models.CharField(max_length=200)
	
	def __str__(self):
		return self.nombre

class Ciudad(models.Model):
	nombre = models.CharField(max_length=200)
	provincia_id = models.ForeignKey(Provincia, on_delete=models.CASCADE, null=True, blank=True)
	def __str__(self):
		return self.nombre
	class Meta:
		verbose_name_plural = "ciudades"
	
class Sucursal(models.Model):
	nombre = models.CharField(max_length=200)
	ciudad_id = models.ForeignKey(Ciudad, on_delete=models.CASCADE, null=True, blank=True)
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
		Rol, on_delete=models.CASCADE, null=True, blank=True)
	sucursal = models.ForeignKey(
		Sucursal, on_delete=models.CASCADE, null=True, blank=True)
	superior = models.ForeignKey(
		'self', on_delete=models.SET_NULL, null=True, blank=True, related_name="subordinados"
	)
	# created_at = models.DateTimeField(default=now)
	updated_at = models.DateTimeField(auto_now=True)
	class Meta:
		verbose_name_plural = "perfiles"
	def __str__(self):
		return self.user.username