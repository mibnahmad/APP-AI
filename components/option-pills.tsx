"use client";

import { cn } from "@/lib/utils";

export function OptionPills<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-[#111111]">{label}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "min-h-16 rounded-[1.25rem] border px-4 py-3 text-left text-sm transition",
              value === option
                ? "border-[#C9A96E]/50 bg-[linear-gradient(180deg,rgba(201,169,110,0.12),rgba(255,255,255,0.95))] text-[#111111] shadow-[0_20px_40px_-35px_rgba(17,17,17,0.45)]"
                : "border-black/8 bg-white text-[#6B7280] hover:border-black/12 hover:bg-[#FBF9F2] hover:text-[#111111]",
            )}
          >
            <span className="block font-medium">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
