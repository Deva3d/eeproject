from django.db import models

class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)

    class Meta:
        app_label = 'myapp'  # Specify the app_label here
