from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    is_2fa_enabled = models.BooleanField(default=False)

class SellableObject(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(max_length=1000, default='unknown')
    creation_date = models.DateTimeField(null=False, blank=False, default=timezone.now)
    last_updated = models.DateTimeField(null=False, blank=False, default=timezone.now)
    price = models.IntegerField(null=False, blank=False, default=0)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default="")
    is_sale = models.BooleanField(default=False)


class ImageObject(SellableObject):
    object = models.ImageField(upload_to='store/images/', null=True)

    class Meta:
        db_table = 'Images'

class MusicObject(SellableObject):
    object = models.FileField(upload_to ='store/music/', null=True)

    class Meta:
        db_table = 'Music'


