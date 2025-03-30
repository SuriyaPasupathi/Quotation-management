# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.login_view, name='login'),
    path('dashboard/', views.DashboardView.as_view(), name='dashboard'),
]
