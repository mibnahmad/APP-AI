"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product-card";
import { SearchBar } from "@/components/search-bar";
import { FilterSidebar, type ShopFilters } from "@/components/filter-sidebar";
import { Pagination } from "@/components/pagination";

const PAGE_SIZE = 9;

export function ShopView({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<ShopFilters>({
    category: "",
    collection: "",
    color: "",
    min: 0,
    max: 1000,
  });

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const byFilter = products.filter((product) => {
      const matchesQuery =
        product.title.toLowerCase().includes(q) ||
        product.artist.toLowerCase().includes(q) ||
        product.style.toLowerCase().includes(q);
      const matchesCollection = filters.collection ? product.collection === filters.collection : true;
      const matchesCategory = filters.category ? product.category === filters.category : true;
      const matchesColor = filters.color ? product.colors.includes(filters.color) : true;
      const matchesPrice = product.price >= filters.min && product.price <= filters.max;
      return matchesQuery && matchesCollection && matchesCategory && matchesColor && matchesPrice;
    });

    if (sort === "price-asc") return byFilter.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return byFilter.sort((a, b) => b.price - a.price);
    if (sort === "rating") return byFilter.sort((a, b) => b.rating - a.rating);
    return byFilter.sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [products, query, sort, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <FilterSidebar products={products} filters={filters} setFilters={(next) => (setPage(1), setFilters(next))} />
      <div>
        <div className="mb-5 flex flex-col gap-3 md:flex-row">
          <div className="flex-1">
            <SearchBar value={query} onChange={(value) => (setPage(1), setQuery(value))} />
          </div>
          <select
            className="h-11 rounded-full border border-black/10 bg-white px-4 text-sm"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {paged.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-black/15 bg-white p-14 text-center">
            <p className="font-serif text-3xl">No pieces found</p>
            <p className="mt-2 text-sm text-[#777777]">Adjust filters to discover more curated artworks.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {paged.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        )}
      </div>
    </div>
  );
}
