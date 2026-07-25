"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CheckCircle2,
  Copy,
  Download,
  Expand,
  LoaderCircle,
  RefreshCcw,
  Share2,
  Sparkles,
  Star,
  ZoomIn,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PremiumPaywallCard } from "@/components/premium-paywall-card";
import { downloadArtworkPackage } from "@/lib/download-artwork-package";
import { generationStages, mockupScenes, purchaseTrust } from "@/lib/wall-art-data";
import type {
  CheckoutSessionResponse,
  FrameStyle,
  GeneratedArtwork,
  GenerationDraft,
  ToastMessage,
  UnlockPaymentStatus,
} from "@/types/wall-art";

const wallTones = [
  { label: "Warm White", value: "rgba(250,250,248,0.08)" },
  { label: "Soft Sand", value: "rgba(221,207,182,0.18)" },
  { label: "Stone Grey", value: "rgba(155,164,181,0.18)" },
  { label: "Charcoal", value: "rgba(38,42,52,0.18)" },
] as const;

const frameClasses: Record<FrameStyle, string> = {
  Black: "border-[#1E1E1E] bg-[#121212]",
  Oak: "border-[#B99563] bg-[#CDA97A]",
  White: "border-[#F3F3EF] bg-[#FFFFFF]",
  Brass: "border-[#C9A96E] bg-[#C9A96E]",
  "Gallery Shadow": "border-[#3A352F] bg-[#3A352F]",
};

