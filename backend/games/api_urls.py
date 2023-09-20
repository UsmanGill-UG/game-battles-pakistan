from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import UploadGameImageView, GameViewSet

router = DefaultRouter()
router.register(r'', GameViewSet, basename='game')

# this will create the following urls:
# /api/games/
# if a send get request, it will fetch all games
# if a send post request, it will create a new game
urlpatterns = [
    path('upload_game_image/', UploadGameImageView.as_view(), name='upload_game_image'),
    path('', include(router.urls)),
]
