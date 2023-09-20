from django.urls import path

from .views import TeamCreateView, TeamListView, TeamDetailView, JoinTeamView, LeaveTeamView

app_name = 'teams'

urlpatterns = [
    path('create/', TeamCreateView.as_view(), name='team_create'),
    path('list/', TeamListView.as_view(), name='team_list'),
    path('detail/<int:pk>/', TeamDetailView.as_view(), name='team_detail'),
    path('detail/<int:team_id>/join/', JoinTeamView.as_view(), name='join_team'),
    path('teams/<int:pk>/leave/', LeaveTeamView.as_view(), name='team_leave'),
]
