# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [

    path('login/', views.login_view, name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('api/bulk-upload/', views.BulkUploadView.as_view(), name='bulk_upload'),
    path('api/enquiry/', views.enquiry_create, name='create-enquiry'),
    path('api/enquiry-list/', views.enquiry_list, name='enquiry-list'),
    path('api/enquiry/approve/<int:pk>/', views.approve_enquiry),
]
