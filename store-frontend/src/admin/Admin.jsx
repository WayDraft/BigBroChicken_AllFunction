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

  const menuList = [
    {
      label: "대시보드",
      value: "dashboard"
    },
    {
      label: "상품관리",
      value: "product"
    },
    {
      label: "주문관리",
      value: "order"
    },
    {
      label: "취소/반품/교환관리",
      value: "group",
      children: [
        { label: "취소관리", value: "cancel" },
        { label: "반품/교환관리", value: "return" }
      ]
    }
  ]

  return (
    <>

      <div className="flex flex-row w-full min-h-screen bg-gray-200">
        <div className="flex flex-col w-1/6 pt-10 items-center border-r border-black bg-gray-700">
          <div className="flex flex-col mb-10">
            <div className="w-[200px] aspect-square bg-white rounded-full mb-5" />
            <span className="text-xl font-bold text-white">이름</span>
            <span className="text-lg text-white">직급</span>
          </div>
          
          <div className="flex flex-col w-full h-screen border-t border-white text-white">
            {menuList.map((menu) => {
              if (!menu.children) {
                return (
                  <button
                    key={menu.value}
                    onClick={() => {
                      setPage(menu.value)
                      setListOpen(false)
                    }}
                    className={`
                      flex flex-row justify-between items-center px-8 py-5 hover:text-red-400 border-b border-b-white/30
                      ${page === menu.value
                        ? "bg-gray-600 border-l-[5px] border-l-burgundy"
                        : "bg-gray-700 border-l-[5px] border-l-transparent"}
                    `}
                  >
                    <span className="text-xl">{menu.label}</span>
                    <FaAngleRight />
                  </button>
                )
              }

              return (
                <div key={menu.value}>
                  <button
                    onClick={() => setListOpen(prev => !prev)}
                    className={`
                      flex flex-row justify-between items-center w-full px-8 py-5 hover:text-red-400 border-b border-b-white/30
                      ${
                        menu.children.some(c => c.value === page)
                          ? "bg-gray-600 border-l-[5px] border-burgundy"
                          : "bg-gray-700 border-l-[5px] border-transparent"
                      }
                    `}
                  >
                    <span className="text-xl">{menu.label}</span>
                    <FaAngleRight className={`transition-transform ${listOpen ? "rotate-90" : ""}`} />
                  </button>

                  {listOpen && (
                    <div className="flex flex-col w-full">
                      {menu.children.map((children) => (
                        <button
                          key={children.value}
                          onClick={() => setPage(children.value)}
                          className={`
                            flex flex-row justify-between items-center px-8 py-5 hover:text-red-400 border-b border-b-white/30
                            ${page === children.value ? "bg-gray-500 text-white" : "bg-gray-600"}
                          `}
                        >
                          <span className="text-xl">{children.label}</span>
                          <FaAngleRight />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="w-5/6">
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center gap-5 bg-gray-700 text-white text-left text-3xl font-bold px-5 py-8">
              <FaAngleLeft />
              {page === 'dashboard' && <span>대시보드</span>}
              {page === 'product' && <span>상품관리</span>}
              {page === 'order' && <span>주문관리</span>}
              {page === 'cancel' && <span>취소관리</span>}
              {page === 'return' && <span>반품/교환관리</span>}
            </div>

            <div className="p-20">
              {page === 'dashboard' && <Dashboard />}
              {page === 'product' && <ProductManage />}
              {page === 'order' && <OrderManage />}
              {page === 'cancel' && <CancelManage />}
              {page === 'return' && <ReturnManage />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}