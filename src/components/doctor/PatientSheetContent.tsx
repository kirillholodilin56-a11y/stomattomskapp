"use client";

import type { PatientRecord } from "@/types";
import { Calendar, FileText, Stethoscope } from "lucide-react";

export function PatientSheetContent({ patient }: { patient: PatientRecord }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-teal-50 p-3">
        <p className="text-xs text-teal-600">Телефон</p>
        <p className="text-sm font-medium text-teal-900">{patient.phone}</p>
        <p className="mt-2 text-xs text-teal-600">Статус лечения</p>
        <p className="text-sm font-semibold text-teal-900">
          {patient.treatmentStatus}
        </p>
      </div>

      <section>
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
          <Calendar className="h-4 w-4 text-teal-600" />
          История визитов
        </h3>
        <div className="space-y-2">
          {patient.visits.map((v, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs"
            >
              <p className="font-medium text-slate-900">{v.service}</p>
              <p className="mt-0.5 text-slate-500">
                {v.date} · {v.status}
              </p>
              {v.notes && (
                <p className="mt-1 flex items-start gap-1 text-slate-600">
                  <FileText className="mt-0.5 h-3 w-3 shrink-0" />
                  {v.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
          <Stethoscope className="h-4 w-4 text-teal-600" />
          Запланированные процедуры
        </h3>
        <ul className="space-y-1.5">
          {patient.plannedProcedures.map((proc, i) => (
            <li
              key={i}
              className="rounded-lg bg-white px-3 py-2 text-xs text-slate-700 ring-1 ring-slate-100"
            >
              {proc}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
