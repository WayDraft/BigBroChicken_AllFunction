# user/views.py

from rest_framework import generics, permissions
from .serializers import UserRegisterSerializer
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password, make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated 
from rest_framework.decorators import api_view, permission_classes

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
    
#  me : 기본 User 정보만 제공
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        })
    
#  my_info : 프로필 포함 모든 정보 제공
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_info(request):
    user = request.user
    profile = user.profile

    return Response({
        "id": user.username,
        "name": user.first_name,
        "address": profile.address,
        "detailAddress": profile.detail_address,
        "phone": profile.phone,
    })

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    profile = user.profile

    data = request.data
    current_pw = data.get('currentPW')
    new_pw = data.get('newPW')

    # 비밀번호 변경
    if current_pw or new_pw:
        if not current_pw or not new_pw:
            return Response({"error": "비밀번호 변경 시 현재 비밀번호와 새 비밀번호를 모두 입력해야 합니다."}, status=400)
        
        # 기존 비밀번호 확인
        if not user.check_password(current_pw):
            return Response({"error": "기존 비밀번호가 일치하지 않습니다."}, status=400)
        
        # 새 비밀번호로 변경
        user.set_password(new_pw)

    # 이름, 주소, 전화번호 업데이트
    user.first_name = data.get('name', user.first_name)
    profile.address = data.get('address', profile.address)
    profile.detail_address = data.get('detailAddress', profile.detail_address)
    profile.phone = data.get('phone', profile.phone)

    # DB 저장
    user.save()
    profile.save()

    return Response({"message": "회원정보가 업데이트 되었습니다."})