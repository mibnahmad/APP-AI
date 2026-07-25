import OpenAI from "openai";

type OpenAISettings = {
  textModel: string;
  imageModel: string;
};

let cachedClient: OpenAI | null | undefined;

export const openAISettings: OpenAISettings = {
  textModel: process.env.OPENAI_TEXT_MODEL ?? "gpt-5-mini",
  imageModel: process.env.OPENAI_IMAGE_MODEL ?? "dall-e-3",
};

export function getOpenAIClient() {
  if (cachedClient !== undefined) {
    return cachedClient;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  cachedClient = apiKey ? new OpenAI({ apiKey }) : null;
  return cachedClient;
}

export function hasOpenAIConfig() {
  return Boolean(process.env.OPENAI_API_KEY);
}
