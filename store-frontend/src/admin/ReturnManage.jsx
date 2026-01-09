import { useState, forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { FaCalendarAlt } from "react-icons/fa"

export default function ReturnManage() {
  const [selectDate, setSelectDate] = useState("day")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [selectState, setSelecState] = useState("returnRequest")

  const DateInput = forwardRef(({ value, onClick }, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="flex flex-row gap-10 items-center justify-between px-4 py-2 bg-white border text-burgundy"
    >
      <span>{value || "날짜 선택"}</span>
      <FaCalendarAlt />
    </button>
  ))

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full border-burgundy">
        {/* 검색 상세 설정 (상단) */}
        <div className="flex flex-col w-full p-8 bg-burgundy text-white gap-8">
          {/* 검색어 입력 */}
          <div className="flex flex-row items-center gap-5">
            <span>검색어</span>
            <input className="px-3 py-2 border border-gray-600 text-black" />
          </div>

          {/* 주문 기간 설정 */}
          <div className="flex flex-col gap-5">
            {/* 주문 기간 선택 (라디오) */}
            <div className="flex flex-row items-center gap-5">
              <span>기간</span>
              <div className="flex flex-row">
                {[
                  { label: "오늘", value: "day" },
                  { label: "1주일", value: "week" },
                  { label: "1개월", value: "month" },
                  { label: "3개월", value: "threeMonth" }
                ].map((item) => (
                  <label key={item.value} className="cursor-pointer">
                    <input
                      type="radio"
                      value={item.value}
                      checked={selectDate === item.value}
                      onChange={() => setSelectDate(item.value)}
                      className="hidden peer"
                    />
                    <div className="px-4 py-2 border bg-white text-burgundy peer-checked:bg-burgundy peer-checked:text-white">
                      {item.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 주문 기간 선택 (달력) */}
            <div className="flex items-center gap-3">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                startDate={startDate} endDate={endDate}
                placeholderText="시작일"
                dateFormat="yyyy-MM-dd"
                customInput={<DateInput />}
              />

              <span>~</span>

              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                startDate={startDate} endDate={endDate}
                placeholderText="종료일"
                dateFormat="yyyy-MM-dd"
                customInput={<DateInput />}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between items-end w-full">
            <div className="flex flex-col items-start gap-3">
              <span>주문 상태</span>
              <div className="flex flex-row gap-5">
                {[
                  { label: "반품요청", value: "returnRequest" },
                  { label: "반품완료", value: "returnComplete" },
                  { label: "교환요청", value: "exchangeRequest" },
                  { label: "교환완료", value: "exchangeComplete" }
                ].map((item) => (
                  <label key={item.value} className="flex flex-row gap-3 items-center cursor-pointer">
                    <input
                      type="radio"
                      value={item.value}
                      checked={selectState === item.value}
                      onChange={() => setSelecState(item.value)}
                      className="hidden peer"
                    />
                    <div className="w-3 h-3 rounded-full bg-white border-[2px] peer-checked:bg-red-500 peer-checked:border-white" />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 검색 버튼 */}
            <button className="bg-red-500 px-16 py-2 bg-white text-burgundy">
              <span>검색</span>
            </button>
          </div>
        </div>

        {/* 상품 리스트 (하단) */}
        <div className="flex flex-col w-full">
          {/* 헤더 */}
          <div className="grid grid-cols-10 py-3 text-burgundy font-bold border border-burgundy">
            <span className="col-span-1">번호</span>
            <span className="col-span-1">주문번호</span>
            <span className="col-span-4">상품명</span>
            <span className="col-span-2">주문일시</span>
            <span className="col-span-2">주문상태</span>
          </div>
        </div>
      </div>
    </div>
  )
}