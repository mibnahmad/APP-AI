import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { PricingCard } from "@/components/pricing-card";
import { SectionHeading } from "@/components/section-heading";
import { pricingPlans } from "@/lib/wall-art-data";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Choose the right LUMEA AI plan for your creative workflow.",
};

export default function PricingPage() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <SectionHeading
          eyebrow="Pricing"
          title="Create Freely. Pay Only for the Art You Love."
          description="Generate unlimited inspiration, explore room previews, and purchase only the artworks worth printing. No subscription required. Credits never expire."
        />
        <section className="grid gap-5 rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)] md:grid-cols-3">
          {[
            "No subscription required",
            "Credits never expire",
            "Only pay for artwork you truly want",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-[1.25rem] border border-black/8 bg-[#FAFAF8] px-4 py-4 text-sm text-[#111111]">
              <CheckCircle2 className="h-4 w-4 text-[#C9A96E]" />
              {item}
            </div>
          ))}
        </section>
        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
            <p className="text-xs uppercase tracking-[0.22em] text-[#6B7280]">Free preview</p>
            <h2 className="mt-3 font-serif text-4xl text-[#111111]">Create and explore before you ever pay.</h2>
            <p className="mt-3 text-sm leading-7 text-[#6B7280]">
              Generate artwork, compare room mockups, save prompts locally, and download a watermarked social preview at no cost.
            </p>
          </div>
          <div className="rounded-[2rem] border border-[#C9A96E]/30 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(251,247,238,1))] p-6 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
            <p className="text-xs uppercase tracking-[0.22em] text-[#6B7280]">One-time unlock</p>
            <h2 className="mt-3 font-serif text-4xl text-[#111111]">Unlock the print-ready package only when the artwork feels right.</h2>
            <p className="mt-3 text-sm leading-7 text-[#6B7280]">
              A single unlock gives you the watermark-free PNG, JPG, printable PDF set, and premium export sizes for the artwork you want to keep.
            </p>
          </div>
        </section>
        <div className="grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
        <section className="rounded-[2rem] bg-[#111111] p-8 text-white">
          <p className="text-xs uppercase tracking-[0.22em] text-white/60">How payment works</p>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            {[
              "Generate and preview artwork for free.",
              "Choose the concept you actually love.",
              "Use one Art Credit to unlock the print-ready package.",
            ].map((item, index) => (
              <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                <p className="text-sm text-white/55">0{index + 1}</p>
                <p className="mt-3 text-sm leading-7 text-white/75">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
