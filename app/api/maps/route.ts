import { NextResponse } from 'next/server'
import { OpenMapsService } from '@/lib/maps'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address')
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    const mapsService = new OpenMapsService()

    if (address) {
      const result = await mapsService.geocode(address)
      return NextResponse.json(result)
    } else if (lat && lon) {
      const result = await mapsService.reverseGeocode(
        parseFloat(lat),
        parseFloat(lon)
      )
      return NextResponse.json({ display_name: result })
    } else {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error in Maps API:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
