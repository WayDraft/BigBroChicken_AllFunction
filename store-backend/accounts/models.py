from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  address = models.CharField(max_length=255)
  detail_address = models.CharField(max_length=255)
  phone = models.CharField(max_length=20)

  def __str__(self):
    return self.user.username

# Create your models here.
