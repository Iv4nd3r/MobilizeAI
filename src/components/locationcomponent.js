import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function LocationComponent({ onLocationChange }) {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 })
  const [manualLocation, setManualLocation] = useState('')

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

LocationComponent.propTypes = {
  onLocationChange: PropTypes.func.isRequired
}

export default LocationComponent
