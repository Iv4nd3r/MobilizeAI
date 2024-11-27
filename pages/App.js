import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Header from './components/Header'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import AboutMePage from './AboutMePage'

// App component
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/AboutMePage" element={<AboutMePage />} />
      </Routes>
    </Router>
  )
}

export default App
