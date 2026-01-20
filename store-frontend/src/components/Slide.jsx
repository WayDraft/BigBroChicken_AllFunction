// 슬라이딩 메뉴 (모바일)

import { Link } from 'react-router-dom';

export default function Slide({isOpen, setIsOpen}) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full bg-white transform transition-transform duration-300 ease-in-out z-[9999] ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center bg-gray-200 p-4 mb-6">
          <div className="font-bold text-lg">메뉴</div>

          {/* 닫기버튼 */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-xl font-bold bg-transparent border-none"
          >
            ✕
          </button>
        </div>

        {/* 메뉴 */}
        <nav className="flex flex-col px-4 space-y-10 font-bold items-start">
          <Link to="/brand" className="text-gray-700 hover:text-lightBurgundy">브랜드소개</Link>
          <Link to="/menu" className="text-gray-700 hover:text-lightBurgundy">메뉴소개</Link>
          <Link to="/franchise" className="text-gray-700 hover:text-lightBurgundy">가맹소개</Link>
          <Link to="/inquiry" className="text-gray-700 hover:text-lightBurgundy">가맹문의</Link>
        </nav>
      </div>
    </div>
  )
}