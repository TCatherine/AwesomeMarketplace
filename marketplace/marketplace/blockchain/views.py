from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .tasks import create_transaction, confirm_transaction
from django.http import HttpResponse
from ..market.models import CustomUser as User
from ..market.models import SellableObject
from django.conf import settings

import requests


class GetChainView(APIView):

    def get(self, request):
        r = requests.get(
            "http://" + settings.BLOCKCHAIN_HOST + ":5000/chain"
        )
        if r.status_code != 200:
            raise ValueError("Error occures while getting chain")

        return HttpResponse(r.content)


# TEST
class Test(APIView):
    permission_classes = (IsAuthenticated,)
    # TODO: add IsAuthenticated
    # TODO: check user money
    def post(self, request):
        # creating sellable object with apply async and check callback works
        buyer = request.user.id
        # user = User.objects.get(pk=request.data["seller_id"])
        item_id = request.data["item_id"]
        item = SellableObject.objects.get(pk=item_id)
        seller = item.owner.id
        amount = item.price
        # TODO: check if user has enougth money to do operation
        # TODO: check if item is_sale and return 404 if not
        create_transaction.apply_async((buyer, seller, amount, item_id),
                                       link=confirm_transaction.s())
        return HttpResponse("Transaction initiated", content_type="text/plain")
