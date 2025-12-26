from django.db import models
from django.contrib.auth.models import User

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment_id = models.CharField(max_length=100, unique=True) # 포트원 결제 ID
    order_name = models.CharField(max_length=200)
    amount = models.IntegerField()
    status = models.CharField(max_length=20, default='PAID') # PAID, CANCELLED 등
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.order_name}"