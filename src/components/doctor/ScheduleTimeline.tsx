"use client";

import { Badge } from "@/components/ui/Badge";
import type { Appointment, PatientStatus } from "@/types";
import { Clock } from "lucide-react";

const statusVariant: Record<
  PatientStatus,
  "default" | "success" | "warning" | "danger" | "info"
> = {
  записан: "info",
  пришёл: "success",
  "не пришёл": "danger",
  отменил: "warning",
};

export function ScheduleTimeline({
  appointments,
  emptyText = "Нет записей",
}: {
  appointments: Appointment[];
  emptyText?: string;
}) {
  const sorted = [...appointments].sort((a, b) => {
    const d = a.date.localeCompare(b.date);
    if (d !== 0) return d;
    return a.time.localeCompare(b.time);
  });

  if (sorted.length === 0) {
    return (
      <p className="rounded-2xl bg-slate-50 py-6 text-center text-xs text-slate-500">
        {emptyText}
      </p>
    );
  }

  return (
    <div className="relative space-y-0">
      <div className="absolute bottom-2 left-[15px] top-2 w-px bg-teal-200" />
      {sorted.map((apt) => (
        <div key={apt.id} className="relative flex gap-3 pb-3">
          <div className="relative z-10 mt-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-[10px] font-bold text-teal-700">
            {apt.time.slice(0, 5)}
          </div>
          <div className="min-w-0 flex-1 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {apt.patientName}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{apt.service}</p>
                <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                  <Clock className="h-3 w-3" />
                  {apt.date}
                </p>
              </div>
              <Badge variant={statusVariant[apt.status]} className="shrink-0 text-[10px]">
                {apt.status}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
