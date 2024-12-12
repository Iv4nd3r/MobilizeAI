export default async function fetchRoutes(start, end, key) {
  try {
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.OPENROUTESERVICE_API_KEY}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`
    )
    const data = await response.json()
    const distance = data.features[0].properties.summary.distance
    const duration = data.features[0].properties.summary.duration
    const coordinates = data.features[0].geometry.coordinates

    switch (key) {
      case 1:
        return coordinates
        break
      case 2:
        return distance
        break
      case 3:
        return duration
        break
      default:
        return data
    }
  } catch (error) {
    console.error('Error fetching ORS route:', error)
  }
}
