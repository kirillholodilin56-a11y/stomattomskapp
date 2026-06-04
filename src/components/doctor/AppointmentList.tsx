"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Appointment, PatientStatus } from "@/types";
import { ChevronRight, Clock } from "lucide-react";

const statusVariant: Record<
  PatientStatus,
  "default" | "success" | "warning" | "danger" | "info"
> = {
  записан: "info",
  пришёл: "success",
  "не пришёл": "danger",
  отменил: "warning",
};

export function AppointmentList({
  title,
  appointments,
  onPatientClick,
}: {
  title: string;
  appointments: Appointment[];
  onPatientClick?: (patientName: string) => void;
}) {
  return (
    <section>
      <h2 className="mb-2 text-sm font-semibold text-slate-900">{title}</h2>
      <div className="space-y-2">
        {appointments.length === 0 ? (
          <Card className="p-3">
            <p className="text-center text-xs text-slate-500">
              Нет записей (демо)
            </p>
          </Card>
        ) : (
          appointments.map((apt) => (
            <Card
              key={apt.id}
              onClick={
                onPatientClick
                  ? () => onPatientClick(apt.patientName)
                  : undefined
              }
              className="flex items-center justify-between gap-2 p-3"
            >
              <div className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPatientClick?.(apt.patientName);
                  }}
                  className="text-left text-sm font-semibold text-teal-700 underline-offset-2 hover:underline"
                >
                  {apt.patientName}
                </button>
                <p className="text-xs text-slate-500">{apt.service}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
                  <Clock className="h-3 w-3" />
                  {apt.date} · {apt.time}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Badge
                  variant={statusVariant[apt.status]}
                  className="text-[10px]"
                >
                  {apt.status}
                </Badge>
                {onPatientClick && (
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
