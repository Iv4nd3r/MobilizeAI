export const fetchNearbyPOIs = async (latitude, longitude) => {
  try {
    const response = await fetch('https://api.openrouteservice.org/pois', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ORS_API_KEY}`
      },
      body: JSON.stringify({
        request: 'pois',
        geometry: {
          bbox: [
            longitude - 0.01,
            latitude - 0.01,
            longitude + 0.01,
            latitude + 0.01
          ],
          geojson: { type: 'Point', coordinates: [longitude, latitude] }
        }
      })
    })

    if (!response.ok) {
      throw new Error('Failed to fetch POIs')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching POIs:', error)
    return null
  }
}
