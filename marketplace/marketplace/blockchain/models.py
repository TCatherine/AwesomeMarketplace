from django.db import models
from ..market.models import CustomUser as User
from ..market.models import SellableObject


# Transaction model
# USAGE:
# This object should be created only when buyer initiated transaction,
# then blockchain should return confirmation - block with information about transaction inside,
# after do this - transaction object should be saved in database as ConfirmedTransaction
class Transaction(models.Model):
    id = models.BigAutoField(primary_key=True)
    buyer = models.ForeignKey(User, on_delete=models.PROTECT, related_name='User_buyer')
    seller = models.ForeignKey(User, on_delete=models.PROTECT, related_name='User_seller')
    amount = models.IntegerField(null=False, blank=False, default=0)
    item = models.ForeignKey(SellableObject, on_delete=models.PROTECT, related_name='SellableObject_item')


class ConfirmedTransaction(models.Model):
    id = models.BigAutoField(primary_key=True)
    buyer = models.CharField(max_length=100)
    seller = models.CharField(max_length=100)
    amount = models.IntegerField(null=False, blank=False, default=0)
    item = models.ForeignKey(SellableObject, on_delete=models.CASCADE)
