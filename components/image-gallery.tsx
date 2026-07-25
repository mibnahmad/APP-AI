"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(images[0]);
  return (
    <div className="space-y-4">
      <motion.div whileHover={{ scale: 1.02 }} className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-black/8 bg-white">
        <Image src={active} alt={alt} fill className="object-cover" />
      </motion.div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image) => (
          <button
            key={image}
            onClick={() => setActive(image)}
            className={`relative aspect-square overflow-hidden rounded-2xl border ${active === image ? "border-[#C9A96E]" : "border-black/8"}`}
          >
            <Image src={image} alt={`${alt} preview`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
