from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    IngredientViewSet,
    MenuItemViewSet,
    ProductionViewSet,
    SaleViewSet,
    DashboardView,
    WasteViewSet,
    ExpenseViewSet,
    SupplierViewSet,
    PurchaseViewSet,
    PurchaseItemViewSet,
    RegisterView
)

router = DefaultRouter()

router.register("ingredients", IngredientViewSet, basename="ingredient")
router.register("menu-items", MenuItemViewSet, basename="menuitem")
router.register("productions", ProductionViewSet, basename="production")
router.register("sales", SaleViewSet, basename="sale")
router.register("wastes", WasteViewSet, basename="waste")
router.register("expenses", ExpenseViewSet, basename="expense")
router.register("suppliers", SupplierViewSet, basename="supplier")
router.register("purchases", PurchaseViewSet, basename="purchase")
router.register("purchase-items", PurchaseItemViewSet, basename="purchaseitem")

urlpatterns = [
    *router.urls,

    path(
        "dashboard/",
        DashboardView.as_view(),
        name="dashboard"
    ),

    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),
]