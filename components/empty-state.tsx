import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="rounded-[2rem] border border-dashed border-black/10 bg-white/80 p-10 text-center shadow-[0_20px_60px_-50px_rgba(17,17,17,0.45)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A96E]/12 text-[#111111]">
        <Sparkles className="h-6 w-6" />
      </div>
      <h3 className="mt-5 font-serif text-3xl text-[#111111]">{title}</h3>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#6B7280]">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
