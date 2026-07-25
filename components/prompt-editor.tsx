"use client";

import { Lightbulb, Wand2 } from "lucide-react";
import { promptSuggestions } from "@/lib/wall-art-data";
import { Button } from "@/components/ui/button";

export function PromptEditor({
  value,
  onChange,
  onSurprise,
  onClear,
}: {
  value: string;
  onChange: (value: string) => void;
  onSurprise: () => void;
  onClear: () => void;
}) {
  const count = value.length;

  return (
    <section className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl text-[#111111]">Prompt</h2>
          <p className="mt-2 text-sm text-[#6B7280]">Describe the mood, composition, palette, and room feel you want.</p>
        </div>
        <span className="rounded-full border border-black/8 px-3 py-1 text-xs text-[#6B7280]">{count}/220</span>
      </div>
      <textarea
        aria-label="Artwork prompt"
        value={value}
        maxLength={220}
        onChange={(event) => onChange(event.target.value)}
        placeholder="A large abstract neutral canvas with soft stone layers and warm ivory light for a quiet bedroom."
        className="mt-5 min-h-44 w-full rounded-[1.5rem] border border-black/8 bg-[#FAFAF8] px-5 py-4 text-sm leading-7 text-[#111111] outline-none transition focus:border-[#C9A96E]"
      />
      <div className="mt-5 rounded-[1.5rem] border border-[#C9A96E]/15 bg-[#C9A96E]/8 p-4">
        <div className="flex items-center gap-2 text-sm text-[#111111]">
          <Lightbulb className="h-4 w-4" />
          Helpful prompt tip
        </div>
        <p className="mt-2 text-sm leading-7 text-[#6B7280]">
          Mention the room, mood, palette, and one material cue such as linen texture, paper grain, or brush softness.
        </p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {promptSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onChange(suggestion)}
            className="rounded-full border border-black/8 px-4 py-2 text-left text-xs text-[#6B7280] transition hover:border-black/12 hover:text-[#111111]"
          >
            {suggestion}
          </button>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={onSurprise} variant="soft" className="gap-2">
          <Wand2 className="h-4 w-4" />
          Surprise me
        </Button>
        <Button onClick={onClear} variant="outline">
          Clear
        </Button>
      </div>
    </section>
  );
}
