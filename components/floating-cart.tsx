"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useStore } from "@/components/providers/store-provider";

export function FloatingCart() {
  const { cart } = useStore();
  return (
    <Link
      href="/cart"
      className="fixed bottom-6 left-6 z-30 inline-flex items-center gap-2 rounded-full bg-[#111111] px-4 py-3 text-xs text-white shadow-xl"
    >
      <ShoppingBag className="h-4 w-4" />
      Cart ({cart.length})
    </Link>
  );
}
