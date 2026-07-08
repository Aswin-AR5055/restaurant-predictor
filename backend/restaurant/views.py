from rest_framework import viewsets

from .models import *
from .serializers import *
from .services.dashboard_service import *
from datetime import date

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.contrib.auth.models import User

class DashboardView(APIView):
    def get(self, request):
        user = request.user
        today = date.today()
        revenue = get_today_revenue(today, user)
        expenses = get_today_expenses(today, user)
        waste_cost = get_today_waste_cost(today, user)

        profit = revenue - expenses - waste_cost

        return Response({
            "revenue": revenue,
            "expenses": expenses,
            "waste_cost": waste_cost,
            "profit": profit,
            "top_items": get_top_items(today, user),
            "low_stock": [
                ingredient.name
                for ingredient in get_low_stock(user)
            ]
        })

class IngredientViewSet(viewsets.ModelViewSet):
    serializer_class = IngredientSerializer

    def get_queryset(self):
        return Ingredient.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MenuItemViewSet(viewsets.ModelViewSet):
    serializer_class = MenuItemSerializer

    def get_queryset(self):
        return MenuItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProductionViewSet(viewsets.ModelViewSet):
    serializer_class = ProductionSerializer

    def get_queryset(self):
        return Production.objects.filter(menu_item__user=self.request.user)

class SaleViewSet(viewsets.ModelViewSet):
    serializer_class = SaleSerializer

    def get_queryset(self):
        return Sale.objects.filter(menu_item__user=self.request.user)

class WasteViewSet(viewsets.ModelViewSet):
    serializer_class = WasteSerializer

    def get_queryset(self):
        return Waste.objects.filter(menu_item__user=self.request.user)

class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SupplierViewSet(viewsets.ModelViewSet):
    serializer_class = SupplierSerializer

    def get_queryset(self):
        return Supplier.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PurchaseViewSet(viewsets.ModelViewSet):
    serializer_class = PurchaseSerializer

    def get_queryset(self):
        return Purchase.objects.filter(supplier__user=self.request.user)

class PurchaseItemViewSet(viewsets.ModelViewSet):
    serializer_class = PurchaseItemSerializer

    def get_queryset(self):
        return PurchaseItem.objects.filter(purchase__supplier__user=self.request.user)

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username", "").strip()
        password = request.data.get("password", "").strip()

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)

        User.objects.create_user(username=username, password=password)
        return Response({"message": "Account created successfully."}, status=status.HTTP_201_CREATED)