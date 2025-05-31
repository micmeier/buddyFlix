
import { genkit } from 'genkit';
import { googleAI, gemini20Flash } from '@genkit-ai/googleai';
import { z } from 'zod';

const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash,
});

const MovieSchema = z.object({
  title: z.string(),
  year: z.number(),
});

export const movieFlow = ai.defineFlow(
  {
    name: 'movieRecommendation',
    inputSchema: z.string(),
    outputSchema: z.array(MovieSchema),
  },
  async (userPrompt) => {
    if (!userPrompt) {
      userPrompt = 'Random popular movies from the last 5 years';
    }
    const { output } = await ai.generate({
      model: gemini20Flash,
      system: `You are a movie recommendation system.
      You will be given a prompt and you will return a list of exactly 8 movies that match the prompt.
      The movies should be sorted based on their rating and popularity.
      If the prompt is not related to movies, return random popular movies from the last 5 years.`,
      prompt: userPrompt,
      output: {
        format: 'json',
        schema: z.array(MovieSchema),
      },
      config: {
        temperature: 0.7,
        maxOutputTokens: 300,
      },
    });

    if (!output) return [];
    const parsed = z.array(MovieSchema).safeParse(output);
    return parsed.success ? parsed.data : [];
  }
);
