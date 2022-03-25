from django.contrib import admin
from .models import CustomUser
from .forms import CustomUserCreationForm
from django.contrib.auth.admin import UserAdmin


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


admin.site.register(CustomUser, CustomUserAdmin)
