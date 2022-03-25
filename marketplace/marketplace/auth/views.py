from django.shortcuts import render

# Create your views here.
from ..market.models import CustomUser as User
from rest_framework.permissions import AllowAny

from . import serializers
from .throttling import CodeTokenThrottler
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt import views as jwt_views


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = serializers.RegisterSerializer


class ChangePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.ChangePasswordSerializer


class UpdateProfileView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.UpdateUserSerializer


class ObtainCodeToken(jwt_views.TokenObtainPairView):
    serializer_class = serializers.CodeTokenSerializer
    throttle_classes = [CodeTokenThrottler]


class ObtainAuthToken(jwt_views.TokenObtainPairView):
    serializer_class = serializers.TokenObtainPairSerializer


class RefreshAuthToken(jwt_views.TokenRefreshView):
    pass


class VerifyAuthToken(jwt_views.TokenVerifyView):
    pass


obtain_code_token = ObtainCodeToken.as_view()
obtain_auth_token = ObtainAuthToken.as_view()
refresh_auth_token = RefreshAuthToken.as_view()
verify_auth_token = VerifyAuthToken.as_view()