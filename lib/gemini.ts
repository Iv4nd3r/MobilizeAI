import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
)

export class GeminiService {
  private model

  constructor() {
    // Initialize the model
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  }

  async generateContent(prompt: string) {
    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Error generating content:', error)
      throw new Error('Failed to generate content')
    }
  }

  async generateChat(
    messages: Array<{ role: 'user' | 'model'; content: string }>
  ) {
    try {
      const chat = this.model.startChat()
      const history = messages.map(msg => ({
        role: msg.role,
        parts: msg.content
      }))

      const result = await chat.sendMessage(
        messages[messages.length - 1].content
      )
      return result.response.text()
    } catch (error) {
      console.error('Error in chat generation:', error)
      throw new Error('Failed to generate chat response')
    }
  }
}
