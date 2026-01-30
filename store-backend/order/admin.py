from django.contrib import admin
from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    # 1. 목록에 보여줄 컬럼들 (스마트스토어 주문 목록과 유사하게)
    list_display = ('id', 'status', 'order_name', 'amount', 'user', 'created_at', 'payment_id')
    
    # 2. 클릭해서 상세 내역으로 들어갈 컬럼
    list_display_links = ('id', 'order_name')
    
    # 3. 우측 필터 바 (상태별, 날짜별로 모아보기)
    list_filter = ('status', 'created_at')
    
    # 4. 검색 기능 (구매자명이나 결제ID로 검색)
    search_fields = ('user__username', 'payment_id', 'order_name')
    
    # 5. 목록에서 바로 상태를 변경할 수 있게 설정
    list_editable = ('status',)
    
    # 6. 한 페이지에 보여줄 주문 개수
    list_per_page = 20

    # 색상 강조 (선택 사항: 상태에 따라 색상 부여)
    def get_status_display(self, obj):
        from django.utils.html import format_html
        color = "black"
        if obj.status == 'PAID': color = "blue"
        elif obj.status == 'SHIPPING': color = "orange"
        elif obj.status == 'CANCELLED': color = "red"
        return format_html('<b style="color: {};">{}</b>', color, obj.get_status_display())
    
    get_status_display.short_description = "주문상태"