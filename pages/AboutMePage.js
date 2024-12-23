import React, { useState, useEffect } from 'react'
import './AboutMe.css'
import { FaPen } from 'react-icons/fa'
import { fetchEnergyData } from './api/energy'
import {
  fetchUserData,
  changeUserName,
  changePass,
  saveHome,
  saveWork
} from './api/user'
import autocompleteSearch from './api/autocomplete'
import Cookies from 'js-cookie'

const AboutMePage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [username, setUserName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([])
  const [location, setLocation] = useState('')
  const [locationInputHome, setLocationInputHome] = useState('')
  const [locationInputWork, setLocationInputWork] = useState('')
  const [lock, setLock] = useState('')
  const [temPass, setTemPass] = useState('')
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
          setUserName(userData.name) // Set the user's name in the state
          if (userData.homeAdd.length > 0) {
            setLocationInputHome(userData.homeAdd)
          }
          if (userData.workAdd.length > 0) {
            setLocationInputWork(userData.workAdd)
          } else {
            console.log('No work / home location set')
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error)
        })
      fetchEnergy(token)
    }
  }, [])

  const fetchEnergy = async token => {
    const energyData = await fetchEnergyData(token)

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

  const toggleEditMode = () => {
    setIsEditing(!isEditing)
  }

  const handleNameChange = e => {
    setUserName(e.target.value)
    if (e.key === 'Enter') {
      const token = Cookies.get('token') // Retrieve the token from cookies
      changeUserName(token, username)
    }
  }

  const handleHomeLocationChange = e => {
    setLocationInputHome(e.target.value)
    if (e.key === 'Enter') {
      handleLocationSearch(e)
    }
  }

  const handleWorkLocationChange = e => {
    setLocationInputWork(e.target.value)
    if (e.key === 'Enter') {
      handleLocationSearch(e)
    }
  }

  const handleChangePass = e => {
    setTemPass(e.target.value)
    if (e.key === 'Enter') {
      const token = Cookies.get('token') // Retrieve the token from cookies
      changePass(token, temPass)
    }
  }

  const handleChangePassBtn = () => {
    const token = Cookies.get('token') // Retrieve the token from cookies
    changePass(token, temPass)
  }

  const handleLocationSearch = async e => {
    if (e.target.value.length > 2) {
      try {
        const data = await autocompleteSearch(e.target.value)
        setAutocompleteSuggestions(
          data.features.map(feature => {
            return {
              label: feature.properties.label
            }
          })
        )
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error)
      }
    } else {
      setAutocompleteSuggestions([])
    }
  }

  const handleSearchBox = (e, pass) => {
    if (e.key === 'Enter') {
      setLock(pass)
      handleLocationSearch(e)
    }
  }

  const handleSuggestionClick = async suggestion => {
    try {
      switch (lock) {
        case 1:
          setLocation(suggestion)
          setLocationInputHome(suggestion)
          break
        case 2:
          setLocation(suggestion)
          setLocationInputWork(suggestion)
          break
        default:
          console.error('Invalid key value passed to handleSuggestionClick')
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error)
    }
    setAutocompleteSuggestions([])
  }

  const saveLocation = async () => {
    const token = Cookies.get('token') // Retrieve the token from cookies
    if (lock === 1) {
      saveHome(token, location)
    } else if (lock === 2) {
      saveWork(token, location)
    } else {
      console.error('Error on saving location')
    }
  }

  return (
    <div className="about-me-page">
      <div className="about-me-container">
        <div className="user-info">
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={handleNameChange}
              onKeyUp={handleNameChange}
              onBlur={toggleEditMode}
              autoFocus
            />
          ) : (
            <>
              <h2>{username}</h2>
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
            value={locationInputHome}
            onChange={handleHomeLocationChange}
            onKeyUp={e => handleSearchBox(e, 1)}
          />
          {autocompleteSuggestions.length > 0 &&
            locationInputHome.length > 0 && (
              <div className="home-search-autocomplete-suggestions">
                {autocompleteSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="autocomplete-suggestion"
                    onClick={() => handleSuggestionClick(suggestion.label)}
                  >
                    {suggestion.label}
                  </div>
                ))}
              </div>
            )}
          <button className="button" onClick={saveLocation}>
            Save Home Address
          </button>
        </div>

        <div className="address-section">
          <h3>Work Address</h3>
          <input
            className="address-input"
            type="text"
            placeholder="Enter Work Address"
            value={locationInputWork}
            onChange={handleWorkLocationChange}
            onKeyUp={e => handleSearchBox(e, 2)}
          />
          {autocompleteSuggestions.length > 0 &&
            locationInputWork.length > 0 && (
              <div className="work-search-autocomplete-suggestions">
                {autocompleteSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="autocomplete-suggestion"
                    onClick={() => handleSuggestionClick(suggestion.label)}
                  >
                    {suggestion.label}
                  </div>
                ))}
              </div>
            )}
          <button className="button" onClick={saveLocation}>
            Save Work Address
          </button>
        </div>

        <div className="change-password-section">
          <input
            className="change-password-input"
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Change Password"
            onChange={handleChangePass}
            onKeyUp={handleChangePass}
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? 'Hide Password' : 'Show Password'}
          </button>
          <button className="button" onClick={handleChangePassBtn}>
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
