from django.urls import path
from .views import RegisterView, LoginView, AdminDashboardView, UserDashboardView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('admin-dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
    path('user-dashboard/', UserDashboardView.as_view(), name='user-dashboard'),
]
