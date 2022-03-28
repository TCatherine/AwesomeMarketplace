from django.contrib import admin
from .models import CustomUser, MusicObject, ImageObject, SellableObject
from .forms import CustomUserCreationForm, MusicObjectForm, ImageObjectForm
from django.contrib.auth.admin import UserAdmin
from django.contrib.admin import ModelAdmin
from django.db import models
from django import forms

@admin.register(SellableObject)
class SellableObjectAdmin(admin.ModelAdmin):
    pass


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    add_form = CustomUserCreationForm

    fieldsets = (
        *UserAdmin.fieldsets, (
            '2FA enabled', {
                'fields': (
                    'is_2fa_enabled',
                )
            }
        )
    )

class ImageObjectAdmin(ModelAdmin):
    model = ImageObject
    add_form = ImageObjectForm



class MusicObjectAdmin(ModelAdmin):
    model = MusicObject
    add_form = MusicObjectForm



admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(ImageObject, ImageObjectAdmin)
admin.site.register(MusicObject, MusicObjectAdmin)
