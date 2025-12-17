# user/urls.py

from django.urls import path
from .views import RegisterView, UserProfileView

urlpatterns = [
    # POST /api/register/ 요청 처리
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('profile/', UserProfileView.as_view(), name='user_profile'), # <<-- 새 URL 추가
]
