import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { handlePayment } from '../services/paymentService';
import apiClient from '../services/apiClient';

export default function ProductDetail() {
  const { id } = useParams(); // URL에서 상품 ID 추출
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 상품 상세 정보 가져오기
    apiClient.get(`/products/${id}/`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => console.error("상품 로딩 실패", err));
  }, [id]);

  const onBuyNow = () => {
    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      window.location.href = "/login";
      return;
    }

    // 결제 데이터 준비
    const orderData = {
      name: product.name,
      price: product.price,
      username: user.username,
      email: user.email,
    };

    // paymentService의 결제 함수 호출
    handlePayment(orderData);
  };

  if (loading) return <div className="py-20 text-center">로딩 중...</div>;
  if (!product) return <div className="py-20 text-center">상품을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 lg:py-16">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* 왼쪽: 상품 이미지 */}
        <div className="w-full lg:w-1/2 aspect-square bg-gray-100 rounded-xl overflow-hidden">
          <img 
            src={product.image_url || "/img/default.png"} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 오른쪽: 상품 정보 및 버튼 */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <span className="text-green-600 font-bold text-sm">{product.category?.name}</span>
            <h1 className="text-3xl font-bold mt-2 text-gray-900">{product.name}</h1>
            <p className="text-2xl font-black mt-4 text-gray-900">
              {product.price.toLocaleString()}원
            </p>
            <div className="border-t border-gray-200 mt-8 pt-8">
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {product.description || "상세 설명이 없습니다."}
              </p>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button className="flex-1 h-14 border border-gray-300 rounded-md font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              장바구니
            </button>
            <button 
              onClick={onBuyNow}
              className="flex-[2] h-14 bg-green-600 rounded-md font-bold text-white hover:bg-green-700 transition-colors shadow-lg shadow-green-100"
            >
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}