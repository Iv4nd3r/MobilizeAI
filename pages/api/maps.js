import React, { useEffect, useRef } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  LayersControl,
  useMap
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet-providers'

// Fix for default marker icon issue with Webpack
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

import Legend from '../../src/components/legend'
import legendData from '../../src/components/maps-legend.json'

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

L.Marker.prototype.options.icon = DefaultIcon

const RoutingMachine = ({ start, end }) => {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    const fetchORSRoute = async () => {
      try {
        const response = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${
            process.env.OPENROUTESERVICE_API_KEY
          }&start=${(start.lat, start.lon)}&end=${(end.lat, end.lon)}`
        )
        const coordinates = response.data.features[0].geometry.coordinates.map(
          coord => L.latLng(coord[1], coord[0])
        )
        L.Routing.control({
          waypoints: coordinates,
          routeWhileDragging: true
        }).addTo(map)
      } catch (error) {
        console.error('Error fetching ORS route:', error)
        // Fallback to OSRM
        const osrmRouter = L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1'
        })
        L.Routing.control({
          waypoints: [
            L.latLng(start.lat, start.lng),
            L.latLng(end.lat, end.lng)
          ],
          routeWhileDragging: true,
          router: osrmRouter
        }).addTo(map)
      }
    }

    fetchORSRoute()

    return () => map
  }, [map, start, end])

  return null
}

const MapComponent = ({ latitude, longitude, startLocation, endLocation }) => {
  const mapRef = useRef()

  useEffect(() => {
    if (mapRef.current && (latitude !== 0 || longitude !== 0)) {
      mapRef.current.setView([latitude, longitude], 13)
    }
  }, [latitude, longitude])

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      whenCreated={mapInstance => {
        mapRef.current = mapInstance
        if (latitude !== 0 || longitude !== 0) {
          mapInstance.setView([latitude, longitude], 13)
        }
      }}
      zoomControl={false}
    >
      <LayersControl position="bottomright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Precipitation">
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.OPENWEATHER_API_KEY}`}
            attribution="&copy; OpenWeatherMap"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Temperature">
          <TileLayer
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${process.env.OPENWEATHER_API_KEY}`}
            attribution="&copy; OpenWeatherMap"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Wind Speed">
          <TileLayer
            url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${process.env.OPENWEATHER_API_KEY}`}
            attribution="&copy; OpenWeatherMap"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Clouds">
          <TileLayer
            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${process.env.OPENWEATHER_API_KEY}`}
            attribution="&copy; OpenWeatherMap"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Sea Level Pressure">
          <TileLayer
            url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${process.env.OPENWEATHER_API_KEY}`}
            attribution="&copy; OpenWeatherMap"
          />
        </LayersControl.Overlay>
      </LayersControl>
      <Legend />
      <Marker position={[latitude, longitude]}>
        <Popup>You are here</Popup>
      </Marker>
      {startLocation && (
        <Marker position={[startLocation.lat, startLocation.lon]}>
          <Popup>Start Location</Popup>
        </Marker>
      )}
      {endLocation && (
        <Marker position={[endLocation.lat, endLocation.lon]}>
          <Popup>End Location</Popup>
        </Marker>
      )}
      <ZoomControl position="bottomright" />
      <RoutingMachine
        start={{ lat: startLocation.lat, lng: startLocation.lon }}
        end={{ lat: endLocation.lat, lng: endLocation.lon }}
      />
    </MapContainer>
  )
}

export default MapComponent
