import Link from "next/link";
import { collections } from "@/lib/products";

export function CollectionCards() {
  return (
    <section>
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-serif text-4xl">Featured Collections</h2>
        <Link href="/collections" className="text-sm text-[#777777] hover:text-[#111111]">
          View all
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {collections.slice(0, 8).map((collection, index) => (
          <Link
            href={`/shop?collection=${encodeURIComponent(collection)}`}
            key={collection}
            className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-6 shadow-sm"
          >
            <div
              className="absolute inset-0 -z-10 bg-cover bg-center opacity-70 transition duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(https://picsum.photos/seed/collection-${index + 1}/900/700)` }}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/45 to-black/10" />
            <p className="pt-20 font-serif text-2xl text-white">{collection}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
