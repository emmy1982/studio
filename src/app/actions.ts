"use server";

import { generateAmbientSound } from "@/ai/flows/ambient-sound-generator";
import { generateImage } from "@/ai/flows/image-generator";

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

export async function generateImageAction(
  prompt: string
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    const result = await generateImage({ prompt });
    if (result.imageUrl) {
      return { success: true, data: result.imageUrl };
    } else {
      return { success: false, error: "AI failed to generate image." };
    }
  } catch (error) {
    console.error("Error generating image:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    };
  }
}
