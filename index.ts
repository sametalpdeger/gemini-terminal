import { GoogleGenerativeAI } from '@google/generative-ai'
import { configuration } from './configuration'

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) throw new Error('GEMINI_API_KEY is not set')

const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel(configuration.modelParams, configuration.requestOptions)

while (true) {
    console.log('\n -------------------- \n')
    const promptRes = prompt('Enter your prompt:')
    console.log('\n \n')
    if (!promptRes) throw new Error('Prompt is empty')

    const result = await model.generateContentStream(promptRes)

    // Log streamed response chunks as they arrive
    for await (const chunk of result.stream) {
        const chunkText = chunk.text()
        process.stdout.write(chunkText)
    }
}