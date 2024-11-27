import { useState } from 'react'
import LocationComponent from '../src/components/locationcomponent'
import Image from 'next/image'

export function EmptyScreen() {
  const [weatherData, setWeatherData] = useState(null)

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 sm:p-8 p-4 text-base sm:text-lg">
        <h1 className="text-3xl sm:text-4xl tracking-tight font-semibold max-w-fit inline-block mt-5">
          {weatherData
            ? `${(weatherData as any).name}, ${
                (weatherData as any).sys.country
              }`
            : 'Location Not Found'}
        </h1>
        <div>
          <input type="text" placeholder="Not the right location ?" />
        </div>
        <div>
          <LocationComponent
            onLocationChange={async (lat, lon) => {
              const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
              const data = await response.json()
              setWeatherData(data)
            }}
          />
        </div>
        <div className="flex">
          <p className="text-5xl ml-3">
            {weatherData ? `${(weatherData as any).main.temp}°C` : 'N/A'}
          </p>
          <Image
            src={`https://openweathermap.org/img/wn/${
              weatherData ? (weatherData as any).weather[0].icon : ''
            }.png`}
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
                ? `${(weatherData as any).wind.speed} m/s, ${
                    (weatherData as any).wind.deg
                  }°`
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
