import type { Metadata } from "next";
import { FAQAccordion } from "@/components/faq-accordion";
import { PageTransition } from "@/components/page-transition";
import { SectionHeading } from "@/components/section-heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact LUMEA AI for support, partnerships, interior design inquiries, or early access questions.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="space-y-12">
        <section className="grid gap-8 md:grid-cols-[0.92fr_1.08fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Talk to us about support, partnerships, or launch access."
              description="Whether you are styling a home, planning content, or exploring a professional workflow, we would love to hear from you."
            />
            <form className="mt-8 space-y-3 rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
              <Input placeholder="Your name" aria-label="Your name" />
              <Input type="email" placeholder="Email address" aria-label="Email address" />
              <Input placeholder="Company or project" aria-label="Company or project" />
              <textarea
                className="min-h-36 w-full rounded-[1.5rem] border border-black/10 p-4 text-sm outline-none focus:border-[#C9A96E]"
                placeholder="Tell us what you’re building or what you need help with."
                aria-label="Message"
              />
              <Button>Send message</Button>
            </form>
            <div className="mt-5 flex gap-3 text-sm text-[#6B7280]">
              <a href="#">Instagram</a>
              <a href="#">Pinterest</a>
              <a href="#">hello@aiwallartgenerator.com</a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
            <h2 className="font-serif text-3xl">What to expect</h2>
            <div className="mt-4 space-y-4">
              {[
                "Support replies for product questions and account access",
                "Interior design and content creator partnership conversations",
                "Early access requests for future print-ready workflows",
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-black/8 bg-[#FAFAF8] p-4 text-sm leading-7 text-[#111111]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section>
          <h2 className="mb-6 font-serif text-4xl">FAQ</h2>
          <FAQAccordion />
        </section>
      </div>
    </PageTransition>
  );
}
