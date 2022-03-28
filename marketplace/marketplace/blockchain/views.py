from rest_framework.views import APIView
from .tasks import create_transaction, confirm_transaction
from django.http import HttpResponse
from ..market.models import CustomUser as User
from ..market.models import SellableObject


# TEST
class Test(APIView):
    # TODO: add IsAuthenticated
    # TODO: check user money
    def post(self, request):
        # creating sellable object with apply async and check callback works
        buyer = request.user.id
        # user = User.objects.get(pk=request.data["seller_id"])
        seller = request.user.id
        amount = request.data["amount"]
        item = request.data["item_id"]

        create_transaction.apply_async((buyer, seller, amount, item),
                                       link=confirm_transaction.s(buyer, seller, amount, item))
        return HttpResponse("Transaction initiated", content_type="text/plain")
