import { FaAngleRight } from 'react-icons/fa6'

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full py-20 px-[110px] gap-10">
      <div className="flex flex-col w-full border border-black">
        <div className="border-b border-black text-left px-5 py-3">
          <span>판매관리</span>
        </div>
          
        <div className="flex flex-row items-center justify-center gap-10 py-5 px-10  text-burgundy">
          {[
            {title: "신규주문", num: 0},
            {title: "배송준비", num: 0},
            {title: "배송중", num: 0},
            {title: "배송완료", num: 0}
          ].map((order, i) => (
            <>
              <div className="flex flex-col justify-center items-center w-[140px] aspect-square rounded-full border border-burgundy">
                <span>{order.title}</span>
                <span className="text-2xl font-bold">{order.num}건</span>
              </div>
              {i != 3 ? <FaAngleRight className="text-6xl" /> : ''}
            </>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full border border-burgundy">
        <div className="border-b border-burgundy text-left px-5 py-3">
          <span>정산</span>
        </div>

        <div className="flex flex-row justify-center gap-10 px-10 text-burgundy">
          <div className="flex flex-col justify-center items-center w-full gap-2 py-8">
            <div className="text-left">
              <span>오늘 정산</span>
            </div>
            <span className="text-3xl font-bold">0원</span>
          </div>

          <div className="h-full border-[1px] border-burgundy"></div>

          <div className="flex flex-col justify-center items-center w-full gap-2 py-8">
            <div className="text-left">
              <span>오늘 정산</span>
            </div>
            <span className="text-3xl font-bold">0원</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full gap-8">
        <div className="flex flex-col w-full border border-burgundy text-burgundy">
          <div className="border-b border-burgundy text-left px-5 py-3">
            <span>취소 / 반품 / 교환</span>
          </div>

          <div className="flex flex-col justify-center">
            {[
              {title: "취소요청", num: 0},
              {title: "반품요청", num: 0},
              {title: "교환요청", num: 0}
            ].map((list, i) => (
              <>
                <div className="flex flex-row justify-between items-center py-3 px-5">
                  <span>{list.title}</span>
                  <span>{list.num}건</span>
                </div>

                {i != 2 ?
                  <div className="w-full border-[1px] border-burgundy" /> : ''
                }
              </>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full border border-burgundy text-burgundy">
          <div className="border-b border-burgundy text-left px-5 py-3">
            <span>취소 / 반품 / 교환</span>
          </div>

          <div className="flex flex-col h-full justify-evenly">
            <div className="flex flex-row justify-between items-center py-3 px-5">
              <span>판매중 상품</span>
              <span>0건</span>
            </div>

            <div className="w-full border-[1px] border-burgundy" />

            <div className="flex flex-row justify-between items-center py-3 px-5">
              <span>품절 상품</span>
              <span>0건</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}