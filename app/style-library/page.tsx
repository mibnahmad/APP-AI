import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { styleLibrary } from "@/lib/wall-art-data";

export const metadata: Metadata = {
  title: "Style Library",
  description: "Explore the curated art styles available in LUMEA AI.",
};

export default function StyleLibraryPage() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <SectionHeading
          eyebrow="Style library"
          title="A premium style system built for interiors, not novelty."
          description="Each style is tuned for a distinct room mood, palette direction, and compositional feel so you can generate with confidence."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {styleLibrary.map((style, index) => (
            <Reveal key={style.slug} delay={index * 0.04}>
              <article className="overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={style.preview} alt={style.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-3xl text-[#111111]">{style.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#6B7280]">{style.shortDescription}</p>
                  <div className="mt-5 grid gap-3 rounded-[1.5rem] border border-black/8 bg-[#FAFAF8] p-4 text-sm">
                    <div>
                      <span className="text-[#6B7280]">Mood</span>
                      <p className="mt-1 text-[#111111]">{style.mood}</p>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">Best room</span>
                      <p className="mt-1 text-[#111111]">{style.bestRoom}</p>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">Best use case</span>
                      <p className="mt-1 text-[#111111]">{style.bestUseCase}</p>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">Palette hint</span>
                      <p className="mt-1 text-[#111111]">{style.paletteHint}</p>
                    </div>
                  </div>
                  <Link href="/generate" className="mt-5 inline-flex">
                    <Button variant="outline">Generate in this style</Button>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
