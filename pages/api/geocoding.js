// Geocoding.js
export const fetchGeocodingData = async location => {
  const response = await fetch(
    `https://api.openrouteservice.org/geocode/search?api_key=${process.env.OPENROUTESERVICE_API_KEY}&text=${location}`
  )
  if (!response.ok) {
    console.log('Failed to fetch geocoding data, using backup geocoding')
    response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.OPENWEATHER_API_KEY}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch geocoding data')
    }
  }
  const data = await response.json()
  if (data.length === 0) {
    throw new Error('Location not found')
  }
  return data[0] // Return the first result
}
