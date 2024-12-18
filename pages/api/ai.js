async function getGenerativeAITips(currentData, forecastData, prompt) {
  const payload = {
    currentData,
    forecastData,
    prompt
  }

  try {
    const response = await fetch(
      'https://server-one-clover.vercel.app/api/getAITips',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    )

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const result = await response.json()
    return result.tips
  } catch (error) {
    console.error('Error generating AI tips:', error)
    return 'Unable to fetch tips at this time. Please try again later.'
  }
}

export { getGenerativeAITips }
