"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="""
            Documentación de la API dal projecto **No-Country**

            **Nota**: Todas las solicitudes protegidas requieren la cabecera `X-CSRFToken`.

            **Integrantes**:
            - Carolina Acosta | _Backend_ | test@gmail.com
            - Cesar Hernán Ruscica | _Frontend_ | cesarhernanruscica@gmail.com
            - Claudia López Garcidueñas | _UX|UI_ | kyaclo.82@gmail.com
            - Elvin Moreno | _Frontend_ | elvinmoreno2301@gmail.com
            - Ignacio Nava | _Backend_ | nava_ignacio@outlook.com
            - Joel Aguilar | _Backend_ | joelaguilarandres@gmail.com
            - León Mateo Cáceres | _Backend_ | leonmateocaceres705@gmail.com
            - Pedro Tarragó | _Frontend_ | pepoterrax@gmail.com
            - Tomás Villegas | _Frontend_ | tomasvil2125@gmail.com
        """,
        # terms_of_service="https://www.google.com/policies/terms/",
        # contact=openapi.Contact(email="contact@example.com"),
        # license=openapi.License(name="BSD License"),
    ),
    public=False,  # Hace que la documentación no sea pública
    # Solo usuarios administradores pueden verla
    # permission_classes=[permissions.IsAdminUser],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('negocio/', include('negocio.urls')),
    path('user/', include('user.urls')),
    re_path(r'^docs/$', schema_view.with_ui('swagger',
            cache_timeout=0), name='schema-swagger-ui'),
    # re_path(r'^redoc/$', schema_view.with_ui('redoc',
    #         cache_timeout=0), name='schema-redoc'),

]
