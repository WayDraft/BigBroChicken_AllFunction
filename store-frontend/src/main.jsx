// store-frontend/src/main.jsx (Vite)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from '../context/AuthContext'; // 임포트

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AuthProvider로 App 컴포넌트 전체를 감싸서 인증 상태를 공유 */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)