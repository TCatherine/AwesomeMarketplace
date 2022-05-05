from http import HTTPStatus

from django.shortcuts import redirect
from django.http import JsonResponse, HttpResponse
from rest_framework.views import APIView
from rest_framework import generics

from .models import ImageObject, CustomUser as User

from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import SetImageObjectSerializer, ShowPublicImageObjectSerializer, \
    ShowPrivateImageObjectSerializer, ChangeStatusSerializer, ChangeImageObjectSerializer


class GetPublicImageUrl(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, pk):
        try:
            url = ShowPublicImageObjectSerializer(ImageObject.objects.get(pk=pk), context={'request': request}).data['public_image']
        except:
            return JsonResponse({'error': 'No such item exist'})

        return JsonResponse({'public_image': url})


class SetImageObjectView(generics.CreateAPIView):
    queryset = ImageObject.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = SetImageObjectSerializer


class ShowPublicImageCatalogView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, pk=None):
        batch_num = int(request.data['batch_num'])
        number = int(request.data['number'])
        try:
            images = ImageObject.objects.filter(is_sale=True)
        except:
            return JsonResponse({'objects': 'Error'})

        images_list = [ShowPublicImageObjectSerializer(im, context={'request': request}).data
                       for im in images[batch_num*number:(batch_num+1)*number]]

        for img in images_list:
            try:
                img['owner'] = User.objects.get(pk=img['owner']).username
            except User.DoesNotExist:
                pass

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

        for img in images_list:
            img['private_image'] = img['private_image'].replace('private_images', 'private_access')

        return JsonResponse({'objects': images_list})

class ChangeStatusView(generics.UpdateAPIView):
    queryset = ImageObject.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangeStatusSerializer


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


class ChangeImageInfoView(generics.UpdateAPIView):
    queryset = ImageObject.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangeImageObjectSerializer


class ServePrivateImages(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, name):
        try:
            found = False
            images = ImageObject.objects.filter(owner=request.user)
            for img in images:
                if ShowPrivateImageObjectSerializer(img, context={'request': request})\
                        .data['private_image'].endswith('/store/private_images/' + name):
                    found = True
                    break
            if not found:
                return JsonResponse({}, status=HTTPStatus.FORBIDDEN)
            response = HttpResponse()
            response['X-Accel-Redirect'] = '/store/private_images/' + name
            response['Content-Type'] = 'image/' + name.split('.')[-1]
            return response
        except ImageObject.DoesNotExist:
            return JsonResponse({"error": '/store/private_images/' + name}, status=HTTPStatus.NOT_FOUND)
