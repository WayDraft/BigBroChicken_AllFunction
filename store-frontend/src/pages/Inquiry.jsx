import { useEffect, useRef, useState } from 'react'
import PersonalAgree from '../components/PersonalInformAgree'
import InputError from '../components/input/InputError'

function useInView(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver (
      ([entry]) => setVisible(entry.isIntersecting),
      options
    )
    if (ref.current) observer.observe(ref.current)
      return () => observer.disconnect()
  }, [options])
  
  return [ref, visible]
}

function ScrollAnimation({ children, className="" }) {
  const [ref, isVisible] = useInView({threshold: 0})

  return (
    <div
      ref = {ref}
      className={`transition-all duration-1000 ease-out transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}  
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default function Inquiry() {
  const [choose, setChoose] = useState('있음' | '없음' | null);

  const [modalOpen, setModalOpen] = useState(false);

  const modal = (
    <div className="relative">
      <button
        className="py-1 px-2 lg:px-5 bg-gray-800 text-xs lg:text-md text-white flex justify-center items-center"
        onClick={() => setModalOpen(true)}
      >
        전문보기
      </button>
      <PersonalAgree
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col">
        <ScrollAnimation className="flex flex-col w-full py-20 px-5 lg:px-0">
          <span className="text-3xl lg:text-5xl font-bold pb-10">가맹문의</span>
          <p className="text-sm  lg:text-xl">
            본사로 접수되는 이메일 문의입니다.<br/>
            촬영 예약과 관련된 문의는 'Q&A'를 통해 지점의 카카오톡 플러스 친구로 문의 부탁드립니다.<br/>
            내용 확인되는대로 기재해주신 이메일 주소로 회신드리겠습니다
          </p>
        </ScrollAnimation>

        <div className="w-full border-[1px] border-black mb-10" />

        <ScrollAnimation className="w-full flex flex-col space-y-4 px-4 pb-10 text-sm lg:text-md">
          <div className="flex flex-row justify-between w-full">
            <div className="w-1/5 flex items-center font-bold">고객명</div>
            <InputError />
          </div>

          <div className="flex flex-row justify-between w-full">
            <div className="w-1/5 flex items-center font-bold">연락처</div>
            <InputError />
          </div>

          <div className="flex flex-row justify-between w-full">
            <div className="w-1/5 flex items-center font-bold">희망지역</div>
            <InputError />
          </div>

          <div className="flex flex-row justify-between">
            <div className="w-1/5 flex items-center font-bold">창업경험</div>
            <div className="w-full flex flex-row space-x-3">
              <button
                onClick={() => setChoose('있음')}
                className={`
                  w-[100px] lg:w-[150px] flex items-center justify-center border border-black
                  ${choose==='있음' ? 'bg-gray-700 text-white' : 'bg-white text-black'}
                `}
              >
                있음
              </button>
              <button
                onClick={() => setChoose('없음')}
                className={`
                  w-[100px] lg:w-[150px] flex items-center justify-center border border-black
                  ${choose==='없음' ? 'bg-gray-700 text-white' : 'bg-white text-black'}
                `}
              >
                없음
              </button>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full pb-10">
            <div className="w-1/5 flex items-center font-bold">상세 문의내용</div>
            <textarea className="w-full h-[150px] border border-black p-2" placeholder="문의내용을 입력해주세요." />
          </div>

          <div className="flex flex-row items-center justify-between w-full p-3 border border-black">
            <div className="flex flex-row items-center text-xs lg:text-md">
              <input
                type="checkbox"
                className="w-3 lg:w-5 aspect-square rounded-full border-2 border-gray-400 checked:bg-burgundy mr-3"
              />
              <p>개인정보취급방침을 읽었으며 이에 동의합니다.</p>
            </div>
            {modal}
          </div>

          <div className="w-full flex justify-center items-center py-10">
            <button className="w-[250px] bg-red-700 p-3 flex justify-center items-center text-white font-bold">
              상담 신청하기
            </button>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}