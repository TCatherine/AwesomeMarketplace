from django.contrib import admin
from .models import Transaction, ConfirmedTransaction


# Register your models here.
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    pass


@admin.register(ConfirmedTransaction)
class ConfirmedTransactionAdmin(admin.ModelAdmin):
    pass
