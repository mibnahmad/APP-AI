"use client";

import { useMemo, useState } from "react";
import { faqItems } from "@/lib/wall-art-data";
import { FAQAccordion } from "@/components/faq-accordion";
import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/ui/input";

export function FAQExplorer() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return faqItems;
    }

    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(normalized) ||
        item.answer.toLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="max-w-xl">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search questions about downloads, styles, prompts, or printing"
          aria-label="Search frequently asked questions"
        />
      </div>
      {filtered.length ? (
        <FAQAccordion items={filtered} />
      ) : (
        <EmptyState
          title="No matching answers"
          description="Try a broader term like download, prompt, style, or print."
        />
      )}
    </div>
  );
}
