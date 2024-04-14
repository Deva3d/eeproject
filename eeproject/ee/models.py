from django.db import models

class eedata(models.Model):
    roomcode = models.IntegerField()
    name = models.CharField(max_length=50)
class Room(models.Model):
    room_code = models.IntegerField(unique=True)

class Person(models.Model):
    name = models.CharField(max_length=50)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)  
