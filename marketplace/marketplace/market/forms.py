from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser
from django.db import models
from django.forms import ModelForm

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = '__all__'

class ImageObjectForm(forms.Form):
    class Meta:
        model = models.Model
        fields = '__all__'

class MusicObjectForm(forms.Form):
    class Meta:
        model = models.Model
        fields = '__all__'