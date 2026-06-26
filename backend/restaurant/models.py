from django.db import models

class Supplier(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return self.name
    
class Ingredient(models.Model):
    UNIT_CHOICES = [
        ('kg', 'Kilogram'),
        ('G', 'Gram'),
        ('L', 'Liter'),
        ('ML', 'Milliliter'),
        ('PCS', 'Pieces'),
    ]

    name = models.CharField(max_length=100, unique=True)
    unit = models.CharField(max_length=10, choices=UNIT_CHOICES)
    current_stock = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    minimum_stock = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cost_per_unit = models.DecimalField(max_digits=10, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class MenuItem(models.Model):
    CATEGORY_CHOICES = [
        ("BREAKFAST", "Breakfast"),
        ("LUNCH", "Lunch"),
        ("DINNER", "Dinner"),
        ("SNACK", "Snack"),
        ("DRINK", "Drink"),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="LUNCH")
    cost_price = models.DecimalField(max_digits=10, decimal_places=2)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Recipe(models.Model):
    menu_item = models.ForeignKey(
        MenuItem,
        on_delete=models.CASCADE,
        related_name="recipes"
    )

    ingredient = models.ForeignKey(
        Ingredient,
        on_delete=models.CASCADE
    )

    quantity_required = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    class Meta:
        unique_together = ("menu_item", "ingredient")

    def __str__(self):
        return f"{self.menu_item.name} -> {self.ingredient.name}"
    
class Production(models.Model):
    menu_item = models.ForeignKey(
        MenuItem, 
        on_delete=models.CASCADE
    )

    date = models.DateField()

    quantity_prepared = models.PositiveIntegerField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.menu_item.name}, ({self.date})"

class Sale(models.Model):
    menu_item = models.ForeignKey(
        MenuItem, 
        on_delete=models.CASCADE
    )
    date = models.DateField()

    quantity_sold = models.PositiveIntegerField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.menu_item.name} Sold"
    
class Waste(models.Model):
    REASON_CHOICES = [
        ("UNSOLD", "Unsold"),
        ("BURNT", "Burnt"),
        ("SPOILED", "Spoiled"),
        ("RETURNED", "Returned"),
    ]

    menu_item = models.ForeignKey(
        MenuItem,
        on_delete=models.CASCADE
    )

    date = models.DateField()

    quantity_wasted = models.PositiveIntegerField()

    reason = models.CharField(
        max_length=20,
        choices=REASON_CHOICES
    )

    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.menu_item.name} Waste"
    
class InventoryTransaction(models.Model):
    TRANSACTION_CHOICES = [
        ("PURCASE", "Purchase"),
        ("USAGE", "Usage"),
        ("WASTE", "Waste"),
        ("ADJUSTMENT", "Adjustment"),
    ]

    ingredient = models.ForeignKey(
        Ingredient,
        on_delete=models.CASCADE
    )

    transaction_type = models.CharField(
        max_length=20,
        choices=TRANSACTION_CHOICES
    )

    quantity = models.DecimalField(
        max_digits=20,
        decimal_places=2
    )

    transaction_date = models.DateField()
    
    remarks = models.TextField(blank=True)

    created_at = models.DateTimeField(
        auto_now_add=True
    )
    
    def __str__(self):
        return f"{self.ingredient.name} - {self.transaction_type}"

class Purchase(models.Model):
    supplier = models.ForeignKey(
        Supplier,
        on_delete=models.CASCADE
    )

    purchase_date = models.DateField()

    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    def __str__(self):
        return f"Purchase #{self.id}"

class PurchaseItem(models.Model):
    purchase = models.ForeignKey(
        Purchase,
        on_delete=models.CASCADE,
        related_name="items"
    )

    ingredient = models.ForeignKey(
        Ingredient,
        on_delete=models.CASCADE
    )

    quantity = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    unit_price = models.DecimalField(
        max_digits=20,
        decimal_places=2
    )

    def __str__(self):
        return self.ingredient.name
    
class Expense(models.Model):
    EXPENSE_TYPES = [
        ("RENT", "Rent"),
        ("SALARY", "Salary"),
        ("GAS", "Gas"),
        ("ELECTRICITY","Electricity"),
        ("WATER", "Water"),
        ("INTERNET", "Internet"),
        ("OTHER", "Other"),
    ]

    expense_type = models.CharField(
        max_length=20,
        choices = EXPENSE_TYPES
    )

    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    expense_date = models.DateField()

    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.expense_type} - ₹{self.amount}"
    
@property
def waste(self):
    sold = Sale.objects.filter(
        menu_item = self.menu_item,
        date=self.date
    ).first()

    if sold:
        return self.quantity_prepared - sold.quantity_sold
    
    return self.quantity_prepared