from django.contrib import admin
from .models import *

admin.site.register(Supplier)
admin.site.register(Ingredient)
admin.site.register(MenuItem)
admin.site.register(Recipe)
admin.site.register(Production)
admin.site.register(Sale)
admin.site.register(Waste)
admin.site.register(InventoryTransaction)
admin.site.register(Purchase)
admin.site.register(PurchaseItem)
admin.site.register(Expense)