import { NextResponse } from 'next/server'
import { GeminiService } from '@/lib/gemini'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { prompt, type } = body

    const gemini = new GeminiService()

    if (type === 'chat') {
      const response = await gemini.generateChat(body.messages)
      return NextResponse.json({ response })
    } else {
      const response = await gemini.generateContent(prompt)
      return NextResponse.json({ response })
    }
  } catch (error) {
    console.error('Error in Gemini API:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
