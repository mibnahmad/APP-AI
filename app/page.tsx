import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "@/components/faq-accordion";
import { NewsletterSection } from "@/components/newsletter-section";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TestimonialCard } from "@/components/testimonial-card";
import { collectionItems, faqItems, featuredArtwork, heroMetrics, howItWorks, styleLibrary, testimonials, trustIndicators, useCases } from "@/lib/wall-art-data";

export default function Home() {
  return (
    <PageTransition>
      <div className="space-y-24">
        <section className="grid gap-10 pb-4 pt-4 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <Reveal>
            <div>
              <div className="inline-flex items-center rounded-full border border-black/8 bg-white/85 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#6B7280] shadow-[0_20px_50px_-45px_rgba(17,17,17,0.45)]">
                LUMEA AI
              </div>
              <h1 className="mt-6 max-w-4xl font-serif text-6xl leading-[0.95] text-[#111111] md:text-7xl">
                Create Museum-Quality Wall Art with AI
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6B7280]">
                Generate custom artwork, see it inside premium interiors, and pay only for the pieces that truly belong on your wall.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/generate">
                  <Button size="lg">Try it free</Button>
                </Link>
                <Link href="/gallery">
                  <Button size="lg" variant="outline">
                    Explore gallery
                  </Button>
                </Link>
              </div>
              <div className="mt-8 max-w-2xl rounded-[1.75rem] border border-black/8 bg-white/90 p-4 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
                <p className="text-xs uppercase tracking-[0.22em] text-[#6B7280]">Prompt preview</p>
                <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <p className="rounded-[1.25rem] border border-black/8 bg-[#FAFAF8] px-4 py-3 text-sm leading-7 text-[#111111]">
                    Create a warm Japandi canvas for a quiet bedroom with limestone, oat, and brushed gold.
                  </p>
                  <Link href="/generate">
                    <Button className="whitespace-nowrap">Generate now</Button>
                  </Link>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {trustIndicators.map((item) => (
                  <span key={item} className="rounded-full border border-black/8 bg-white/85 px-4 py-2 text-xs text-[#6B7280]">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {heroMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-[1.75rem] border border-black/8 bg-white/85 p-5 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
                    <p className="font-serif text-4xl text-[#111111]">{metric.value}</p>
                    <p className="mt-2 text-sm text-[#6B7280]">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative rounded-[2rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(247,244,236,0.94))] p-4 shadow-[0_50px_120px_-70px_rgba(17,17,17,0.55)]">
              <div className="grid gap-4 md:grid-cols-[0.78fr_1.22fr]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
                  <Image src={featuredArtwork[0].image} alt={featuredArtwork[0].title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 30vw" />
                </div>
                <div className="space-y-4">
                  <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem]">
                    <Image src={featuredArtwork[0].mockup} alt="Bedroom wall mockup preview" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 40vw" />
                  </div>
                  <div className="rounded-[1.75rem] border border-black/8 bg-white/80 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#6B7280]">Live preview</p>
                    <h2 className="mt-3 font-serif text-3xl text-[#111111]">{featuredArtwork[0].title}</h2>
                    <p className="mt-2 text-sm leading-7 text-[#6B7280]">{featuredArtwork[0].prompt}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-black/8 px-3 py-1 text-xs text-[#6B7280]">{featuredArtwork[0].style}</span>
                      <span className="rounded-full border border-black/8 px-3 py-1 text-xs text-[#6B7280]">{featuredArtwork[0].mood}</span>
                      <span className="rounded-full border border-black/8 px-3 py-1 text-xs text-[#6B7280]">{featuredArtwork[0].quality}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <Reveal>
          <section className="rounded-[2.25rem] bg-[#111111] px-8 py-12 text-white md:px-12">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/70">
                Try before you buy
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl">
                A premium creative flow built to earn emotional buy-in before purchase.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/70">
                LUMEA AI lets people experience the artwork first, imagine it at home, and only then decide whether it deserves an unlock.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {howItWorks.map((item, index) => (
                <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6">
                  <p className="text-sm text-white/60">0{index + 1}</p>
                  <h3 className="mt-5 font-serif text-3xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <section className="space-y-8">
          <SectionHeading
            eyebrow="Featured styles"
            title="Curated aesthetics for homes that want more than generic art."
            description="Explore the style language behind the generator, from quiet Scandinavian balance to bold editorial statement pieces."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {styleLibrary.slice(0, 4).map((style, index) => (
              <Reveal key={style.slug} delay={index * 0.05}>
                <article className="overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src={style.preview} alt={style.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-3xl text-[#111111]">{style.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#6B7280]">{style.shortDescription}</p>
                    <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#6B7280]">{style.paletteHint}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading
            eyebrow="Showcase gallery"
            title="See the art on the wall before you ever pay for it."
            description="Every concept is paired with luxury room previews so the decision feels visual, emotional, and trustworthy."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredArtwork.slice(0, 4).map((artwork, index) => (
              <Reveal key={artwork.id} delay={index * 0.04}>
                <article className="overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src={artwork.image} alt={artwork.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-serif text-2xl text-[#111111]">{artwork.title}</h3>
                      <span className="rounded-full border border-black/8 px-3 py-1 text-xs text-[#6B7280]">{artwork.roomType}</span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[#6B7280]">{artwork.paletteHint}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="grid gap-8 rounded-[2rem] border border-black/8 bg-white p-8 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)] md:grid-cols-[1fr_0.92fr] md:p-12">
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.24em] text-[#6B7280]">Conversion strategy</p>
            <h2 className="mt-4 font-serif text-5xl text-[#111111]">Create freely. Unlock only the artwork you love.</h2>
            <div className="mt-6 grid gap-3">
              {useCases.map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-black/8 bg-[#FAFAF8] px-5 py-4 text-sm text-[#111111]">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
            <Image
              src={collectionItems[1].cover}
              alt="Luxury living room wall art mockup"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="Made for people who care about how art feels in a room."
            description="Interior lovers, content creators, and design-led founders use the product to move from inspiration to emotional certainty fast."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.05}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            eyebrow="FAQ preview"
            title="Practical answers before you create."
            description="Everything you need to understand digital downloads, preview quality, commercial use, and the future print workflow."
          />
          <FAQAccordion items={faqItems.slice(0, 4)} />
        </section>

        <NewsletterSection />

        <section className="rounded-[2.5rem] bg-[linear-gradient(135deg,#111111,#242424)] px-8 py-14 text-white md:px-12">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/60">Final CTA</p>
              <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-tight">Let LUMEA AI turn your idea into wall art worth keeping.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
                Generate tailored artwork, compare it inside real spaces, and unlock only the print-ready pieces you truly want.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <Link href="/generate">
                <Button size="lg">Try the generator</Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/15">
                  View pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
