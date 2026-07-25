import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center rounded-[2rem] border border-black/8 bg-white p-8 text-center shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
      <p className="text-xs uppercase tracking-[0.2em] text-[#777777]">404</p>
      <h1 className="mt-3 font-serif text-6xl">This wall is still blank.</h1>
      <p className="mt-3 max-w-md text-[#6B7280]">The page you’re looking for is not part of the current collection. Head back to the generator or browse the gallery.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/">
          <Button>Return home</Button>
        </Link>
        <Link href="/generate">
          <Button variant="outline">Open generator</Button>
        </Link>
      </div>
    </section>
  );
}
