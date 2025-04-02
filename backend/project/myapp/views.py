from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
import pandas as pd
from .models import Product, Supplier,Enquiry
from .serializers import EnquirySerializer
from rest_framework import viewsets, permissions



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


# ✅ Upload Products View
class BulkUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No file uploaded"}, status=400)

        try:
            df = pd.read_excel(file) if file.name.endswith('.xlsx') else pd.read_csv(file)
            
            # Debug: Print column names to check if they're correct
            print(df.columns) 
            df.columns = df.columns.str.strip()  # Remove spaces from column names

            for _, row in df.iterrows():
                supplier_name = row.get('Supplier')  # Use .get() to avoid KeyError
                if not supplier_name:
                    return Response({"error": "Column 'Supplier' not found or is empty"}, status=400)
                
                supplier, _ = Supplier.objects.get_or_create(name=supplier_name)
                
                Product.objects.update_or_create(
                    name=row['Product'],
                    supplier=supplier,
                    defaults={'price': row['Price'], 'quantity': row['Quantity']}
                )
            return Response({"message": "Products uploaded successfully"})
        except Exception as e:
            return Response({"error": str(e)}, status=400)



@api_view(['GET'])
def enquiry_list(request):
    enquiries = Enquiry.objects.all()
    serializer = EnquirySerializer(enquiries, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def enquiry_create(request):
    serializer = EnquirySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)  # Associates the enquiry with the authenticated user
        return Response({'message': 'Enquiry submitted successfully!'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def approve_enquiry(request, pk):
    try:
        enquiry = Enquiry.objects.get(pk=pk)
    except Enquiry.DoesNotExist:
        return Response({'error': 'Enquiry not found'}, status=status.HTTP_404_NOT_FOUND)
    
    enquiry.status = 'Approved'
    enquiry.save()
    return Response({'message': 'Enquiry approved successfully!'})




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