export function ArtworkPreview({
  draft,
  artwork,
  isGenerating,
  progress,
  progressLabel,
  onGenerate,
  onDownload,
  onSave,
  onFavorite,
  onCopyPrompt,
  onShare,
  isUnlocked,
  onUnlockSuccess,
  onNotify,
}: {
  draft: GenerationDraft;
  artwork?: GeneratedArtwork;
  isGenerating: boolean;
  progress: number;
  progressLabel: string;
  onGenerate: () => void;
  onDownload: () => void | Promise<void>;
  onSave: () => void;
  onFavorite: () => void;
  onCopyPrompt: () => void | Promise<void>;
  onShare: () => void;
  isUnlocked: boolean;
  onUnlockSuccess: (artworkId: string) => void;
  onNotify: (title: string, tone?: ToastMessage["tone"]) => void;
}) {
  const initialScene = useMemo(() => getSceneForRoom(draft.roomType), [draft.roomType]);
  const [selectedScene, setSelectedScene] = useState(initialScene);
  const [frameStyle, setFrameStyle] = useState<FrameStyle>(draft.frameStyle);
  const [wallTone, setWallTone] = useState<(typeof wallTones)[number]["label"]>("Warm White");
  const [artworkScale, setArtworkScale] = useState(64);
  const [compareValue, setCompareValue] = useState(72);
  const [fullscreen, setFullscreen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<UnlockPaymentStatus>("idle");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    setSelectedScene(getSceneForRoom(draft.roomType));
    setFrameStyle(draft.frameStyle);
  }, [draft.frameStyle, draft.roomType]);

  useEffect(() => {
    if (isUnlocked) {
      setPaymentStatus("succeeded");
      return;
    }

    setPaymentStatus("idle");
  }, [isUnlocked, artwork?.id]);

  const activeWallTone = wallTones.find((tone) => tone.label === wallTone) ?? wallTones[0];
  const comparisonScenes = useMemo(
    () => ({
      bedroom: findScene("Bedroom"),
      livingRoom: findScene("Living room"),
      office: findScene("Office"),
      gallery: findScene("Gallery"),
    }),
    [],
  );

  async function handlePaywallPrimaryAction() {
    if (!artwork) {
      onNotify("Generate or open an artwork first", "error");
      return;
    }

    if (isUnlocked) {
      await handleDownloadPackage();
      return;
    }

    setCheckoutOpen(true);
  }

  async function handleUnlockArtwork() {
    if (!artwork) {
      onNotify("Generate or open an artwork first", "error");
      return;
    }

    setPaymentStatus("processing");
    setPaymentError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          artworkId: artwork.id,
          artworkTitle: artwork.title,
        }),
      });

      const payload = (await response.json()) as Partial<CheckoutSessionResponse> & { error?: string };
      if (!response.ok || !payload.status) {
        throw new Error(payload.error ?? "Unable to start checkout.");
      }

      if (payload.status === "pending") {
        setPaymentStatus("pending");
        return;
      }

      onUnlockSuccess(artwork.id);
      setPaymentStatus("succeeded");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to unlock downloads.";
      setPaymentStatus("failed");
      setPaymentError(message);
      onNotify(message, "error");
    }
  }

  async function handleDownloadPackage() {
    if (!artwork) {
      onNotify("Generate or open an artwork first", "error");
      return;
    }

    setIsExporting(true);

    try {
      await downloadArtworkPackage(artwork);
      onNotify("Print-ready package prepared", "success");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to prepare the print-ready package.";
      onNotify(message, "error");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <section className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl text-[#111111]">Artwork reveal</h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Generate the concept, preview it across premium interiors, and only unlock the print-ready package after the artwork feels right.
          </p>
        </div>
        <div className="rounded-full border border-black/8 px-3 py-1 text-xs text-[#6B7280]">
          {artwork ? (isUnlocked ? "Print-ready unlocked" : "Free preview active") : "Ready"}
        </div>
      </div>

      {isGenerating ? (
        <div className="mt-6 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            <div className="aspect-[4/5] animate-pulse rounded-[1.75rem] bg-[#EFEDE7]" />
            <div className="aspect-[5/4] animate-pulse rounded-[1.75rem] bg-[#F3F1EB]" />
          </div>
          <div className="rounded-[1.75rem] border border-black/8 bg-[#FAFAF8] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[#6B7280]">Generation stages</p>
            <div className="mt-6 space-y-4">
              {generationStages.map((stage) => {
                const complete = progress >= stage.progress;
                const active = progressLabel === stage.label;
                return (
                  <div
                    key={stage.label}
                    className={`flex items-center gap-3 rounded-[1.25rem] border px-4 py-4 transition ${
                      complete
                        ? "border-[#C9A96E]/35 bg-white text-[#111111]"
                        : active
                          ? "border-black/10 bg-white text-[#111111]"
                          : "border-transparent bg-white/60 text-[#6B7280]"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        complete ? "bg-[#C9A96E]/15 text-[#111111]" : "bg-black/[0.05] text-[#6B7280]"
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{stage.label}</p>
                    </div>
                    <span className="text-xs">{stage.progress}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : artwork ? (
        <div className="mt-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2rem] border border-black/8 bg-[radial-gradient(circle_at_top,rgba(201,169,110,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,1),rgba(248,245,238,1))] p-6"
          >
            <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(201,169,110,0.22),transparent_72%)]" />
            <div className="relative grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[#6B7280]">Hero reveal</p>
                    <h3 className="mt-2 font-serif text-4xl text-[#111111]">{artwork.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={() => setFullscreen(true)} className="gap-2">
                      <Expand className="h-4 w-4" />
                      Fullscreen
                    </Button>
                    <Button variant="outline" onClick={() => setArtworkScale((value) => Math.min(92, value + 6))} className="gap-2">
                      <ZoomIn className="h-4 w-4" />
                      Zoom
                    </Button>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <div className="relative w-full max-w-[520px] rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(250,250,248,0.92))] p-5 shadow-[0_40px_120px_-70px_rgba(17,17,17,0.65)]">
                    <div className="pointer-events-none absolute inset-x-12 top-4 h-16 rounded-full bg-[#C9A96E]/12 blur-3xl" />
                    <div className={`relative mx-auto overflow-hidden rounded-[1.1rem] border-[10px] shadow-[0_40px_100px_-55px_rgba(17,17,17,0.75)] ${frameClasses[frameStyle]}`}>
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[0.7rem] border border-white/15 bg-white">
                        <ArtworkImage
                          src={artwork.image}
                          alt={artwork.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 32vw"
                          className="object-cover transition duration-700 hover:scale-[1.03]"
                        />
                        {!isUnlocked ? (
                          <div className="absolute inset-x-4 bottom-4 rounded-full border border-white/20 bg-black/55 px-4 py-2 text-center text-[11px] uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                            Free preview • watermarked download
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button onClick={onGenerate} className="gap-2">
                    <RefreshCcw className="h-4 w-4" />
                    Generate another concept
                  </Button>
                  <Button onClick={() => void onDownload()} variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download preview
                  </Button>
                  <Button onClick={onSave} variant="outline" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    {artwork.saved ? "Saved to gallery" : "Save to gallery"}
                  </Button>
                  <Button onClick={onFavorite} variant="outline" className="gap-2">
                    <Star className={`h-4 w-4 ${artwork.favorite ? "fill-current" : ""}`} />
                    {artwork.favorite ? "Favorited" : "Save to favorites"}
                  </Button>
                  <Button onClick={() => void onCopyPrompt()} variant="outline" className="gap-2">
                    <Copy className="h-4 w-4" />
                    Copy prompt
                  </Button>
                  <Button onClick={onShare} variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-black/8 bg-white/85 p-5 shadow-[0_30px_80px_-65px_rgba(17,17,17,0.35)]">
                <p className="text-xs uppercase tracking-[0.22em] text-[#6B7280]">Artwork story panel</p>
                <div className="mt-4 grid gap-4">
                  <MetaRow label="Style" value={artwork.style} />
                  <MetaRow label="Mood" value={artwork.mood} />
                  <MetaRow label="Color palette" value={(artwork.colorPalette ?? artwork.paletteHint.split(",")).join(" • ")} />
                  <MetaRow label="Best for" value={artwork.bestFor ?? artwork.roomType} />
                  <MetaRow label="Generated" value={formatTimestamp(artwork.createdAt)} />
                  <MetaRow label="Provider" value={artwork.provider === "openai" ? "OpenAI pipeline" : "Static fallback"} />
                </div>
                <div className="mt-5 rounded-[1.35rem] border border-black/8 bg-[#FAFAF8] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#6B7280]">Description</p>
                  <p className="mt-3 text-sm leading-7 text-[#111111]">
                    {artwork.story ??
                      "A premium wall art concept prepared for interior-led evaluation before any payment decision."}
                  </p>
                </div>
                {artwork.revisedPrompt ? (
                  <div className="mt-4 rounded-[1.35rem] border border-black/8 bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#6B7280]">AI refinement</p>
                    <p className="mt-3 text-sm leading-7 text-[#6B7280]">{artwork.revisedPrompt}</p>
                  </div>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-2">
                  {purchaseTrust.map((item) => (
                    <span key={item} className="rounded-full border border-black/8 bg-white px-3 py-2 text-xs text-[#111111]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
            <div className="space-y-5 rounded-[1.75rem] border border-black/8 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#6B7280]">Mockup gallery</p>
                  <h4 className="mt-2 font-serif text-3xl text-[#111111]">See the same artwork inside editorial room mockups.</h4>
                </div>
                <div className="rounded-full border border-black/8 px-3 py-1 text-xs text-[#6B7280]">
                  Premium interior previews
                </div>
              </div>
              <RoomPreviewScene
                artwork={artwork}
                sceneImage={selectedScene.image}
                compareValue={compareValue}
                wallTone={activeWallTone.value}
                frameStyle={frameStyle}
                artworkScale={artworkScale}
              />
              <div className="grid gap-3 md:grid-cols-2">
                {mockupScenes.map((scene) => (
                  <button
                    key={scene.label}
                    type="button"
                    onClick={() => setSelectedScene(scene)}
                    className={`rounded-[1.25rem] border px-4 py-3 text-left text-sm transition ${
                      selectedScene.label === scene.label
                        ? "border-[#C9A96E]/45 bg-[#FBF7EE] text-[#111111]"
                        : "border-black/8 bg-[#FAFAF8] text-[#6B7280] hover:text-[#111111]"
                    }`}
                  >
                    {scene.label}
                  </button>
                ))}
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-[#6B7280]">
                  <span>Comparison slider</span>
                  <span>{compareValue}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={compareValue}
                  onChange={(event) => setCompareValue(Number(event.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E9E5DC]"
                />
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                <ControlBlock title="Frame preview">
                  <div className="space-y-2">
                    {(["Black", "Oak", "White", "Brass", "Gallery Shadow"] as FrameStyle[]).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFrameStyle(option)}
                        className={`w-full rounded-[1rem] border px-3 py-3 text-left text-sm ${
                          frameStyle === option ? "border-[#C9A96E]/45 bg-[#FBF7EE] text-[#111111]" : "border-black/8 text-[#6B7280]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </ControlBlock>
                <ControlBlock title="Wall tone">
                  <div className="space-y-2">
                    {wallTones.map((tone) => (
                      <button
                        key={tone.label}
                        type="button"
                        onClick={() => setWallTone(tone.label)}
                        className={`w-full rounded-[1rem] border px-3 py-3 text-left text-sm ${
                          wallTone === tone.label ? "border-[#C9A96E]/45 bg-[#FBF7EE] text-[#111111]" : "border-black/8 text-[#6B7280]"
                        }`}
                      >
                        {tone.label}
                      </button>
                    ))}
                  </div>
                </ControlBlock>
                <ControlBlock title="Artwork size">
                  <div className="rounded-[1.2rem] border border-black/8 bg-[#FAFAF8] p-4">
                    <div className="mb-3 flex items-center justify-between text-sm text-[#6B7280]">
                      <span>Preview scale</span>
                      <span>{artworkScale}%</span>
                    </div>
                    <input
                      type="range"
                      min={42}
                      max={92}
                      value={artworkScale}
                      onChange={(event) => setArtworkScale(Number(event.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E9E5DC]"
                    />
                  </div>
                </ControlBlock>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[1.75rem] border border-black/8 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[#6B7280]">Comparison view</p>
                    <h4 className="mt-2 font-serif text-3xl text-[#111111]">Compare the artwork across premium contexts.</h4>
                  </div>
                  <div className="rounded-full border border-black/8 px-3 py-1 text-xs text-[#6B7280]">
                    Original · framed · rooms
                  </div>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <ComparisonTile title="Original artwork" description={artwork.style}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] border border-black/8 bg-white">
                      <ArtworkImage src={artwork.image} alt={artwork.title} fill sizes="240px" className="object-cover" />
                    </div>
                  </ComparisonTile>
                  <ComparisonTile title="Framed version" description={frameStyle}>
                    <div className={`mx-auto overflow-hidden rounded-[1rem] border-[8px] shadow-[0_30px_70px_-45px_rgba(17,17,17,0.65)] ${frameClasses[frameStyle]}`}>
                      <div className="relative aspect-[4/5] w-full min-w-[180px] overflow-hidden rounded-[0.55rem] border border-white/20 bg-white">
                        <ArtworkImage
                          src={artwork.image}
                          alt={`${artwork.title} framed`}
                          fill
                          sizes="220px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </ComparisonTile>
                  <ComparisonTile title="Bedroom preview" description={comparisonScenes.bedroom.label}>
                    <PreviewThumb artwork={artwork} sceneImage={comparisonScenes.bedroom.image} frameStyle={frameStyle} />
                  </ComparisonTile>
                  <ComparisonTile title="Living room preview" description={comparisonScenes.livingRoom.label}>
                    <PreviewThumb artwork={artwork} sceneImage={comparisonScenes.livingRoom.image} frameStyle={frameStyle} />
                  </ComparisonTile>
                </div>
              </div>

              <PremiumPaywallCard
                isUnlocked={isUnlocked}
                paymentStatus={paymentStatus}
                isExporting={isExporting}
                onPrimaryAction={() => {
                  void handlePaywallPrimaryAction();
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-[1.5rem] border border-dashed border-black/10 bg-[#FAFAF8] p-8 text-center">
          <h3 className="font-serif text-3xl text-[#111111]">No generations yet</h3>
          <p className="mt-3 text-sm leading-7 text-[#6B7280]">
            Start with a prompt and LUMEA AI will generate a premium preview, room mockups, and a calm print-ready unlock path.
          </p>
          <Button onClick={onGenerate} className="mt-6">
            Generate artwork
          </Button>
        </div>
      )}

      <Dialog open={fullscreen} onOpenChange={setFullscreen}>
        <DialogContent className="max-w-6xl bg-white p-5">
          {artwork ? (
            <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
              <div className={`overflow-hidden rounded-[1.75rem] border-[10px] ${frameClasses[frameStyle]}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[0.75rem] border border-white/20 bg-white">
                  <ArtworkImage src={artwork.image} alt={artwork.title} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                </div>
              </div>
              <RoomPreviewScene
                artwork={artwork}
                sceneImage={selectedScene.image}
                compareValue={compareValue}
                wallTone={activeWallTone.value}
                frameStyle={frameStyle}
                artworkScale={artworkScale}
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="max-w-3xl bg-white p-6">
          {artwork ? (
            <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="space-y-4">
                <div className={`overflow-hidden rounded-[1.6rem] border-[10px] shadow-[0_35px_90px_-60px_rgba(17,17,17,0.75)] ${frameClasses[frameStyle]}`}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[0.7rem] border border-white/20 bg-white">
                    <ArtworkImage src={artwork.image} alt={artwork.title} fill sizes="(max-width: 1024px) 100vw, 32vw" className="object-cover" />
                  </div>
                </div>
                <div className="rounded-[1.4rem] border border-black/8 bg-[#FAFAF8] p-4 text-sm text-[#6B7280]">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#6B7280]">Included</p>
                  <p className="mt-2 leading-7">High-resolution artwork, watermark-free exports, PDF print files, and multiple premium print sizes.</p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#6B7280]">Checkout</p>
                <h3 className="mt-2 font-serif text-4xl text-[#111111]">Unlock the print-ready version.</h3>
                <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                  Review the files, pricing, and license details first. The free preview remains available even if you do not unlock today.
                </p>
                <div className="mt-5 rounded-[1.4rem] border border-black/8 bg-white p-5">
                  <div className="grid gap-4">
                    <MetaRow label="Artwork" value={artwork.title} />
                    <MetaRow label="Resolution" value="300 DPI export package" />
                    <MetaRow label="License" value="Personal print use" />
                    <MetaRow label="Unlock" value="€12 or 1 Art Credit" />
                  </div>
                </div>
                <div className="mt-5 grid gap-2 text-sm text-[#111111]">
                  {["Artwork.png", "Artwork.jpg", "Artwork.pdf", "30×40 cm", "50×70 cm", "70×100 cm", "100×140 cm"].map((item) => (
                    <div key={item} className="rounded-xl border border-black/8 bg-[#FAFAF8] px-3 py-3">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {purchaseTrust.map((item) => (
                    <span key={item} className="rounded-full border border-black/8 bg-white px-3 py-2 text-xs text-[#111111]">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.4rem] border border-black/8 bg-[#FAFAF8] p-5">
                  {paymentStatus === "processing" ? (
                    <div className="flex items-center gap-3 text-sm text-[#111111]">
                      <LoaderCircle className="h-4 w-4 animate-spin text-[#C9A96E]" />
                      Processing your unlock request.
                    </div>
                  ) : paymentStatus === "pending" ? (
                    <div className="space-y-3">
                      <p className="text-sm text-[#111111]">Payment is pending. Connect your live checkout provider next to complete the unlock automatically.</p>
                      <Button variant="outline" onClick={handleUnlockArtwork}>
                        Refresh payment status
                      </Button>
                    </div>
                  ) : paymentStatus === "succeeded" ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-[#111111]">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Print-ready downloads unlocked.
                      </div>
                      <Button onClick={() => void handleDownloadPackage()} className="gap-2" disabled={isExporting}>
                        {isExporting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                        {isExporting ? "Preparing package" : "Download unlocked package"}
                      </Button>
                    </div>
                  ) : paymentStatus === "failed" ? (
                    <div className="space-y-3">
                      <p className="text-sm text-rose-700">{paymentError ?? "Unable to process the unlock right now."}</p>
                      <Button onClick={handleUnlockArtwork}>Try again</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-[#111111]">One calm purchase, immediate unlock, and no subscription commitment.</p>
                      <Button onClick={handleUnlockArtwork} className="w-full justify-center">
                        Unlock print-ready artwork
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function ControlBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-[#111111]">{title}</p>
      {children}
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-[1.1rem] border border-black/8 bg-[#FAFAF8] px-4 py-3">
      <span className="text-sm text-[#6B7280]">{label}</span>
      <span className="text-right text-sm text-[#111111]">{value}</span>
    </div>
  );
}

function ComparisonTile({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[1.4rem] border border-black/8 bg-[#FAFAF8] p-4">
      <div className="mb-3">
        <p className="text-sm font-medium text-[#111111]">{title}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#6B7280]">{description}</p>
      </div>
      {children}
    </div>
  );
}

function PreviewThumb({
  artwork,
  sceneImage,
  frameStyle,
}: {
  artwork: GeneratedArtwork;
  sceneImage: string;
  frameStyle: FrameStyle;
}) {
  return (
    <div className="relative aspect-[5/4] overflow-hidden rounded-[1.15rem] border border-black/8 bg-[#F2EFE7]">
      <Image src={sceneImage} alt="Room preview" fill className="object-cover" sizes="240px" />
      <ArtworkOnWall artwork={artwork} frameStyle={frameStyle} artworkScale={62} />
    </div>
  );
}

function RoomPreviewScene({
  artwork,
  sceneImage,
  compareValue,
  wallTone,
  frameStyle,
  artworkScale,
}: {
  artwork: GeneratedArtwork;
  sceneImage: string;
  compareValue: number;
  wallTone: string;
  frameStyle: FrameStyle;
  artworkScale: number;
}) {
  return (
    <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] border border-black/8 bg-[#F2EFE7]">
      <Image src={sceneImage} alt="Room preview" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      <div className="absolute inset-0" style={{ backgroundColor: wallTone }} />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${compareValue}%` }}>
        <div className="relative h-full w-full">
          <Image src={sceneImage} alt="Styled room preview" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="absolute inset-0" style={{ backgroundColor: wallTone }} />
          <ArtworkOnWall artwork={artwork} frameStyle={frameStyle} artworkScale={artworkScale} />
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 w-px bg-white/70" style={{ left: `${compareValue}%` }} />
      <ArtworkOnWall artwork={artwork} frameStyle={frameStyle} artworkScale={artworkScale} faint />
      <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
        Before / After
      </div>
    </div>
  );
}

function ArtworkOnWall({
  artwork,
  frameStyle,
  artworkScale,
  faint = false,
}: {
  artwork: GeneratedArtwork;
  frameStyle: FrameStyle;
  artworkScale: number;
  faint?: boolean;
}) {
  return (
    <div
      className={`absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 rounded-[1rem] border-8 shadow-[0_30px_70px_-45px_rgba(17,17,17,0.65)] ${frameClasses[frameStyle]} ${
        faint ? "opacity-0" : ""
      }`}
      style={{ width: `${artworkScale}%`, maxWidth: "330px" }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[0.6rem] border border-white/20 bg-white">
        <ArtworkImage src={artwork.image} alt={artwork.title} fill sizes="280px" className="object-cover" />
      </div>
    </div>
  );
}

function getSceneForRoom(roomType: GenerationDraft["roomType"]) {
  const matchingScene = mockupScenes.find((scene) =>
    scene.label.toLowerCase().includes(roomType.toLowerCase().replace(/\s+/g, " ")),
  );

  return matchingScene ?? mockupScenes[0];
}

function findScene(match: string) {
  return (
    mockupScenes.find((scene) => scene.label.toLowerCase().includes(match.toLowerCase())) ??
    mockupScenes[0]
  );
}

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function ArtworkImage({
  src,
  alt,
  className,
  fill = false,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
}) {
  if (fill) {
    return <Image src={src} alt={alt} fill unoptimized={src.startsWith("data:")} className={className} sizes={sizes} />;
  }

  return <Image src={src} alt={alt} width={1200} height={1500} unoptimized={src.startsWith("data:")} className={className} sizes={sizes} />;
}
