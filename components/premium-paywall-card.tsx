"use client";

import { CheckCircle2, Download, LockKeyhole, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { unlockOffer } from "@/lib/payments";
import { cn } from "@/lib/utils";
import type { UnlockPaymentStatus } from "@/types/wall-art";

export function PremiumPaywallCard({
  isUnlocked,
  paymentStatus,
  isExporting,
  onPrimaryAction,
}: {
  isUnlocked: boolean;
  paymentStatus: UnlockPaymentStatus;
  isExporting: boolean;
  onPrimaryAction: () => void;
}) {
  const primaryLabel = isUnlocked
    ? isExporting
      ? "Preparing package"
      : "Download print-ready package"
    : paymentStatus === "processing"
      ? "Processing unlock"
      : "Unlock print-ready artwork";

  return (
    <div className="rounded-[1.9rem] border border-[#C9A96E]/30 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(251,247,238,1))] p-6 shadow-[0_30px_90px_-65px_rgba(17,17,17,0.45)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#6B7280]">Unlock the final artwork</p>
          <h4 className="mt-2 font-serif text-4xl text-[#111111]">Love the result? Unlock the print-ready package.</h4>
        </div>
        <div
          className={cn(
            "rounded-full border px-3 py-2 text-xs",
            isUnlocked ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-black/8 bg-white text-[#6B7280]",
          )}
        >
          {isUnlocked ? "Unlocked" : "Preview locked"}
        </div>
      </div>
      <p className="mt-3 text-sm leading-7 text-[#6B7280]">{unlockOffer.caption}</p>
      <div className="mt-5 rounded-[1.4rem] border border-black/8 bg-white p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#111111]">{unlockOffer.title}</p>
            <p className="mt-1 text-sm text-[#6B7280]">{unlockOffer.resolution}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-[#6B7280]">{unlockOffer.creditCost}</p>
            <p className="font-serif text-3xl text-[#111111]">{unlockOffer.price}</p>
          </div>
        </div>
        <div className="mt-4 grid gap-2 text-sm text-[#111111]">
          {unlockOffer.includedFiles.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-xl border border-black/8 bg-[#FAFAF8] px-3 py-3">
              <CheckCircle2 className="h-4 w-4 text-[#C9A96E]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {unlockOffer.printSizes.map((size) => (
            <span key={size} className="rounded-full border border-black/8 bg-white px-3 py-2 text-xs text-[#111111]">
              {size}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {unlockOffer.trustBadges.map((item) => (
          <span key={item} className="rounded-full border border-black/8 bg-white px-3 py-2 text-xs text-[#111111]">
            {item}
          </span>
        ))}
      </div>
      <Button className="mt-6 w-full justify-center gap-2" size="lg" onClick={onPrimaryAction} disabled={paymentStatus === "processing" || isExporting}>
        {isUnlocked ? (
          isExporting ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )
        ) : paymentStatus === "processing" ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <LockKeyhole className="h-4 w-4" />
        )}
        {primaryLabel}
      </Button>
    </div>
  );
}
