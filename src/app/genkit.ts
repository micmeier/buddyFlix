import { genkit } from 'genkit';
import { googleAI, gemini20Flash } from '@genkit-ai/googleai';
import { z } from 'zod';

// Define the output schema for movies
export const MovieSchema = z.object({
  title: z.string(),
  year: z.number(),
});

// Initialize Genkit with Google AI plugin and Gemini model
const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash,
});

// Export the flow to be used in server.ts
export const movieFlow = ai.defineFlow(
  {
    name: 'movieRecommender',
    inputSchema: z.string(),
    outputSchema: MovieSchema,
  },
  async (userPrompt) => {
    try {
      // Flow implementation
      const response = await ai.generate({
        prompt: `Based on: "${userPrompt}", suggest a movie with title and year`,
        output: { schema: MovieSchema },
      });

      // Handle potential null response with fallback
      return response.output || { title: 'Inception', year: 2010 };
    } catch (error) {
      console.error('Error generating movie recommendation:', error);
      // Return fallback movie if generation fails
      return { title: 'The Matrix', year: 1999 };
    }
  }
);
