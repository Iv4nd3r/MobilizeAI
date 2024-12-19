export const fetchNearbyPOIs = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://server-one-clover.vercel.app/api/fetchPOI?lat=${latitude}&lon=${longitude}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch POIs')
    }

    const data = await response.json()
    const pois = data.features.map(feature => {
      const { name, opening_hours, website } = feature.properties.osm_tags || {}
      const categories = Object.values(feature.properties.category_ids).map(
        category => category.category_name
      )
      const { distance } = feature.properties
      return {
        name,
        categories,
        distance,
        opening_hours,
        website
      }
    })

    return pois
  } catch (error) {
    console.error('Error fetching POIs:', error)
    return null
  }
}
