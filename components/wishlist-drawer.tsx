"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, X } from "lucide-react";
import { useStore } from "@/components/providers/store-provider";
import { products } from "@/lib/products";

export function WishlistDrawer() {
  const [open, setOpen] = useState(false);
  const { wishlist } = useStore();
  const items = products.filter((product) => wishlist.includes(product.id));

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 left-6 z-30 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-3 text-xs shadow-lg"
      >
        <Heart className="h-4 w-4" />
        Wishlist ({items.length})
      </button>
      {open ? (
        <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-black/8 bg-[#FAFAF8] p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-serif text-3xl">Wishlist</h3>
            <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-black/[0.04]">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            {items.length === 0 ? <p className="text-sm text-[#777777]">Your wishlist is empty.</p> : null}
            {items.map((item) => (
              <Link key={item.id} href={`/shop/${item.id}`} className="flex items-center gap-3 rounded-2xl border border-black/8 bg-white p-3">
                <div className="relative h-16 w-14 overflow-hidden rounded-xl">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-serif">{item.title}</p>
                  <p className="text-xs text-[#777777]">{item.artist}</p>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      ) : null}
    </>
  );
}
