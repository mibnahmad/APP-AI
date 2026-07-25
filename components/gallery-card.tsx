"use client";

import Image from "next/image";
import { Bookmark, Eye, Heart } from "lucide-react";
import type { GeneratedArtwork } from "@/types/wall-art";

const aspectClassName: Record<GeneratedArtwork["aspectRatio"], string> = {
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
  "16:9": "aspect-[16/9]",
  "2:3": "aspect-[2/3]",
};

export function GalleryCard({
  artwork,
  onOpen,
  onFavorite,
  onSave,
}: {
  artwork: GeneratedArtwork;
  onOpen?: () => void;
  onFavorite?: () => void;
  onSave?: () => void;
}) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
      <button
        type="button"
        onClick={onOpen}
        className={`relative block w-full overflow-hidden text-left ${aspectClassName[artwork.aspectRatio]}`}
      >
        <Image
          src={artwork.image}
          alt={artwork.title}
          fill
          unoptimized={artwork.image.startsWith("data:")}
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-90" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/75">{artwork.style}</p>
            <h3 className="mt-2 font-serif text-2xl">{artwork.title}</h3>
          </div>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur-sm">{artwork.mood}</span>
        </div>
      </button>
      <div className="flex items-center justify-between gap-3 p-5">
        <div>
          <p className="text-sm text-[#111111]">{artwork.roomType}</p>
          <p className="text-xs uppercase tracking-[0.16em] text-[#6B7280]">{artwork.paletteHint}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Quick view ${artwork.title}`}
            className="rounded-full border border-black/10 p-2 text-[#6B7280] transition hover:bg-black/[0.03] hover:text-[#111111]"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onSave}
            aria-label={artwork.saved ? `Remove ${artwork.title} from saved` : `Save ${artwork.title}`}
            className={`rounded-full border p-2 transition ${
              artwork.saved ? "border-[#C9A96E]/40 bg-[#C9A96E]/12 text-[#111111]" : "border-black/10 text-[#6B7280] hover:bg-black/[0.03]"
            }`}
          >
            <Bookmark className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onFavorite}
            aria-label={artwork.favorite ? `Remove ${artwork.title} from favorites` : `Favorite ${artwork.title}`}
            className={`rounded-full border p-2 transition ${
              artwork.favorite ? "border-rose-200 bg-rose-50 text-rose-600" : "border-black/10 text-[#6B7280] hover:bg-black/[0.03]"
            }`}
          >
            <Heart className={`h-4 w-4 ${artwork.favorite ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>
    </article>
  );
}
