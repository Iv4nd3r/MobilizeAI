import React from 'react'
import './Login.css'
import GoogleLogo from '../src/assets/google-button.svg'

import { Link } from 'react-router-dom'
import LandingPage from '/src/components/LandingPage'

const Login = () => {
  return (
    // Wrapper div to apply specific styles that were previously applied globally to the body
    <div className="login-page">
      <div className="login-container">
        <div className="hello-banner">
          <Link to="/">
            <button className="back-button-login">←</button>
          </Link>

          <h1>Hello,</h1>
          <p>Welcome to MobilizeAI!</p>
        </div>
        <div className="right-panel">
          <form className="login-form">
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />

            {/* Forgot password link directly below password field */}
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>

            {/* Container for side-by-side Login and Sign Up buttons */}
            <div className="button-group">
              <button type="submit" className="login-btn">
                Login
              </button>
              <button type="button" className="signup-btn">
                Sign Up
              </button>
            </div>

            {/* Continue with Google button */}
            <button type="button" className="google-btn">
              <img src={GoogleLogo} alt="Google Logo" className="google-logo" />{' '}
              Continue With Google
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
