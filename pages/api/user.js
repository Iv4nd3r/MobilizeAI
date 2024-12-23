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

async function changeUserName(token, newName) {
  try {
    const response = await fetch(
      'https://server-one-clover.vercel.app/api/changeUserName',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify({ newName })
      }
    )

    if (!response.ok) {
      throw new Error('Failed to change user name')
    }

    const data = await response.json()
    alert(data.message)
  } catch (error) {
    console.error('Error changing user name:', error)
  }
}

async function saveHome(token, homeAddress) {
  try {
    const response = await fetch(
      'https://server-one-clover.vercel.app/api/saveHome',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify({ homeAddress })
      }
    )

    if (!response.ok) {
      throw new Error('Failed to change home address')
    }

    const data = await response.json()
    alert(data.message)
  } catch (error) {
    console.error('Error changing home address:', error)
  }
}

async function saveWork(token, workAddress) {
  try {
    const response = await fetch(
      'https://server-one-clover.vercel.app/api/saveWork',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify({ workAddress })
      }
    )

    if (!response.ok) {
      throw new Error('Failed to save work address')
    }

    const data = await response.json()
    alert(data.message)
  } catch (error) {
    console.error('Error changing work address:', error)
  }
}

export {
  userSignIn,
  userLogIn,
  fetchUserData,
  changeUserName,
  saveHome,
  saveWork
}
