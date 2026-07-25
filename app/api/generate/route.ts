import { NextResponse } from "next/server";
import {
  aspectRatioOptions,
  defaultGenerationDraft,
  formatOptions,
  frameStyleOptions,
  moodOptions,
  orientationOptions,
  qualityOptions,
  roomOptions,
  styleOptions,
  surfaceOptions,
} from "@/lib/wall-art-data";
import { generateArtworkFromDraft } from "@/lib/generate-artwork";
import type { GenerateArtworkResponse, GenerationDraft } from "@/types/wall-art";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      draft?: Partial<GenerationDraft>;
      count?: number;
    };

    const draft = normalizeDraft(body.draft);
    const count = typeof body.count === "number" && Number.isFinite(body.count) ? Math.max(1, Math.floor(body.count)) : 1;
    const result = await generateArtworkFromDraft(draft, count);

    return NextResponse.json<GenerateArtworkResponse>(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to generate artwork.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

function normalizeDraft(input?: Partial<GenerationDraft>): GenerationDraft {
  const mergedDraft = { ...defaultGenerationDraft, ...input };

  if (typeof mergedDraft.prompt !== "string" || !mergedDraft.prompt.trim()) {
    throw new Error("A prompt is required.");
  }

  if (
    !isOption(mergedDraft.style, styleOptions) ||
    !isOption(mergedDraft.format, formatOptions) ||
    !isOption(mergedDraft.aspectRatio, aspectRatioOptions) ||
    !isOption(mergedDraft.orientation, orientationOptions) ||
    !isOption(mergedDraft.frameStyle, frameStyleOptions) ||
    !isOption(mergedDraft.surface, surfaceOptions) ||
    !isOption(mergedDraft.quality, qualityOptions) ||
    !isOption(mergedDraft.roomType, roomOptions) ||
    !isOption(mergedDraft.mood, moodOptions)
  ) {
    throw new Error("One or more artwork options are invalid.");
  }

  return {
    ...mergedDraft,
    brightness: normalizePercentage(mergedDraft.brightness),
    warmth: normalizePercentage(mergedDraft.warmth),
    texture: normalizePercentage(mergedDraft.texture),
    complexity: normalizePercentage(mergedDraft.complexity),
  };
}

function normalizePercentage(value: number) {
  if (!Number.isFinite(value)) {
    throw new Error("Artwork controls must be valid percentages.");
  }

  return Math.min(100, Math.max(0, Math.round(value)));
}

function isOption<T extends string>(value: unknown, options: readonly T[]): value is T {
  return typeof value === "string" && options.includes(value as T);
}
