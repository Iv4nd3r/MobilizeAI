export default async function fetchRoutes(start, end, type) {
  try {
    let vehicle = ''
    if (type === 'car' || type === 'ecar') {
      vehicle = 'driving-car'
    } else if (type === 'hgv') {
      vehicle = 'driving-hgv'
    } else if (type === 'ebike') {
      vehicle = 'cycling-electric'
    } else if (type === 'bike') {
      vehicle = 'cycling-regular'
    } else {
      vehicle = 'foot-walking'
    }
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/${vehicle}?api_key=${process.env.OPENROUTESERVICE_API_KEY}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`
    )
    const data = await response.json()
    const distance = data.features[0].properties.summary.distance
    const duration = data.features[0].properties.summary.duration
    const coordinates = data.features[0].geometry.coordinates
    const instructions = data.features[0].properties.segments[0].steps

    return { coordinates, instructions, distance, duration }
  } catch (error) {
    console.error('Error fetching ORS route:', error)
  } finally {
  }
}
