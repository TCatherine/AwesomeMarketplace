from django.urls import path

# TEST URLS
from . import views

urlpatterns = [
    path('test/', views.Test.as_view(), name='test view'),
]