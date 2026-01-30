import { useState, forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Radio from '../components/common/RadioGroup'
import { FaCalendarAlt } from "react-icons/fa"
import { TbTriangleInvertedFilled } from 'react-icons/tb'

export default function OrderManage() {
  const [selectDate, setSelectDate] = useState("day")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [selectState, setSelecState] = useState("new")

  const period = [
    { label: "오늘", value: "day" },
    { label: "1주일", value: "week" },
    { label: "1개월", value: "month" },
    { label: "3개월", value: "threeMonth" }
  ]

  const order = [
    { label: "결제대기", value: "new" },
    { label: "결제완료", value: "packing" },
    { label: "배송중", value: "deliver" },
    { label: "배송완료", value: "completed" },
    { label: "결제취소", value: "cancel" },
  ]

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

  {/* 테스트용 데이터 */}
  const mockOrders = [
    {
      id: 1, userId: 'user01', userName: '홍길동',
      product: '닭구이 세트', amount: 2,
      createdAt: '2025-01-05 14:23',
      status: '배송완료'
    },
    {
      id: 2, userId: 'user02', userName: '이도',
      product: '간장구이', amount: 1,
      createdAt: '2025-01-05 21:58',
      status: '배송중'
    },
    {
      id: 3, userId: 'user03', userName: '이춘향',
      product: '닭발', amount: 6,
      createdAt: '2025-01-12 08:16',
      status: '결제완료'
    },
  ]

  const [orders, setrOrders] = useState(mockOrders)

  const handleSearch = () => {
    let filtered = [...mockOrders]

    if (selectState) {
      filtered = filtered.filter(
        (o) => o.status === order.find((item) => item.value === selectState)?.label
      )
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full border-burgundy">
        {/* 검색 상세 설정 (상단) */}
        <div className="flex flex-col w-full p-5 bg-burgundy text-white gap-8">
          {/* 검색어 입력 */}
          <div className="flex flex-row items-center gap-5">
            <span>검색어</span>
            <input className="px-3 py-2 border border-gray-600 text-black" placeholder="주문자, ID, 결제ID" />
          </div>

          {/* 주문 기간 설정 */}
          <div className="flex flex-col gap-5">
            {/* 주문 기간 선택 (라디오) */}
            <div className="flex flex-row items-center gap-5">
              <span>기간</span>
              <div className="flex flex-row">
                {period.map((item) => (
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
            <div className="flex items-center gap-5">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                startDate={startDate} endDate={endDate}
                placeholderText="시작일"
                dateFormat="yyyy-MM-dd"
                customInput={<DateInput />}
              />

              <span>-</span>

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
                {order.map((item) => (
                  <Radio
                    key={item.value}
                    value={item.value}
                    checked={selectState === item.value}
                    onChange={() => setSelecState(item.value)}
                    label={item.label}
                    className={`${selectState === item.value ? 'bg-white' : 'bg-burgundy'}`}
                  />
                ))}
              </div>
            </div>

            {/* 검색 버튼 */}
            <button className="px-16 py-2 border border-white text-white hover:bg-lightBurgundy">
              <span>검색</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col w-full bg-white">
          {/* 헤더 */}
          <div className="grid grid-cols-10 py-3 text-burgundy font-bold border border-burgundy divide-x divide-burgundy">
            <span className="col-span-1">주문번호</span>
            <span className="col-span-1">사용자ID</span>
            <span className="col-span-1">주문자</span>
            <span className="col-span-3">상품명</span>
            <span className="col-span-1">개수</span>
            <span className="col-span-2">주문일시</span>
            <span className="col-span-1">주문상태</span>
          </div>

          {/* 리스트 */}
          <div className="border-x border-burgundy">
          {orders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-10 border-b border-burgundy divide-x divide-burgundy"
            >
              <span className="col-span-1 py-3">{order.id}</span>
              <span className="col-span-1 py-3">{order.userId}</span>
              <span className="col-span-1 py-3">{order.userName}</span>
              <span className="col-span-3 py-3">{order.product}</span>
              <span className="col-span-1 py-3">{order.amount}</span>
              <span className="col-span-2 py-3">{order.createdAt}</span>
              <span className="col-span-1 py-3">{order.status}</span>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}