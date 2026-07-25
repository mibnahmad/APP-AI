"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useStore } from "@/components/providers/store-provider";

export function AddToCartPanel({ product }: { product: Product }) {
  const { addToCart, toggleWishlist } = useStore();
  const [size, setSize] = useState(product.sizes[0]);
  const [finish, setFinish] = useState<"Canvas" | "Poster">("Canvas");
  const [frame, setFrame] = useState<"None" | "Black" | "Oak" | "White" | "Gold">("None");

  useEffect(() => {
    const stored = window.localStorage.getItem("lumea-recently-viewed");
    const current = stored ? (JSON.parse(stored) as string[]) : [];
    const updated = [product.id, ...current.filter((id) => id !== product.id)].slice(0, 12);
    window.localStorage.setItem("lumea-recently-viewed", JSON.stringify(updated));
  }, [product.id]);

  return (
    <div className="space-y-4 rounded-3xl border border-black/8 bg-white p-6">
      <label className="block text-xs uppercase tracking-[0.18em] text-[#777777]">Size</label>
      <select className="w-full rounded-xl border border-black/10 p-2 text-sm" value={size} onChange={(e) => setSize(e.target.value)}>
        {product.sizes.map((entry) => (
          <option key={entry}>{entry}</option>
        ))}
      </select>

      <label className="block text-xs uppercase tracking-[0.18em] text-[#777777]">Finish</label>
      <select
        className="w-full rounded-xl border border-black/10 p-2 text-sm"
        value={finish}
        onChange={(e) => setFinish(e.target.value as "Canvas" | "Poster")}
      >
        <option>Canvas</option>
        <option>Poster</option>
      </select>

      <label className="block text-xs uppercase tracking-[0.18em] text-[#777777]">Frame</label>
      <select
        className="w-full rounded-xl border border-black/10 p-2 text-sm"
        value={frame}
        onChange={(e) => setFrame(e.target.value as "None" | "Black" | "Oak" | "White" | "Gold")}
      >
        <option>None</option>
        <option>Black</option>
        <option>Oak</option>
        <option>White</option>
        <option>Gold</option>
      </select>

      <Button
        className="mt-2 w-full"
        onClick={() =>
          addToCart({
            productId: product.id,
            quantity: 1,
            size,
            finish,
            frame,
          })
        }
      >
        Add To Cart
      </Button>
      <Button variant="outline" className="w-full" onClick={() => toggleWishlist(product.id)}>
        Add To Wishlist
      </Button>
    </div>
  );
}
