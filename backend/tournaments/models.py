from django.contrib.auth.models import User
from django.db import models
from games.models import Game


class Tournament(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    game = models.ForeignKey(Game, on_delete=models.SET_NULL, null=True, blank=True)
    prize = models.CharField(max_length=100)
    teams_registered = models.ManyToManyField('teams.Team', blank=True)

    def __str__(self):
        return self.name
