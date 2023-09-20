from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.views import View
from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import SignUpSerializer, SignInSerializer


class SignUpView(TemplateView):
    template_name = 'signup.html'

    @staticmethod
    def post(request):
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists!')
            return redirect('auth:signup')
        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already exists!')
            return redirect('auth:signup')

        user = User.objects.create_user(username, email, password)
        user.save()
        messages.success(request,
                         'Your account has been created successfully!')
        return redirect('auth:signin')


class SignInView(TemplateView):
    template_name = 'signin.html'

    @staticmethod
    def post(request):
        username = request.POST['username']
        password = request.POST['password']
        if user := authenticate(request, username=username, password=password):
            login(request, user)
            messages.success(request,
                             'You have been logged in successfully!')
            return render(request, 'index.html', {'user': user})
        messages.error(request, 'Invalid credentials!')
        return redirect('home')


class SignOutView(View):
    @staticmethod
    def get(request):
        logout(request)
        messages.success(request, 'You have been logged out successfully!')
        return redirect('home')


class SignUpAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignUpSerializer
    permission_classes = [AllowAny]


class SignInAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = SignInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(request, **serializer.validated_data)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key,
                             "user": f"{user.username}"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)


class LogOutAPIView(APIView):

    def post(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        return Response({"message": f"{request.user.username} logged out successfully."}, status=status.HTTP_200_OK)
