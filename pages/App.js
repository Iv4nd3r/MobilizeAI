import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from '/src/components/LandingPage';
import Header from '/src/components/Header'; // This is your basic header (Header.js)
import Header2 from '/src/components/Header2'; // This is your logged-in header (Header2.js)
import Register from './Register';
import Login from './Login';
import Home from './Home';
import AboutMePage from './AboutMePage';
import AboutUs from './AboutUs';

import NotFound from './NotFound'
import './index.css'

// Conditional Header Component
const ConditionalHeader = () => {
  const location = useLocation();

  // Routes that use Header (basic header)
  const basicHeaderRoutes = ['/', '/register', '/login'];

  // Routes that use Header2 (logged-in header)
  const loggedInHeaderRoutes = ['/home', '/AboutMePage', '/aboutus'];

  if (basicHeaderRoutes.includes(location.pathname)) {
    return <Header />; // Render Header.js
  } else if (loggedInHeaderRoutes.includes(location.pathname)) {
    return <Header2 />; // Render Header2.js
  } else {
    return null; // No header for unmatched routes
  }
};

// App component
function App() {
  return (
    <Router>
      <ConditionalHeader /> {/* This will render the correct header based on the route */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/AboutMePage" element={<AboutMePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
