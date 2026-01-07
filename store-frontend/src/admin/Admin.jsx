import {useState} from 'react'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6'
import Dashboard from './Dashboard'
import ProductManage from './ProductManage'
import OrderManage from './OrderManage'
import CancelManage from './CancelManage'
import ReturnManage from './ReturnManage'
 
export default function Admin() {
  const [page, setPage] = useState("dashboard")
  const [listOpen, setListOpen] = useState(false)

  return (
    <div className="flex flex-row w-full min-h-screen">
      <div className="flex flex-col w-1/5 py-10 items-center border-r border-black">
        <div className="flex flex-col mb-10">
          <div className="w-[200px] aspect-square bg-burgundy rounded-full mb-5" />
          <span className="text-xl font-bold text-burgundy">이름</span>
          <span className="text-lg text-burgundy">직급</span>
        </div>
        
        <button 
          onClick={() => setPage("product")}
          className="flex flex-row justify-between items-center w-full bg-burgundy text-white px-5 py-5"
        >
          <span className="text-xl">상품관리</span>
          <FaAngleRight />
        </button>

        <button 
          onClick={() => setPage("order")}
          className="flex flex-row justify-between items-center w-full bg-burgundy text-white px-5 py-5"
        >
          <span className="text-xl">주문관리</span>
          <FaAngleRight />
        </button>

        <button 
          onClick={() => setListOpen(prev => !prev)}
          className="flex flex-row justify-between items-center w-full bg-burgundy text-white px-5 py-5"
        >
          <span className="text-xl">취소/반품/교환관리</span>
          <FaAngleRight className={`transition-transform ${listOpen ? 'rotate-90' : ''}`} />
        </button>

        {listOpen && (
          <div className="flex flex-col w-full">
            <button
              onClick={() => setPage("cancel")}
              className="flex flex-row justify-between items-center w-full bg-red-300 text-burgundy px-5 py-5"
            >
              <span className="text-xl">취소관리</span>
              <FaAngleRight />
            </button>

            <button
              onClick={() => setPage("return")}
              className="flex flex-row justify-between items-center w-full bg-red-300 text-burgundy px-5 py-5"
            >
              <span className="text-xl">반품/교환관리</span>
              <FaAngleRight />
            </button>
          </div>
        )}
      </div>

      <div className="w-4/5">
        {page === 'dashboard' ?
          <Dashboard /> :
          <div className="flex flex-col w-full">
          <div className="flex flex-row gap-20 border-b-[2.5px] border-burgundy text-left text-4xl font-bold p-10">
            <FaAngleLeft />
            {page === 'product' && <span>상품관리</span>}
            {page === 'order' && <span>주문관리</span>}
            {page === 'cancel' && <span>취소관리</span>}
            {page === 'cancel' && <span>반품/교환관리</span>}
          </div>

          {page === 'product' && <ProductManage />}
          {page === 'order' && <OrderManage />}
          {page === 'cancel' && <CancelManage />}
          {page === 'return' && <ReturnManage />}
        </div>
        }
      </div>
    </div> 
  )
}