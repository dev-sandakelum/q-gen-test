import OpenAI from "openai"

let currentKeyIndex = 0

const API_KEYS = [
  process.env.OPENROUTER_API_KEY_1,
].filter((key): key is string => key !== undefined && key !== "")

const HAS_API_KEYS = API_KEYS.length > 0

export function getNextApiKey(): string {
  if (!HAS_API_KEYS) {
    throw new Error(
      "No OpenRouter API keys configured. Please add OPENROUTER_API_KEY_1 (or _2/_3) to your environment."
    )
  }

  const key = API_KEYS[currentKeyIndex]
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length
  return key
}

/**
 * RANDOM MODEL LIST
 * (Free or cheap models on OpenRouter that work well)
 */
const MODEL_LIST = [
  "openai/gpt-oss-20b:free",
  "meta-llama/llama-3.2-3b-instruct:free",
]

function getRandomModel(): string {
  return MODEL_LIST[Math.floor(Math.random() * MODEL_LIST.length)]
}

export async function callOpenAI(
  messages: Array<{ role: string; content: string }>,
  retries = 3,
  temperature = 0.7
): Promise<{ content: string; model: string }> {
  if (!HAS_API_KEYS) {
    throw new Error(
      "OpenRouter API keys are not configured. Set OPENROUTER_API_KEY_1 (or _2/_3) to enable AI features."
    )
  }

  for (let i = 0; i < retries; i++) {
    try {
      const apiKey = getNextApiKey()
      const model = getRandomModel()   // RANDOM MODEL PICK

      const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
      })

      const response = await openai.chat.completions.create({
        model: model,
        messages: messages.map(msg => ({
          role: msg.role as "user" | "assistant" | "system",
          content: msg.content,
        })),
        temperature,
        max_tokens: 2048,
      })

      const content = response?.choices?.[0]?.message?.content
      if (!content) throw new Error("Empty response from model")
        
      return { content, model }
    } catch (error: unknown) {
      const err = error as any

      const isRateLimited =
        (typeof err.status === "number" && err.status === 429) ||
        (typeof err.message === "string" && err.message.includes("429"))

      if (isRateLimited && i < retries - 1) {
        await new Promise(res => setTimeout(res, 1000))
        continue
      }

      throw error
    }
  }

  throw new Error("Failed to call OpenRouter API after retries")
}