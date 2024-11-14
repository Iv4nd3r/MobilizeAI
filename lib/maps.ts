interface GeocodingResult {
  lat: number
  lon: number
  display_name: string
}

export class OpenMapsService {
  private baseUrl: string = 'https://nominatim.openstreetmap.org'

  async geocode(address: string): Promise<GeocodingResult> {
    try {
      const response = await fetch(
        `${this.baseUrl}/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
        {
          headers: {
            'User-Agent': 'MobilizeAI Application'
          }
        }
      )

      if (!response.ok) {
        throw new Error('Geocoding request failed')
      }

      const data = await response.json()
      if (!data.length) {
        throw new Error('No results found')
      }

      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        display_name: data[0].display_name
      }
    } catch (error) {
      console.error('Error in geocoding:', error)
      throw new Error('Geocoding failed')
    }
  }

  async reverseGeocode(lat: number, lon: number): Promise<string> {
    try {
      const response = await fetch(
        `${this.baseUrl}/reverse?format=json&lat=${lat}&lon=${lon}`,
        {
          headers: {
            'User-Agent': 'MobilizeAI Application'
          }
        }
      )

      if (!response.ok) {
        throw new Error('Reverse geocoding request failed')
      }

      const data = await response.json()
      return data.display_name
    } catch (error) {
      console.error('Error in reverse geocoding:', error)
      throw new Error('Reverse geocoding failed')
    }
  }
}
