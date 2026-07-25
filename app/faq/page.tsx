import type { Metadata } from "next";
import { FAQExplorer } from "@/components/faq-explorer";
import { PageTransition } from "@/components/page-transition";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about generation quality, downloads, styles, saving creations, and future print ordering.",
};

export default function FAQPage() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <SectionHeading
          eyebrow="FAQ"
          title="Clear answers for creative decisions, downloads, and usage."
          description="The product is designed to feel simple, but we still make the practical details easy to find."
        />
        <div>
          <FAQExplorer />
        </div>
      </div>
    </PageTransition>
  );
}
