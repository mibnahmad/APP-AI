"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { useStore } from "@/components/providers/store-provider";
import { Button } from "@/components/ui/button";
import { currency } from "@/lib/utils";

export function CartView() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const detailed = cart
    .map((item) => ({ item, product: products.find((product) => product.id === item.productId) }))
    .filter((entry) => entry.product);

  const total = detailed.reduce((sum, entry) => sum + (entry.product?.price ?? 0) * entry.item.quantity, 0);

  if (detailed.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-black/20 bg-white p-14 text-center">
        <h2 className="font-serif text-4xl">Your cart is empty</h2>
        <p className="mt-2 text-[#777777]">Start exploring curated artwork collections.</p>
        <Link href="/shop" className="mt-6 inline-block rounded-full bg-[#111111] px-5 py-3 text-sm text-white">
          Browse shop
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        {detailed.map(({ item, product }) =>
          product ? (
            <article key={product.id} className="flex gap-4 rounded-3xl border border-black/8 bg-white p-4">
              <div className="relative h-28 w-24 overflow-hidden rounded-2xl">
                <Image src={product.image} alt={product.title} fill className="object-cover" />
              </div>
              <div className="flex flex-1 items-start justify-between">
                <div>
                  <p className="font-serif text-2xl">{product.title}</p>
                  <p className="text-sm text-[#777777]">{item.size} • {item.finish} • {item.frame} frame</p>
                  <p className="mt-2">{currency(product.price)}</p>
                </div>
                <div className="text-right">
                  <input
                    type="number"
                    min={1}
                    className="w-16 rounded-xl border border-black/10 p-1 text-sm"
                    value={item.quantity}
                    onChange={(event) => updateQuantity(item.productId, Number(event.target.value))}
                  />
                  <button className="mt-3 block text-xs text-[#777777]" onClick={() => removeFromCart(item.productId)}>
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ) : null,
        )}
      </div>
      <aside className="h-fit rounded-3xl border border-black/8 bg-white p-6 lg:sticky lg:top-28">
        <h3 className="font-serif text-3xl">Summary</h3>
        <p className="mt-4 flex items-center justify-between text-sm">
          <span className="text-[#777777]">Total</span>
          <span>{currency(total)}</span>
        </p>
        <Button className="mt-6 w-full">Checkout (UI only)</Button>
      </aside>
    </div>
  );
}
