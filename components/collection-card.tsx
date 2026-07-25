import Image from "next/image";
import type { CollectionItem } from "@/types/wall-art";

export function CollectionCard({ collection }: { collection: CollectionItem }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
      <div className="relative aspect-[5/4] overflow-hidden">
        <Image
          src={collection.cover}
          alt={collection.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="text-xs uppercase tracking-[0.24em] text-white/75">{collection.artCount}</p>
          <h3 className="mt-2 font-serif text-3xl">{collection.title}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm leading-7 text-[#6B7280]">{collection.description}</p>
      </div>
    </article>
  );
}
