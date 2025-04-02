from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.auth import get_user_model

# Custom User Model
class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')

    def _str_(self):
        return self.username

# Supplier Model
class Supplier(models.Model):
    supplier_id = models.AutoField(primary_key=True)
    supplier_name = models.CharField(max_length=255)
    contact_info = models.TextField()

    def __str__(self):
        return self.supplier_name


# Product Model
class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.product_name


# SupplierProduct Model
class SupplierProduct(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name='supplier_products')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=0)

    @property
    def inventory_level(self):
        return "Available" if self.quantity > 0 else "Not Available"

    def __str__(self):
        return f"{self.supplier.supplier_name} - {self.product.product_name}"


User = get_user_model()

class Enquiry(models.Model):
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enquiries')
    product = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
   
    def __str__(self):
        return str(self.user)  # This will display the user in the admin panel (default representation)


# Inventory Model
