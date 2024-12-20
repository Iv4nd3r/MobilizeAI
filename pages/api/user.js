async function fetchUserData(token) {
  try {
    const response = await fetch(
      'https://Server-one-clover.vercel.app/api/user',
      {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch user data')
    }

    const userData = await response.json()
    return userData
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

export {fetchUserData}