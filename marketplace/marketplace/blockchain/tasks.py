import logging
import traceback

import requests

from ..market.models import SellableObject
from .celery import app
from .models import Transaction, ConfirmedTransaction
from ..market.models import SellableObject
from ..market.models import CustomUser as User
from decimal import Decimal

@app.task
def create_transaction(buyer, seller, amount, item):
    buyer = User.objects.get(pk=buyer)
    seller = User.objects.get(pk=seller)
    amount = Decimal(amount)
    item = SellableObject.objects.get(pk=item)
    ta = Transaction(buyer=buyer, seller=seller, amount=amount, item=item)
    ta.save()
    try:  # try to get block with transaction
        r = requests.post(
            "http://localhost:5000/transactions/new",
            json={
                "sender": buyer.username,
                "recipient": seller.username,
                "amount": str(amount),
                "item": str(item.id)
            }
        )
        if r.status_code != 201:
            raise ValueError("New transaction creating error response")

        r = requests.get("http://localhost:5000/mine")
        if r.status_code != 200:
            raise ValueError("Mining block error")
    except Exception as e:
        ta.delete()
        raise Exception

    return ta.id


@app.task
def confirm_transaction(result_ta_id, buyer, seller, amount, item):
    ta = Transaction.objects.get(pk=result_ta_id)
    ta.delete()
    buyer = User.objects.get(pk=buyer)
    seller = User.objects.get(pk=seller)
    amount = Decimal(amount)
    item = SellableObject.objects.get(pk=item)
    item.owner = buyer
    ta = ConfirmedTransaction(buyer=buyer, seller=seller, amount=amount, item=item)
    ta.save()
