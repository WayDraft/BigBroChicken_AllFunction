import { useState } from 'react'
import { Link } from 'react-router-dom'
import IDFindInform from './ID/IDFindInform'
import IDInform from './ID/IDInform'

export default function FindID() {
  const [isVerified, setIsVerified] = useState(false)  // 인증 성공 여부
  const [showResult, setShowResult] = useState(false)  // 아이디 확인 컴포넌트 띄우기

  const handleConfirm = () => {
    if (!isVerified) {
      alert("휴대폰 인증을 완료해주세요.")
      return
    }
    setShowResult(true)
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-1/3 py-20 gap-16">
        <span className="text-4xl font-bold">아이디찾기</span>

        {!showResult ?
          (<IDFindInform setIsVerified={setIsVerified} />) : (<IDInform />)
        }

        {!showResult ? (
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