export default async function handler(req, res) {
  const lat = req.query.lat
  const lon = req.query.lon

  const response = await fetch(
    `https://server-one-clover.vercel.app/api/fetchAqi?lat=${lat}&lon=${lon}`
  )

  if (!response.ok) {
    res.status(response.status).json({ error: 'Failed to fetch weather data' })
    return
  }

  const weatherData = await response.json()
  res.status(200).json(weatherData)
}
