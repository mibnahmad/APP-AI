export type ArtStyle =
  | "Abstract"
  | "Scandinavian"
  | "Minimal"
  | "Japandi"
  | "Luxury"
  | "Nature"
  | "Modern"
  | "Black & White"
  | "Nursery"
  | "Bedroom"
  | "Office"
  | "Living Room";

export type ArtFormat = "Square" | "Portrait" | "Landscape" | "Poster" | "Canvas";
export type AspectRatio = "1:1" | "4:5" | "16:9" | "2:3";
export type Orientation = "Portrait" | "Landscape" | "Square";
export type FrameStyle = "Black" | "Oak" | "White" | "Brass" | "Gallery Shadow";
export type SurfaceType = "Canvas" | "Poster";
export type QualityTier = "Standard" | "High" | "Ultra";
export type ArtworkProvider = "mock" | "openai";
export type PaymentProvider = "mock" | "stripe";
export type UnlockPaymentStatus = "idle" | "processing" | "pending" | "succeeded" | "failed";
export type ColorMood =
  | "Soft Sand"
  | "Warm Ivory"
  | "Earth Tone"
  | "Moody Charcoal"
  | "Olive Mist"
  | "Clay Rose"
  | "Ocean Haze";

export type RoomType =
  | "Bedroom"
  | "Living Room"
  | "Office"
  | "Studio"
  | "Hallway"
  | "Gallery Wall"
  | "Luxury Hotel Suite"
  | "Minimal Scandinavian Apartment"
  | "Modern Penthouse";

export type GenerationDraft = {
  prompt: string;
  style: ArtStyle;
  format: ArtFormat;
  aspectRatio: AspectRatio;
  orientation: Orientation;
  frameStyle: FrameStyle;
  surface: SurfaceType;
  quality: QualityTier;
  roomType: RoomType;
  mood: ColorMood;
  brightness: number;
  warmth: number;
  texture: number;
  complexity: number;
};

export type GeneratedArtwork = {
  id: string;
  title: string;
  prompt: string;
  style: ArtStyle;
  format: ArtFormat;
  quality: QualityTier;
  mood: ColorMood;
  image: string;
  mockup: string;
  createdAt: string;
  saved: boolean;
  favorite: boolean;
  roomType: RoomType;
  aspectRatio: AspectRatio;
  paletteHint: string;
  provider?: ArtworkProvider;
  story?: string;
  colorPalette?: string[];
  bestFor?: RoomType;
  orientation?: Orientation;
  frameStyle?: FrameStyle;
  surface?: SurfaceType;
  revisedPrompt?: string;
  previewStatus?: "preview" | "unlocked";
  initial?: boolean;
};

export type StyleLibraryItem = {
  name: string;
  shortDescription: string;
  mood: string;
  bestRoom: string;
  bestUseCase: string;
  paletteHint: string;
  preview: string;
  slug: string;
};

export type CollectionItem = {
  title: string;
  description: string;
  cover: string;
  artCount: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  credits?: string;
  badge?: string;
  savings?: string;
  caption?: string;
  description: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type ToastMessage = {
  id: string;
  title: string;
  tone?: "default" | "success" | "error";
};

export type NavItem = {
  href: string;
  label: string;
};

export type HomeMetric = {
  label: string;
  value: string;
};

export type HowItWorksItem = {
  title: string;
  description: string;
};

export type NewsletterContent = {
  eyebrow: string;
  title: string;
  description: string;
  placeholder: string;
  buttonLabel: string;
};

export type FeaturedContent = {
  trustIndicators: string[];
  heroMetrics: HomeMetric[];
  useCases: string[];
  howItWorks: HowItWorksItem[];
  newsletter: NewsletterContent;
  generationStages: { progress: number; label: string }[];
  mockupScenes: { label: string; image: string }[];
  purchaseTrust: string[];
};

export type UnlockOffer = {
  title: string;
  price: string;
  creditCost: string;
  caption: string;
  license: string;
  resolution: string;
  includedFiles: string[];
  printSizes: string[];
  trustBadges: string[];
};

export type GenerateArtworkResponse = {
  artwork: GeneratedArtwork;
  provider: ArtworkProvider;
};

export type CheckoutSessionResponse = {
  sessionId: string;
  status: "completed" | "pending";
  provider: PaymentProvider;
  artworkId: string;
  artworkTitle: string;
  unlock: UnlockOffer;
};
