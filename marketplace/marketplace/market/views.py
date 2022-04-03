from django.shortcuts import redirect
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import generics


from .models import ImageObject

from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import SetImageObjectSerializer, ShowPublicImageObjectSerializer, ShowPrivateImageObjectSerializer


class SetImageObjectView(generics.CreateAPIView):
    queryset = ImageObject.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = SetImageObjectSerializer


class ShowPublicImageCatalogView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, pk=None):
        batch_num = int(request.data['batch num'])
        number = int(request.data['number'])
        try:
            images = ImageObject.objects.filter(is_sale=True)
        except:
            return JsonResponse({'objects': 'Error'})

        images_list = [ShowPublicImageObjectSerializer(im, context={'request': request}).data
                       for im in images[batch_num*number:(batch_num+1)*number]]
        return JsonResponse({'objects': images_list})

class ShowPrivateImageCatalogView(APIView):
    queryset = ImageObject.objects.all()
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk=None):
        try:
            images = ImageObject.objects.filter(owner=request.user)
        except:
            return JsonResponse({'objects': 'Error'})
        images_list = [ShowPrivateImageObjectSerializer(im, context={'request': request}).data for im in images]
        return JsonResponse({'objects': images_list})

class DealView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        # redirect to view from blockchain app
        return redirect('do deal', pk=pk)


class UserTransactionsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        # redirect to view from blockchain app
        return redirect('get user transactions', pk=pk)
