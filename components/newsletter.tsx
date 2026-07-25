"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="rounded-3xl border border-black/10 bg-[#FAFAF8] p-8 md:p-12">
      <p className="text-xs uppercase tracking-[0.2em] text-[#777777]">Newsletter</p>
      <h3 className="mt-3 max-w-xl font-serif text-3xl md:text-4xl">Get curated art drops and interior inspiration.</h3>
      <form className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Input type="email" placeholder="Email address" className="bg-white" />
        <Button variant="accent">Subscribe</Button>
      </form>
    </section>
  );
}
