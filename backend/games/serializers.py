from rest_framework import serializers

from .models import Game


class GameImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField()


class IndividualGameSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    image_path = serializers.CharField(source='image')
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Game
        fields = ['id', 'name', 'image_path']

    def __str__(self):
        return self.name


class GamesSerializer(serializers.Serializer):
    games = IndividualGameSerializer(many=True)

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        if not user.is_superuser:
            raise serializers.ValidationError("You are not authorized to create games!")

        games_data = validated_data['games']
        games = [Game(name=game_data['name'], image=game_data['image']) for game_data in games_data]

        if games:
            Game.objects.bulk_create(games, ignore_conflicts=True)
            return games
        else:
            raise serializers.ValidationError("No new games were created.")
