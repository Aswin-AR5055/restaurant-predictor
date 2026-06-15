from decimal import Decimal

from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.exceptions import ValidationError

from .models import *

@receiver(post_save, sender=Production)
def deduct_inventory(sender, instance, created, **kwargs):
    if not created:
        return
    with transaction.atomic():
        recipes = Recipe.objects.filter(
            menu_item=instance.menu_item
        )

        for recipe in recipes:

            required_qty = (
                recipe.quantity_required
                * Decimal(instance.quantity_prepared)
            )

            ingredient = recipe.ingredient

            ingredient.current_stock -= required_qty
            Ingredient.save()

            if ingredient.current_stock < required_qty:
                raise ValidationError(
                    f"Insufficient stock for {ingredient.name}"
                )

            InventoryTransaction.objects.create(
                ingredient=ingredient,
                transaction_type="USAGE",
                quantity=required_qty,
                transaction_date=instance.date,
                remarks=f"Production #{instance.id}"
            )