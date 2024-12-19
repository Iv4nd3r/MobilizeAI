import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import Cookies from 'js-cookie'
import LandingPage from '/src/components/LandingPage'
import Header from '/src/components/Header'
import Header2 from '/src/components/Header2'
import Register from './SignUp'
import Login from './Login'
import Home from './Home'
import AboutMePage from './AboutMePage'
import AboutUs from './AboutUs'
import NotFound from './NotFound'
import './index.css'

const ConditionalHeader = () => {
  const location = useLocation()

  const basicHeaderRoutes = ['/', '/register', '/login']

  const loggedInHeaderRoutes = ['/home', '/AboutMePage', '/aboutus']

  if (basicHeaderRoutes.includes(location.pathname)) {
    return <Header />
  } else if (loggedInHeaderRoutes.includes(location.pathname)) {
    return <Header2 />
  } else {
    return null
  }
}

const PrivateRoute = ({ element, ...rest }) => {
  const token = Cookies.get('token')
  return token ? element : <Navigate to="/login" />
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <Router>
      <ConditionalHeader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/AboutMePage"
          element={<PrivateRoute element={<AboutMePage />} />}
        />
        <Route
          path="/aboutus"
          element={<PrivateRoute element={<AboutUs />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
