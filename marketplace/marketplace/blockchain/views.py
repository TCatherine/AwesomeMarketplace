from http import HTTPStatus

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .tasks import create_transaction, confirm_transaction
from django.http import HttpResponse, JsonResponse
from ..market.models import SellableObject
from ..market.models import CustomUser as User
from ..blockchain.models import Transaction
from django.conf import settings

import requests

class GetUserTransactions(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        r = requests.get(
            "http://" + settings.BLOCKCHAIN_HOST + ":5000/chain/" + User.objects.get(pk=pk).username
        )
        if r.status_code != 200:
            raise ValueError("Error occures while getting chain")

        return HttpResponse(r.content, content_type="application/json")

class GetChainView(APIView):

    def get(self, request):
        r = requests.get(
            "http://" + settings.BLOCKCHAIN_HOST + ":5000/chain"
        )
        if r.status_code != 200:
            raise ValueError("Error occures while getting chain")

        return HttpResponse(r.content, content_type="application/json")


# TEST
class DealView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        # creating sellable object with apply async and check callback works
        buyer_id = request.user.id
        # item_id = request.data["item_id"]
        item_id = pk
        item = SellableObject.objects.get(pk=item_id)
        seller_id = item.owner.id
        amount = item.price

        if not item.is_sale:
            return JsonResponse({}, status=HTTPStatus.NOT_FOUND)

        if seller_id == buyer_id:
            return JsonResponse({'error': "Its your item, skip transaction"}, status=HTTPStatus.BAD_REQUEST)

        if request.user.balance < item.price:
            return JsonResponse({'error': "Not enough money"}, status=HTTPStatus.BAD_REQUEST)

        # Check if user already in transaction, don't do separate transactions at the same time
        try:
            Transaction.objects.get(buyer=request.user)
            return JsonResponse({'error': "You can perform only one transaction at time, please wait!"},
                                status=HTTPStatus.CONFLICT)
        except Transaction.DoesNotExist:
            pass

        create_transaction.apply_async((buyer_id, seller_id, amount, item_id),
                                       link=confirm_transaction.s())
        return JsonResponse({'error': "Transaction initiated"}, status=HTTPStatus.OK)
