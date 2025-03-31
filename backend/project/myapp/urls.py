# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [

    path('login/', views.login_view, name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('upload-products/', views.upload_products, name='upload_products'),
]
