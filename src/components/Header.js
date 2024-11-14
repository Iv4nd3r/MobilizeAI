// src/components/Header.js
import React from 'react';
import logo from '../assets/mobilizeai-logo.svg'; // Import the logo image
import '@fontsource/montserrat'; // Import Montserrat font
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-6 bg-[#17202F] text-white z-50">
      <div className="flex items-center">
        <img src={logo} alt="MobilizeAI Logo" className="h-8" /> {/* Adjust height if needed */}
      </div>
      <div className="flex space-x-4">
        <Link to="/register">
        <button
          className="px-6 py-2 text-[#496595] bg-[#e5e5d5] font-black text-[15px] rounded-lg transition-transform duration-200 hover:bg-[#cfcfb8] hover:scale-105"
          style={{ fontFamily: 'Montserrat' }}
        >
          Register
        </button>
        </Link>

        <Link to="/login">
        <button
          className="px-6 py-2 text-[#496595] bg-[#e5e5d5] font-black text-[15px] rounded-lg transition-transform duration-200 hover:bg-[#cfcfb8] hover:scale-105"
          style={{ fontFamily: 'Montserrat' }}
        >
          Sign in
        </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;