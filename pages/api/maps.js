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
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import Legend from '/src/components/Legend'
import fetchRoutes from './routing'
import energyCalculate from './energyCalculate'

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

L.Marker.prototype.options.icon = DefaultIcon

const RoutingMachine = ({ start, end, type }) => {
  const map = useMap()
  const polylineRef = useRef(null)
  const [instructions, setInstructions] = React.useState([])

  useEffect(() => {
    if (!map) return

    const fetchORSRoute = async () => {
      try {
        const data = await fetchRoutes(start, end, type)
        const coordinates = data.coordinates.map(coord => [coord[1], coord[0]])
        if (polylineRef.current) {
          map.removeLayer(polylineRef.current)
        }
        polylineRef.current = L.polyline(coordinates, { color: 'blue' }).addTo(
          map
        )
        // Fit the map to the polyline
        map.fitBounds(polylineRef.current.getBounds())
        energyCalculate(data.distance, data.duration, type)
      } catch (error) {
        console.error('Error fetching ORS route:', error)
        // Fallback to OSRM
        const osrmRouter = L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1'
        })
        console.log('Using backup routing server')
        if (polylineRef.current) {
          map.removeLayer(polylineRef.current)
        }
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

    if (start.lat !== 0 && start.lng !== 0 && end.lat !== 0 && end.lng !== 0) {
      fetchORSRoute()
    }

    return () => map
  }, [map, start, end])

  return null
}

const MapComponent = ({
  latitude,
  longitude,
  startLocation,
  endLocation,
  type
}) => {
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
        type={type}
      />
    </MapContainer>
  )
}

export { MapComponent, RoutingMachine }
