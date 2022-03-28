from rest_framework.views import APIView
from .tasks import create_item
from django.http import HttpResponse


# TEST
class Test(APIView):

    def get(self, request):
        # creating sellable object with apply async and check callback works
        create_item.apply_async(("obj1"))
        return HttpResponse()
