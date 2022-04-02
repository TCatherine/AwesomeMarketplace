from django.http import HttpResponse
from django.shortcuts import redirect

from .serializers import ImageObjectSerializer
from .models import ImageObject
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated


class SetImageObjectView(APIView):
    def post(self, request):
        permission_classes = (IsAuthenticated,)
        data = request.data
        object = ImageObject.objects.create(
            name=data['name'],
            object=data['file'],
            price=data['price'],
            owner=request.user,
            is_sale=False if (data['is_sale']) == "False" else True
        )
        object.save()
        return HttpResponse("Image successfully created!")


class ShowImageObjectView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, pk=None):
        try:
            image = ImageObject.objects.get(id=pk)
        except:
            return HttpResponse('Error')

        return JsonResponse(ImageObjectSerializer.serialize_order(image))


class ShowImageCatalogView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, pk=None):
        # TODO: start and end pk is good idea, but we need to return image somehow
        # TODO: Do we really need ShowImageObjectView method? It does the same job as this view...
        # TODO: Think about how to access images
        # TODO: Mb front will return back [start;end] range of images and ShowImageObjectView will return bitmap??
        # TODO: And then refactor we need to refactor ShowImageObjectView
        start_pk = int(request.data['start pk'])
        end_pk = int(request.data['end pk'])
        images_list = []
        try:
            for pk in range(start_pk, end_pk + 1):
                image = ImageObject.objects.get(id=pk)
                images_list.append(ImageObjectSerializer.serialize_order(image))
        except:
            return HttpResponse('Error')

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