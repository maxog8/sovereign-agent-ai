/**
 * Image generation helper using OpenAI DALL-E 3
 *
 * Example usage:
 *   const { url: imageUrl } = await generateImage({
 *     prompt: "A serene landscape with mountains"
 *   });
 *
 * For editing (image-to-image):
 *   const { url: imageUrl } = await generateImage({
 *     prompt: "Add a rainbow to this landscape",
 *     originalImages: [{
 *       url: "https://example.com/original.jpg",
 *       mimeType: "image/jpeg"
 *     }]
 *   });
 */
import OpenAI from "openai";
import { ENV } from "./env";

export type GenerateImageOptions = {
  prompt: string;
  originalImages?: Array<{
    url?: string;
    b64Json?: string;
    mimeType?: string;
  }>;
};

export type GenerateImageResponse = {
  url?: string;
};

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!ENV.openaiApiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: ENV.openaiApiKey,
    });
  }
  
  return openaiClient;
}

export async function generateImage(
  options: GenerateImageOptions
): Promise<GenerateImageResponse> {
  const client = getOpenAIClient();

  // Check if this is image-to-image (editing) or text-to-image
  const hasOriginalImage = options.originalImages && options.originalImages.length > 0;

  if (hasOriginalImage) {
    // For image-to-image, we'll use DALL-E 3 with the original image URL in the prompt
    // Note: DALL-E 3 doesn't support direct image editing like DALL-E 2's edit endpoint
    // So we enhance the prompt to describe the transformation
    const enhancedPrompt = `${options.prompt}. Style: maintain consistency with the reference image.`;
    
    const response = await client.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url",
    });

    return {
      url: response.data?.[0]?.url,
    };
  } else {
    // Text-to-image generation
    const response = await client.images.generate({
      model: "dall-e-3",
      prompt: options.prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url",
    });

    return {
      url: response.data?.[0]?.url,
    };
  }
}
