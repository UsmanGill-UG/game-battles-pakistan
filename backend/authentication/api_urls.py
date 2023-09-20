from django.urls import path

from .views import SignUpAPIView, SignInAPIView, LogOutAPIView

urlpatterns = [
    path('signup/', SignUpAPIView.as_view(), name='signup_api'),
    path('signin/', SignInAPIView.as_view(), name='signin_api'),
    path('signout/', LogOutAPIView.as_view(), name='logout_api'),
]
