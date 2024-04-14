from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myapp.urls')),
    path('signup/', include('myapp.urls')),
    path('hello/', include('myapp.urls')),
]
