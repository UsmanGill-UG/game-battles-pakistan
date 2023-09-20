from django.shortcuts import redirect, get_object_or_404
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import ListView, DetailView, CreateView
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Team
from .serializers import TeamSerializer, JoinTeamSerializer, LeaveTeamSerializer


class TeamCreateView(CreateView):
    model = Team
    fields = ['name']
    template_name = 'create_team.html'
    success_url = reverse_lazy('teams:team_list')

    def form_valid(self, form):
        form.instance.owner = self.request.user
        response = super().form_valid(form)
        self.object.members.add(self.request.user)
        return response


class TeamListView(ListView):
    model = Team
    template_name = 'team_list.html'
    context_object_name = 'teams'


class TeamDetailView(DetailView):
    model = Team
    template_name = 'team_detail.html'
    context_object_name = 'team'


class JoinTeamView(View):

    def post(self, request, team_id):
        team = Team.objects.get(pk=team_id)
        if not team.members.filter(id=request.user.id).exists():
            team.members.add(request.user)
        return redirect('teams:team_list')


class LeaveTeamView(View):

    def post(self, request, *args, **kwargs):
        team = get_object_or_404(Team, pk=kwargs['pk'])
        team.members.remove(request.user)
        return redirect('teams:team_list')


class TeamCreateViewAPI(CreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    def get_serializer_context(self):
        context = super(TeamCreateViewAPI, self).get_serializer_context()
        context.update({
            'user': self.request.user
        })
        return context


class TeamListViewAPI(ListAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class JoinTeamAPI(APIView):

    def post(self, request):
        serializer = JoinTeamSerializer(data=request.data, context={"request": request})

        if serializer.is_valid():
            result = serializer.save()
            return Response(result, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LeaveTeamAPI(APIView):

    def post(self, request):
        serializer = LeaveTeamSerializer(data=request.data, context={"request": request})

        if serializer.is_valid():
            result = serializer.save()
            return Response(result, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TeamRetrieveAPIView(RetrieveAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class MyOwnedTeamsList(ListAPIView):
    serializer_class = TeamSerializer

    def get_queryset(self):
        return Team.objects.filter(owner=self.request.user)
