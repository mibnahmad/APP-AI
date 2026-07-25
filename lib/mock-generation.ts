import { buildGeneratedArtworkFromDraft, generationStages } from "@/lib/wall-art-data";
import type { GeneratedArtwork, GenerationDraft } from "@/types/wall-art";

export async function generateMockArtwork(
  draft: GenerationDraft,
  count: number,
): Promise<{ artwork: GeneratedArtwork }> {
  await new Promise((resolve) => window.setTimeout(resolve, generationStages.length * 40));

  return {
    artwork: buildGeneratedArtworkFromDraft(draft, count),
  };
}
