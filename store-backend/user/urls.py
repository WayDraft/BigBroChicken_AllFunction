# user/urls.py

from django.urls import path
from .views import RegisterView

urlpatterns = [
    # POST /api/register/ 요청 처리
    path('register/', RegisterView.as_view(), name='auth_register'),
]