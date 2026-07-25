export function LoadingGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_24px_70px_-60px_rgba(17,17,17,0.45)]">
          <div className="aspect-[4/5] animate-pulse bg-[#F0EEE8]" />
          <div className="space-y-2 p-4">
            <div className="h-5 w-2/3 animate-pulse rounded bg-[#F0EEE8]" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-[#F0EEE8]" />
          </div>
        </div>
      ))}
    </div>
  );
}
