from django.contrib import admin
from .models import CustomUser, ImageObject, SellableObject
from .forms import CustomUserCreationForm, ImageObjectForm
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
                    'balance',
                    'last_transaction_id'
                )
            }
        )
    )

class ImageObjectAdmin(ModelAdmin):
    model = ImageObject
    add_form = ImageObjectForm


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(ImageObject, ImageObjectAdmin)
