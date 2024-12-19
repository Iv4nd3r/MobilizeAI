import './Login.css'
import GoogleLogo from '../src/assets/google-button.svg'
import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import LandingPage from '/src/components/LandingPage'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const response = await fetch(
        'https://server-one-clover.vercel.app/login',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      )
      setMessage(response.message)
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('token', data.token)
        navigate('/home')
      } else {
        alert(data.message)
      }
    } catch (error) {
      setMessage(error.response?.message || 'Invalid email or password.')
    }
  }

  return (
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
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <a href="#" className="forgot-password">
              Forgot Password?
            </a>

            <div className="button-group">
              <button type="submit" className="login-btn">
                Login
              </button>
              <button type="button" className="signup-btn">
                Sign Up
              </button>
            </div>

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
