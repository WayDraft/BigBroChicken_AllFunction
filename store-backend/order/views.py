import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order

class PaymentCompleteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        payment_id = request.data.get('payment_id')
        
        # 1. 포트원 API를 통해 결제 정보 조회 (V2)
        # 실제 운영시에는 PortOne API Secret을 사용하여 Authorization 헤더를 넣어야 함
        portone_api_url = f"8u2Ms8nD0vtXwDQ4C2QGo7M48Reldh9olY8rLuGZx7r1TXV4WbVv7LBJItHmcqnsjyrdjhfe6c9kMnS4Q2FQ==/v2/payments/{payment_id}"
        headers = {
            "Authorization": "PortOne YOUR_PORTONE_API_SECRET" # 포트원 콘솔에서 발급
        }
        
        response = requests.get(portone_api_url, headers=headers)
        payment_data = response.json()

        # 2. 결제 상태 확인 및 DB 저장
        if response.status_code == 200 and payment_data.get('status') == 'PAID':
            # 결제 금액 검증 로직 추가 가능 (payment_data['amount']['total'])
            
            Order.objects.create(
                user=request.user,
                payment_id=payment_id,
                order_name=payment_data.get('orderName'),
                amount=payment_data['amount']['total'],
                status='PAID'
            )
            return Response({"status": "success"})
        
        return Response({"status": "fail", "message": "결제 검증 실패"}, status=400)