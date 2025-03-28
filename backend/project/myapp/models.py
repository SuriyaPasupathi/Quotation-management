from django.db import models
from django.contrib.auth.models import AbstractUser

# Custom User Model
class User(AbstractUser):
    ROLES = (
        ('admin', 'Admin'),
        ('user', 'User'),
    )
    role = models.CharField(max_length=10, choices=ROLES, default='user')

class Supplier(models.Model):
    name = models.CharField(max_length=255)
    contact_info = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name

class SupplierProduct(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.supplier.name} - {self.product.name}"
