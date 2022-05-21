from http import HTTPStatus

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .tasks import create_transaction, confirm_transaction
from django.http import HttpResponse, JsonResponse
from ..market.models import SellableObject, ImageObject
from ..market.models import CustomUser as User
from ..blockchain.models import Transaction, ConfirmedTransaction
from django.conf import settings
from django.core import serializers
import json

import requests

from ..market.serializers import ShowPublicImageObjectSerializer


class GetUserTransactions(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        # This block getting transactions directly from blockchain.
        # Blockchain miner itself supports this request for now but its better to
        # return transactions from confirmed transactions stash, because miner can be restarted and t/a will be lost
        # r = requests.get(
        #     "http://" + settings.BLOCKCHAIN_HOST + ":5000/transactions/chain/" + User.objects.get(pk=pk).username
        # )
        # if r.status_code != 200:
        #     raise ValueError("Error occures while getting chain")
        # return HttpResponse(r.content, content_type="application/json")

        instance = User.objects.get(pk=pk)
        try:
            users_ta = serializers.serialize("json", ConfirmedTransaction.objects.filter(buyer=instance.id),
                                             fields=("buyer", "seller", "amount", "item"))
        except ConfirmedTransaction.DoesNotExist:
            return JsonResponse({"error": instance.username + " does not has any confirmed transactions"})

        users_ta = json.loads(users_ta)
        users_ta = [ta["fields"] for ta in users_ta]

        for ta in users_ta:
            try:
                ta['buyer'] = User.objects.get(pk=ta['buyer']).username
                ta['seller'] = User.objects.get(pk=ta['seller']).username
                image = ImageObject.objects.get(pk=ta['item'])
                ta['item'] = image.name
                ta['item_url'] = ShowPublicImageObjectSerializer(image, context={'request': request}).data['public_image']
            except (User.DoesNotExist, ImageObject.DoesNotExist) as e:
                pass

        return JsonResponse({"transactions": users_ta})


class GetLastTransactionStatus(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        tid = request.user.last_transaction_id

        if tid == -1:
            return JsonResponse({"Status": "You has no transactions"})
        last_ta = None
        try:
            last_ta = Transaction.objects.get(pk=tid)
        except Transaction.DoesNotExist:
            try:
                last_ta = ConfirmedTransaction.objects.get(pk=tid)
            except ConfirmedTransaction.DoesNotExist:
                return JsonResponse({"Status": "Error"})
            return JsonResponse({"Status": "Success"})
        return JsonResponse({"Status": "In progress"})


class GetChainView(APIView):

    def get(self, request):
        r = requests.get(
            "http://" + settings.BLOCKCHAIN_HOST + ":5000/transactions/chain"
        )
        if r.status_code != 200:
            raise ValueError("Error occures while getting chain")

        return HttpResponse(r.content, content_type="application/json")


# TEST
class DealView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, pk):
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
            return JsonResponse({'Status': "Its your item, skip transaction"}, status=HTTPStatus.BAD_REQUEST)

        if request.user.balance < item.price:
            return JsonResponse({'Status': "Not enough money"}, status=HTTPStatus.BAD_REQUEST)

        # Check if user already in transaction, don't do separate transactions at the same time
        try:
            Transaction.objects.get(buyer=request.user)
            return JsonResponse({'Status': "You can perform only one transaction at time, please wait!"},
                                status=HTTPStatus.CONFLICT)
        except Transaction.DoesNotExist:
            pass

        create_transaction.apply_async((buyer_id, seller_id, amount, item_id),
                                       link=confirm_transaction.s())
        return JsonResponse({'Status': "Transaction initiated"}, status=HTTPStatus.OK)
