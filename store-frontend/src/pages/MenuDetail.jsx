import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { IoMdArrowRoundBack, IoMdInformationCircleOutline } from 'react-icons/io'
import { TbTriangleInvertedFilled } from 'react-icons/tb'
import { FaCircleMinus, FaCirclePlus } from 'react-icons/fa6'
import MenuItem from '../data/MenuItem'
import apiClient from '../services/apiClient'

export default function MenuDetail() {
  const { id } = useParams()
  const menu = MenuItem.find((item) => item.id === id)
  const options = menu.options || []
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState([])

  const handleAddToCart = async () => {
    try {
      for (const item of selected) {
        await apiClient.post("/cart/add/", {
          menu: menu.id,
          option: { detail: item.detail, price: item.price },
          quantity: item.quantity
        })
      }
      alert("장바구니에 추가되었습니다.")
    } catch (err) {
      console.error(err)
      alert("장바구니 추가 실패")
    }
  }

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
    <div className="relative flex flex-col items-center justify-center w-full lg:p-20">
      {/* 뒤로가기 버튼 */}
      <Link 
        to="/menu"
        className="absolute top-5 left-5 lg:top-10 lg:left-20"
      >
        <IoMdArrowRoundBack className="text-2xl lg:text-5xl text-burgundy" />
      </Link>

      <div className="flex flex-col lg:flex-row w-full items-center lg:justify-between px-8 lg:px-[250px] py-20">
        <div className="flex flex-col lg:w-1/3 p-8 lg:p-0">
          <img 
            src={menu.img}
            className="aspect-square object-contain"
          />
        </div>

        <div className="flex flex-col gap-5 lg:gap-8 lg:w-2/5">
          <div className="flex flex-col gap-1 lg:gap-5 text-left">
            <span className="text-lg lg:text-2xl font-bold">{menu.title}</span>
            <span>{menu.price} 원</span>
            <div className="flex flex-row items-center gap-3 lg:gap-5 py-2 lg:py-5 text-sm lg:text-lg">
              <span>배송비</span>
              <span>3,000원 (30,000원 이상 구매 시 무료)</span>
              <IoMdInformationCircleOutline />
            </div>
          </div>
          
          <div className="flex flex-col text-sm lg:text-lg">
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
                <div className="flex flex-col lg:gap-2 text-left">
                  <span className="text-lg lg:text-xl">{menu.title}</span>
                  <span className="text-sm lg:text-lg">{item.detail}</span>
                </div>

                <div className="flex flex-row justify-between items-center gap-3 lg:gap-5 text-xl text-burgundy">
                  <FaCircleMinus onClick={() => minus(item.id)} className="text-sm lg:text-lg" />
                  <span>{item.quantity}</span>
                  <FaCirclePlus onClick={() => plus(item.id)} className="text-sm lg:text-lg" />
                </div>

                <div className="flex flex-col lg:gap-3 text-right">
                  <span className="text-lg lg:text-xl">총금액</span>
                  <span className="text-sm lg:text-lg font-bold">{totalPrice.toLocaleString()} 원</span>
                </div>
                  
                <button
                  onClick={() => setSelected(prev => prev.filter(o => o.id !== item.id))}
                  className="text-sm lg:text-lg"
                >
                  ✖
                </button>
              </div>
            )
          })}

          <div className="flex flex-row justify-between gap-3">
            <button 
              className="w-full py-3 border border-burgundy text-burgundy rounded-lg"
              onClick={handleAddToCart}
            >
              <span>장바구니 추가</span>
            </button>
            <div className="w-full py-3 bg-burgundy text-white rounded-lg">
              <span>바로 구매</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}