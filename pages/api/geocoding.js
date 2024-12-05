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
    const data = await response.json()
    if (data.length === 0) {
      throw new Error('Location not found')
    }
    return { lat: data[0].lat, lon: data[0].lon } // Return lat and lon for OpenWeather API
  } else {
    const data = await response.json()
    if (data.features.length === 0) {
      throw new Error('Location not found')
    }
    const coordinates = data.features[0].geometry.coordinates
    return { lat: coordinates[1], lon: coordinates[0] } // Return lat and lon for OpenRouteService API
  }
}
