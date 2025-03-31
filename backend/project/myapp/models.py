from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# Custom User Model
class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')

    def _str_(self):
        return self.username



class Supplier(models.Model):
    name = models.CharField(max_length=255)
    contact_info = models.TextField()

    def __str__(self):
        return self.name


# Product Model
# Product Model
class Product(models.Model):
    product_id = models.AutoField(primary_key=True)  # Automatically generated unique ID
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return f"{self.product_id} - {self.name}"  # Displaying product_id with name


# Supplier Product Model
class SupplierProduct(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name='supplier_products')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='supplier_products')
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    inventory_level = models.CharField(max_length=50, blank=True, default='') 

    def __str__(self):
        return f"{self.supplier} - {self.product}"


# Inventory Model
