"use client";

import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { currency } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductModal({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image src={product.image} alt={product.title} fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm text-[#777777]">{product.collection}</p>
              <h3 className="mt-2 font-serif text-4xl">{product.title}</h3>
              <p className="mt-1 text-sm text-[#777777]">{product.artist}</p>
              <p className="mt-5 text-sm leading-7 text-[#777777]">{product.description}</p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-xl">{currency(product.price)}</p>
              <Link href={`/shop/${product.id}`}>
                <Button>View Product</Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
