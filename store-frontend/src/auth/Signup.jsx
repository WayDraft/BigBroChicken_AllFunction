import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DaumPostcode from 'react-daum-postcode'
import Form from '../components/common/Form'
import Input from '../components/input/OptionInput'
import InputError from '../components/input/InputError'

export default function Signup() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    id: "",
    password: "",
    confirmPW: "",
    name: "",
    address: "",
    detailAddress: "",
    phone: "",
  })

  const isPasswordSame = form.password === form.confirmPW

  const [agree, setAgree] = useState({
    personalInformation: false,
    terms: false,
    privacy: false,
  })

  const [openPostcode, setOpenPostcode] = useState(false)
  const [zipCode, setZipcode] = useState("")
  const [roadAddress, setRoadAddress] = useState("")

  const handleClick = () => {
    setOpenPostcode(prev => !prev)
  }

  const canSave =
    form.id && form.password && isPasswordSame && form.name &&
    form.address && form.phone &&
    agree.terms && agree.privacy

  // 공통 입력 핸들러
  const setValue = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSelectAddress = (data) => {
    setZipcode(data.zonecode)
    setRoadAddress(data.roadAddress)
    setValue('address', data.roadAddress)
    setOpenPostcode(false)
  }

  const handleSave = async () => {
    if (!canSave) {
      alert('정보를 모두 입력하세요.')
      return
    }

    try {
      await axios.post(
        'http://127.0.0.1:8000/accounts/signup/',
        {
          id: form.id,
          password: form.password,
          name: form.name,
          address: form.address,
          detailAddress: form.detailAddress,
          phone: form.phone,
        }
      )
      alert("회원가입을 환영합니다.")
      navigate('/login')
    } catch (err) {
      console.error(err.response?.data)
      alert("회원가입 실패")
    }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center lg:w-1/2 px-5 lg:px-0 py-20 gap-16">
        <span className="text-3xl lg:text-5xl font-bold">회원가입</span>

        <div className="flex flex-col gap-3 lg:gap-8 w-full text-left">
          <Form label="아이디">
            <InputError value={form.id} setValue={(v) => setValue('id', v)} />
          </Form>

          <div className="flex flex-col">
            <Form label="비밀번호" className="pb-3 lg:pb-8">
              <InputError value={form.password} setValue={(v) => setValue('password', v)} type="password" />
            </Form>
            
            <Form label="비밀번호 확인">
              <InputError value={form.confirmPW} setValue={(v) => setValue('confirmPW', v)} type="password" />
            </Form>

            {!isPasswordSame && (
              <div className="flex flex-col items-end pl-3">
                <span className="w-4/5 text-red-600 text-sm">비밀번호가 일치하지 않습니다.</span>
              </div>
            )}
          </div>

          <Form label="이름">
            <InputError value={form.name} setValue={(v) => setValue('name', v)} />
          </Form>

          <div className="flex flex-row justify-between items-center w-full gap-3 text-sm lg:text-lg">
            <span className="w-1/5">주소</span>
            <div className="flex flex-col w-4/5 gap-2">
              <div className="flex flex-row gap-2">
                <div className="border border-black px-3 py-2 w-40">{zipCode}</div>
                <button
                  type="button"
                  onClick={handleClick}
                  className="bg-burgundy px-3 py-2 text-white"
                >
                  주소검색
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

              <div className="flex items-center border border-black px-3 py-2 h-12">
                {roadAddress}
              </div>
              <Input value={form.detailAddress} setValue={(v) => setValue('detailAddress', v)} placeholder="상세주소" />
            </div>
          </div>

          <Form label="전화번호">
            <div className="flex flex-col gap-2">
              <InputError value={form.phone} setValue={(v) => setValue('phone', v)} placeholder="전화번호" />
              <div className="lg:w-4/5">
                <div className="flex flex-row gap-2 w-full">
                  <div className="border border-black px-3 py-2 w-40"></div>
                  <button className="bg-burgundy px-3 py-2 text-white">인증번호</button>
                </div>
              </div>
            </div>
          </Form>
        </div>

        <div className="flex flex-col gap-3 w-full text-sm lg:text-lg">
          <label>
            <div className="flex flex-row gap-3 items-center">
              <input
                type="checkbox"
                checked={agree.personalInformation}
                onChange={(e) => setAgree({...agree, personalInformation: e.target.checked})}
                className="w-3 lg:w-5 aspect-square accent-burgundy"
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
                className="w-3 lg:w-5 aspect-square accent-burgundy"
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
                className="w-3 lg:w-5 aspect-square accent-burgundy"
              />
              <span>[필수] 개인정보 수집 및 이용 동의</span>
            </div>
          </label>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="bg-burgundy py-2 lg:py-4 text-white w-1/2 text-lg lg:text-xl"
          >
            회원가입
          </button>
      </div>
    </div>
  )
}