from django.contrib import admin
from .models import User, Supplier, Product, SupplierProduct
from django.contrib.auth.admin import UserAdmin
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django import forms
import csv
import pandas as pd
from io import TextIOWrapper, BytesIO

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active')
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role',)}),
    )
class ProductUploadForm(forms.Form):
    file = forms.FileField()

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['product_id', 'name']
    search_fields = ['name']
    actions = ['upload_products']

    def upload_products(self, request, queryset):
        if request.method == 'POST':
            form = ProductUploadForm(request.POST, request.FILES)
            if form.is_valid():
                file = request.FILES['file']
                try:
                    # Handling CSV files
                    if file.name.endswith('.csv'):
                        data = TextIOWrapper(file.file, encoding='utf-8')
                        csv_data = csv.reader(data)
                        next(csv_data)  # Skip header row
                        for row in csv_data:
                            Product.objects.create(
                                name=row[0],
                                description=row[1]
                            )
                    
                    # Handling Excel files
                    elif file.name.endswith('.xlsx'):
                        df = pd.read_excel(file)
                        for index, row in df.iterrows():
                            Product.objects.create(
                                name=row['name'],
                                description=row['description']
                            )

                    self.message_user(request, "Products successfully uploaded.")
                    return redirect('..')
                except Exception as e:
                    self.message_user(request, f"Error uploading file: {e}")
        
        form = ProductUploadForm()
        context = {'form': form}
        return render(request, 'admin/upload_products.html', context)

    upload_products.short_description = "Bulk Upload Products (CSV/Excel)"
    
@admin.register(SupplierProduct)
class SupplierProductAdmin(admin.ModelAdmin):
    list_display = ['supplier', 'product', 'cost', 'inventory_level']  # Displaying inventory_level here
    list_filter = ['supplier']
    search_fields = ['supplier__name', 'product__name']
class SupplierProductInline(admin.TabularInline):
    model = SupplierProduct
    extra = 0
    fields = ['product_id','product',  'cost', 'inventory_level']  # Added 'product_id' here
    readonly_fields = ['product_id','product',  'cost', 'inventory_level']  # Made 'product_id' read-only
    can_delete = False
@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ['name', 'contact_info']
    search_fields = ['name']
    inlines = [SupplierProductInline]
    

admin.site.register(User,CustomUserAdmin)