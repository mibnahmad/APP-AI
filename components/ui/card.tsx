import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-3xl border border-black/5 bg-white shadow-[0_15px_40px_-30px_rgba(0,0,0,0.35)]", className)}>
      {children}
    </div>
  );
}
