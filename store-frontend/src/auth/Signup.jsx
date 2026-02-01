import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DaumPostcode from 'react-daum-postcode'
import Form from '../components/common/Form'
import Input from '../components/input/OptionInput'
import InputError from '../components/input/InputError'

export default function Signup() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPW, setConfirmPW] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [detailAddress, setDetailAddress] = useState('')
  const [phone, setPhone] = useState('')

  const [openPostcode, setOpenPostcode] = useState(false)
  const [zipCode, setZipcode] = useState("")
  const [roadAddress, setRoadAddress] = useState("")

  const navigate = useNavigate()

  const handleClick = () => {
    setOpenPostcode((prev) => !prev)
  }

  const handleSelectAddress = (data) => {
    setZipcode(data.zonecode)
    setRoadAddress(data.roadAddress)
    setAddress(data.roadAddress)
    setOpenPostcode(false)
  }

  const [agree, setAgree] = useState({
    personalInformation: false,
    terms: false,
    privacy: false,
  })

  const isPasswordSame = password === confirmPW

  const canSave =
    id && password && isPasswordSame && name && address && phone &&
    agree.terms && agree.privacy

  const handleSave = () => {
    if (!canSave) {
      alert('정보를 모두 입력하세요.')
      return
    }

    alert('회원가입을 환영합니다.')
    navigate('/login')
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-1/2 py-20 gap-16">
        <span className="text-4xl font-bold">회원가입</span>

        <div className="flex flex-col gap-8 w-full text-left">
          <Form label="아이디">
            <InputError value={id} setValue={setId} />
          </Form>

          <div className="flex flex-col">
            <Form label="비밀번호" className="pb-8">
              <InputError value={password} setValue={setPassword} type="password" />
            </Form>
            
            <Form label="비밀번호 확인">
              <InputError value={confirmPW} setValue={setConfirmPW} type="password" />
            </Form>

            {!isPasswordSame && (
              <div className="flex flex-col items-end pl-3">
                <span className="w-4/5 text-red-600 text-sm">비밀번호가 일치하지 않습니다.</span>
              </div>
            )}
          </div>

          <Form label="이름">
            <InputError value={name} setValue={setName} />
          </Form>

          <div className="flex flex-row justify-between items-center w-full gap-3 text-lg">
            <span className="w-1/5">주소</span>
            <div className="flex flex-col w-4/5 gap-2">
              <div className="flex flex-row gap-2">
                <div className="border border-black px-3 py-2 w-40">{zipCode}</div>
                <button
                  type="button"
                  onClick={handleClick}
                  className="bg-burgundy px-3 py-2 text-white"
                >
                  주소 검색
                </button>

                {/* 주소 검색 모달 */}
                {openPostcode && (
                  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[600px] relative">
                      {/* 닫기 버튼 */}
                      <button
                        onClick={() => setOpenPostcode(false)}
                        className="absolute top-3 right-3 text-gray-500"
                      >
                        ✕
                      </button>

                      {/* 주소 검색 */}
                      <DaumPostcode
                        onComplete={handleSelectAddress}
                        autoClose={false}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div
                value={address} setValue={setAddress}
                className="flex items-center border border-black px-3 py-2 h-12"
              >
                {roadAddress}
              </div>
              <Input value={detailAddress} setValue={setDetailAddress} placeholder="상세주소" />
            </div>
          </div>

          <Form label="전화번호">
            <div className="flex flex-col gap-2">
              <InputError value={phone} setValue={setPhone} placeholder="전화번호" />
              <div className="w-4/5">
                <div className="flex flex-row gap-2 w-full">
                  <div className="border border-black px-3 py-2 w-40"></div>
                  <button className="bg-burgundy px-3 py-2 text-white">인증번호</button>
                </div>
              </div>
            </div>
          </Form>
        </div>

        <div className="flex flex-col gap-3 w-full text-lg">
          <label>
            <div className="flex flex-row gap-3 items-center">
              <input
                type="checkbox"
                checked={agree.personalInformation}
                onChange={(e) => setAgree({...agree, personalInformation: e.target.checked})}
                className="w-5 h-5 accent-burgundy"
              />
              <span>이용약관, 개인정보 수집 및 이용에 모두 동의합니다.</span>
            </div>
          </label>
          
          <label>
            <div className="flex flex-row gap-3 items-center">
              <input 
                type="checkbox"
                checked={agree.terms}
                onChange={(e) => setAgree({...agree, terms: e.target.checked})}
                className="w-5 h-5 accent-burgundy"
              />
              <span>[필수]  이용약관 동의</span>
            </div>
          </label>

          <label>
            <div className="flex flex-row gap-3 items-center">
              <input
                type="checkbox"
                checked={agree.privacy}
                onChange={(e) => setAgree({...agree, privacy: e.target.checked})}
                className="w-5 h-5 accent-burgundy"
              />
              <span>[필수] 개인정보 수집 및 이용 동의</span>
            </div>
          </label>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="bg-burgundy py-4 text-white w-1/2 text-xl"
          >
            회원가입
          </button>
      </div>
    </div>
  )
}