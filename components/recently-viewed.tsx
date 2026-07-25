"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { products } from "@/lib/products";

export function RecentlyViewed() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("lumea-recently-viewed");
    if (stored) setIds(JSON.parse(stored) as string[]);
  }, []);

  const items = products.filter((product) => ids.includes(product.id)).slice(0, 4);
  if (items.length === 0) return null;

  return (
    <section className="mt-16">
      <h3 className="mb-6 font-serif text-3xl">Recently Viewed</h3>
      <div className="grid gap-4 md:grid-cols-4">
        {items.map((item) => (
          <Link key={item.id} href={`/shop/${item.id}`} className="rounded-3xl border border-black/8 bg-white p-3">
            <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-2xl">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>
            <p className="font-serif">{item.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
