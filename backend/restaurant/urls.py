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

router.register("ingredients", IngredientViewSet)
router.register("menu-items", MenuItemViewSet)
router.register("productions", ProductionViewSet)
router.register("sales", SaleViewSet)
router.register("wastes", WasteViewSet)
router.register("expenses", ExpenseViewSet)
router.register("suppliers", SupplierViewSet)
router.register("purchases", PurchaseViewSet)
router.register("purchase-items", PurchaseItemViewSet)

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