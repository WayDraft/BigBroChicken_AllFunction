import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import ScrollTop from './components/ScrollTop'
import Header from './components/Header'
import Footer from './components/Footer'
import QuickMenu from './components/QuickMenu'
import Slide from './components/Slide'
import Main from './app/page'
import Brand from './pages/Brand'
import Menu from './pages/Menu'
import Franchise from './pages/Franchise'
import Inquiry from './pages/Inquiry'
import Store from './pages/Store'
import Login from './auth/Login'
import Signup from './auth/Signup'
import FindID from './auth/FindID'
import FindPw from './auth/FindPw'
import Admin from './admin/Admin'
import Cart from './pages/Cart'

function AppContent() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin')

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <Slide isOpen={isOpen} setIsOpen={setIsOpen} />

      {!isAdmin && <QuickMenu />}

      <Routes>
        <Route path="/" element={<Main isOpen={isOpen} setIsOpen={setIsOpen} />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/store" element={<Store />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findID" element={<FindID />} />
        <Route path="/findPw" element={<FindPw />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollTop />
      <AppContent />
    </Router>
  )
}
