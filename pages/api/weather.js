export const fetchWeatherData = async (lat, lon, types) => {
  if (types === 'current') {
    try {
      const response = await fetch(
        `https://server-one-clover.vercel.app/fetchCurrentWeather?lat=${lat}&lon=${lon}`
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
  } else if (types === 'forecast') {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
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
}
