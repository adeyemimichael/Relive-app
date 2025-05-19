// import "dotenv/config";
// import { GoogleGenAI } from "@google/genai";

// // Initialize Gemini client
// const genAI = new GoogleGenAI(process.env.GOOGLE_GENAI_API_KEY!);

// // Use a valid Gemini model
// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
//   generationConfig: {
//     maxOutputTokens: 50, // Limit to ~1-2 sentences
//     temperature: 0.7, // Balanced creativity
//   },
// });

// export async function askGemini(prompt: string): Promise<string> {
//   try {
//     // System prompt to guide the AI for gallery reflections
//     const fullPrompt = `You are an AI that generates thoughtful, concise reflections (1-2 sentences) for user memories in a gallery application. Based on the following memory, capture its emotional essence: ${prompt}`;

//     const result = await model.generateContent(fullPrompt);
//     const text = result.response.text();

//     if (!text) {
//       throw new Error("No content returned from Gemini API");
//     }
//     return text.trim();
//   } catch (error) {
//     console.error("Gemini API error:", error);
//     throw new Error("Failed to generate reflection. Please check your API key or try again.");
//   }
// }