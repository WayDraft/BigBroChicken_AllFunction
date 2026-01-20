import { Link } from 'react-router-dom'
import { FaMinus, FaPlus, FaEquals } from 'react-icons/fa'

export default function Cart() {
  return (
    <div className="flex flex-col items-center jusitfy-center w-full p-20">
      <span className="text-4xl pb-10">장바구니</span>
      <div className="flex flex-col border border-burgundy w-full p-5">
        <div className="flex flex-row gap-3 justify-start border-b border-burgundy pb-5">
          <input
            type="checkbox"
            className="w-5 h-5 rounded-xl border-2 border-gray-200 checked:bg-burgundy"
          />

          <span className="text-xl">전체선택</span>
        </div>

        <div className="flex flex-col justify-center items-center py-40">
          <span className="text-xl pb-8">상품이 없어요</span>
          <Link 
            to="/menu"
            className="py-3 px-5 rounded-xl bg-burgundy text-white"
          >
            <span>상품 담으러 가기</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center w-full px-[300px] py-16 border border-burgundy text-xl gap-10">
        <div className="flex flex-row items-center justify-between w-2/3">
          <div className="flex flex-col gap-5">
            <span>선택 상품 금액</span>
            <span>0 원</span>
          </div>

          <FaPlus />

          <div className="flex flex-col gap-5">
            <span>배송비</span>
            <span>0 원</span>
          </div>

          <FaMinus />

          <div className="flex flex-col gap-5">
            <span>할인</span>
            <span>0 원</span>
          </div>

          <FaEquals />

          <div className="flex flex-col gap-5">
            <span>주문금액</span>
            <span>0 원</span>
          </div>
        </div>

        <button className="px-10 py-5 rounded-lg bg-burgundy text-white">
          <span>주문하기</span>
        </button>
      </div>
    </div>
  )
}