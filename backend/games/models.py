from django.db import models


class Game(models.Model):
    name = models.CharField(unique=True, max_length=100)
    image = models.ImageField(upload_to='games/', blank=True, null=True)

    def __str__(self):
        return self.name
