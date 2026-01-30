import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth(); // AuthContext에 register 함수가 있다고 가정합니다.
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('비밀번호가 일치하지 않습니다.');
    }

    try {
      const success = await register(formData.username, formData.email, formData.password);
      if (success) {
        alert("회원가입이 완료되었습니다!");
        navigate('/login');
      }
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#fdfaf5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-['AritaBuri']">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">회원가입</h2>
        <p className="mt-2 text-sm text-gray-600">친환경 라이프스타일을 시작해보세요.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-[#e8e3d9]">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">아이디</label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#2d5a27] focus:border-[#2d5a27]"
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">이메일</label>
              <input
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#2d5a27] focus:border-[#2d5a27]"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">비밀번호</label>
              <input
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#2d5a27] focus:border-[#2d5a27]"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
              <input
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#2d5a27] focus:border-[#2d5a27]"
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            {error && <p className="text-red-500 text-xs italic">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#2d5a27] text-white rounded-md font-bold hover:bg-[#24481f] transition-colors"
            >
              가입하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}