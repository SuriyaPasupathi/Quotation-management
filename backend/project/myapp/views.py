from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from rest_framework.decorators import api_view,permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
import pandas as pd
from .models import Product
import csv


User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password)

    if user is not None:
        try:
            refresh = RefreshToken.for_user(user)
            
            role = user.role if hasattr(user, 'role') else 'Student'  # Default to Student if not set

            return Response({
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
                'role': role,
                'message': 'Login successful!'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)



@csrf_exempt
def upload_products(request):
    if request.method == 'POST' :
        file = request.FILES['file']
        
        try:
            if file.name.endswith('.csv'):
                data = pd.read_csv(file)
            elif file.name.endswith('.xlsx'):
                data = pd.read_excel(io.BytesIO(file.read()))  # Use io.BytesIO for Excel files
            else:
                return JsonResponse({'error': 'Unsupported file type'}, status=400)
            
            if 'name' not in data.columns or 'description' not in data.columns:
                return JsonResponse({'error': 'The uploaded file must contain "name" and "description" columns'}, status=400)
            
            for _, row in data.iterrows():
                Product.objects.create(
                    name=row['name'],
                    description=row['description']
                )
            return JsonResponse({'message': 'Products uploaded successfully!'}, status=200)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        
    return JsonResponse({'error': 'Invalid request, no file found.'}, status=400)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh_token")
        
        if not refresh_token:
            return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()  # This line will now work properly

            return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)