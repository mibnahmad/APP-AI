import Image from "next/image";
import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About",
  description: "Learn why LUMEA AI exists and how it makes beautiful art practical for real interiors.",
};

const pillars = [
  {
    title: "Why it exists",
    body: "Most people know the feeling they want on the wall, but not how to source or create the right piece. We built the product to close that gap elegantly.",
  },
  {
    title: "Who it is for",
    body: "Home decorators, interior design lovers, content creators, boutique hosts, and anyone who wants more taste and less friction.",
  },
  {
    title: "Why it feels different",
    body: "The experience is designed like a premium creative platform, with curated styles, calm controls, and realistic room previews instead of generic AI noise.",
  },
  {
    title: "Why AI art can be practical",
    body: "AI becomes useful when it helps people see possibilities faster, personalize confidently, and translate vague ideas into something visually resolved.",
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="space-y-12">
        <section className="grid gap-8 md:grid-cols-[1fr_0.92fr] md:items-center">
          <div>
            <SectionHeading
              eyebrow="About"
              title="A calmer way to create art for the spaces people actually live in."
              description="LUMEA AI exists because beautiful interiors deserve artwork that feels intentional, personal, and easy to imagine before you commit."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-black/8 bg-white p-5 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
                <p className="text-xs uppercase tracking-[0.2em] text-[#6B7280]">Mission</p>
                <p className="mt-2 text-sm leading-7 text-[#111111]">Make custom wall art feel effortless, premium, and visually dependable.</p>
              </div>
              <div className="rounded-[1.75rem] border border-black/8 bg-white p-5 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
                <p className="text-xs uppercase tracking-[0.2em] text-[#6B7280]">Difference</p>
                <p className="mt-2 text-sm leading-7 text-[#111111]">Taste-first UX, refined aesthetics, and room previews that help people decide fast.</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src="https://picsum.photos/seed/about-wall-art/1200/1600" alt="Premium creative workspace" fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
          </div>
        </section>
        <section>
          <h2 className="mb-6 font-serif text-4xl">Brand story</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {pillars.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-black/8 bg-white p-6 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
                <h3 className="font-serif text-3xl text-[#111111]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#6B7280]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
