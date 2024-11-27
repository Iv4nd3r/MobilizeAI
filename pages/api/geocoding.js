// Geocoding.js
export const fetchGeocodingData = async location => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.OPENWEATHER_API_KEY}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch geocoding data')
  }
  const data = await response.json()
  if (data.length === 0) {
    throw new Error('Location not found')
  }
  return data[0] // Return the first result
}
