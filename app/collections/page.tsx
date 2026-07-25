import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { CollectionCard } from "@/components/collection-card";
import { SectionHeading } from "@/components/section-heading";
import { collectionItems } from "@/lib/wall-art-data";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse editorial collections for bedrooms, living rooms, offices, nurseries, and luxury interiors.",
};

export default function CollectionsPage() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <SectionHeading
          eyebrow="Collections"
          title="Editorial collections for every room and aesthetic mood."
          description="Use curated collections to explore by space, emotional tone, and styling intent before you generate your own variation."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {collectionItems.map((collection) => (
            <Link key={collection.title} href="/generate">
              <CollectionCard collection={collection} />
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
