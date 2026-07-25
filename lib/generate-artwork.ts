import { buildGeneratedArtworkFromDraft, buildGeneratedArtworkFromDraft as buildMockArtwork, roomOptions } from "@/lib/wall-art-data";
import { getOpenAIClient, hasOpenAIConfig, openAISettings } from "@/lib/openai";
import type {
  ArtworkProvider,
  ColorMood,
  GeneratedArtwork,
  GenerationDraft,
  QualityTier,
  RoomType,
} from "@/types/wall-art";

type PromptBlueprint = {
  title: string;
  story: string;
  palette: string[];
  bestFor: RoomType;
  prompt: string;
};

export async function generateArtworkFromDraft(
  draft: GenerationDraft,
  count: number,
): Promise<{ artwork: GeneratedArtwork; provider: ArtworkProvider }> {
  assertGenerationRequestAllowed();

  if (!hasOpenAIConfig()) {
    const artwork = buildFallbackArtwork(draft, count);
    return { artwork, provider: "mock" };
  }

  const blueprint = await orchestratePrompt(draft);
  const artwork = await generateOpenAIArtwork(draft, count, blueprint);
  return { artwork, provider: "openai" };
}

function buildFallbackArtwork(draft: GenerationDraft, count: number) {
  const baseArtwork = buildMockArtwork(draft, count);
  const palette = draft.mood.split(" ");

  return {
    ...baseArtwork,
    title: `${draft.style} Atelier ${count}`,
    story: `A refined ${draft.style.toLowerCase()} composition tailored for ${draft.roomType.toLowerCase()} interiors with ${draft.mood.toLowerCase()} tonality and a ${draft.surface.toLowerCase()} presentation.`,
    colorPalette: palette,
    bestFor: draft.roomType,
    provider: "mock" as const,
    previewStatus: "preview" as const,
  };
}

async function orchestratePrompt(draft: GenerationDraft): Promise<PromptBlueprint> {
  const client = getOpenAIClient();
  if (!client) {
    return buildFallbackBlueprint(draft);
  }

  const response = await client.responses.create({
    model: openAISettings.textModel,
    instructions:
      "You are the art director for LUMEA AI, a premium AI wall art product. Rewrite user briefs into elegant interior-focused image prompts. Return exactly five lines in this order: TITLE:, STORY:, PALETTE:, BEST_FOR:, PROMPT:. Keep the title under 6 words, the story under 22 words, the palette as a comma-separated list, and the prompt concise but richly visual.",
    input: [
      `Customer prompt: ${draft.prompt}`,
      `Style: ${draft.style}`,
      `Room type: ${draft.roomType}`,
      `Mood: ${draft.mood}`,
      `Aspect ratio: ${draft.aspectRatio}`,
      `Orientation: ${draft.orientation}`,
      `Surface: ${draft.surface}`,
      `Frame: ${draft.frameStyle}`,
      `Quality: ${draft.quality}`,
      `Brightness: ${draft.brightness}`,
      `Warmth: ${draft.warmth}`,
      `Texture: ${draft.texture}`,
      `Complexity: ${draft.complexity}`,
    ].join("\n"),
  });

  if (!response.output_text.trim()) {
    throw new Error("OpenAI did not return prompt guidance.");
  }

  return parseBlueprint(response.output_text, draft);
}

async function generateOpenAIArtwork(
  draft: GenerationDraft,
  count: number,
  blueprint: PromptBlueprint,
): Promise<GeneratedArtwork> {
  const client = getOpenAIClient();
  if (!client) {
    throw new Error("OpenAI client is not configured.");
  }

  const imageResponse = await client.images.generate({
    model: openAISettings.imageModel,
    prompt: blueprint.prompt,
    quality: mapImageQuality(draft.quality),
    size: mapImageSize(draft),
    response_format: openAISettings.imageModel === "dall-e-3" ? "b64_json" : undefined,
    style: openAISettings.imageModel === "dall-e-3" ? "natural" : undefined,
  });

  const firstImage = imageResponse.data?.[0];
  if (!firstImage) {
    throw new Error("OpenAI did not return an artwork image.");
  }

  const image =
    firstImage.url ??
    (firstImage.b64_json ? `data:image/png;base64,${firstImage.b64_json}` : null);

  if (!image) {
    throw new Error("OpenAI returned an unsupported image payload.");
  }

  const mockBase = buildGeneratedArtworkFromDraft(draft, count);

  return {
    ...mockBase,
    image,
    title: blueprint.title,
    prompt: blueprint.prompt,
    story: blueprint.story,
    colorPalette: blueprint.palette,
    bestFor: blueprint.bestFor,
    provider: "openai",
    orientation: draft.orientation,
    frameStyle: draft.frameStyle,
    surface: draft.surface,
    revisedPrompt: firstImage.revised_prompt,
    previewStatus: "preview",
  };
}

