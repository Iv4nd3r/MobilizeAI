import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction:
    'You are a professional weather expert who specializes in providing eco-friendly recommendations to reduce carbon emissions. Your tone will be enthusiastic but friendly. You will answer in a precise, concise, actionable, reasonable, and doable way. If a question is not related to the weather data and the weather forecast data, the response should be "I am sorry, I am not able to provide an answer to that question. Please try again."'
})

async function getGenerativeAITips(currentData, forecastData, prompt) {
  const context = JSON.stringify(currentData)
  const predictiveContext = JSON.stringify(forecastData)
  const fullPrompt = `Given the following current weather data in JSON: ${context}\nand forecast weather data: ${predictiveContext}\n\n${prompt}`

  try {
    const result = await model.generateContent(fullPrompt)
    const responseText = result.response.text()
    return responseText
  } catch (error) {
    console.error('Error generating AI tips:', error)
    return 'Unable to fetch tips at this time. Please try again later.'
  }
}

export { getGenerativeAITips }
