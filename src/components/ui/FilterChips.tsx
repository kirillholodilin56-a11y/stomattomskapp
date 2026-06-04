"use client";

import { cn } from "@/lib/utils";

export interface FilterChip {
  id: string;
  label: string;
}

interface FilterChipsProps {
  chips: FilterChip[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function FilterChips({
  chips,
  activeId,
  onChange,
  className,
}: FilterChipsProps) {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto pb-1 scrollbar-hide",
        className
      )}
    >
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={() => onChange(chip.id)}
          className={cn(
            "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
            activeId === chip.id
              ? "bg-teal-600 text-white shadow-sm shadow-teal-600/25"
              : "bg-white text-slate-600 ring-1 ring-slate-200 active:scale-95"
          )}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
