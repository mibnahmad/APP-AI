"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Download, Search, Share2 } from "lucide-react";
import { GalleryCard } from "@/components/gallery-card";
import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useStore } from "@/components/providers/store-provider";
import { moodOptions, roomOptions, styleOptions } from "@/lib/wall-art-data";
import type { ColorMood, GeneratedArtwork, RoomType } from "@/types/wall-art";

type SortMode = "Newest" | "Popular" | "Saved";

export function GalleryExhibition() {
  const { artworks, toggleFavorite, toggleSaved, setActiveArtwork, markViewed } = useStore();
  const [query, setQuery] = useState("");
  const [style, setStyle] = useState<"All" | (typeof styleOptions)[number]>("All");
  const [room, setRoom] = useState<"All" | RoomType>("All");
  const [mood, setMood] = useState<"All" | ColorMood>("All");
  const [sort, setSort] = useState<SortMode>("Newest");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = useMemo(
    () => artworks.find((artwork) => artwork.id === selectedId) ?? null,
    [artworks, selectedId],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const result = artworks.filter((artwork) => {
      const matchesQuery =
        !normalized ||
        artwork.title.toLowerCase().includes(normalized) ||
        artwork.prompt.toLowerCase().includes(normalized) ||
        artwork.style.toLowerCase().includes(normalized);
      const matchesStyle = style === "All" || artwork.style === style;
      const matchesRoom = room === "All" || artwork.roomType === room;
      const matchesMood = mood === "All" || artwork.mood === mood;
      const matchesSaved = sort !== "Saved" || artwork.saved;
      return matchesQuery && matchesStyle && matchesRoom && matchesMood && matchesSaved;
    });

    if (sort === "Popular") {
      return [...result].sort((a, b) => Number(b.favorite) - Number(a.favorite));
    }

    return [...result].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [artworks, query, style, room, mood, sort]);

  const noSaved = sort === "Saved" && artworks.every((artwork) => !artwork.saved);

  function openArtwork(artwork: GeneratedArtwork) {
    setSelectedId(artwork.id);
    setActiveArtwork(artwork.id);
    markViewed(artwork.id);
  }

  async function shareArtwork(artwork: GeneratedArtwork) {
    const shareText = `${artwork.title}\n${artwork.prompt}\n${window.location.href}`;
    if (navigator.share) {
      void navigator.share({
        title: artwork.title,
        text: artwork.prompt,
        url: window.location.href,
      });
      return;
    }
    await navigator.clipboard.writeText(shareText);
  }

  return (
    <>
      <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
        <div className="grid gap-4 xl:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search artworks, prompts, and moods"
              className="pl-11"
              aria-label="Search gallery"
            />
          </div>
          <FilterRow
            label="Style"
            options={["All", ...styleOptions]}
            value={style}
            onChange={(value) => setStyle(value as "All" | (typeof styleOptions)[number])}
          />
          <FilterRow
            label="Room"
            options={["All", ...roomOptions]}
            value={room}
            onChange={(value) => setRoom(value as "All" | RoomType)}
          />
          <FilterRow
            label="Mood"
            options={["All", ...moodOptions]}
            value={mood}
            onChange={(value) => setMood(value as "All" | ColorMood)}
          />
          <FilterRow
            label="Sort"
            options={["Newest", "Popular", "Saved"]}
            value={sort}
            onChange={(value) => setSort(value as SortMode)}
          />
        </div>
      </div>

      <div className="mt-8">
        {filtered.length ? (
          <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
            {filtered.map((artwork) => (
              <div key={artwork.id} className="mb-5 break-inside-avoid">
                <GalleryCard
                  artwork={artwork}
                  onOpen={() => openArtwork(artwork)}
                  onFavorite={() => toggleFavorite(artwork.id)}
                  onSave={() => toggleSaved(artwork.id)}
                />
              </div>
            ))}
          </div>
        ) : noSaved ? (
          <EmptyState
            title="No saved items yet"
            description="Save standout concepts from the generator or gallery to build a personal shortlist."
            actionLabel="Show newest"
            onAction={() => setSort("Newest")}
          />
        ) : (
          <EmptyState
            title="No search results"
            description="Try a broader search term, reset one of the filters, or switch to a different mood or room type."
            actionLabel="Reset filters"
            onAction={() => {
              setQuery("");
              setStyle("All");
              setRoom("All");
              setMood("All");
              setSort("Newest");
            }}
          />
        )}
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelectedId(null)}>
        {selected ? (
          <DialogContent className="max-w-6xl bg-white p-5 md:p-6">
            <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#F2EFE7]">
                <Image src={selected.image} alt={selected.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>
              <div className="space-y-5">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] bg-[#F2EFE7]">
                  <Image
                    src={selected.mockup}
                    alt={`${selected.title} room preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="rounded-[1.75rem] border border-black/8 bg-[#FAFAF8] p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#6B7280]">{selected.style}</p>
                  <h3 className="mt-3 font-serif text-4xl text-[#111111]">{selected.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#6B7280]">{selected.prompt}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#6B7280]">
                    <span className="rounded-full border border-black/8 px-3 py-1">{selected.roomType}</span>
                    <span className="rounded-full border border-black/8 px-3 py-1">{selected.format}</span>
                    <span className="rounded-full border border-black/8 px-3 py-1">{selected.quality}</span>
                    <span className="rounded-full border border-black/8 px-3 py-1">{selected.mood}</span>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button onClick={() => toggleSaved(selected.id)} variant="outline">
                      {selected.saved ? "Saved to gallery" : "Save to gallery"}
                    </Button>
                    <Button onClick={() => toggleFavorite(selected.id)} variant="outline">
                      {selected.favorite ? "Favorited" : "Favorite"}
                    </Button>
                    <Button variant="outline" onClick={() => window.open(selected.image, "_blank", "noopener,noreferrer")}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        void shareArtwork(selected);
                      }}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#6B7280]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-[#111111] outline-none focus:border-[#C9A96E]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
