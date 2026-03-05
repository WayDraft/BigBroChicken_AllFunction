from django.urls import path
from .views import CartListView, CartAddView, CartRemoveView

urlpatterns = [
  path('', CartListView.as_view(), name='cart-list'),
  path('add/', CartAddView.as_view(), name='cart-add'),
  path('removew/<int:pk>/', CartRemoveView.as_view(), name='cart-remove'),
]