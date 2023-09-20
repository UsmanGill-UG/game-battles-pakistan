from django.contrib.auth.models import User
from django.db import models


class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_teams')
    members = models.ManyToManyField(User, related_name='teams_joined', blank=True)

    def __str__(self):
        return self.name
