"use client";

import { collections } from "@/lib/products";
import type { Product } from "@/types/product";

export type ShopFilters = {
  category: string;
  collection: string;
  color: string;
  min: number;
  max: number;
};

export function FilterSidebar({
  products,
  filters,
  setFilters,
}: {
  products: Product[];
  filters: ShopFilters;
  setFilters: (filters: ShopFilters) => void;
}) {
  const colors = Array.from(new Set(products.flatMap((product) => product.colors)));
  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <aside className="space-y-6 rounded-3xl border border-black/8 bg-white p-5">
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#777777]">Category</p>
        <select
          className="w-full rounded-xl border border-black/10 bg-white p-2 text-sm"
          value={filters.category}
          onChange={(event) => setFilters({ ...filters, category: event.target.value })}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#777777]">Collection</p>
        <select
          className="w-full rounded-xl border border-black/10 bg-white p-2 text-sm"
          value={filters.collection}
          onChange={(event) => setFilters({ ...filters, collection: event.target.value })}
        >
          <option value="">All collections</option>
          {collections.map((collection) => (
            <option value={collection} key={collection}>
              {collection}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#777777]">Color</p>
        <select
          className="w-full rounded-xl border border-black/10 bg-white p-2 text-sm"
          value={filters.color}
          onChange={(event) => setFilters({ ...filters, color: event.target.value })}
        >
          <option value="">All colors</option>
          {colors.map((color) => (
            <option value={color} key={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#777777]">Price range</p>
        <div className="grid grid-cols-2 gap-2">
          <input
            className="rounded-xl border border-black/10 p-2 text-sm"
            type="number"
            value={filters.min}
            onChange={(event) => setFilters({ ...filters, min: Number(event.target.value) })}
          />
          <input
            className="rounded-xl border border-black/10 p-2 text-sm"
            type="number"
            value={filters.max}
            onChange={(event) => setFilters({ ...filters, max: Number(event.target.value) })}
          />
        </div>
      </div>
    </aside>
  );
}
