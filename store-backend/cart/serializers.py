from rest_framework import serializers
from .models import CartItem

class CartItemSerizalizer(serializers.ModelSerializer):
  class Meta:
    model = CartItem
    fields = ["id", "menu", "option", "quantity", "added_at"]