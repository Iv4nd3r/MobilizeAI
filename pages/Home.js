import React, { useEffect, useRef, useState } from 'react'
import './Home-Navigation.css'
import './Home-Dashboard.css'
import './Home-EnergyHistory.css'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import LocationComponent from '/src/components/LocationComponent'
import { fetchWeatherData } from './api/weather'
import { fetchGeocodingData } from './api/geocoding'
import { getGenerativeAITips } from './api/ai'
import autocompleteSearch from './api/autocomplete'
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
import { MapComponent, RoutingMachine } from './api/maps'
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
import SendBtn from '../src/assets/Send-Button.svg'

let initialFetchDone = false

const Home = () => {
  const [userName, setUserName] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [formattedDate, setFormattedDate] = useState('')
  const [location, setLocation] = useState({ lat: 0, lon: 0 })
  const [searchLocation, setSearchLocation] = useState('')
  const [startLocation, setStartLocation] = useState({ lat: 0, lon: 0 })
  const [endLocation, setEndLocation] = useState({ lat: 0, lon: 0 })
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([])
  const [lock, setLock] = useState('')
  const [vehicleType, setVehicleType] = useState('car')
  const [userInput, setUserInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'system',
      message: 'Hello, Ivander! How can I help you today?'
    }
  ])
  const mapRef = useRef(null)

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'Ivander'
    setUserName(name)
  }, [])

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
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
  }, [location])

  useEffect(() => {
    if (weatherData && weatherData.dt) {
      const unixTime = weatherData.dt * 1000
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

  useEffect(() => {
    if (weatherData !== null || forecastData !== null) {
      fetchInitialAITips(weatherData, forecastData)
    }
  }, [weatherData])

  const fetchInitialAITips = async (currentWeather, forecastWeather) => {
    const max_message_length = 100

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
          `Give a short paragraph summary of recommendation based on these weather condition for maximum ${max_message_length} words.`
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

  const handleSearch = async key => {
    try {
      const geocodingData = await fetchGeocodingData(searchLocation)
      switch (lock) {
        case 1:
          setLocation({ lat: geocodingData.lat, lon: geocodingData.lon })
          fetchWeatherData(geocodingData.lat, geocodingData.lon)
          break
        case 2:
          setStartLocation({ lat: geocodingData.lat, lon: geocodingData.lon })
          if (endLocation.lat !== 0 && endLocation.lon !== 0) {
            RoutingMachine(geocodingData, endLocation, vehicleType)
          }
          break
        case 3:
          setEndLocation({ lat: geocodingData.lat, lon: geocodingData.lon })
          if (startLocation.lat !== 0 && startLocation.lon !== 0) {
            RoutingMachine(startLocation, geocodingData, vehicleType)
          }
          break
        default:
          console.error('Invalid key value passed to handleSearch')
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error)
    }
  }

  const handleLocationSearch = async e => {
    setSearchLocation(e.target.value)
    if (e.target.value.length > 2) {
      try {
        const data = await autocompleteSearch(e.target.value)
        setAutocompleteSuggestions(
          data.features.map(feature => {
            let bbox = feature.bbox
            if (!bbox && feature.geometry && feature.geometry.coordinates) {
              const [lon, lat] = feature.geometry.coordinates
              bbox = [lon, lat, lon, lat] // Create bbox with the same coordinates
            }
            return {
              label: feature.properties.label,
              bbox: bbox
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

  const handleSuggestionClick = async (suggestion, bbox) => {
    let locationData
    if (bbox && bbox.length >= 4) {
      locationData = {
        lat: (bbox[1] + bbox[3]) / 2,
        lon: (bbox[0] + bbox[2]) / 2
      }
    } else {
      // Fallback to geocoding data if bbox is not available
      locationData = await fetchGeocodingData(suggestion)
    }
    try {
      switch (lock) {
        case 1:
          setLocation(locationData)
          setSearchLocation([])
          fetchWeatherData(locationData.lat, locationData.lon)
          break
        case 2:
          setStartLocation(locationData)
          setSearchLocation([])
          if (endLocation.lat !== 0 && endLocation.lon !== 0) {
            RoutingMachine(locationData, endLocation, vehicleType)
          }
          break
        case 3:
          setSearchLocation([])
          setEndLocation(locationData)
          if (
            ((endLocation.lat !== 0 && endLocation.lon !== 0) ||
              (locationData.lat !== 0 && locationData.lon !== 0)) &&
            startLocation.lon === 0 &&
            startLocation.lat === 0
          ) {
            setStartLocation(location)
            RoutingMachine(startLocation, locationData, vehicleType)
          } else {
            RoutingMachine(startLocation, endLocation, vehicleType)
          }
          break
        default:
          console.error('Invalid key value passed to handleSuggestionClick')
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error)
    }
    setAutocompleteSuggestions([])
  }

  const handleChatBox = e => {
    if (e.key === 'Enter' && !isGenerating) {
      fetchAITips()
    }
  }

  const handleSearchBox = (e, pass) => {
    if (e.key === 'Enter') {
      setLock(pass)
      try {
        handleLocationSearch(e)
      } catch (error) {
        handleSearch(lock)
      }
    }
  }

  const handleInputChange = e => {
    setSearchLocation(e.target.value)
    if (e.key === 'Enter') {
      handleLocationSearch(e)
    }
  }

  const handleSaveRoute = async () => {
    const start = { lat: startLocation.lat, lon: startLocation.lon }
    const end = { lat: endLocation.lat, lon: endLocation.lon }
    await energyCalculate(start, end, vehicleType)
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
  }

  const lineChartOptions = {
    responsive: true,
    plugins: {
      Legend: {
        display: true,
        labels: {
          color: '#cfd8dc'
        }
      },
      title: {
        display: true,
        text: 'Energy Usage (kWh)',
        color: '#cfd8dc'
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#cfd8dc'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(207, 216, 220, 0.2)'
        },
        ticks: {
          color: '#cfd8dc'
        }
      }
    }
  }

  return (
    <div className="home-container">
      <LocationComponent
        onLocationChange={async (lat, lon) => {
          setLocation({ lat, lon })
        }}
      />
      <header className="home-greeting">
        <h1>Hello, {userName}!</h1>
        <a href="#" className="energy-history-link">
          Check Your Energy History
        </a>
      </header>

      <div className="weather-tips-container">
        <div className="weather-content">
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
                  onChange={handleInputChange}
                  onKeyUp={e => handleSearchBox(e, 1)}
                />
                <button className="location-search-btn">
                  <img
                    src={SearchIcon}
                    alt="Search Icon"
                    className="stat-icon"
                  />
                </button>
              </div>
              {autocompleteSuggestions.length > 0 && (
                <div className="location-search-autocomplete-suggestions">
                  {autocompleteSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="autocomplete-suggestion"
                      onClick={() =>
                        handleSuggestionClick(suggestion.label, suggestion.bbox)
                      }
                    >
                      {suggestion.label}
                    </div>
                  ))}
                </div>
              )}
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
                    {weatherData && weatherData.wind && weatherData.wind.gust
                      ? `${weatherData.wind.gust}`
                      : '-'}
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

        <aside className="tips-section">
          <div className="tips-header">
            <h3>TIPS</h3>
            <img src={AIIcon} alt="AI Icon" className="ai-icon" />
          </div>

          {chatHistory.map((chat, index) => (
            <div key={index} className={`tip-message ${chat.type}`}>
              {chat.message}
            </div>
          ))}

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

      <section className="map-section">
        <div className="map-overlay">
          <input
            type="text"
            placeholder="Your Location"
            onKeyUp={e => handleSearchBox(e, 2)}
          />
          {autocompleteSuggestions.length > 0 && (
            <div className="start-search-autocomplete-suggestions">
              {autocompleteSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="autocomplete-suggestion"
                  onClick={() =>
                    handleSuggestionClick(suggestion.label, suggestion.bbox)
                  }
                >
                  {suggestion.label}
                </div>
              ))}
            </div>
          )}
          <input
            type="text"
            placeholder="Choose Destination"
            onKeyUp={e => handleSearchBox(e, 3)}
          />
          {autocompleteSuggestions.length > 0 && (
            <div className="end-search-autocomplete-suggestions">
              {autocompleteSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="autocomplete-suggestion"
                  onClick={() =>
                    handleSuggestionClick(suggestion.label, suggestion.bbox)
                  }
                >
                  {suggestion.label}
                </div>
              ))}
            </div>
          )}
          <div>
            <select
              id="vehicleType"
              value={vehicleType}
              onChange={e => setVehicleType(e.target.value)}
            >
              <option>Vehicle Type</option>
              <option value="car">Regular Car</option>
              <option value="ecar">Electric Car</option>
              <option value="bike">Bike</option>
              <option value="ebike">Electric Bike</option>
              <option value="hgv">Bus / Truck</option>
              <option value="walk">Walk</option>
            </select>
          </div>
          <button onClick={handleSaveRoute}>Save Route</button>
        </div>
        <div className="map-placeholder">
          {location.lat !== 0 && location.lon !== 0 && (
            <MapComponent
              latitude={location.lat}
              longitude={location.lon}
              startLocation={startLocation}
              endLocation={endLocation}
              type={vehicleType}
              ref={mapRef}
            />
          )}
        </div>
      </section>

      <section className="energy-usage">
        <h2>
          Today, you’ve spent <span className="energy-highlight">12.5</span> kWh
          of energy
        </h2>
        <div className="energy-usage-container">
          <div className="energy-chart">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>

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
