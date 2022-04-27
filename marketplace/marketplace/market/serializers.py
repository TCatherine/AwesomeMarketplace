from rest_framework import serializers
from .models import ImageObject

from rest_framework.test import APIRequestFactory

from django.http import JsonResponse

class ShowPublicImageObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageObject
        fields = ['id', 'name', 'creation_date', 'last_updated',
                  'price', 'owner', 'public_image', 'is_sale']

class ShowPrivateImageObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageObject
        fields = ['id', 'name', 'creation_date', 'last_updated',
                  'price', 'owner', 'public_image', 'private_image', 'is_sale']


class SetImageObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageObject
        fields = ['id', 'name', 'creation_date', 'last_updated',
                  'price', 'owner', 'public_image', 'private_image', 'is_sale']

    def validate(self, attrs):
        return attrs

    def create(self, validated_data):
        user = self.context['request'].user
        data = self.context['request'].data
        object = ImageObject.objects.create(
            name=data['name'],
            public_image=data['public image'],
            private_image=data['private image'],
            price=data['price'],
            owner=user,
            is_sale=False if (data['is_sale']) == "False" else True
        )

        object.save()
        return object

class ChangeStatusSerializer(serializers.ModelSerializer):
    is_sale = serializers.BooleanField(default=False)
    class Meta:
        model = ImageObject
        fields = ['id', 'is_sale']

    def validate(self, attrs):
        return attrs

    def update(self, instance, validated_data):
        if instance.owner.id != user.id:
            raise serializers.ValidationError({"owner": "User isn't owner"})

        if instance.is_sale:
            instance.is_sale = False
        else:
            instance.is_sale = True
        instance.save()
        return instance

