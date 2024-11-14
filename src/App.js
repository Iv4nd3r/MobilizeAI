import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AboutMePage from './pages/AboutMePage';

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
  );
}

export default App;
