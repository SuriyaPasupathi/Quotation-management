from django.contrib import admin
from .models import User, Supplier, Product, SupplierProduct

admin.site.register(User)
admin.site.register(Supplier)
admin.site.register(Product)
admin.site.register(SupplierProduct)
