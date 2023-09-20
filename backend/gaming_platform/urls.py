from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

from .views import HomeView, AboutView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', HomeView.as_view(), name='home'),
    path('about/', AboutView.as_view(), name='about'),
    path('auth/', include('authentication.urls')),
    path('teams/', include('teams.urls')),
    path('tournaments/', include('tournaments.urls')),
    path('profiles/', include('profiles.urls')),
    path('games/', include('games.urls')),
    path('api/token/', obtain_auth_token, name='api_token_auth'),
    path('api/games/', include('games.api_urls')),
    path('api/teams/', include('teams.api_urls')),
    path('api/tournaments/', include('tournaments.api_urls')),
    path('api/authentication/', include('authentication.api_urls')),
    path('__debug__/', include('debug_toolbar.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
