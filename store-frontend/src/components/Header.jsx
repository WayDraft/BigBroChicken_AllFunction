// 헤더 (컴퓨터)
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaShoppingCart } from 'react-icons/fa'

export default function Header({isOpen, setIsOpen}) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white w-full border-b border-gray">
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-center justify-end px-8 pt-5 gap-5">
          {user ? (
            <>
              <span>{user.username} 님</span>
              <button onClick={handleLogout} className="hover:text-red-700">로그아웃</button>
              <Link to="/cart">
                <FaShoppingCart className="text-2xl hover:text-red-700" />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-red-700">로그인</Link>
              <Link to="/signup" className="hover:text-red-700">회원가입</Link>
            </>
          )}
          
        </div>
        <div className="w-full h-20 flex flex-low items-center justify-between pr-8">
          <div className="relative w-[170px] h-[60px]">
            <Link to="/" className="block">
              <img src="/img/logo.png" className="absolute" />
            </Link>
          </div>

          <div className="hidden lg:flex space-x-8 text-black font-bold">
            <Link to="/brand" className="hover:text-lightBurgundy">브랜드소개</Link>
            <Link to="/menu" className="hover:text-lightBurgundy">메뉴소개</Link>
            <Link to="/franchise" className="hover:text-lightBurgundy">가맹소개</Link>
            <Link to="/inquiry" className="hover:text-lightBurgundy">가맹문의</Link>
          </div>

          {/* 햄버거 버튼 */}
          <button
            className="lg:hidden flex flex-col items-end justify-center h-full space-y-1 bg-transparent border-none p-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-8 h-1 bg-burgundy"></div>
            <div className="w-8 h-1 bg-burgundy"></div>
            <div className="w-8 h-1 bg-burgundy"></div>
          </button>
        </div>
      </div>
    </header>
  )
}