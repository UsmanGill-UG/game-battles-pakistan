from django import forms
from django.shortcuts import redirect, get_object_or_404
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView
from games.models import Game
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from teams.models import Team

from .models import Tournament
from .serializers import TournamentSerializer, RegistrationSerializer, LeaveTournamentSerializer


class TournamentForm(forms.ModelForm):
    game = forms.ModelChoiceField(queryset=Game.objects.all())

    class Meta:
        model = Tournament
        fields = ['name', 'game', 'prize']


class TournamentCreateView(CreateView):
    model = Tournament
    template_name = 'create_tournament.html'
    form_class = TournamentForm
    success_url = reverse_lazy('tournaments:tournament_list')

    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['games'] = Game.objects.all()
        return context


class TournamentListView(ListView):
    model = Tournament
    template_name = 'tournament_list.html'
    context_object_name = 'tournaments'


class TournamentDetailView(DetailView):
    model = Tournament
    template_name = 'tournament_detail.html'
    context_object_name = 'tournament'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user_teams'] = Team.objects.filter(owner=self.request.user)
        return context

    def post(self, request, *args, **kwargs):
        team_id = request.POST.get('team_id')
        team = get_object_or_404(Team, id=team_id, owner=self.request.user)
        self.get_object().teams_registered.add(team)
        return redirect('tournaments:tournament_detail',
                        pk=self.get_object().id)


class TournamentCreateListViewAPI(ListCreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer


class RegistrationViewAPI(APIView):

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data, context={"request": request})

        if serializer.is_valid():
            result = serializer.save()
            return Response(result, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LeaveTournamentView(APIView):
    def post(self, request):
        serializer = LeaveTournamentSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            response_data = serializer.save()
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TournamentRetrieveAPIView(RetrieveAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
