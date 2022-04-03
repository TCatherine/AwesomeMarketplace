from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class CustomUser(AbstractUser):
    is_2fa_enabled = models.BooleanField(default=False)
    balance = models.IntegerField(null=False, blank=False, default=0)

class SellableObject(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(max_length=1000, default='unknown')
    creation_date = models.DateTimeField(null=False, blank=False, default=timezone.now)
    last_updated = models.DateTimeField(null=False, blank=False, default=timezone.now)
    # TODO: don't forget about negatives
    price = models.IntegerField(null=False, blank=False, default=0)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default="")
    is_sale = models.BooleanField(default=False)


class ImageObject(SellableObject):
    public_image = models.ImageField(upload_to='public_images/', null=True, max_length=300)
    private_image = models.ImageField(upload_to='private_images/', null=True, max_length=300)

    class Meta:
        db_table = 'Images'

