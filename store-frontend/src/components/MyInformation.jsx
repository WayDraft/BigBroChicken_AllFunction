import React, { useState, useEffect } from "react"
import { useAuth } from '../context/AuthContext'
import Input from "../components/input/OptionInput"
import InputError from "../components/input/InputError"
import DaumPostcode from 'react-daum-postcode'
import apiClient from '../services/apiClient'
import Cookies from 'js-cookie'

console.log("토큰: ", Cookies.get("access_token"))

export default function MyInformation() {
  const { user, loading } = useAuth()
  const [userData, setUserData] = useState(null)

  // 수정 가능한 정보 (초기값 有)
  const [name, setName] = useState('')   // 이름
  const [address, setAddress] = useState('')   // 주소
  const [detailAddress, setDetailAddress] = useState('')   // 상세주소
  const [phone, setPhone] = useState('')   // 전화번호

  // 비밀번호 관련
  const [currentPW, setCurrentPW] = useState('')
  const [newPW, setNewPW] = useState('')
  const [confirmPW, setConfirmPW] = useState('')

  const isPasswordSame = newPW === confirmPW

  // 주소 검색
  const [zipCode, setZipcode] = useState('')
  const [openPostcode, setOpenPostcode] = useState(false)

  const handleClick = () => setOpenPostcode((prev) => !prev)

  const handleSelectAddress = (data) => {
    setZipcode(data.zonecode)
    setAddress(data.roadAddress)
    setOpenPostcode(false)
  }
  // 초기 데이터 불러오기
  useEffect(() => {
    if (!user) return;

    apiClient.get("/my_info/").then(res => {
      setUserData(res.data)
      setName(res.data.name || '')
      setAddress(res.data.address|| '')
      setDetailAddress(res.data.detailAddress || '')
      setPhone(res.data.phone || '')
    }).catch(err => {
      console.error("회원정보 불러오기 실패: ", err)
    })
  }, [user])

  const canSave =
    (
      (!currentPW && !newPW && !confirmPW) ||   // 비밀번호 바꾸지 않는 경우
      (currentPW && newPW && confirmPW && isPasswordSame)   // 비밀번호 바꾸는 경우
    ) &&
    name && address && phone

  // 업데이트 정보 저장
  const handleSave = async () => {
    if (!canSave) {
      alert('정보를 모두 입력하세요.')
      return
    }

    try {
      const payload = {
        currentPW: currentPW || undefined,
        newPW: newPW || undefined,
        name, address, detailAddress, phone
      }
      const res = await apiClient.put("/update_profile/", payload)
      alert(res.data.message || '정보를 저장했습니다.')

      // 비밀번호 입력 초기화
      setCurrentPW('')
      setNewPW('')
      setConfirmPW('')
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.error || '저장 중 오류가 발생했습니다.')
    }
  }

  

  return (
    <div className="flex flex-col items-center w-full px-20">
      <div className="flex flex-col gap-8 w-1/2 text-left">
        {/* 아이디 */}
        <div className="flex flex-row justify-between items-center w-full gap-3 text-lg">
          <span className="w-1/5">아이디</span>
          <span className="w-4/5 px-3 py-2">{userData?.id}</span>
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-row justify-center items-center w-full gap-3 text-lg">
          <span className="w-1/5">비밀번호</span>
          <div className="w-4/5 flex flex-col gap-3">
          {/* 기존 비밀번호 */}
            <Input
              type="password"
              value={currentPW}
              setValue={setCurrentPW}
              placeholder="현재 비밀번호"
            />

            {/* 새 비밀번호 */}
            <Input
              type="password"
              value={newPW}
              setValue={setNewPW}
              placeholder="새 비밀번호"
              disabled={!currentPW}
            />

            <Input
              type="password"
              value={confirmPW}
              setValue={setConfirmPW}
              placeholder="새 비밀번호 확인"
              disabled={!currentPW}
            />
            {newPW && confirmPW && !isPasswordSame && (
              <span className="text-red-600 text-sm">비밀번호가 일치하지 않습니다.</span>
            )}

          </div>
        </div>

        {/* 이름 */}
        <div className="flex flex-row justify-between items-center w-full gap-3 text-lg">
          <span className="w-1/5">이름</span>
          <div className="w-4/5">
            <InputError
              value={name}
              setValue={setName}
            />
          </div>
        </div>

        {/* 주소 */}
        <div className="flex flex-row justify-between items-center w-full gap-3 text-lg">
          <span className="w-1/5">주소</span>
          <div className="flex flex-col w-4/5 gap-3">
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
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z- 50">
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

            <InputError
              value={address}
              setValue={setAddress}
            />

            <Input
              value={detailAddress}
              setValue={setDetailAddress}
            />
          </div>
        </div>

        {/* 전화번호 */}
        <div className="flex flex-row justify-between items-center w-full gap-3 text-lg">
          <span className="w-1/5">전화번호</span>
          <div className="w-4/5">
            <InputError
              value={phone}
              setValue={setPhone}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end w-1/2 pt-5 pb-10">
        <span className="text-burgundy">회원탈퇴</span>
      </div>

      {/* 저장버튼 */}
      <div className="flex flex-row w-1/3">
        <button
          type="button"
          onClick={handleSave}
          className="py-5 w-full bg-burgundy text-white cursor-pointer text-xl rounded-md"
        >
          회원정보 수정
        </button>
      </div>
    </div>
  )
}