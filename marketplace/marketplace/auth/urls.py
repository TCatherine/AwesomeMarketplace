"""marketplace URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('get-code/', views.obtain_code_token, name='get-code'),
    path('login/', views.obtain_auth_token, name='auth'),
    path('login/refresh/', views.refresh_auth_token, name='refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('verify/', views.verify_auth_token, name='verify'),
    # We use user id (primary key) to change its password, and so to use this option in client side
    # we should take user id from user JWT token
    path('change_password/<int:pk>/', views.ChangePasswordView.as_view(), name='auth_change_password'),
    path('update_profile/<int:pk>/', views.UpdateProfileView.as_view(), name='auth_update_profile'),
]
