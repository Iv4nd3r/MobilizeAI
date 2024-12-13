import React, { useEffect, useState } from 'react'

function LocationComponent({ onLocationChange }) {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 })

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        if (position && position.coords) {
          const { latitude, longitude } = position.coords
          setLocation({ latitude, longitude })
          onLocationChange(latitude, longitude)
        }
      })
    } else {
      alert('Geolocation is not supported / allowed by this browser.')
    }
  }
  useEffect(() => {
    getLocation()
  }, [])
}

export default LocationComponent
