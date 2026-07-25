import Link from "next/link";
import { navItems } from "@/lib/wall-art-data";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-black/10 bg-white/70">
      <div className="mx-auto w-[min(1240px,92%)] py-16">
        <section className="rounded-[2rem] border border-black/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,245,238,0.98))] p-8 shadow-[0_30px_90px_-60px_rgba(17,17,17,0.35)] md:flex md:items-end md:justify-between md:gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#6B7280]">Create with confidence</p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl text-[#111111] md:text-5xl">
              Build custom wall art that already looks at home.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6B7280]">
              LUMEA AI turns prompts into elegant artwork, then places each piece into realistic interiors so
              you can choose with clarity.
            </p>
          </div>
          <Link href="/generate" className="mt-6 inline-flex md:mt-0">
            <Button>Try it free</Button>
          </Link>
        </section>
        <div className="mt-14 grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="font-serif text-2xl tracking-[0.16em]">LUMEA AI</h3>
            <p className="mt-2 text-sm text-[#6B7280]">Create museum-quality wall art in seconds.</p>
          </div>
          <div className="space-y-3 text-sm text-[#6B7280]">
            {navItems.slice(0, 5).map((item) => (
              <div key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </div>
            ))}
          </div>
          <div className="space-y-3 text-sm text-[#6B7280]">
            <div>
              <Link href="/pricing">Pricing</Link>
            </div>
            <div>
              <Link href="/privacy">Privacy</Link>
            </div>
            <div>
              <Link href="/terms">Terms</Link>
            </div>
            <div>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm text-[#6B7280]">Follow</p>
            <div className="flex items-center gap-2">
              <a className="rounded-full border border-black/10 px-3 py-2 text-xs hover:bg-black/[0.03]" href="#" aria-label="Instagram">
                Instagram
              </a>
              <a className="rounded-full border border-black/10 px-3 py-2 text-xs hover:bg-black/[0.03]" href="#" aria-label="Pinterest">
                Pinterest
              </a>
            </div>
          </div>
        </div>
        <p className="mt-12 text-xs text-[#6B7280]">© {new Date().getFullYear()} LUMEA AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
