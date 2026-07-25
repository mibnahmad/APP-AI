import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#777777]">
      {items.map((item, index) => (
        <span key={item.label} className="inline-flex items-center gap-2">
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
          {index < items.length - 1 ? <ChevronRight className="h-3 w-3" /> : null}
        </span>
      ))}
    </nav>
  );
}
