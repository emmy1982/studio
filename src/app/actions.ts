"use server";

import { generateAmbientSound } from "@/ai/flows/ambient-sound-generator";

export async function generateAmbientSoundAction(
  keywords: string
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    const result = await generateAmbientSound({ keywords });
    if (result.media) {
      return { success: true, data: result.media };
    } else {
      return { success: false, error: "AI failed to generate sound." };
    }
  } catch (error) {
    console.error("Error generating ambient sound:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    };
  }
}
