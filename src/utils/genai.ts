import { GoogleGenerativeAI } from '@google/generative-ai';
import { Memory } from '../types';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
}

export const getAIRecommendation = async (
  query: string,
  memories: Memory[],
  userName: string = 'Traveler',
  geminiApiKey: string = import.meta.env.VITE_GENAI_API_KEY,
  unsplashApiKey: string = import.meta.env.VITE_UNSPLASH_API_KEY
): Promise<ChatMessage> => {
  try {
    if (!geminiApiKey) {
      throw new Error('Gemini API key is missing. Please set VITE_GENAI_API_KEY in .env');
    }
    if (!unsplashApiKey) {
      throw new Error('Unsplash API key is missing. Please set VITE_UNSPLASH_API_KEY in .env');
    }

    // Fetch text recommendation from Gemini
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const memoryContext = memories
      .slice(0, 3)
      .map((m) => `Title: ${m.title}, Location: ${m.location || 'Unknown'}, Emotions: ${m.emotionTags.join(', ')}`)
      .join('\n');

    const prompt = `
      You are a travel recommendation AI for a memory gallery app. Address the user as "${userName}" and suggest places to visit based on their memories and query. Provide a brief explanation. Keep responses concise and friendly.

      User Memories:
      ${memoryContext}

      User Query: ${query}

      Response format:
      Hey ${userName}, I recommend visiting [Place]! [Reason based on memories or query].
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // Extract place name for Unsplash query
    const placeMatch = responseText.match(/I recommend visiting ([\w\s,]+?)!/);
    const place = placeMatch ? placeMatch[1] : 'travel';

    // Fetch image from Unsplash
    let imageUrl = `https://source.unsplash.com/400x300/?${place.replace(/\s/g, '-')}`;
    try {
      const unsplashResponse = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(place)}&per_page=1&client_id=${unsplashApiKey}`
      );
      if (!unsplashResponse.ok) {
        throw new Error(`Unsplash API request failed: ${unsplashResponse.statusText}`);
      }
      const unsplashData = await unsplashResponse.json();
      imageUrl = unsplashData.results[0]?.urls?.regular || imageUrl;
    } catch (unsplashError) {
      console.error('Unsplash API Error:', unsplashError);
    }

    return { role: 'assistant', content: responseText, imageUrl };
  } catch (error) {
    console.error('AI Recommendation Error:', error);
    // Fallback mock response
    if (query.toLowerCase().includes('beach')) {
      return {
        role: 'assistant',
        content: `Hey ${userName}, I recommend visiting Santa Barbara! Its serene beaches and tranquil vibe are similar to your Malibu sunset memory.`,
        imageUrl: 'https://source.unsplash.com/400x300/?santa-barbara',
      };
    } else if (query.toLowerCase().includes('hiking')) {
      return {
        role: 'assistant',
        content: `Hey ${userName}, I recommend Yosemite National Park! Its stunning trails match the adventure of your Summit Ridge hike.`,
        imageUrl: 'https://source.unsplash.com/400x300/?yosemite',
      };
    } else {
      return {
        role: 'assistant',
        content: `Hey ${userName}, I recommend Paris, France! Its romantic and nostalgic charm complements the joy and nostalgia in your memories.`,
        imageUrl: 'https://source.unsplash.com/400x300/?paris',
      };
    }
  }
};