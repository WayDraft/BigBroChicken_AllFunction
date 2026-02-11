from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
  id = serializers.CharField()
  password = serializers.CharField(write_only=True)
  name = serializers.CharField()
  address = serializers.CharField()
  detailAddress = serializers.CharField()
  phone = serializers.CharField()

  class Meta:
    model = User
    fields = [
      'id',
      'password',
      'name',
      'address',
      'detailAddress',
      'phone',
    ]
    extra_kwargs = {
      'password': {'write_only': True}
    }
  
  def create(self, validated_data):
    username = validated_data.pop('id')
    name = validated_data.pop('name')
    address = validated_data.pop('address')
    detail_address = validated_data.pop('detailAddress')
    phone = validated_data.pop('phone')
    password = validated_data.pop('password')

    # User 생성
    user = User.objects.create_user(
      username=username,
      password=password,
      first_name=name,
    )

    # Profile 생성
    Profile.objects.create(
      user=user,
      address=address,
      detail_address=detail_address,
      phone=phone,
    )
    return user