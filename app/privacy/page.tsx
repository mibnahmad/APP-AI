import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for LUMEA AI.",
};

export default function PrivacyPage() {
  return (
    <PageTransition>
      <article className="rounded-[2rem] border border-black/8 bg-white p-8 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
        <SectionHeading
          eyebrow="Privacy"
          title="Your prompts, creations, and account information are handled with care."
          description="This preview policy explains the general approach we take while the product is in its current digital generation phase."
        />
        <div className="mt-8 space-y-8 text-sm leading-7 text-[#6B7280]">
          <section>
            <h2 className="font-serif text-3xl text-[#111111]">Information we collect</h2>
            <p className="mt-3">
              We may collect account details, prompt content, saved creations, usage analytics, device information, and
              messages you send through support or contact forms.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-3xl text-[#111111]">How we use it</h2>
            <p className="mt-3">
              We use this information to operate the product, personalize the experience, maintain saved galleries,
              improve generation quality, and communicate service updates when relevant.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-3xl text-[#111111]">Your control</h2>
            <p className="mt-3">
              You can manage saved prompts, favorites, and usage of the product locally in this preview experience.
              Formal account-level controls will expand alongside launch readiness.
            </p>
          </section>
        </div>
      </article>
    </PageTransition>
  );
}
