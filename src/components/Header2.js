import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Import Link and useNavigate
import logo from '/src/assets/mobilizeai-logo.svg' // Import logo
import Cookies from 'js-cookie' // Import Cookies

const Header2 = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)
  const navigate = useNavigate() // Initialize navigate
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogout = () => {
    Cookies.remove('token')
    setIsAuthenticated(false)
    console.log('User logged out') // Implement logout logic
    navigate('/') // Redirect to the landing page after logout
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-6 bg-[#17202F] text-white z-50">
        <div className="flex items-center">
          <Link to="/home">
            <img src={logo} alt="MobilizeAI Logo" className="h-8" />
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/aboutus">
            <button className="px-6 py-2 text-[#496595] bg-[#e5e5d5] font-black text-[15px] rounded-lg hover:bg-[#cfcfb8] hover:scale-105">
              About Us
            </button>
          </Link>
          <button
            className="px-6 py-2 text-[#496595] bg-[#e5e5d5] font-black text-[15px] rounded-lg hover:bg-[#cfcfb8] hover:scale-105"
            onClick={() => setShowLogoutPopup(true)}
          >
            Log out
          </button>
          <Link to="/AboutMePage">
            <div className="w-10 h-10 rounded-full bg-gray-500 flex justify-center items-center cursor-pointer">
              <span className="text-white font-bold">U</span>
            </div>
          </Link>
        </div>
      </header>

      {showLogoutPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white w-[90%] max-w-[400px] p-6 rounded-lg shadow-lg">
            <h2 className="text-[#17202F] font-bold text-lg mb-4">
              Confirm Logout
            </h2>
            <p className="text-[#496595] mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
              >
                Cancel
              </button>
            </div>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowLogoutPopup(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Header2
