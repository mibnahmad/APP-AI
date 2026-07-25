import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { GalleryExhibition } from "@/components/gallery-exhibition";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse a curated exhibition of LUMEA AI wall art, filter by mood and room type, and save favorites.",
};

export default function GalleryPage() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <SectionHeading
          eyebrow="Curated exhibition"
          title="Explore artwork like a collected gallery, not a thumbnail dump."
          description="Search, filter, sort, quick view, and save pieces by mood, room type, and aesthetic direction."
        />
        <GalleryExhibition />
      </div>
    </PageTransition>
  );
}
