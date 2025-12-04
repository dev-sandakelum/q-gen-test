// OCR utility for extracting text from images using Tesseract.js
export async function extractTextFromImage(imageData: string): Promise<string> {
  try {
    // Dynamically import Tesseract to avoid bundle size issues
    // @ts-ignore: allow importing module without type declarations
    const Tesseract = ((await import("tesseract.js")) as any).default;

    // Define interfaces for type safety
    interface TesseractLoggerMessage {
      status?: string;
      progress?: number;
      jobId?: string;
      [key: string]: any;
    }

    interface TesseractResultData {
      text?: string;
      [key: string]: any;
    }

    interface TesseractResult {
      data: TesseractResultData;
      [key: string]: any;
    }

    interface TesseractModule {
      recognize(
        image: string,
        lang: string,
        options?: { logger?: (m: TesseractLoggerMessage) => void }
      ): Promise<TesseractResult>;
    }

    const tesseract: TesseractModule = Tesseract;

    const result: TesseractResult = await tesseract.recognize(
      imageData,
      "eng",
      {
        logger: (m: TesseractLoggerMessage) =>
          console.log("[v0] OCR Progress:", (m.progress ?? 0) * 100 + "%"),
      }
    );

    return result.data.text?.trim() || "";
  } catch (error) {
    console.error("[v0] OCR Error:", error);
    throw new Error(
      "Failed to extract text from image. Please try another image."
    );
  }
}
