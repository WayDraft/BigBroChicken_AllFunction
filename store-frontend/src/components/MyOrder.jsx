import { useState } from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import { TbTriangleInvertedFilled } from 'react-icons/tb'

const period = [
  { id: 1, detail: "전체 (최대 3년)" },
  { id: 2, detail: "일주일" },
  { id: 3, detail: "한 달" }
]

const state = [
  { id: 1, detail: "결제 대기" },
  { id: 2, detail: "결제 완료" },
  { id: 3, detail: "배송중" },
  { id: 4, detail: "배송 완료" },
]

export default function MyOrder() {
  const [isPeriodOpen, setIsPeriodOpen] = useState(false)
  const [isStateOpen, setIsStateOpen] = useState(false)
  const [periodSelected, setPeriodSelected] = useState(period[0])
  const [stateSelected, setStateSelected] = useState(state[0])

  const handlePeriodSelect = (option) => {
    setPeriodSelected(option)
    setIsPeriodOpen(false)
  }


  const handleStateSelect = (option) => {
    setStateSelected(option)
    setIsStateOpen(false)
  }

  return (
    <div className="w-full px-20">
      <div className="flex flex-col gap-5 text-burgundy">
        <p className="text-left text-2xl ml-3">진행중인 주문 <span className="text-lg">(최근 3개월)</span></p>
        <div className="flex flex-row items-center justify-evenly border border-burgundy rounded-2xl py-10 mb-10">
          {[
            { title: '결제 대기', num: 0 },
            { title: '결제 완료', num: 0 },
            { title: '배송중', num: 0 },
            { title: '배송 완료', num: 0 },
          ].map((item, i) => (
            <>
              <div className="flex flex-col justify-center items-center w-[140px] gap-5">
                <span className="text-xl">{item.title}</span>
                <span className="text-3xl font-bold">{item.num}</span>
              </div>
              {i != 3 ? <FaAngleRight className="text-3xl" /> : ''}
            </>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row py-10 gap-5">
          {/* 기간별 조회 필터 */}
          <div className="flex flex-col w-[200px]">
            <div
              onClick={() => setIsPeriodOpen((prev) => !prev)}
              className={`
                border border-burgundy px-4 py-3 cursor-pointer flex flex-row justify-between items-center
                ${isPeriodOpen ? 'rounded-t-md' : 'rounded-md'}
              `}
            >
              <span>{periodSelected.detail}</span>
              <TbTriangleInvertedFilled className="text-burgundy" />
            </div>

            {isPeriodOpen && (
              <>
              <div className="border border-burgundy rounded-b-md text-left">
                {period.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handlePeriodSelect(option)}
                    className="px-4 py-3 hover:bg-gray-200 cursor-pointer"
                  >
                    <span>{option.detail}</span>
                  </div>
                ))}
              </div>
              </>
            )}
          </div>

          {/* 상태별 조회 필터 */}
          <div className="flex flex-col w-[200px]">
            <div
              onClick={() => setIsStateOpen((prev) => !prev)}
              className={`
                border border-burgundy px-4 py-3 cursor-pointer flex flex-row justify-between items-center
                ${isStateOpen ? 'rounded-t-md' : 'rounded-md'}
              `}
            >
              <span>{stateSelected.detail}</span>
              <TbTriangleInvertedFilled className="text-burgundy" />
            </div>

            {isStateOpen && (
              <>
              <div className="border border-burgundy rounded-b-md text-left">
                {state.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleStateSelect(option)}
                    className="px-4 py-3 hover:bg-gray-200 cursor-pointer"
                  >
                    <span>{option.detail}</span>
                  </div>
                ))}
              </div>
              </>
            )}
          </div>
        </div>

        {/* 주문 내역 */}
        <div className="flex flex-col items-center justify-center h-[200px] border border-burgundy rounded-md bg-gray-100">
          <span className="text-burgundy text-2xl">주문 내역이 없습니다.</span>
        </div>
      </div>
    </div>
  )
}