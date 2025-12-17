import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/common/Header';
import Menu from './pages/Menu'; // 이전에 만드신 메뉴 페이지 임포트

function App() {
  return (
    <div className="App">
      {/* 상단에 Header를 배치하여 모든 페이지에서 로그인 상태를 확인 가능하게 함 */}
      <Header />
      
      <main>
        <Menu />
        {/* 여기에 라우터(Routes)를 설정하여 다른 페이지들을 연결하게 됨 */}
      </main>
    </div>
  );
}

export default App
