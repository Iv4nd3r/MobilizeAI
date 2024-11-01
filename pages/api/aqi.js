export default async function handler(req, res) {
    const lat = req.query.lat;
    const lon = req.query.lon;
  
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
    );
  
    if (!response.ok) {
      res.status(response.status).json({ error: 'Failed to fetch weather data' });
      return;
    }
  
    const weatherData = await response.json();
    res.status(200).json(weatherData);
  }