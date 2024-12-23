async function userSignIn(name, email, password) {
  try {
    const response = await fetch(
      'https://server-one-clover.vercel.app/signup',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    )
    return response
  } catch (error) {
    console.error('Error during signup:', error)
  }
}

async function userLogIn(email, password) {
  try {
    const response = await fetch('https://server-one-clover.vercel.app/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    return response
  } catch (error) {
    console.error('Error during signin:', error)
  }
}

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

export { userSignIn, userLogIn, fetchUserData }
