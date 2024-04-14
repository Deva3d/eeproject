from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    path('',views.index,name='index'),
    path('create.html',views.create,name='create'),
    path('join.html',views.join,name='join'),
    path('vote.html',views.vote,name='vote'),
    path('api/create_room/', views.create_room, name='create_room'),
    path('api/check_room/', views.check_room, name='check_room'),
]