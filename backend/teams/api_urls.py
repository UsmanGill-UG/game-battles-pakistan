from django.urls import path

from .views import (JoinTeamAPI, TeamListViewAPI, LeaveTeamAPI, TeamCreateViewAPI, TeamRetrieveAPIView,
                    MyOwnedTeamsList)

urlpatterns = [
    path('', TeamListViewAPI.as_view(), name='team_list_api'),
    path('join/', JoinTeamAPI.as_view(), name='join_team_api'),
    path('leave/', LeaveTeamAPI.as_view(), name='leave_team_api'),
    path('create/', TeamCreateViewAPI.as_view(), name='team_create_api'),
    path('<int:pk>/', TeamRetrieveAPIView.as_view(), name='team_detail'),
    path('owned_teams/', MyOwnedTeamsList.as_view(), name='my-owned-teams'),
]
