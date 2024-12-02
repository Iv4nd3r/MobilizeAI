import React, { useEffect, useState } from 'react'

import './Home-Navigation.css'
import './Home-Dashboard.css'
import './Home-EnergyHistory.css'

import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import LocationComponent from './components/locationcomponent'
import RoutingInstructions from './components/RoutingInstructions.'
import { fetchWeatherData } from './api/weather'
import { fetchGeocodingData } from './api/geocoding'
import { getGenerativeAITips } from './api/ai'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
import MapComponent from './api/maps'

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

let initialFetchDone = false

const Home = () => {
  // State to store the user's name
  const [userName, setUserName] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [formattedDate, setFormattedDate] = useState('')
  const [location, setLocation] = useState({ lat: 0, lon: 0 }) // Add state for location
  const [searchLocation, setSearchLocation] = useState('') // Add state for search location
  const [startLocation, setStartLocation] = useState({ lat: 0, lon: 0 })
  const [endLocation, setEndLocation] = useState({ lat: 0, lon: 0 })
  const [instructions, setInstructions] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'system',
      message: 'Hello, Ivander! How can I help you today?'
    }
  ])

  useEffect(() => {
    // Retrieve the user's name from local storage
    const name = localStorage.getItem('userName') || 'Ivander'
    setUserName(name)
  }, [])

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        // Example coordinates
        const currentData = await fetchWeatherData(lat, lon, 'current')
        setWeatherData(currentData)
        const forecastData = await fetchWeatherData(lat, lon, 'forecast')
        setForecastData(forecastData)
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    if (location.lat !== 0 && location.lon !== 0) {
      fetchWeather(location.lat, location.lon)
    }
  }, [location]) // Add location as a dependency

  useEffect(() => {
    if (weatherData && weatherData.dt) {
      const unixTime = weatherData.dt * 1000 // Convert to milliseconds
      const date = new Date(unixTime)
      const options = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
      const formatted = date.toLocaleDateString('en-ID', options)
      setFormattedDate(formatted)
    }
  }, [weatherData])

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

  useEffect(() => {
    if (weatherData !== null || forecastData !== null) {
      fetchInitialAITips(weatherData, forecastData)
    }
  }, [weatherData])

  const fetchInitialAITips = async (currentWeather, forecastWeather) => {
    if (!initialFetchDone) {
      const newChatHistory = [
        ...chatHistory,
        { type: 'user', message: userInput },
        { type: 'system', message: 'Generating ...' }
      ]
      setChatHistory(newChatHistory)
      setUserInput('')
      setIsGenerating(true)

      try {
        const response = await getGenerativeAITips(
          currentWeather,
          forecastWeather,
          'Give a list of recommendation based on these weather condition and generate a outut like this : Based on the weather data, I recommend these actions you can do to minimize impact on our beloved Earth\n* Recommendation 1 and reasons\n* Recommendation 2 and reasons\n* Recommendation 3 and reasons\n* Recommendation x and reasons\n\nEnsure each recommendation is on a new line and properly formatted with bullet points.'
        )
        setChatHistory([{ type: 'system', message: response }])
      } catch (error) {
        console.error('Error fetching AI response:', error)
      } finally {
        setIsGenerating(false)
      }
    }
    initialFetchDone = true
  }

  const fetchAITips = async () => {
    if (userInput.trim() === '') return
    const newChatHistory = [
      ...chatHistory,
      { type: 'user', message: userInput },
      { type: 'system', message: 'Generating ...' }
    ]
    setChatHistory(newChatHistory)
    setUserInput('')
    setIsGenerating(true)

    try {
      const response = await getGenerativeAITips(
        weatherData,
        forecastData,
        userInput
      )
      const updatedChatHistory = newChatHistory.filter(
        message => message.message !== 'Generating ...'
      )
      setChatHistory([
        ...updatedChatHistory,
        { type: 'system', message: response }
      ])
    } catch (error) {
      console.error('Error fetching AI response:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleChatBox = e => {
    if (e.key === 'Enter' && !isGenerating) {
      fetchAITips()
    }
  }

  const lineChartData = {
    labels: [
      'Oct 10, 2024',
      'Oct 12, 2024',
      'Oct 13, 2024',
      'Oct 14, 2024',
      'Oct 15, 2024'
    ],
    datasets: [
      {
        label: 'Energy Usage (kWh)',
        data: [20, 21, 8, 14, 12],
        borderColor: '#cfd8dc', // Light grayish-blue line
        backgroundColor: 'rgba(207, 216, 220, 0.1)', // Subtle transparent fill
        tension: 0.4, // Smooth curve
        fill: true, // Fill area under the line
        pointBackgroundColor: '#cfd8dc',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#cfd8dc'
      }
    ]
  }

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#cfd8dc' // Matches line color
        }
      },
      title: {
        display: true,
        text: 'Energy Usage (kWh)',
        color: '#cfd8dc' // Title color
      }
    },
    scales: {
      x: {
        grid: {
          display: false // No grid lines for x-axis
        },
        ticks: {
          color: '#cfd8dc' // Light grayish-blue text
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(207, 216, 220, 0.2)' // Subtle horizontal grid lines
        },
        ticks: {
          color: '#cfd8dc' // Light grayish-blue text
        }
      }
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
              <p>{formattedDate}</p>

              <div className="temperature">
                {weatherData &&
                  weatherData.weather &&
                  weatherData.weather[0] && (
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt="Weather Icon"
                      className="weather-icon"
                    />
                  )}
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

          {/* Weather Stats Section */}
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
                    {weatherData ? `${weatherData.wind.speed}` : '-'}
                  </span>
                  <span className="unit-label">
                    <span className="unit">KM/H</span>
                    <span className="label">Wind</span>
                  </span>
                </div>
                <div className="divider"></div>
                <div className="wind-speed-item">
                  <span className="value">
                    {weatherData ? `${weatherData.wind.gust}` : '-'}
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

              <p>{weatherData ? `${weatherData.main.feels_like}` : '-'}</p>
              <span className="unit"> °Celcius</span>
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
                {weatherData ? `${weatherData.visibility}` : 'N/A'}
              </p>
              <span className="unit"> meters</span>
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

            <div className="stat-box">
              <h4 className="stat-title">
                <img
                  src={PressureIcon}
                  alt="Pressure Icon"
                  className="stat-icon"
                />
                Pressure
              </h4>

              <p>{weatherData ? `${weatherData.main.pressure}` : 'N/A'}</p>
              <span className="unit">hPa</span>
            </div>

            <div className="stat-box">
              <h4 className="stat-title">
                <img
                  src={TempMaxIcon}
                  alt="Temp Max Icon"
                  className="stat-icon"
                />
                Temp. Max
              </h4>
              <p>{weatherData ? `${weatherData.main.temp_max}` : '-'}</p>
              <span className="unit"> °Celcius</span>
            </div>

            <div className="stat-box">
              <h4 className="stat-title">
                <img
                  src={TempMinIcon}
                  alt="Temp Min Icon"
                  className="stat-icon"
                />
                Temp. Min
              </h4>
              <p>{weatherData ? `${weatherData.main.temp_min}` : 'N/A'}</p>
              <span className="unit"> °Celcius</span>
            </div>
            <div className="stat-box">
              <h4 className="stat-title">
                <img src={CloudIcon} alt="Cloud Icon" className="stat-icon" />
                Sea Level
              </h4>
              <p>{weatherData ? `${weatherData.main.sea_level}` : 'N/A'}</p>
              <span className="unit"> ft asl</span>
            </div>
          </div>
        </div>

        {/* Tips Section */}

        <aside className="tips-section">
          <div className="tips-header">
            <h3>TIPS</h3>
            <img src={AIIcon} alt="AI Icon" className="ai-icon" />
          </div>
          {/* BEDA */}

          {chatHistory.map((chat, index) => (
            <div key={index} className={`tip-message ${chat.type}`}>
              {chat.message}
            </div>
          ))}

          {/*AMAN*/}

          <div className="input-container">
            <input
              type="text"
              placeholder="Want to ask more?"
              className="input-box"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyUp={handleChatBox}
            />

            <button className="send-button" onClick={fetchAITips}>
              <img src={SendBtn} alt="Send" />
            </button>
          </div>
        </aside>
      </div>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-overlay">
          <input
            type="text"
            placeholder="Your Location"
            onChange={e => setStartLocation}
          />
          <input
            type="text"
            placeholder="Choose Destination"
            onChange={e => setEndLocation}
          />
          <select>
            <option>Vehicle Type</option>
          </select>
        </div>
        <div className="map-placeholder">
          {location.lat !== 0 && location.lon !== 0 && (
            <MapComponent
              latitude={location.lat}
              longitude={location.lon}
              startLocation={startLocation}
              endLocation={endLocation}
            />
          )}
          <RoutingInstructions instructions={instructions} />
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
            <Line data={lineChartData} options={lineChartOptions} />
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
