"use client";

import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function ProgressRow({
  label,
  value,
  percent,
  format = "money",
}: {
  label: string;
  value: number;
  percent: number;
  format?: "money" | "count";
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="truncate font-medium text-slate-700">{label}</span>
        <span className="shrink-0 font-semibold text-slate-900">
          {format === "money" ? formatPrice(value) : value}
          <span className="ml-1 font-normal text-slate-400">{percent}%</span>
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
    </div>
  );
}

export function StatPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-3",
        accent
          ? "border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50"
          : "border-slate-100 bg-slate-50/80"
      )}
    >
      <p className="text-[10px] font-medium text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </h3>
  );
}
