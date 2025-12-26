import { useState } from 'react'
import OptionInput from '../../components/input/OptionInput'

export default function IDFindInform({ setIsVerified }) {
  const [otp, setOtp] = useState('')
  const [verified, setVerified] = useState(false)

  const handleVerify = () => {
    if (otp === '1234') {
      alert('인증번호가 확인되었습니다.')
      setVerified(true)
      setIsVerified(true)  // 부모에게 인증 성공을 알림
    } else {
      alert('인증번호가 틀렸습니다.')
    }
  }

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-row items-center justify-between w-full gap-3">
        <span className="w-1/5">이름</span>
        <OptionInput className="w-4/5" />
      </div>

      <div className="flex flex-row items-center justify-between w-full gap-3">
        <span className="w-1/5">전화번호</span>

        <div className="flex flex-col w-4/5 gap-3">
          <OptionInput />

          <div className="flex flex-row gap-2">
            <OptionInput
              value={otp}
              setValue={setOtp}
              className="w-40"
            />
            <button 
              onClick={handleVerify}
              className="bg-burgundy text-white px-3 py-2"
            >
              인증번호
            </button>
          </div>

          {verified && (
            <span className="text-green-600 text-sm text-left">인증이 완료되었습니다.</span>
          )}
        </div>

      </div>
    </div>
  )
}