function buildFallbackBlueprint(draft: GenerationDraft): PromptBlueprint {
  const palette = buildPaletteFromMood(draft.mood);

  return {
    title: `${draft.style} Horizon`,
    story: `Premium ${draft.style.toLowerCase()} wall art in ${draft.mood.toLowerCase()} tones for ${draft.roomType.toLowerCase()} interiors.`,
    palette,
    bestFor: draft.roomType,
    prompt: [
      `${draft.prompt.trim()}.`,
      `${draft.style} wall art for a ${draft.roomType.toLowerCase()}.`,
      `${draft.mood} palette, ${draft.surface.toLowerCase()} finish, ${draft.frameStyle.toLowerCase()} frame preview.`,
      `${describeQuality(draft.quality)}, balanced composition, refined editorial lighting.`,
    ].join(" "),
  };
}

function parseBlueprint(outputText: string, draft: GenerationDraft): PromptBlueprint {
  const fallback = buildFallbackBlueprint(draft);
  const lines = outputText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const readLine = (prefix: string) =>
    lines.find((line) => line.toUpperCase().startsWith(`${prefix}:`))?.split(":").slice(1).join(":").trim();

  const title = readLine("TITLE") || fallback.title;
  const story = readLine("STORY") || fallback.story;
  const palette = (readLine("PALETTE") || fallback.palette.join(", "))
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 5);
  const prompt = readLine("PROMPT") || fallback.prompt;
  const bestFor = normalizeRoomType(readLine("BEST_FOR"), draft.roomType);

  return {
    title,
    story,
    palette: palette.length ? palette : fallback.palette,
    prompt,
    bestFor,
  };
}

function buildPaletteFromMood(mood: ColorMood) {
  switch (mood) {
    case "Soft Sand":
      return ["Soft Sand", "Warm Linen", "Greige"];
    case "Warm Ivory":
      return ["Warm Ivory", "Oat", "Brushed Gold"];
    case "Earth Tone":
      return ["Terracotta", "Stone", "Clay"];
    case "Moody Charcoal":
      return ["Charcoal", "Graphite", "Smoke"];
    case "Olive Mist":
      return ["Olive Mist", "Sage", "Chalk"];
    case "Clay Rose":
      return ["Clay Rose", "Blush Taupe", "Sandstone"];
    case "Ocean Haze":
      return ["Ocean Haze", "Slate Blue", "Mist"];
  }
}

function normalizeRoomType(value: string | undefined, fallback: RoomType): RoomType {
  if (!value) {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();
  const matched = roomOptions.find((option) => option.toLowerCase() === normalized);
  return matched ?? fallback;
}

function mapImageSize(draft: GenerationDraft) {
  if (draft.orientation === "Square" || draft.aspectRatio === "1:1") {
    return "1024x1024";
  }

  return draft.orientation === "Landscape" ? "1792x1024" : "1024x1792";
}

function mapImageQuality(quality: QualityTier) {
  return quality === "Standard" ? "standard" : "hd";
}

function describeQuality(quality: QualityTier) {
  switch (quality) {
    case "Standard":
      return "clean premium detail";
    case "High":
      return "high-detail museum-quality rendering";
    case "Ultra":
      return "ultra-refined print-ready detail";
  }
}

function assertGenerationRequestAllowed() {
  return {
    allowed: true,
    remaining: "placeholder",
  };
}
