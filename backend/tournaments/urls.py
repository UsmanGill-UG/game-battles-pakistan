from django.urls import path

from .views import (
    TournamentCreateView,
    TournamentDetailView,
    TournamentListView)

app_name = 'tournaments'

urlpatterns = [
    path('create/', TournamentCreateView.as_view(),
         name='tournament_create'),
    path('detail/<int:pk>/', TournamentDetailView.as_view(),
         name='tournament_detail'),
    path('', TournamentListView.as_view(),
         name='tournament_list'),
]
