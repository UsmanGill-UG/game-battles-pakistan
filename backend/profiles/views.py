from django.contrib.auth.models import User
from django.views.generic.detail import DetailView


class UserProfileView(DetailView):
    model = User
    template_name = 'profile.html'
    context_object_name = 'user'

    def get_object(self):
        return self.request.user

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = User.objects.filter(pk=self.request.user.pk).prefetch_related('created_teams', 'teams_joined').first()
        context.update({
            'created_teams': user.created_teams.all(),
            'teams_joined': user.teams_joined.all()
        })
        return context
