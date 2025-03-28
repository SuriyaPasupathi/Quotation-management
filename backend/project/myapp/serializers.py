from rest_framework import serializers
from .models import User, Supplier, Product, SupplierProduct

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class SupplierProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupplierProduct
        fields = '__all__'
