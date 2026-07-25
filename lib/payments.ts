import type { CheckoutSessionResponse, PaymentProvider, UnlockOffer } from "@/types/wall-art";

export const unlockOffer: UnlockOffer = {
  title: "Print-ready artwork unlock",
  price: "€12",
  creditCost: "1 Art Credit",
  caption: "Unlock the full-resolution artwork only after you have seen it inside premium interiors.",
  license: "Personal print license",
  resolution: "300 DPI export package",
  includedFiles: [
    "Watermark-free PNG",
    "Watermark-free JPG",
    "Print-ready PDF set",
    "Multiple print sizes",
  ],
  printSizes: ["30×40 cm", "50×70 cm", "70×100 cm", "100×140 cm"],
  trustBadges: ["Print-Ready", "300 DPI", "Instant Unlock", "High Resolution", "Curated Design"],
};

export async function createCheckoutSession({
  artworkId,
  artworkTitle,
}: {
  artworkId: string;
  artworkTitle: string;
}): Promise<CheckoutSessionResponse> {
  const provider = (process.env.PAYMENT_PROVIDER ?? "mock") as PaymentProvider;

  return {
    sessionId: `unlock_${artworkId}_${Date.now()}`,
    status: provider === "stripe" ? "pending" : "completed",
    provider,
    artworkId,
    artworkTitle,
    unlock: unlockOffer,
  };
}
