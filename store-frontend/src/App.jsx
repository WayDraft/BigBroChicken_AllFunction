import './App.css'
import Header from './components/common/Header'
import LoginPage from './pages/LoginPage'
import Lunch from './components/menu/Lunch'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Lunch />} />
            <Route path="/menu/lunch" element={<Lunch />} />
            {/* 상품 상세 페이지 경로 추가 (ID를 변수로 받음) */}
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<div className="py-20 text-center">회원가입 페이지 준비 중</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App


{/* <Route path="/login" element={<LoginPage />} />
<Route path="/" element={<div className="py-20 text-center">홈 페이지 (준비 중)</div>} /> */}