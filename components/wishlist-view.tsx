"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import { useStore } from "@/components/providers/store-provider";
import { ProductCard } from "@/components/product-card";

export function WishlistView() {
  const { wishlist } = useStore();
  const items = products.filter((product) => wishlist.includes(product.id));

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-black/20 bg-white p-14 text-center">
        <h2 className="font-serif text-4xl">No saved pieces yet</h2>
        <p className="mt-2 text-[#777777]">Save artworks you love and revisit them here.</p>
        <Link href="/shop" className="mt-6 inline-block rounded-full bg-[#111111] px-5 py-3 text-sm text-white">
          Discover art
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}
