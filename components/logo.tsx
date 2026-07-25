import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label="LUMEA AI home">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#C9A96E]/40 bg-[linear-gradient(145deg,rgba(201,169,110,0.2),rgba(255,255,255,0.92))] shadow-[0_10px_25px_-18px_rgba(17,17,17,0.6)]">
        <span className="h-5 w-5 rounded-full border border-[#C9A96E]/70 bg-[#FAFAF8]" />
      </span>
      <div>
        <p className="font-serif text-lg leading-none tracking-[0.18em] text-[#111111]">LUMEA AI</p>
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#6B7280]">Wall Art Generator</p>
      </div>
    </Link>
  );
}
