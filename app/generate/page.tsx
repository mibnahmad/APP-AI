import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { GenerateWorkspace } from "@/components/generate-workspace";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Generate",
  description: "Write a prompt, generate wall art with LUMEA AI, preview it in luxury interiors, and unlock print-ready exports only when you love the result.",
};

export default function GeneratePage() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <SectionHeading
          eyebrow="LUMEA AI generator"
          title="Generate refined wall art, then reveal it like a premium product."
          description="Write a prompt, shape the art direction, reveal the final piece in elegant room mockups, and unlock print-ready downloads only after the preview feels worth keeping."
        />
        <GenerateWorkspace />
      </div>
    </PageTransition>
  );
}
