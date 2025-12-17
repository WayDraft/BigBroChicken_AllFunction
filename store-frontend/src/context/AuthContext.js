// store-frontend/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // 사용자 정보 (로그인 시 업데이트)
  const [user, setUser] = useState(null); 
  // 로딩 상태 (토큰 확인 중)
  const [loading, setLoading] = useState(true); 

  // 1. 로그인 함수
  const login = async (username, password) => {
    try {
      // POST /api/token/ 호출
      const response = await apiClient.post('/token/', { username, password });
      
      const { access, refresh } = response.data;

      // Access/Refresh 토큰을 쿠키에 저장
      Cookies.set('access_token', access, { expires: 1 / 24 }); // Access 토큰 (짧은 만료 시간)
      Cookies.set('refresh_token', refresh, { expires: 7 });     // Refresh 토큰 (긴 만료 시간)
      
      // 토큰을 사용하여 사용자 정보 가져오기 (마이페이지 API 활용)
      const userProfile = await apiClient.get('/profile/');
      setUser(userProfile.data);
      
      return true; // 로그인 성공
      
    } catch (error) {
      console.error("Login failed:", error);
      logout(); // 실패 시 토큰 삭제
      throw error;
    }
  };

  // 2. 로그아웃 함수
  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    setUser(null);
  };
  
  // 3. 회원가입 함수
  const register = async (username, email, password) => {
      await apiClient.post('/register/', { username, email, password });
      // 가입 성공 후 바로 로그인 시도
      return login(username, password); 
  };
  
  // 4. 초기 로드 시 사용자 정보 확인 (토큰 유효성 검사)
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = Cookies.get('access_token');
      if (accessToken) {
        try {
          // 토큰이 유효한지 확인하기 위해 프로필 API 호출
          const userProfile = await apiClient.get('/profile/');
          setUser(userProfile.data);
        } catch (error) {
          // 토큰이 만료되었거나 유효하지 않으면 로그아웃 처리
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};