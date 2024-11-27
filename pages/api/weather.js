// pages/api/weather.js
export const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
    )
    if (!response.ok) {
      throw new Error('Unable to fetch weather data, please try again')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}
