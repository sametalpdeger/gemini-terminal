import { GoogleGenerativeAI } from '@google/generative-ai'
import { configuration } from './configuration'

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) throw new Error('GEMINI_API_KEY is not set')

const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel(configuration.modelParams, configuration.requestOptions)

const chatHistory: {
    role: 'user' | 'assistant'
    content: string
}[] = []

while (true) {
    console.log('\n -------------------- \n')
    const promptInput = prompt('Enter your prompt:')
    console.log('\n \n')
    if (!promptInput) {
        console.log('Prompt cannot be empty')
        continue
    }


    const promptText = `You are a helpful terminal based assistant chatting with user based on the previous chat history and context. Don't use markdown syntax when answering. \nContext: ${configuration.context} \nChat history:\n${chatHistory.map(({ role, content }) => `${role}: ${content}`).join('\n')}\n\nCurrent prompt: ${promptInput}`
    const result = await model.generateContentStream(promptText)

    chatHistory.push({ role: 'user', content: promptInput })

    let aiResponse: string = ''

    for await (const chunk of result.stream) {
        const chunkText = chunk.text()
        aiResponse = aiResponse + chunkText
        process.stdout.write(chunkText)
    }

    chatHistory.push({ role: 'assistant', content: aiResponse })
}