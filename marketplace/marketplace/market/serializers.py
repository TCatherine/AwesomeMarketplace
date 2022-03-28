from rest_framework import serializers
from .models import ImageObject, MusicObject

from rest_framework.test import APIRequestFactory

factory = APIRequestFactory()
request = factory.get('/')


class ImageObjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ImageObject
        fields = ['id', 'name', 'creation_date', 'last_updated',
                  'price', 'owner', 'object', 'is_sale']
    @staticmethod
    def serialize_order(order):
        print(order)
        return {
            'name': order.name,
            'creation_date': order.creation_date,
            'last_updated': order.last_updated,
            'price': order.price,
            'object': str(order.object),
            'owner': order.owner,
            'is_sale': order.is_sale
        }


class MusicObjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MusicObject
        fields = ['id', 'name', 'creation_date', 'last_updated',
                  'price', 'owner', 'object', 'is_sale']