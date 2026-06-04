"use client";

import { Button } from "@/components/ui/Button";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { CalendarPlus } from "lucide-react";
import { useState } from "react";

const procedures = [
  "Лечение кариеса",
  "Профессиональная чистка",
  "Имплантация",
  "Консультация",
];

interface QuickBookSheetProps {
  open: boolean;
  time: string;
  dateLabel: string;
  onClose: () => void;
  onConfirm: (patientName: string, procedure: string) => void;
}

export function QuickBookSheet({
  open,
  time,
  dateLabel,
  onClose,
  onConfirm,
}: QuickBookSheetProps) {
  const [patientName, setPatientName] = useState("");
  const [procedure, setProcedure] = useState(procedures[3]);

  const handleConfirm = () => {
    if (!patientName.trim()) return;
    onConfirm(patientName.trim(), procedure);
    setPatientName("");
    setProcedure(procedures[3]);
  };

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={`Запись на ${time}`}
    >
      <div className="space-y-4 pb-2">
        <p className="text-xs text-slate-500">{dateLabel} · Smile Clinic · демо</p>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-slate-600">
            Пациент
          </span>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Фамилия и имя"
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-slate-600">
            Процедура
          </span>
          <select
            value={procedure}
            onChange={(e) => setProcedure(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
          >
            {procedures.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <Button
          className="w-full"
          onClick={handleConfirm}
          disabled={!patientName.trim()}
        >
          <CalendarPlus className="mr-2 h-4 w-4" />
          Создать запись (демо)
        </Button>
      </div>
    </BottomSheet>
  );
}
