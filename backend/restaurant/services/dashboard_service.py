from django.db.models import F, Sum, DecimalField
from django.db.models.functions import Coalesce
from django.db.models import ExpressionWrapper

from restaurant.models import Sale
from restaurant.models import Expense
from restaurant.models import Waste
from restaurant.models import Ingredient

from decimal import Decimal

def get_today_revenue(today):

    amount_expr = ExpressionWrapper(
        F("quantity_sold") *
        F("menu_item__selling_price"),
        output_field=DecimalField(
            max_digits=12,
            decimal_places=2
        )
    )

    revenue = (
        Sale.objects
        .filter(date=today)
        .annotate(amount=amount_expr)
        .aggregate(
            total=Sum("amount")
        )
    )

    return revenue["total"] or 0

def get_today_expenses(today):
    expenses = (
        Expense.objects.filter(expense_date=today).aggregate(
            total=Coalesce(
                Sum("amount"),
                Decimal("0.00"),
                output_field=DecimalField(
                    max_digits=12,
                    decimal_places=2
                )
            )
        )
    )

    return expenses["total"]

def get_today_waste_cost(today):
    
    wastes = Waste.objects.filter(
        date=today
    )

    total = 0

    for waste in wastes:

        total += (
            waste.quantity_wasted * waste.menu_item.cost_price
        )

    return total

def get_top_items(today):
    return (
        Sale.objects.filter(date=today).values("menu_item__name").annotate(
            sold=Sum("quantity_sold")
        )
        .order_by("-sold")[:5]
    )

def get_low_stock():
    return (
        Ingredient.objects.filter(
            current_stock__lte=F("minimum_stock")
        )
    )