"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";
import { currency } from "@/lib/utils";
import { useStore } from "@/components/providers/store-provider";
import { ProductModal } from "@/components/product-modal";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useStore();
  const [open, setOpen] = useState(false);
  const liked = wishlist.includes(product.id);

  return (
    <motion.article whileHover={{ y: -6 }} className="group overflow-hidden rounded-3xl border border-black/8 bg-white">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.title} by ${product.artist}`}
          fill
          sizes="(max-width: 768px) 100vw, 30vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 flex gap-2">
          <Button variant="ghost" size="icon" className="bg-white/90" onClick={() => toggleWishlist(product.id)}>
            <Heart className={`h-4 w-4 ${liked ? "fill-current text-[#C9A96E]" : ""}`} />
          </Button>
          <Button variant="ghost" size="icon" className="bg-white/90" onClick={() => setOpen(true)}>
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-2">
          {product.bestSeller ? <Badge>Best Seller</Badge> : null}
          {product.new ? <Badge className="text-[#C9A96E]">New</Badge> : null}
        </div>
        <div>
          <Link href={`/shop/${product.id}`} className="font-serif text-2xl leading-tight hover:text-[#C9A96E]">
            {product.title}
          </Link>
          <p className="text-sm text-[#777777]">{product.artist}</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-base">{currency(product.price)}</p>
          <p className="text-sm text-[#777777] line-through">{currency(product.oldPrice)}</p>
        </div>
      </div>
      <ProductModal product={product} open={open} onOpenChange={setOpen} />
    </motion.article>
  );
}
