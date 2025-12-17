// 예시: 로그인 버튼 컴포넌트
import React from 'react';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, login, logout, loading } = useAuth();
  
  const handleLogin = () => {
    // 실제로는 폼에서 username과 password를 받아서 사용
    login('testuser', 'strongpassword123'); 
  }

  if (loading) {
      return <div>로딩 중...</div>;
  }

  return (
    <div>
      {user ? (
        // 로그인 상태
        <>
          <span>환영합니다, {user.username}님!</span>
          <button onClick={logout}>로그아웃</button>
        </>
      ) : (
        // 로그아웃 상태
        <button onClick={handleLogin}>로그인</button>
      )}
    </div>
  );
}