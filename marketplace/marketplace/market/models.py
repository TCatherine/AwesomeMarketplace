from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

# Sellable object - is something sellable in out marketplace
# For example it can be some picture
# Every object has its url, description, price, or something
# TODO: implement necessary objects
class SellableObject(models.Model):
    name = models.CharField(max_length=30, default='no name')


class CustomUser(AbstractUser):
    is_2fa_enabled = models.BooleanField(default=False)

