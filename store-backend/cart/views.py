from rest_framework import generics, permissions
from .models import CartItem
from .serializers import CartItemSerizalizer

# 장바구니 전체 조회
class CartListView(generics.ListAPIView):
  serializer_class = CartItemSerizalizer
  permission_classes = [permissions.IsAuthenticated]

  def get_queryset(self):
    return CartItem.objects.fiilter(user=self.request.user)
  

# 장바구니 추가
class CartAddView(generics.CreateAPIView):
  serializer_class = CartItemSerizalizer
  permission_classes = [permissions.IsAuthenticated]

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)

  
# 장바구니 삭제
class CartRemoveView(generics.DestroyAPIView):
  serializer_class = CartItemSerizalizer
  permission_classes = [permissions.IsAuthenticated]
  lookup_url_kwrg = 'pk'

  def get_queryset(self):
    return CartItem.objects.filter(user=self.request.user)