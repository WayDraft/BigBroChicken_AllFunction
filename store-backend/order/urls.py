from django.urls import path
from .views import PaymentCompleteView

urlpatterns = [
    path('payment-complete/', PaymentCompleteView.as_view(), name='payment_complete'),
]