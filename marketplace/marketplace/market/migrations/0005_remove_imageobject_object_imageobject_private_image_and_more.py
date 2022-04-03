# Generated by Django 4.0.3 on 2022-04-03 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0004_customuser_balance'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='imageobject',
            name='object',
        ),
        migrations.AddField(
            model_name='imageobject',
            name='private_image',
            field=models.ImageField(max_length=300, null=True, upload_to='private_images/'),
        ),
        migrations.AddField(
            model_name='imageobject',
            name='public_image',
            field=models.ImageField(max_length=300, null=True, upload_to='public_images/'),
        ),
        migrations.DeleteModel(
            name='MusicObject',
        ),
    ]
