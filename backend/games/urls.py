from django.urls import path

from .views import GameListView, GameCreateView

app_name = 'games'

urlpatterns = [
    path('', GameListView.as_view(), name='game_list'),
    path('create/', GameCreateView.as_view(), name='game_create'),
]
