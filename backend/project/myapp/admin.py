from django.contrib import admin
from .models import User, Supplier, Product, SupplierProduct
from django.contrib.auth.admin import UserAdmin

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active')
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role',)}),
    )


# Inline Model to show SupplierProduct details under Supplier
class SupplierProductInline(admin.TabularInline):
    model = SupplierProduct
    extra = 0  # Don't show extra blank rows
    fields = ['product', 'cost', 'quantity']
    readonly_fields = ['product', 'cost', 'quantity']
    can_delete = False  # Prevent deletion from this view

@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ['name', 'contact_info']
    search_fields = ['name']
    inlines = [SupplierProductInline]  # Show products as an inline table under Supplier detail page

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
    search_fields = ['name']

@admin.register(SupplierProduct)
class SupplierProductAdmin(admin.ModelAdmin):
    list_display = ['supplier', 'product', 'cost', 'quantity']
    list_filter = ['supplier']
    search_fields = ['supplier__name', 'product__name']
    

admin.site.register(User,CustomUserAdmin)