# user/views.py

from rest_framework import generics, permissions
from .serializers import UserRegisterSerializer

# 회원가입 API (POST 요청 처리)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny] # 누구나 접근 가능해야 함
    serializer_class = UserRegisterSerializer