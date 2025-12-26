import { FaAngleRight } from 'react-icons/fa6'
import Dashboard from './Dashboard'
 
export default function admin() {
  return (
    <div className="flex flex-row w-full min-h-screen">
      <div className="flex flex-col w-1/5 py-10 items-center border-r border-black">
        <div className="flex flex-col mb-10">
          <div className="w-[200px] aspect-square bg-burgundy rounded-full mb-5" />
          <span className="text-xl font-bold text-burgundy">이름</span>
          <span className="text-lg text-burgundy">직급</span>
        </div>
        
        <div className="flex flex-row justify-between items-center w-full bg-burgundy text-white px-5 py-3">
          <span className="text-xl">상품관리</span>
          <FaAngleRight />
        </div>
      </div>

      <Dashboard />
    </div> 
  )
}