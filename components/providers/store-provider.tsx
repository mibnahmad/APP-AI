"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  defaultGenerationDraft,
  galleryItems,
  generationStages,
  promptSuggestions,
} from "@/lib/wall-art-data";
import type { CartItem } from "@/types/product";
import type { GeneratedArtwork, GenerateArtworkResponse, GenerationDraft, ToastMessage } from "@/types/wall-art";

type StoreContextValue = {
  cart: CartItem[];
  wishlist: string[];
  draft: GenerationDraft;
  artworks: GeneratedArtwork[];
  unlockedArtworkIds: string[];
  generationHistory: string[];
  recentViews: string[];
  recentPrompts: string[];
  savedPrompts: string[];
  activeArtworkId: string | null;
  toasts: ToastMessage[];
  isGenerating: boolean;
  generationProgress: number;
  generationLabel: string;
  updateDraft: (patch: Partial<GenerationDraft>) => void;
  setPrompt: (prompt: string) => void;
  surprisePrompt: () => string;
  clearDraft: () => void;
  savePrompt: () => void;
  generateArtwork: () => Promise<GeneratedArtwork>;
  unlockArtwork: (artworkId: string) => void;
  toggleFavorite: (artworkId: string) => void;
  toggleSaved: (artworkId: string) => void;
  markViewed: (artworkId: string) => void;
  setActiveArtwork: (artworkId: string | null) => void;
  clearHistory: () => void;
  pushToast: (title: string, tone?: "default" | "success" | "error") => void;
  dismissToast: (toastId: string) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
};

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartItem[]>("legacy-cart", []);
  const [wishlist, setWishlist] = useLocalStorage<string[]>("legacy-wishlist", []);
  const [storedDraft, setStoredDraft] = useLocalStorage<GenerationDraft>("wallart-draft", defaultGenerationDraft);
  const [storedArtworks, setStoredArtworks] = useLocalStorage<GeneratedArtwork[]>("wallart-artworks", galleryItems);
  const [generatedArtworks, setGeneratedArtworks] = useState<GeneratedArtwork[]>([]);
  const [unlockedArtworkIds, setUnlockedArtworkIds] = useLocalStorage<string[]>("wallart-unlocked-artworks", []);
  const [generationHistory, setGenerationHistory] = useLocalStorage<string[]>("wallart-history", []);
  const [recentViews, setRecentViews] = useLocalStorage<string[]>("wallart-recent-views", []);
  const [recentPrompts, setRecentPrompts] = useLocalStorage<string[]>("wallart-recent-prompts", []);
  const [savedPrompts, setSavedPrompts] = useLocalStorage<string[]>("wallart-saved-prompts", []);
  const [activeArtworkId, setActiveArtworkId] = useState<string | null>(galleryItems[0]?.id ?? null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationLabel, setGenerationLabel] = useState("Ready to create");
  const draft = useMemo(
    () => ({ ...defaultGenerationDraft, ...storedDraft }),
    [storedDraft],
  );
  const artworks = useMemo(() => [...generatedArtworks, ...storedArtworks], [generatedArtworks, storedArtworks]);

  useEffect(() => {
    if (!activeArtworkId) {
      return;
    }

    if (artworks.some((artwork) => artwork.id === activeArtworkId)) {
      return;
    }

    setActiveArtworkId(artworks[0]?.id ?? null);
  }, [activeArtworkId, artworks]);

  const value = useMemo<StoreContextValue>(
    () => ({
      cart,
      wishlist,
      draft,
      artworks,
      unlockedArtworkIds,
      generationHistory,
      recentViews,
      recentPrompts,
      savedPrompts,
      activeArtworkId,
      toasts,
      isGenerating,
      generationProgress,
      generationLabel,
      updateDraft: (patch) => {
        setStoredDraft((prev) => ({ ...defaultGenerationDraft, ...prev, ...patch }));
      },
      setPrompt: (prompt) => {
        setStoredDraft((prev) => ({ ...defaultGenerationDraft, ...prev, prompt }));
      },
      surprisePrompt: () => {
        const nextPrompt = promptSuggestions[Math.floor(Math.random() * promptSuggestions.length)];
        setStoredDraft((prev) => ({ ...defaultGenerationDraft, ...prev, prompt: nextPrompt }));
        return nextPrompt;
      },
      clearDraft: () => {
        setStoredDraft(defaultGenerationDraft);
      },
      savePrompt: () => {
        const cleanPrompt = draft.prompt.trim();
        if (!cleanPrompt) {
          const toastId = `toast-${Date.now()}`;
          const nextToast: ToastMessage = { id: toastId, title: "Add a prompt before saving", tone: "error" };
          setToasts((prev) => [...prev, nextToast].slice(-3));
          window.setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
          }, 2800);
          return;
        }
        setSavedPrompts((prev) => (prev.includes(cleanPrompt) ? prev : [cleanPrompt, ...prev].slice(0, 12)));
        setRecentPrompts((prev) => [cleanPrompt, ...prev.filter((item) => item !== cleanPrompt)].slice(0, 8));
        const toastId = `toast-${Date.now()}`;
        const nextToast: ToastMessage = { id: toastId, title: "Prompt saved", tone: "success" };
        setToasts((prev) => [...prev, nextToast].slice(-3));
        window.setTimeout(() => {
          setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
        }, 2800);
      },
      generateArtwork: async () => {
        const cleanPrompt = draft.prompt.trim();
        if (!cleanPrompt) {
          throw new Error("A prompt is required.");
        }

        setIsGenerating(true);
        setGenerationProgress(0);
        setGenerationLabel(generationStages[0]?.label ?? "Preparing generation");
        try {
          const animation = (async () => {
            for (const stage of generationStages) {
              await new Promise((resolve) => window.setTimeout(resolve, 280));
              setGenerationProgress(stage.progress);
              setGenerationLabel(stage.label);
            }
          })();

          const generationRequest = fetch("/api/generate", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              draft,
              count: generationHistory.length + 1,
            }),
          }).then(async (response) => {
            const payload = (await response.json()) as Partial<GenerateArtworkResponse> & { error?: string };
            if (!response.ok || !payload.artwork) {
              throw new Error(payload.error ?? "Unable to generate artwork.");
            }

            return payload.artwork;
          });

          const [created] = await Promise.all([generationRequest, animation]);

          setGeneratedArtworks((prev) => [created, ...prev].slice(0, 8));
          setGenerationHistory((prev) => [created.id, ...prev].slice(0, 18));
          setRecentViews((prev) => [created.id, ...prev.filter((id) => id !== created.id)].slice(0, 12));
          setRecentPrompts((prev) => [cleanPrompt, ...prev.filter((item) => item !== cleanPrompt)].slice(0, 8));
          setActiveArtworkId(created.id);
          setGenerationLabel("Artwork ready");

          const toastId = `toast-${Date.now()}`;
          const nextToast: ToastMessage = { id: toastId, title: "Artwork generated", tone: "success" };
          setToasts((prev) => [...prev, nextToast].slice(-3));
          window.setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
          }, 2800);

          return created;
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unable to generate artwork.";
          const toastId = `toast-${Date.now()}`;
          const nextToast: ToastMessage = { id: toastId, title: message, tone: "error" };
          setToasts((prev) => [...prev, nextToast].slice(-3));
          window.setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
          }, 2800);
          setGenerationLabel("Generation unavailable");
          throw error;
        } finally {
          setIsGenerating(false);
        }
      },
      unlockArtwork: (artworkId) => {
        setUnlockedArtworkIds((prev) => (prev.includes(artworkId) ? prev : [artworkId, ...prev].slice(0, 18)));
      },
      toggleFavorite: (artworkId) => {
        setGeneratedArtworks((prev) =>
          prev.map((artwork) =>
            artwork.id === artworkId ? { ...artwork, favorite: !artwork.favorite } : artwork,
          ),
        );
        setStoredArtworks((prev) =>
          prev.map((artwork) =>
            artwork.id === artworkId ? { ...artwork, favorite: !artwork.favorite } : artwork,
          ),
        );
      },
      toggleSaved: (artworkId) => {
        setGeneratedArtworks((prev) =>
          prev.map((artwork) => (artwork.id === artworkId ? { ...artwork, saved: !artwork.saved } : artwork)),
        );
        setStoredArtworks((prev) =>
          prev.map((artwork) => (artwork.id === artworkId ? { ...artwork, saved: !artwork.saved } : artwork)),
        );
      },
      markViewed: (artworkId) => {
        setRecentViews((prev) => [artworkId, ...prev.filter((id) => id !== artworkId)].slice(0, 12));
      },
      setActiveArtwork: (artworkId) => {
        setActiveArtworkId(artworkId);
        if (artworkId) {
          setRecentViews((prev) => [artworkId, ...prev.filter((id) => id !== artworkId)].slice(0, 12));
        }
      },
      clearHistory: () => {
        setGeneratedArtworks([]);
        setGenerationHistory([]);
        setRecentViews([]);
        setActiveArtworkId(storedArtworks[0]?.id ?? null);
      },
      pushToast: (title, tone = "default") => {
        const toastId = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const nextToast: ToastMessage = { id: toastId, title, tone };
        setToasts((prev) => [...prev, nextToast].slice(-3));
        window.setTimeout(() => {
          setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
        }, 2800);
      },
      dismissToast: (toastId) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
      },
      addToCart: (item) => {
        setCart((prev) => {
          const existing = prev.find((entry) => entry.productId === item.productId);
          if (existing) {
            return prev.map((entry) =>
              entry.productId === item.productId
                ? { ...entry, quantity: entry.quantity + item.quantity }
                : entry,
            );
          }
          return [...prev, item];
        });
      },
      removeFromCart: (productId) => {
        setCart((prev) => prev.filter((entry) => entry.productId !== productId));
      },
      updateQuantity: (productId, quantity) => {
        setCart((prev) =>
          prev.map((entry) => (entry.productId === productId ? { ...entry, quantity } : entry)),
        );
      },
      toggleWishlist: (productId) => {
        setWishlist((prev) =>
          prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
        );
      },
    }),
    [
      cart,
      wishlist,
      draft,
      artworks,
      generationHistory,
      recentViews,
      recentPrompts,
      savedPrompts,
      activeArtworkId,
      toasts,
      isGenerating,
      generationProgress,
      generationLabel,
      setStoredDraft,
      unlockedArtworkIds,
      setStoredArtworks,
      storedArtworks,
      setUnlockedArtworkIds,
      setGenerationHistory,
      setRecentViews,
      setRecentPrompts,
      setSavedPrompts,
      setGeneratedArtworks,
      setCart,
      setWishlist,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}
