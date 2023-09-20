from profiles.serializers import UserSerializer
from rest_framework import serializers

from .models import Team


# All details of a team
class TeamSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = '__all__'

    def create(self, validated_data):
        validated_data['owner'] = self.context['user']
        return super(TeamSerializer, self).create(validated_data)


class JoinTeamSerializer(serializers.Serializer):
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), write_only=True)

    def save(self):
        user = self.context['request'].user
        team = self.validated_data['team_id']

        if user in team.members.all():
            return {"message": f"{user.username} is already a member!"}

        team.members.add(user)

        return {"message": f"{user.username} joined team {team.name} successfully!"}


class LeaveTeamSerializer(serializers.Serializer):
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), write_only=True)

    def save(self):
        user = self.context['request'].user
        team = self.validated_data['team_id']

        if user in team.members.all():
            team.members.remove(user)
            return {"message": f"{user.username} left team {team.name} successfully!"}

        return {"message": f"{user.username} is NOT a member!"}

