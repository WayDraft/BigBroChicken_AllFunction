// Lunch.jsx

import React from 'react';
import { useProducts } from '../../hooks/useProducts'; // 커스텀 훅 임포트
import { Link } from 'react-router-dom';

export default function Lunch() {
  // 훅을 사용하여 '도시락' 카테고리 상품 데이터 가져오기
  const { products, loading, error } = useProducts('도시락');

  // 로딩 또는 에러 처리
  if (loading) {
    return <div className="py-[100px] text-lg">상품 목록을 불러오는 중입니다...</div>;
  }
  if (error) {
    return <div className="py-[100px] text-red-600">{error}</div>;
  }

  // 기존 메뉴 컨텐츠 (하드코딩된 데이터 대신 products 사용)
  return (
    <div className="flex flex-col bg-white justify-center items-center py-[100px] lg:py-[160px]">
      {/* ... (이전 코드 생략) ... */}

      <div className="flex justify-center items-center lg:pt-16">
        <div className="w-full lg:px-[200px] grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          
          {/* 하드코딩된 배열 대신 백엔드에서 가져온 products 배열을 사용 */}
          {products.map((item) => (
            <Link 
                to={`/product/${item.id}`} // 클릭 시 상세 페이지로 이동
                key={item.id} 
                className="group relative flex flex-col items-center">
                <div className="w-[130px] lg:w-[200px] aspect-square rounded-full overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                <img src={item.image_url || "/img/default.png"} className="w-full h-full object-cover" />
                </div>
                <p className="mt-4 text-lg lg:text-xl font-bold text-gray-800">{item.name}</p>
                <p className="text-gray-600">{item.price.toLocaleString()}원</p>
            </Link>
            ))}
        </div>
      </div>
    </div>
  )
}