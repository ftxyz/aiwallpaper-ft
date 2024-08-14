import OpenAI from "openai";

export function getOpenAIClient(){
    const client = new OpenAI({
        apiKey: "sk-3N3qjEZ7qxQi9IoQtzYkWo2Un5JUSyM7MBPy6CGg25YJZver",
        baseURL: "https://api.fe8.cn/v1"
    })

   return client;
}