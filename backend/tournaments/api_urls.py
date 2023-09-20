from django.urls import path

from .views import (TournamentCreateListViewAPI, RegistrationViewAPI, TournamentRetrieveAPIView,
                    LeaveTournamentView)

urlpatterns = [
    path('', TournamentCreateListViewAPI.as_view(), name='tournament_create_list_api'),
    path('register_team/', RegistrationViewAPI.as_view(), name='tournament_register_api'),
    path('<int:pk>/', TournamentRetrieveAPIView.as_view(), name='tournament_detail'),
    path('leave/', LeaveTournamentView.as_view(), name='leave-tournament'),
]
