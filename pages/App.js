import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from '/src/components/LandingPage';
import Header from '/src/components/Header'; 
import Header2 from '/src/components/Header2'; 
import Register from './SignUp';
import Login from './Login';
import Home from './Home';
import AboutMePage from './AboutMePage';
import AboutUs from './AboutUs';

import NotFound from './NotFound'
import './index.css'

const ConditionalHeader = () => {
  const location = useLocation();

  const basicHeaderRoutes = ['/', '/register', '/login'];

  const loggedInHeaderRoutes = ['/home', '/AboutMePage', '/aboutus'];

  if (basicHeaderRoutes.includes(location.pathname)) {
    return <Header />; 
  } else if (loggedInHeaderRoutes.includes(location.pathname)) {
    return <Header2 />; 
  } else {
    return null; 
  }
};

function App() {
  return (
    <Router>
      <ConditionalHeader /> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/AboutMePage" element={<AboutMePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
