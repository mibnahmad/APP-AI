"use client";

import { History } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PromptHistory({
  prompts,
  onSelect,
}: {
  prompts: string[];
  onSelect: (prompt: string) => void;
}) {
  if (!prompts.length) {
    return null;
  }

  return (
    <section className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
      <div className="flex items-center gap-2 text-[#111111]">
        <History className="h-4 w-4" />
        <h2 className="font-serif text-3xl">Recent prompts</h2>
      </div>
      <p className="mt-2 text-sm text-[#6B7280]">Jump back into a recent idea without retyping it.</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {prompts.map((prompt) => (
          <Button key={prompt} variant="outline" size="sm" onClick={() => onSelect(prompt)} className="h-auto rounded-full px-4 py-2 text-left">
            {prompt}
          </Button>
        ))}
      </div>
    </section>
  );
}
