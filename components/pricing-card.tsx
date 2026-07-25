import { Check } from "lucide-react";
import type { PricingPlan } from "@/types/wall-art";
import { Button } from "@/components/ui/button";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <article
      className={`rounded-[2rem] border p-8 shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)] ${
        plan.featured
          ? "border-[#C9A96E]/45 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(250,246,238,1))]"
          : "border-black/8 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#6B7280]">{plan.name}</p>
          {plan.badge ? (
            <p className="mt-2 inline-flex rounded-full border border-black/8 px-3 py-1 text-xs text-[#111111]">
              {plan.badge}
            </p>
          ) : null}
        </div>
        {plan.savings ? <span className="rounded-full bg-[#C9A96E]/12 px-3 py-1 text-xs text-[#111111]">{plan.savings}</span> : null}
      </div>
      {plan.credits ? <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#6B7280]">{plan.credits}</p> : null}
      <div className="mt-2 flex items-end gap-2">
        <h3 className="font-serif text-5xl text-[#111111]">{plan.price}</h3>
        <span className="pb-2 text-sm text-[#6B7280]">one-time</span>
      </div>
      <p className="mt-4 text-sm leading-7 text-[#6B7280]">{plan.description}</p>
      <Button variant={plan.featured ? "accent" : "outline"} className="mt-8 w-full justify-center">
        {plan.cta}
      </Button>
      <div className="mt-8 space-y-4">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-3 text-sm text-[#111111]">
            <span className="mt-0.5 rounded-full bg-[#C9A96E]/15 p-1 text-[#111111]">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
