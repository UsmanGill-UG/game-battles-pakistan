from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.core.files.storage import default_storage
from django.shortcuts import render, redirect
from django.views import View
from django.views.generic import ListView
from rest_framework import status
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Game
from .serializers import GamesSerializer, IndividualGameSerializer


class GameCreateView(LoginRequiredMixin, UserPassesTestMixin, View):
    template_name = 'create_game.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        games = []
        post_items = list(request.POST.items())[1:]  # first item contains csrf token
        file_items = list(request.FILES.items())
        for (key1, game_name), (key2, image) in zip(post_items, file_items):
            game = Game(name=game_name, image=image)
            games.append(game)
        Game.objects.bulk_create(games)
        return redirect('games:game_list')

    def test_func(self):
        return self.request.user.is_superuser


class GameListView(ListView):
    model = Game
    template_name = 'game_list.html'
    context_object_name = 'games'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['total_games'] = Game.objects.count()
        return context


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GamesSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={"request": self.request})
        serializer.is_valid(raise_exception=True)
        games = serializer.save()
        return Response({"message": f"{len(games)} games created successfully!"}, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = IndividualGameSerializer(queryset, many=True)
        return Response({"games": serializer.data})

    def get_serializer_context(self):
        context = super(GameViewSet, self).get_serializer_context()
        context.update({"request": self.request})
        return context


class UploadGameImageView(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request):
        file_obj = request.data['image']
        print('lol', file_obj)
        file_name = default_storage.save(f'games/{file_obj.name}', file_obj)
        file_url = default_storage.url(file_name)

        return Response({'image_path': file_url}, status=status.HTTP_201_CREATED)
