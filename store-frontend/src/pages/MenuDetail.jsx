import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { IoMdArrowRoundBack, IoMdInformationCircleOutline } from 'react-icons/io'
import { TbTriangleInvertedFilled } from 'react-icons/tb'
import { FaCircleMinus, FaCirclePlus } from 'react-icons/fa6'
import MenuItem from '../data/MenuItem'

const options = [
  { id: 1, detail: "예시상품1", price: 10000 },
  { id: 2, detail: "예시상품2", price: 10500 }
]

export default function MenuDetail() {
  const { id } = useParams()
  const menu = MenuItem.find((item) => item.id === id)
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState([])

  const handleSelect = (options) => {
    if (selected.find((o) => o.id === options.id)) return

    setSelected((prev) => [
      ...prev,
      { ...options, quantity: 1 }
    ])
    setIsOpen(false)
  }

  const plus = (id) => {
    setSelected((prev) => prev.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }

  const minus = (id) => {
    setSelected((prev) => prev.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ))
  }

  if (!menu) {
    return <div className="p-20">메뉴를 찾을 수 없습니다.</div>
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full p-20">
      <Link 
        to="/menu"
        className="absolute top-10 left-20"
      >
        <IoMdArrowRoundBack className="text-5xl text-burgundy" />
      </Link>

      <div className="flex flex-row w-full justify-between px-[300px] py-20">
        <div className="flex flex-col w-1/3">
          <img 
            src={menu.img}
            className="aspect-square object-contain"
          />

          <div className="flex flex-row">

          </div>
        </div>

        <div className="flex flex-col gap-8 w-1/3">
          <div className="flex flex-col gap-5 text-left">
            <span className="text-2xl font-bold">{menu.title}</span>
            <span>{menu.price} 원</span>
            <div className="flex flex-row gap-5 py-5 border-t-b border-burgundy">
              <span>배송비</span>
              <span>3,000원 (30,000원 이상 구매 시 무료)</span>
              <IoMdInformationCircleOutline />
            </div>
          </div>
          
          <div className="flex flex-col">
            <div
              onClick={() => setIsOpen((prev) => !prev)}
              className={`
                border border-burgundy px-4 py-3 cursor-pointer flex flex-row justify-between items-center
                ${isOpen ? "rounded-t-lg" : "rounded-lg"}
              `}
            >
              <span>-- 옵션 선택 --</span>
              <TbTriangleInvertedFilled className="text-burgundy" />
            </div>

            {isOpen && (
              <div className="border border-burgundy rounded-b-lg">
                {options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleSelect(option)}
                    className="px-4 py-3 hover:bg-gray-200 cursor-pointer"
                  >
                    <div className="flex flex-row justify-between">
                      <span>{option.detail}</span>
                      <span>{option.price} 원</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selected.map((item) => {
            const totalPrice = item.price * item.quantity

            return (
              <div 
                key={item.id}
                className="flex flex-row justify-between items-center"
              >
                <div className="flex flex-col gap-2 text-left">
                  <span className="text-xl">{menu.title}</span>
                  <span>{item.detail}</span>
                </div>

                <div className="flex flex-row justify-between items-center gap-5 text-xl text-burgundy">
                  <FaCircleMinus onClick={() => minus(item.id)} />
                  <span>{item.quantity}</span>
                  <FaCirclePlus onClick={() => plus(item.id)} />
                </div>

                <div className="flex flex-col gap-3 text-right">
                  <span className="text-xl">총금액</span>
                  <span className="font-bold">{totalPrice.toLocaleString()} 원</span>
                </div>
                  
                <button
                  onClick={() => setSelected(prev => prev.filter(o => o.id !== item.id))}
                >
                  ✖
                </button>
              </div>
            )
          })}

          <div className="flex flex-row justify-between gap-3">
            <div className="w-full py-3 border border-burgundy text-burgundy rounded-lg">
              <span>장바구니 추가</span>
            </div>
            <div className="w-full py-3 bg-burgundy text-white rounded-lg">
              <span>바로 구매</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}