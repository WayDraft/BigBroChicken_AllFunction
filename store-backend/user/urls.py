# user/urls.py

from django.urls import path
from . import views
from .views import RegisterView, UserProfileView, MeView

urlpatterns = [
    # POST /api/register/ 요청 처리
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('profile/', UserProfileView.as_view(), name='user_profile'), # <<-- 새 URL 추가
    path('me/', MeView.as_view(), name='me'),
    path('my_info/', views.my_info, name='my_info'),
    path('update_profile/', views.update_profile, name='update_profile'),
]
