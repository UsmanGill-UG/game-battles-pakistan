from profiles.serializers import UserSerializer
from rest_framework import serializers
from teams.models import Team
from teams.serializers import TeamSerializer
from games.serializers import IndividualGameSerializer
from games.models import Game

from .models import Tournament


class TournamentSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    teams_registered = TeamSerializer(many=True, read_only=True)
    game = IndividualGameSerializer(read_only=True)

    class Meta:
        model = Tournament
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        return Tournament.objects.create(owner=user, **validated_data)


class RegistrationSerializer(serializers.Serializer):
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())
    tournament_id = serializers.PrimaryKeyRelatedField(queryset=Tournament.objects.all())

    def create(self, validated_data):
        team = validated_data['team_id']
        tournament = validated_data['tournament_id']
        request = self.context.get('request')

        if team.owner != request.user:
            raise serializers.ValidationError({"message": "You are not authorized to register this team."})

        if tournament.teams_registered.filter(id=team.id).exists():
            raise serializers.ValidationError({"message": "This team is already registered to the tournament."})

        tournament.teams_registered.add(team)
        tournament.save()

        return {"message": "Team successfully registered to the tournament."}


class LeaveTournamentSerializer(serializers.Serializer):
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())
    tournament_id = serializers.PrimaryKeyRelatedField(queryset=Tournament.objects.all())

    def validate(self, attrs):
        team = attrs['team_id']
        tournament = attrs['tournament_id']
        request = self.context.get('request')

        if team.owner != request.user:
            raise serializers.ValidationErrorx({"message": "You are not authorized to unregister this team."})

        if not tournament.teams_registered.filter(id=team.id).exists():
            raise serializers.ValidationError({"message": "This team is not registered for the tournament."})

        return attrs

    def save(self):
        team = self.validated_data['team_id']
        tournament = self.validated_data['tournament_id']
        tournament.teams_registered.remove(team)
        tournament.save()
        return {"message": "Team successfully left the tournament."}
