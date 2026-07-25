import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm outline-none transition placeholder:text-[#6B7280] focus:border-[#C9A96E]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
