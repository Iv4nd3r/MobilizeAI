import React, { useState, useEffect } from 'react'
import './AboutMe.css'
import { FaPen } from 'react-icons/fa'
import { loadEnergyData } from './Home'
import { fetchUserData } from './api/user'
import Cookies from 'js-cookie'

const AboutMePage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Energy Usage (kWh)',
        data: [],
        borderColor: '#cfd8dc',
        backgroundColor: 'rgba(207, 216, 220, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#cfd8dc',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#cfd8dc'
      }
    ]
  })

  useEffect(() => {
    const token = Cookies.get('token') // Retrieve the token from cookies
    if (token) {
      fetchUserData(token)
        .then(userData => {
          setName(userData.name) // Set the user's name in the state
        })
        .catch(error => {
          console.error('Error fetching user data:', error)
        })
      fetchEnergy(token)
    }
  }, [])

  const fetchEnergy = async token => {
    const energyData = await loadEnergyData(token)

    const labels = energyData.map(entry =>
      new Date(entry.createdAt).toLocaleDateString()
    )
    const data = energyData.map(entry => entry.energyUsed)

    setLineChartData({
      labels,
      datasets: [
        {
          label: 'Energy Usage (kWh)',
          data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)'
        }
      ]
    })
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleNameChange = e => {
    setName(e.target.value)
  }

  const toggleEditMode = () => {
    setIsEditing(!isEditing)
  }

  return (
    <div className="about-me-page">
      <div className="about-me-container">
        <div className="user-info">
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onBlur={toggleEditMode}
              autoFocus
            />
          ) : (
            <>
              <h2>{name}</h2>
              <FaPen className="edit-icon" onClick={toggleEditMode} />
            </>
          )}
          <div className="user-info-line"></div>
        </div>

        <div className="address-section">
          <h3>Home Address</h3>
          <input
            className="address-input"
            type="text"
            placeholder="Enter Home Address"
          />
        </div>

        <div className="address-section">
          <h3>Work Address</h3>
          <input
            className="address-input"
            type="text"
            placeholder="Enter Work Address"
          />
        </div>

        <div className="change-password-section">
          <input
            className="change-password-input"
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Change Password"
          />
          <button
            className="change-password-button"
            onClick={togglePasswordVisibility}
          >
            Change Password
          </button>
        </div>

        <div className="history-section">
          <h3>Your History</h3>
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Energy</th>
              </tr>
            </thead>
            <tbody>
              {lineChartData.labels.map((label, index) => (
                <tr key={index}>
                  <td>{label}</td>
                  <td>{lineChartData.datasets[0].data[index]} kWh</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AboutMePage
