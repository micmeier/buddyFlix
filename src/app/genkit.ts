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
    const { output } = await ai.generate({
      model: gemini20Flash,
      prompt: `Recommend movies matching: "${userPrompt}". Return JSON array with title and year.`,
      output: {
        format: 'json',
        schema: z.array(MovieSchema),
      },
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      },
    });

    // Type guard and validation
    if (!output) return [];
    const parsed = z.array(MovieSchema).safeParse(output);
    return parsed.success ? parsed.data : [];
  }
);
