// store-frontend/src/services/apiClient.js
import axios from 'axios';
import Cookies from 'js-cookie';

// Django 백엔드의 기본 URL
const API_BASE_URL = 'http://127.0.0.1:8000/api'; 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// **요청 인터셉터**: 모든 요청이 나가기 전에 실행
apiClient.interceptors.request.use(
  (config) => {
    // 1. 쿠키에서 Access Token을 가져옵니다.
    const accessToken = Cookies.get('access_token');
    
    // 2. 토큰이 있다면 Authorization 헤더에 Bearer 토큰 형식으로 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;