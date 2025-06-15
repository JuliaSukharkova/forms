import type { FormSettings } from "@/types/type";
import { nanoid } from "nanoid";
import { GoogleGenAI } from "@google/genai";

export async function generateFormWithGemini(
  userPrompt: string
): Promise<FormSettings> {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  const prompt = `
You are a UI form generator. Based on the given description, return a JSON object with the following structure:

{
  "name": "string",
  "description": "string",
  "elements": [
    {
      "id": "q1",
      "label": "string",
      "options": [string],
      "dataType": "single" | "multiple",
      "required": true,
      "component": "answer" | "multipleList"
    }
  ]
}

Description: "${userPrompt}"

Respond strictly with a valid JSON object, no explanations or additional text.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  console.log(response.text);
  const text = response.text;
  if (!text) throw new Error("Gemini did not return a response.");

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Gemini returned an invalid response format.");

  const parsed = JSON.parse(jsonMatch[0]);

  parsed.elements = parsed.elements.map((el: FormSettings) => ({
    ...el,
    id: nanoid(),
  }));

  return parsed;
}
