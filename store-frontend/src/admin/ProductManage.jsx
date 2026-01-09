import { useState } from 'react'
import { ProductData } from './ProductData'

export default function ProductManage() {
  const [seleState, setSeleState] = useState("selling")
  const [products, setProducts] = useState(ProductData)
  const totalCount = products.length

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-col border-[2.5px] border-burgundy bg-white">
        {[
          {title: '판매상품', num: 0},
          {title: '품절상품', num: 0},
          {title: '전체개수', num: 0}
        ].map((list, i) => (
          <>
            <div className="flex flex-row justify-between text-burgundy mx-8 my-2 text-xl">
              <span>{list.title}</span>
              <span>{list.num}</span>
            </div>

            {i != 2 ?
              <div className="w-full border-[1px]" /> : ''
            }
          </>
        ))}
      </div>

      <div className="flex flex-col w-full border border-burgundy">
        {/* 검색 상세 설정 (상단) */}
        <div className="flex flex-col w-full p-8 bg-burgundy text-white gap-16">
          {/* 검색어 입력 */}
          <div className="flex flex-row items-center gap-5">
            <span>검색어</span>
            <input className="px-3 py-2 border border-gray-600 text-black" />
          </div>

          <div className="flex flex-row justify-between items-end w-full">
            {/* 판매 상태 조건 선택 */}
            <div className="flex flex-col items-start gap-3">
              <span>판매 상태</span>
              <div className="flex flex-row gap-5">
                {[
                  { label: "판매중", value: "selling" },
                  { label: "품절", value: "soldout" }
                ].map((item) => (
                  <label key={item.value} className="flex flex-row gap-3 items-center cursor-pointer">
                    <input
                      type="radio"
                      value={item.value}
                      checked={seleState === item.value}
                      onChange={() => setSeleState(item.value)}
                      className="hidden peer"
                    />
                    <div className="w-3 h-3 rounded-full bg-white border-[2px] peer-checked:bg-red-500 peer-checked:border-white" />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* 검색 버튼 */}
            <button className="bg-red-500 px-16 py-2 bg-white text-burgundy font-bold">
              <span>검색</span>
            </button>
          </div>
        </div>

        {/* 상품 리스트 (하단) */}
        <div className="flex flex-col w-full bg-white">
          {/* 헤더 */}
          <div className="grid grid-cols-10 text-burgundy font-bold border-b border-burgundy py-3">
            <span className="col-span-1">번호</span>
            <span className="col-span-4">상품명</span>
            <span className="col-span-2">판매가</span>
            <span className="col-span-3">판매상태</span>
          </div>

          {/* 리스트 */}
          {products.map((product, index) => (
            <>
              <div key={product.id} className="grid grid-cols-10 py-3 border-burgundy">
                <span className="col-span-1">{index+1}</span>
                <span className="col-span-4">{product.name}</span>
                <span className="col-span-2">{product.price}원</span>
                <span className="col-span-3">
                  {product.status === "selling" ? "판매중" : "품절"}
                </span>
              </div>

              {product.id === totalCount ? "" : <div className="w-full border border-black/30" /> }
            </>
          ))}
        </div>
      </div>
    </div>
  )
}