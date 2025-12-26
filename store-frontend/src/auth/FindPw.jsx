import { useState } from 'react'
import { Link } from 'react-router-dom'
import PwFindInform from './PW/PwFindInform'
import PwReset from './PW/PwReset'

export default function FindPw() {
  const [isVerified, setIsVerified] = useState(false)  // 인증 성공 여부
  const [showReset, setShowReset] = useState(false)

  const handleConfirm = () => {
    if (!isVerified) {
      alert("휴대폰 인증을 완료해주세요.")
      return
    }
    setShowReset(true)
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-1/3 py-20 gap-16">
        <span className="text-4xl font-bold">
          {!showReset ? "비밀번호 찾기" : "비밀번호 재설정"}
        </span>
        
        {!showReset ?
          (<PwFindInform setIsVerified={setIsVerified} />) : (<PwReset />)
        }

        {!showReset ? (
          <button
            onClick={handleConfirm}
            className="w-full py-4 bg-burgundy text-white text-xl"
          >
            확인
          </button>
        ) : (
          <Link
            to="/login"
            className="w-full py-4 bg-burgundy text-white text-xl"
          >
            확인
          </Link>
        )}
      </div>
    </div>
  )
}