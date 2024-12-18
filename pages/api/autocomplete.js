async function autocompleteSearch(search) {
  const url = `https://server-one-clover.vercel.app/api/fetchAutocomplete?search=${search}`

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
