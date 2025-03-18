import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) throw new Error('GEMINI_API_KEY is not set')

const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    safetySettings: [
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE
        }
    ]
})

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