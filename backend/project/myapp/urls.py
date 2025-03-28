from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'suppliers', views.SupplierViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'supplier-products', views.SupplierProductViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
