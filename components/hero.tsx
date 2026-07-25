"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate min-h-[82vh] overflow-hidden rounded-[2rem] border border-black/10 bg-white p-10 md:p-16">
      <motion.div
        initial={{ scale: 1.05, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 -z-10 bg-[url('https://picsum.photos/seed/lumea-hero/1800/1200')] bg-cover bg-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#111111]/65 to-[#111111]/25" />
      <motion.div
        initial={{ y: 36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-white"
      >
        <p className="text-xs uppercase tracking-[0.28em] text-white/80">LUMEA ART</p>
        <h1 className="mt-5 font-serif text-5xl leading-[1.05] md:text-7xl">
          Curated Fine Art For Modern Living
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
          Museum-inspired wall art for elevated interiors. Explore timeless compositions, tactile palettes,
          and gallery-worthy finishes.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/shop">
            <Button variant="accent" size="lg">
              Shop The Gallery
            </Button>
          </Link>
          <Link href="/collections">
            <Button variant="outline" size="lg" className="border-white/30 bg-white/15 text-white hover:bg-white/20">
              View Collections
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
