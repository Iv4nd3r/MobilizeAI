async function autocompleteSearch(search) {
  const apiKey = process.env.OPENROUTESERVICE_API_KEY
  const url = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${process.env.OPENROUTESERVICE_API_KEY}&text=${search}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

module.exports = autocompleteSearch
