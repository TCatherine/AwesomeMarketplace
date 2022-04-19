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
    item = SellableObject.objects.get(pk=item_id)
    ta = Transaction(buyer=buyer, seller=seller, amount=amount, item=item)
    ta.save()
    buyer.last_transaction_id = ta.id
    buyer.save(update_fields=['last_transaction_id'])
    buyer.balance -= item.price
    seller.balance += item.price
    try:  # try to get block with transaction
        r = requests.post(
            "http://" + settings.BLOCKCHAIN_HOST + ":5000/transactions/new",
            json={
                "sender": buyer.username,
                "recipient": seller.username,
                "amount": str(amount),
                "item": str(item.id)
            }
        )
        if r.status_code != 201:
            raise ValueError("New transaction creating error response")

        r = requests.get("http://" + settings.BLOCKCHAIN_HOST + ":5000/mine")
        if r.status_code != 200:
            raise ValueError("Mining block error")
    except Exception as e:
        raise Exception

    buyer.save(update_fields=['balance'])
    seller.save(update_fields=['balance'])
    return ta.id


@app.task
def confirm_transaction(ta_id):
    ta = Transaction.objects.get(pk=ta_id)
    item = SellableObject.objects.get(pk=ta.item.id)
    item.owner = ta.buyer
    item.is_sale = False
    cta = ConfirmedTransaction(id=ta.id, buyer=ta.buyer.id, seller=ta.seller.id, amount=ta.amount, item=ta.item)
    item.save(update_fields=['owner', 'is_sale'])
    cta.save()
    ta.delete()
