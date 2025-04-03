from django.contrib import admin
from .models import User, Supplier, Product, SupplierProduct,Enquiry
from django.contrib.auth.admin import UserAdmin
from django import forms


class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active')
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role',)}),
    )

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['product_id', 'product_name']
    search_fields = ['product_name']
    actions = ['upload_products']





class SupplierProductInline(admin.TabularInline):
    model = SupplierProduct
    extra = 0
    fields = ['product_id','product', 'cost', 'quantity', 'inventory_level']
    readonly_fields = ['product_id','product', 'cost', 'quantity', 'inventory_level','inventory_level']
    can_delete = False

@admin.register(SupplierProduct)
class SupplierProductAdmin(admin.ModelAdmin):
    list_display = ['supplier', 'product', 'cost', 'quantity', 'inventory_level']
    list_filter = ['supplier']
    search_fields = ['supplier__supplier_name', 'product__product_name']
    readonly_fields = ['inventory_level']
  


@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ['supplier_id', 'supplier_name', 'contact_info']
    search_fields = ['supplier_name']
    readonly_fields = ['supplier_id']
    inlines = [SupplierProductInline] 

class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('user', 'products', 'quantity', 'status')
    list_filter = ('status',)
    search_fields = ('products', 'quantity')
    readonly_fields = ('user','products', 'quantity')
    fields = ('products', 'quantity', 'status')

admin.site.register(Enquiry, EnquiryAdmin)



admin.site.register(User,CustomUserAdmin)