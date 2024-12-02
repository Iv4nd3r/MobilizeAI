// src/pages/Register.js
import React from 'react'
import Header from '../src/components/Header' // Import Header if you want to include it at the top
import GoogleLogo from '../src/assets/google-button.svg'

import './Register.css'

import { Link } from 'react-router-dom'
import LandingPage from '../src/components/LandingPage'

function Register() {
  return (
    <div className="register-page">
      <Header />
      <div className="register-container">
        <div className="register-form">
          <Link to="/">
            <button className="back-button">←</button>
          </Link>
          <input type="text" placeholder="Name" className="input-field" />
          <input type="email" placeholder="Email" className="input-field" />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
          />
          <button className="sign-up-button">Sign Up</button>
          <button className="google-signin-button">
            <img src={GoogleLogo} alt="Google Logo" className="google-logo" />
            Continue with Google
          </button>
        </div>
        <div className="create-banner">
          <h1>Create</h1>
          <p>Your Account Now!</p>
        </div>
      </div>
    </div>
  )
}

export default Register
