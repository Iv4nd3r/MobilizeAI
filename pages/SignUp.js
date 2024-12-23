import Header from '../src/components/Header'
import GoogleLogo from '../src/assets/google-button.svg'
import React, { useState } from 'react'
import axios from 'axios'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import LandingPage from '../src/components/LandingPage'
import { userSignIn } from './api/user'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const navigate = useNavigate()

  const handleSignUp = async e => {
    e.preventDefault()
    try {
      const response = await userSignIn(name, email, password)
      setMessage(response.message)
      setShowPopup(true)
      const data = await response.json()
      if (response.ok) {
        navigate('/login')
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error during signup:', error)
      setMessage(error.response?.message || 'Something went wrong.')
      setShowPopup(true)
    }
  }

  const Popup = ({ message }) => (
    <div className="popup">
      <div className="popup-content">
        <p>{message}</p>
        <button
          className="popup-close-btn"
          onClick={() => {
            setShowPopup(false)
            navigate('/login')
          }}
        >
          Close
        </button>
      </div>
    </div>
  )

  return (
    <div className="register-page">
      <Header />
      <div className="register-container">
        <div className="register-form">
          <Link to="/">
            <button className="back-button">←</button>
          </Link>
          <input
            type="text"
            placeholder="Name"
            className="input-field"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="password-container">
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? 'Hide Password' : 'Show Password'}
            </button>
          </div>
          <button
            className="sign-up-button"
            type="button"
            onClick={handleSignUp}
          >
            Sign Up
          </button>

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
      {showPopup && (
        <Popup message={message} onClose={() => setShowPopup(false)} />
      )}
    </div>
  )
}

export default Register
