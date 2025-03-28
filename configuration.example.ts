import { HarmBlockThreshold, HarmCategory, type ModelParams, type RequestOptions } from '@google/generative-ai'

export const configuration: Configuration = {
    modelParams: {
        model: 'gemini-2.0-flash',
        safetySettings: [
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE
            }
        ],
    },

    requestOptions: undefined
}

type Configuration = {
    modelParams: ModelParams
    requestOptions?: RequestOptions
}