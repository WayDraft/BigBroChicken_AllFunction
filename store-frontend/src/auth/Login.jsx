import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const success = await login(userName, password)
      if (success) navigate('/')
    } catch (err) {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.')
    }
  }

  return (
    <div className="flex flex-col items-center w-full gap-10 py-20">
      <span className="text-4xl font-bold">로그인</span>

      <form className="flex justify-center items-center w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col w-1/3 gap-3">
          <input
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="아이디"
            className="w-full border border-black px-5 py-3"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full border border-black px-5 py-3"
          />

          {error && <p className="text-red-500 text-xs italic">{error}</p>}

          <div className="flex flex-row justify-end gap-5 text-md py-2">
            <Link to="/findID">아이디찾기</Link>
            <Link to="/findPw">비밀번호찾기</Link>
          </div>

          <button className="bg-burgundy text-white items-center py-4">로그인</button>
        </div>
      </form>

      <div className="h-[1px] w-1/2 bg-black"></div>

      <div className="flex flex-col justify-center items-center w-1/3 gap-10">
        <span className="text-xl">아직 회원이 아니신가요?</span>
        <Link to="/signup" className="bg-burgundy text-white items-center py-4 w-full">회원가입</Link>
      </div>
    </div>
  )
}