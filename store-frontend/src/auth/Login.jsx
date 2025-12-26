import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="flex flex-col items-center w-full gap-10 py-20">
      <span className="text-4xl font-bold">로그인</span>

      <div className="flex flex-col w-1/3 gap-3">
        <input className="w-full border border-black px-5 py-3" placeholder="아이디" />
        <input className="w-full border border-black px-5 py-3" placeholder="비밀번호" type="password" />

        <div className="flex flex-row justify-end gap-5 text-md py-2">
          <Link to="/findID">아이디찾기</Link>
          <Link to="/findPw">비밀번호찾기</Link>
        </div>

        <button className="bg-burgundy text-white items-center py-4">로그인</button>
      </div>

      <div className="h-[1px] w-1/2 bg-black"></div>

      <div className="flex flex-col justify-center items-center w-1/3 gap-10">
        <span className="text-xl">아직 회원이 아니신가요?</span>
        <Link to="/signup" className="bg-burgundy text-white items-center py-4 w-full">회원가입</Link>
      </div>
    </div>
  )
}