# user/views.py

from rest_framework import generics, permissions
from .serializers import UserRegisterSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated 
from django.contrib.auth.models import User

# 회원가입 API (POST 요청 처리)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny] # 누구나 접근 가능해야 함
    serializer_class = UserRegisterSerializer

# 인증된 사용자만 자신의 정보를 조회
class UserProfileView(APIView):
    # 이 클래스는 인증된 사용자만 접근 가능하도록 강제
    permission_classes = [IsAuthenticated] 

    def get(self, request):
        # request.user는 JWT 토큰을 통해 인증된 사용자 객체
        user = request.user
        
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_superuser": user.is_superuser, # 관리자 여부
        })