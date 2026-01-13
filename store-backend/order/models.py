from django.db import models
from django.contrib.auth.models import User

class Order(models.Model):
    # 주문 상태 옵션
    STATUS_CHOICES = [
        ('READY', '결제대기'),
        ('PAID', '결제완료'),
        ('CANCELLED', '결제취소'),
        ('SHIPPING', '배송중'),
        ('DELIVERED', '배송완료'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="구매자")
    payment_id = models.CharField(max_length=100, unique=True, verbose_name="포트원 결제ID")
    order_name = models.CharField(max_length=200, verbose_name="상품명")
    amount = models.IntegerField(verbose_name="결제금액")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PAID', verbose_name="주문상태")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="주문일시")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정일시")

    class Meta:
        verbose_name = "주문 관리"
        verbose_name_plural = "주문 관리 목록"
        ordering = ['-created_at'] # 최신 주문이 위로

    def __str__(self):
        return f"[{self.status}] {self.order_name} ({self.user.username})"




# from django.db import models
# from django.contrib.auth.models import User

# class Order(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     payment_id = models.CharField(max_length=100, unique=True) # 포트원 결제 ID
#     order_name = models.CharField(max_length=200)
#     amount = models.IntegerField()
#     status = models.CharField(max_length=20, default='PAID') # PAID, CANCELLED 등
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.user.username} - {self.order_name}"