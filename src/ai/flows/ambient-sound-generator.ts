'use server';

/**
 * @fileOverview An AI agent for generating ambient soundscapes based on keywords.
 *
 * - generateAmbientSound - A function that generates ambient soundscapes.
 * - AmbientSoundInput - The input type for the generateAmbientSound function.
 * - AmbientSoundOutput - The return type for the generateAmbientSound function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const AmbientSoundInputSchema = z.object({
  keywords: z
    .string()
    .describe(
      'Keywords describing the desired ambient soundscape, such as "forest", "rain", or "ocean".'
    ),
});
export type AmbientSoundInput = z.infer<typeof AmbientSoundInputSchema>;

const AmbientSoundOutputSchema = z.object({
  media: z
    .string()
    .describe(
      'The generated ambient soundscape as a data URI in WAV format.'
    ),
});
export type AmbientSoundOutput = z.infer<typeof AmbientSoundOutputSchema>;

export async function generateAmbientSound(
  input: AmbientSoundInput
): Promise<AmbientSoundOutput> {
  return ambientSoundFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ambientSoundPrompt',
  input: {schema: AmbientSoundInputSchema},
  output: {schema: AmbientSoundOutputSchema},
  prompt: `Generate an ambient soundscape based on the following keywords: {{{keywords}}}. The soundscape should be suitable for meditation and focus.`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const ambientSoundFlow = ai.defineFlow(
  {
    name: 'ambientSoundFlow',
    inputSchema: AmbientSoundInputSchema,
    outputSchema: AmbientSoundOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: 'Algenib'},
          },
        },
      },
      prompt: `Create a soundscape for meditation. The keywords are ${input.keywords}`,
    });

    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    return {media: 'data:audio/wav;base64,' + (await toWav(audioBuffer))};
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
