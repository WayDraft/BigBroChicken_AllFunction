from django.db import models
from django.contrib.auth.models import User

class Menu(models.Model):
  title = models.CharField(max_length=100)
  price = models.IntegerField()
  options = models.JSONField(default=list, blank=True)

  def __str__(self):
    return self.title

class CartItem(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items')
  menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
  options = models.JSONField(default=dict)  # 선택한 옵션 정보
  quantity = models.IntegerField(default=1)
  added_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.quantity * self.option.get("price", self.menu.price)