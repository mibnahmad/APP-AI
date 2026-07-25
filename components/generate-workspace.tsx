"use client";

import { useMemo } from "react";
import { BookmarkPlus, Sparkles } from "lucide-react";
import {
  aspectRatioOptions,
  formatOptions,
  frameStyleOptions,
  moodOptions,
  orientationOptions,
  qualityOptions,
  roomOptions,
  styleOptions,
  surfaceOptions,
} from "@/lib/wall-art-data";
import { downloadPreviewImage } from "@/lib/download-artwork-package";
import { useStore } from "@/components/providers/store-provider";
import { PromptEditor } from "@/components/prompt-editor";
import { OptionPills } from "@/components/option-pills";
import { ArtworkPreview } from "@/components/artwork-preview";
import { GalleryCard } from "@/components/gallery-card";
import { EmptyState } from "@/components/empty-state";
import { PromptHistory } from "@/components/prompt-history";
import { Button } from "@/components/ui/button";

const sliderFields = [
  { key: "brightness", label: "Brightness" },
  { key: "warmth", label: "Warmth" },
  { key: "texture", label: "Texture" },
  { key: "complexity", label: "Complexity" },
] as const;

export function GenerateWorkspace() {
  const {
    draft,
    artworks,
    unlockedArtworkIds,
    generationHistory,
    recentViews,
    recentPrompts,
    activeArtworkId,
    isGenerating,
    generationProgress,
    generationLabel,
    updateDraft,
    setPrompt,
    surprisePrompt,
    clearDraft,
    savePrompt,
    generateArtwork,
    unlockArtwork,
    toggleFavorite,
    toggleSaved,
    markViewed,
    setActiveArtwork,
    clearHistory,
    pushToast,
  } = useStore();

  const activeArtwork = useMemo(
    () => artworks.find((artwork) => artwork.id === activeArtworkId) ?? artworks[0],
    [activeArtworkId, artworks],
  );

  const recentGenerated = generationHistory
    .map((id) => artworks.find((artwork) => artwork.id === id))
    .filter((artwork): artwork is NonNullable<typeof artwork> => Boolean(artwork));
  const activeArtworkUnlocked = activeArtwork ? unlockedArtworkIds.includes(activeArtwork.id) : false;

  const recentlyViewed = recentViews
    .map((id) => artworks.find((artwork) => artwork.id === id))
    .filter((artwork): artwork is NonNullable<typeof artwork> => Boolean(artwork))
    .slice(0, 4);

  async function handleGenerate() {
    if (!draft.prompt.trim()) {
      pushToast("Add a prompt before generating");
      return;
    }

   try {
     const created = await generateArtwork();
     setActiveArtwork(created.id);
   } catch {
     return;
   }
  }

  async function handleDownload() {
   if (!activeArtwork) {
     pushToast("Generate or open an artwork first", "error");
     return;
   }

   await downloadPreviewImage(activeArtwork);
   pushToast("Preview download prepared", "success");
  }

  async function handleCopyPrompt() {
   if (!activeArtwork) {
     pushToast("Generate or open an artwork first", "error");
     return;
   }
   await navigator.clipboard.writeText(activeArtwork.prompt);
   pushToast("Prompt copied", "success");
  }

  async function handleShare() {
   if (!activeArtwork) {
     pushToast("Generate or open an artwork first", "error");
     return;
   }
   const shareData = {
     title: activeArtwork.title,
     text: activeArtwork.prompt,
      url: window.location.href,
    };

    if (navigator.share) {
      void navigator.share(shareData);
      pushToast("Share sheet opened", "success");
      return;
    }

    await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
    pushToast("Share details copied", "success");
  }

  function updateSliderValue(field: (typeof sliderFields)[number]["key"], value: number) {
    switch (field) {
      case "brightness":
        updateDraft({ brightness: value });
        break;
      case "warmth":
        updateDraft({ warmth: value });
        break;
      case "texture":
        updateDraft({ texture: value });
        break;
      case "complexity":
        updateDraft({ complexity: value });
        break;
    }
  }

  return (
    <div className="space-y-10">
      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          <PromptEditor value={draft.prompt} onChange={setPrompt} onSurprise={surprisePrompt} onClear={clearDraft} />
          <PromptHistory prompts={recentPrompts} onSelect={setPrompt} />
          <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-3xl text-[#111111]">Controls</h2>
                <p className="mt-2 text-sm text-[#6B7280]">Set the visual language, format, and finishing mood.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleGenerate} className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate
                </Button>
                <Button onClick={savePrompt} variant="outline" className="gap-2">
                  <BookmarkPlus className="h-4 w-4" />
                  Save prompt
                </Button>
              </div>
            </div>
            <div className="mt-6 space-y-6">
              <OptionPills label="Art style" options={styleOptions} value={draft.style} onChange={(style) => updateDraft({ style })} />
              <OptionPills label="Artwork shape" options={formatOptions} value={draft.format} onChange={(format) => updateDraft({ format })} />
              <OptionPills
                label="Aspect ratio"
                options={aspectRatioOptions}
                value={draft.aspectRatio}
                onChange={(aspectRatio) => updateDraft({ aspectRatio })}
              />
              <OptionPills
                label="Orientation"
                options={orientationOptions}
                value={draft.orientation}
                onChange={(orientation) => updateDraft({ orientation })}
              />
              <OptionPills label="Room type" options={roomOptions} value={draft.roomType} onChange={(roomType) => updateDraft({ roomType })} />
              <OptionPills label="Color palette" options={moodOptions} value={draft.mood} onChange={(mood) => updateDraft({ mood })} />
              <OptionPills
                label="Frame style"
                options={frameStyleOptions}
                value={draft.frameStyle}
                onChange={(frameStyle) => updateDraft({ frameStyle })}
              />
              <OptionPills
                label="Canvas or poster"
                options={surfaceOptions}
                value={draft.surface}
                onChange={(surface) => updateDraft({ surface })}
              />
              <OptionPills label="Quality" options={qualityOptions} value={draft.quality} onChange={(quality) => updateDraft({ quality })} />
              <div className="grid gap-5 md:grid-cols-2">
                {sliderFields.map((field) => (
                  <label key={field.key} className="block">
                    <div className="mb-3 flex items-center justify-between text-sm">
                      <span className="font-medium text-[#111111]">{field.label}</span>
                      <span className="text-[#6B7280]">{draft[field.key]}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={draft[field.key]}
                      onChange={(event) => updateSliderValue(field.key, Number(event.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E9E5DC]"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ArtworkPreview
          draft={draft}
          artwork={activeArtwork}
          isGenerating={isGenerating}
          progress={generationProgress}
          progressLabel={generationLabel}
          onGenerate={handleGenerate}
          onDownload={handleDownload}
          onSave={() => {
            if (!activeArtwork) {
              pushToast("Generate or open an artwork first", "error");
              return;
            }

            toggleSaved(activeArtwork.id);
          }}
          onFavorite={() => {
            if (!activeArtwork) {
              pushToast("Generate or open an artwork first", "error");
              return;
            }

            toggleFavorite(activeArtwork.id);
          }}
          onCopyPrompt={handleCopyPrompt}
          onShare={() => {
            void handleShare();
          }}
          isUnlocked={activeArtworkUnlocked}
          onUnlockSuccess={(artworkId) => {
            unlockArtwork(artworkId);
            pushToast("Print-ready package unlocked", "success");
          }}
          onNotify={pushToast}
        />
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-4xl text-[#111111]">Recently generated</h2>
            <p className="mt-2 text-sm text-[#6B7280]">Return to your latest concepts or clear the session history.</p>
          </div>
          <Button variant="outline" onClick={clearHistory}>
            Clear history
          </Button>
        </div>
        {recentGenerated.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recentGenerated.slice(0, 3).map((artwork) => (
              <GalleryCard
                key={artwork.id}
                artwork={artwork}
                onOpen={() => {
                  setActiveArtwork(artwork.id);
                  markViewed(artwork.id);
                }}
                onFavorite={() => toggleFavorite(artwork.id)}
                onSave={() => toggleSaved(artwork.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No generations yet"
            description="Your freshly created artwork will appear here as soon as you generate the first concept."
            actionLabel="Generate first artwork"
            onAction={handleGenerate}
          />
        )}
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="font-serif text-4xl text-[#111111]">Recently viewed</h2>
          <p className="mt-2 text-sm text-[#6B7280]">A quick return path to the pieces you compared most recently.</p>
        </div>
        {recentlyViewed.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {recentlyViewed.map((artwork) => (
              <GalleryCard
                key={artwork.id}
                artwork={artwork}
                onOpen={() => setActiveArtwork(artwork.id)}
                onFavorite={() => toggleFavorite(artwork.id)}
                onSave={() => toggleSaved(artwork.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No viewed pieces yet"
            description="Open a generated piece or explore the gallery to build a recent comparison shortlist."
          />
        )}
      </section>
    </div>
  );
}
