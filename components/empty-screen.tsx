import { useEffect, useState } from 'react'
import LocationComponent from './location-component'
import Image from 'next/image'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet-routing-machine'

export function EmptyScreen() {
  const [weatherData, setWeatherData] = useState(null)
  const [map, setMap] = useState<L.Map | null>(null)
  const [aiResponse, setAiResponse] = useState<string | null>(null)

  useEffect(() => {
    if (!map) {
      const mapInstance = L.map('map').setView([51.505, -0.09], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance)

      L.Routing.control({
        waypoints: [L.latLng(51.505, -0.09), L.latLng(51.51, -0.1)],
        routeWhileDragging: true
      }).addTo(mapInstance)

      setMap(mapInstance)
    }

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [map])

  const handleGenerateText = async () => {
    const response = await openai.TextCompletion.create({
      model: 'text-davinci-003',
      prompt: 'Provide a summary of the current weather and map route.',
      max_tokens: 100
    })
    setAiResponse(response.choices[0].text)
  }

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 sm:p-8 p-4 text-base sm:text-lg">
        <h1 className="text-3xl sm:text-4xl tracking-tight font-semibold max-w-fit inline-block mt-5">
          {weatherData
            ? `${(weatherData as any).name}, ${(weatherData as any).sys.country}`
            : 'Location Not Found'}
        </h1>
        <div>
          <input type="text" placeholder="Not the right location ?" />
        </div>
        <div>
          <LocationComponent
            onLocationChange={async (lat, lon) => {
              try {
                const response = await fetch(
                  `/api/weather?lat=${lat}&lon=${lon}`
                )
                if (!response.ok) throw new Error('Network response was not ok')
                const data = await response.json()
                setWeatherData(data)
              } catch (error) {
                console.error('Fetch error: ', error)
              }
            }}
          />
        </div>
        <div id="map" style={{ height: '400px' }}></div>
        <button onClick={handleGenerateText}>Generate AI Summary</button>
        {aiResponse && <p>{aiResponse}</p>}
        <div className="flex">
          <p className="text-5xl ml-3">
            {weatherData ? `${(weatherData as any).main.temp}°C` : 'N/A'}
          </p>
          <Image
            src={`https://openweathermap.org/img/wn/${weatherData ? (weatherData as any).weather[0].icon : ''}.png`}
            alt="Weather Icon"
            width={50}
            height={50}
          />
          <div>
            <h2 className="flex justify-between ml-10">
              {weatherData
                ? `${(weatherData as any).weather[0].description}`
                : 'N/A'}
            </h2>
            <h2 className="flex justify-between ml-10">
              {weatherData
                ? `Feels like : ${(weatherData as any).main.feels_like}°C`
                : 'N/A'}
            </h2>
          </div>
        </div>
        <br />
        <div className="flex">
          <div className="w-1/4">
            <h3>Pressure</h3>
            <p>
              {weatherData
                ? `${(weatherData as any).main.pressure} hPa`
                : 'N/A'}
            </p>
          </div>
          <div className="w-1/4">
            <h3>Humidity</h3>
            <p>
              {weatherData ? `${(weatherData as any).main.humidity}%` : 'N/A'}
            </p>
          </div>
          <div className="w-1/4">
            <h3>Visibility</h3>
            <p>
              {weatherData
                ? `${(weatherData as any).visibility} meters`
                : 'N/A'}
            </p>
          </div>
          <div className="w-1/4">
            <h3>Wind Speed</h3>
            <p>
              {weatherData
                ? `${(weatherData as any).wind.speed} m/s, ${(weatherData as any).wind.deg}°`
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
