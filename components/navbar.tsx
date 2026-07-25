"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/wall-art-data";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#FAFAF8]/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 w-[min(1240px,92%)] items-center justify-between gap-4">
        <Logo />
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition ${
                pathname === link.href ? "text-[#111111]" : "text-[#6B7280] hover:text-[#111111]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/pricing" className="hidden md:block">
            <Button variant="outline" size="sm">
              Art Credits
            </Button>
          </Link>
          <Link href="/generate" className="hidden sm:block">
            <Button size="sm" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Start creating
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-black/5 bg-white/95 p-4 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto grid w-[min(1240px,92%)] gap-3 text-sm">
              {navItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-black/5 px-4 py-3"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/generate" onClick={() => setOpen(false)}>
                <Button className="mt-2 w-full justify-center">Start creating</Button>
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
