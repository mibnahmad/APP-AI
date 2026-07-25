import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms and usage guidance for LUMEA AI.",
};

export default function TermsPage() {
  return (
    <PageTransition>
      <article className="rounded-[2rem] border border-black/8 bg-white p-8 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
        <SectionHeading
          eyebrow="Terms"
          title="Simple terms for using the product responsibly."
          description="These summary terms cover access to the generator, output usage expectations, and the evolving nature of the preview release."
        />
        <div className="mt-8 space-y-8 text-sm leading-7 text-[#6B7280]">
          <section>
            <h2 className="font-serif text-3xl text-[#111111]">Product access</h2>
            <p className="mt-3">
              Use the product lawfully, do not attempt to abuse generation limits or security mechanisms, and do not
              misuse the service to create harmful or unlawful material.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-3xl text-[#111111]">Output usage</h2>
            <p className="mt-3">
              Generated artwork usage depends on the plan and licensing terms available at the time of access.
              Commercial permissions may differ from personal use during early rollout.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-3xl text-[#111111]">Service changes</h2>
            <p className="mt-3">
              Features, pricing, limits, and export options may evolve as the product moves toward a broader launch,
              including future print ordering and higher resolution workflows.
            </p>
          </section>
        </div>
      </article>
    </PageTransition>
  );
}
