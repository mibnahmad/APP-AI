import categoriesData from "@/data/categories.json";
import collectionsData from "@/data/collections.json";
import faqData from "@/data/faq.json";
import featuredData from "@/data/featured.json";
import galleryData from "@/data/gallery.json";
import navData from "@/data/nav.json";
import pricingData from "@/data/pricing.json";
import promptLibraryData from "@/data/prompt-library.json";
import stylesData from "@/data/styles.json";
import testimonialsData from "@/data/testimonials.json";
import type {
  ArtFormat,
  ArtStyle,
  AspectRatio,
  CollectionItem,
  ColorMood,
  FAQItem,
  FrameStyle,
  FeaturedContent,
  GeneratedArtwork,
  GenerationDraft,
  NavItem,
  Orientation,
  PricingPlan,
  QualityTier,
  RoomType,
  SurfaceType,
  StyleLibraryItem,
  Testimonial,
} from "@/types/wall-art";

const categories = categoriesData as {
  styleOptions: ArtStyle[];
  formatOptions: ArtFormat[];
  aspectRatioOptions: AspectRatio[];
  orientationOptions: Orientation[];
  frameStyleOptions: FrameStyle[];
  surfaceOptions: SurfaceType[];
  qualityOptions: QualityTier[];
  roomOptions: RoomType[];
  moodOptions: ColorMood[];
};

export const navItems = navData as NavItem[];
export const promptSuggestions = promptLibraryData as string[];
export const styleOptions = categories.styleOptions;
export const formatOptions = categories.formatOptions;
export const aspectRatioOptions = categories.aspectRatioOptions;
export const orientationOptions = categories.orientationOptions;
export const frameStyleOptions = categories.frameStyleOptions;
export const surfaceOptions = categories.surfaceOptions;
export const qualityOptions = categories.qualityOptions;
export const roomOptions = categories.roomOptions;
export const moodOptions = categories.moodOptions;

export const styleLibrary = stylesData as StyleLibraryItem[];
export const collectionItems = collectionsData as CollectionItem[];
export const galleryItems = galleryData as GeneratedArtwork[];
export const faqItems = faqData as FAQItem[];
export const pricingPlans = pricingData as PricingPlan[];
export const testimonials = testimonialsData as Testimonial[];
export const featuredContent = featuredData as FeaturedContent;

export const trustIndicators = featuredContent.trustIndicators;
export const heroMetrics = featuredContent.heroMetrics;
export const useCases = featuredContent.useCases;
export const howItWorks = featuredContent.howItWorks;
export const generationStages = featuredContent.generationStages;
export const mockupScenes = featuredContent.mockupScenes;
export const newsletterContent = featuredContent.newsletter;
export const purchaseTrust = featuredContent.purchaseTrust;
export const featuredArtwork = galleryItems.filter((item) => item.initial);

export const defaultGenerationDraft: GenerationDraft = {
  prompt: promptSuggestions[0],
  style: "Japandi",
  format: "Portrait",
  aspectRatio: "4:5",
  orientation: "Portrait",
  frameStyle: "Oak",
  surface: "Canvas",
  quality: "High",
  roomType: "Bedroom",
  mood: "Warm Ivory",
  brightness: 68,
  warmth: 72,
  texture: 44,
  complexity: 56,
};

export function buildGeneratedArtworkFromDraft(
  draft: GenerationDraft,
  number: number,
): GeneratedArtwork {
  const normalizedPrompt = draft.prompt.trim();
  const slug = normalizedPrompt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);

  const titles = ["Calm Study", "Sculpted Light", "Quiet Frame", "Tonal Motion", "Soft Structure", "Gallery Calm"];

  return {
    id: `generated-${slug || "custom"}-${number}`,
    title: `${titles[number % titles.length]} ${number}`,
    prompt: normalizedPrompt,
    style: draft.style,
    format: draft.format,
    quality: draft.quality,
    mood: draft.mood,
    image: `https://picsum.photos/seed/generated-art-${slug || number}-${number}/1200/1500`,
    mockup: `https://picsum.photos/seed/generated-mockup-${draft.roomType.toLowerCase().replace(/\s+/g, "-")}-${number}/1600/1200`,
    createdAt: new Date().toISOString(),
    saved: false,
    favorite: false,
    roomType: draft.roomType,
    aspectRatio: draft.aspectRatio,
    paletteHint: `${draft.mood}, texture ${draft.texture}%, warmth ${draft.warmth}%`,
    provider: "mock",
    story: `A ${draft.style.toLowerCase()} composition designed for ${draft.roomType.toLowerCase()} spaces with ${draft.mood.toLowerCase()} tones and a premium ${draft.surface.toLowerCase()} finish.`,
    colorPalette: draft.mood.split(" "),
    bestFor: draft.roomType,
    orientation: draft.orientation,
    frameStyle: draft.frameStyle,
    surface: draft.surface,
    previewStatus: "preview",
  };
}
