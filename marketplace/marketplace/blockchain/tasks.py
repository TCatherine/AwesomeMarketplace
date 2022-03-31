import logging
import traceback

import requests

from ..market.models import SellableObject
from .celery import app
from .models import Transaction, ConfirmedTransaction
from ..market.models import SellableObject
from ..market.models import CustomUser as User
from decimal import Decimal
from django.conf import settings

@app.task
def create_transaction(buyer, seller, amount, item_id):
    buyer = User.objects.get(pk=buyer)
    seller = User.objects.get(pk=seller)
    amount = Decimal(amount)
    item_id = SellableObject.objects.get(pk=item_id)
    ta = Transaction(buyer=buyer, seller=seller, amount=amount, item=item_id)
    ta.save()
    try:  # try to get block with transaction
        r = requests.post(
            "http://" + settings.BLOCKCHAIN_HOST + ":5000/transactions/new",
            json={
                "sender": buyer.username,
                "recipient": seller.username,
                "amount": str(amount),
                "item": str(item_id.id)
            }
        )
        if r.status_code != 201:
            raise ValueError("New transaction creating error response")

        r = requests.get("http://" + settings.BLOCKCHAIN_HOST + ":5000/mine")
        if r.status_code != 200:
            raise ValueError("Mining block error")
    except Exception as e:
        ta.delete()
        raise Exception

    return ta.id


@app.task
def confirm_transaction(ta_id):
    ta = Transaction.objects.get(pk=ta_id)
    item = SellableObject.objects.get(pk=ta.item.id)
    item.owner = ta.buyer
    cta = ConfirmedTransaction(buyer=ta.buyer.id, seller=ta.seller.id, amount=ta.amount, item=ta.item)
    item.save(update_fields=['owner'])
    cta.save()
    ta.delete()
