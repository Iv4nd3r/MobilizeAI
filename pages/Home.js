import React, { useEffect, useState } from 'react'

import './Home-Navigation.css'
import './Home-Dashboard.css'
import './Home-EnergyHistory.css'

import { Link } from 'react-router-dom'
import LocationComponent from './components/locationcomponent'
import { fetchWeatherData } from './api/weather'
import { fetchGeocodingData } from './api/geocoding'

// Import SVG icons
import CloudIcon from '../src/assets/CloudIcon.svg'
import FeelsLikeIcon from '../src/assets/FeelsLikeIcon.svg'
import HumidityIcon from '../src/assets/HumidityIcon.svg'
import PressureIcon from '../src/assets/PressureIcon.svg'
import TempMaxIcon from '../src/assets/TempMaxIcon.svg'
import TempMinIcon from '../src/assets/TempMinIcon.svg'
import VisibilityIcon from '../src/assets/VisibilityIcon.svg'
import WindSpeedIcon from '../src/assets/WindSpeedIcon.svg'
import SearchIcon from '../src/assets/search-icon.svg'
import AIIcon from '../src/assets/ai-icon.svg'
import SendBtn from '../src/assets/Send-button.svg'

//const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

const Home = () => {
  // State to store the user's name
  const [userName, setUserName] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [location, setLocation] = useState({ lat: 0, lon: 0 }) // Add state for location
  const [searchLocation, setSearchLocation] = useState('') // Add state for search location

  useEffect(() => {
    // Retrieve the user's name from local storage
    const name = localStorage.getItem('userName') || 'Ivander'
    setUserName(name)
  }, [])

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        // Example coordinates
        const data = await fetchWeatherData(lat, lon)
        setWeatherData(data)
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    if (location.lat !== 0 && location.lon !== 0) {
      fetchWeather(location.lat, location.lon)
    }
  }, [location]) // Add location as a dependency

  const handleSearch = async () => {
    try {
      const geocodingData = await fetchGeocodingData(searchLocation)
      setLocation({ lat: geocodingData.lat, lon: geocodingData.lon })
      fetchWeather(geocodingData.lat, geocodingData.lon)
    } catch (error) {
      console.error('Error fetching geocoding data:', error)
    }
  }

  const handleLocationSearch = e => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="home-container">
      <LocationComponent
        onLocationChange={async (lat, lon) => {
          setLocation({ lat, lon }) // Update location state
        }}
      />
      {/* Greeting Section */}
      <header className="home-greeting">
        <h1>Hello, {userName}!</h1>
        <a href="#" className="energy-history-link">
          Check Your Energy History
        </a>
      </header>

      <div className="weather-tips-container">
        <div className="weather-content">
          {/* Weather Information Section */}
          <section className="weather-info">
            <div className="location-info">
              <h2>
                {weatherData
                  ? `${weatherData.name}, ${weatherData.sys.country}`
                  : 'Location Not Found'}
              </h2>
              <p>Thursday, October 10th 2024</p>
              <div className="temperature">
                <h1>{weatherData ? `${weatherData.main.temp}°C` : 'N/A'}</h1>
                <p>
                  {weatherData
                    ? `${weatherData.weather[0].description}`
                    : 'N/A'}
                </p>
              </div>
            </div>
            <div className="location-change">
              <div className="location-input-container">
                <input
                  type="text"
                  placeholder="Not the right location ?"
                  className="location-input"
                  value={searchLocation}
                  onChange={e => setSearchLocation(e.target.value)}
                  onKeyUp={handleLocationSearch}
                />
                <button className="location-search-btn">
                  <img
                    src={SearchIcon}
                    alt="Search Icon"
                    className="stat-icon"
                  />
                </button>
              </div>
            </div>
          </section>

          <div className="weather-stats">
            <div className="stat-box wind-speed-box">
              <h4 className="stat-title">
                <img
                  src={WindSpeedIcon}
                  alt="Wind Speed Icon"
                  className="stat-icon"
                />
                Wind Speed
              </h4>
              <div className="wind-speed-content">
                <div className="wind-speed-item">
                  <span className="value">
                    {weatherData ? `${weatherData.wind.speed} m/s` : 'N/A'}
                  </span>
                  <span className="unit-label">
                    <span className="unit">KM/H</span>
                    <span className="label">Wind</span>
                  </span>
                </div>
                <div className="divider"></div>
                <div className="wind-speed-item">
                  <span className="value">
                    {weatherData ? `${weatherData.wind.gust} m/s` : 'N/A'}
                  </span>
                  <span className="unit-label">
                    <span className="unit">KM/H</span>
                    <span className="label">Gusts</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="stat-box">
              <h4 className="stat-title">
                <img
                  src={FeelsLikeIcon}
                  alt="Feels Like Icon"
                  className="stat-icon"
                />
                Feels Like
              </h4>
              <p>{weatherData ? `${weatherData.main.feels_like}°C` : 'N/A'}</p>
            </div>
            <div className="stat-box">
              <h4 className="stat-title">
                <img
                  src={VisibilityIcon}
                  alt="Visibility Icon"
                  className="stat-icon"
                />
                Visibility
              </h4>
              <p className="stat-title">
                {weatherData ? `${weatherData.visibility} meters` : 'N/A'}
              </p>
            </div>
            <div className="stat-box">
              <h4 className="stat-title">
                <img
                  src={PressureIcon}
                  alt="Pressure Icon"
                  className="stat-icon"
                />
                Pressure
              </h4>
              <p>{weatherData ? `${weatherData.main.pressure} hPa` : 'N/A'}</p>
            </div>
            <div className="stat-box">
              <h4 className="stat-title">
                <img
                  src={HumidityIcon}
                  alt="Humidity Icon"
                  className="stat-icon"
                />
                Humidity
              </h4>
              <p>{weatherData ? `${weatherData.main.humidity}%` : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <aside className="tips-section">
        <div className="tips-header">
          <h3>TIPS</h3>
          <img src={AIIcon} alt="AI Icon" className="ai-icon" />
        </div>
        <div className="tip-message system">
          Turn off your AC and use natural ventilation or a fan to save energy.
          Drive steadily on wet roads to conserve fuel!
        </div>

        {/* User Message */}
        <div className="tip-message user">
          Should I use the heater if it feels chilly?
        </div>

        {/* System Message */}
        <div className="tip-message system">
          If it’s chilly at 22°C, layering up with warm clothes or using a
          blanket is more energy–efficient than turning on the heater!
        </div>

        <div className="input-container">
          <input
            type="text"
            placeholder="Want to ask more?"
            className="input-box"
          />
          <button className="send-button">
            <img src={SendBtn} alt="Send" />
          </button>
        </div>
      </aside>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-overlay">
          <input type="text" placeholder="Your Location" />
          <input type="text" placeholder="Choose Destination" />
          <select>
            <option>Vehicle Type</option>
          </select>
        </div>
        <div className="map-placeholder">
          {/* Embed the OpenStreetMap using an iframe */}
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=112.41,-2.53,120,0&layer=mapnik"
            title="OpenStreetMap"
            style={{
              border: 0,
              width: '100%',
              height: '100%'
            }}
          ></iframe>
        </div>
      </section>

      {/* Energy Usage Section */}
      <section className="energy-usage">
        <h2>
          Today, you’ve spent <span className="energy-highlight">12.5</span> kWh
          of energy
        </h2>
        <div className="energy-usage-container">
          {/* Chart Section */}
          <div className="energy-chart">
            {/* Placeholder for the energy usage chart */}
            <p>[Chart goes here]</p>
          </div>

          {/* History Table Section */}
          <div className="energy-history">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Total Energy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Oct 15, 2024</td>
                  <td>12.5 kWh</td>
                </tr>
                <tr>
                  <td>Oct 14, 2024</td>
                  <td>13.4 kWh</td>
                </tr>
                <tr>
                  <td>Oct 13, 2024</td>
                  <td>10.2 kWh</td>
                </tr>
                <tr>
                  <td>Oct 12, 2024</td>
                  <td>20.5 kWh</td>
                </tr>
                <tr>
                  <td>Oct 10, 2024</td>
                  <td>20.3 kWh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
