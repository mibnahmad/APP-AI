import { LoadingGrid } from "@/components/loading-grid";

export default function Loading() {
  return (
    <div className="space-y-6 pt-10">
      <div className="h-10 w-52 animate-pulse rounded-full bg-[#ECE8DE]" />
      <LoadingGrid />
    </div>
  );
}
