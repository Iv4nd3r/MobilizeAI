// Geocoding.js
export const fetchGeocodingData = async location => {
  const response = await fetch(
    `https://server-one-clover.vercel.app/api/fetchGeocoding?search=${location}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch geocoding data')
  }
  const data = await response.json()
  if (data.length === 0) {
    if (data.features.length === 0) {
      throw new Error('Location not found')
    }
    const feature = data.features[0]
    const coordinates = feature.geometry.coordinates
    const bbox = feature.bbox
    if (bbox && bbox.length >= 4) {
      return { lat: (bbox[1] + bbox[3]) / 2, lon: (bbox[0] + bbox[2]) / 2 }
    }
    return { lat: coordinates[1], lon: coordinates[0] } // Return lat and lon for main provider
  }
  return { lat: data[0].lat, lon: data[0].lon }
}
