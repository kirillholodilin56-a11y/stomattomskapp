"use client";

import { Badge } from "@/components/ui/Badge";
import {
  DEMO_SCHEDULE_WEEK_START,
  getDoctorDaySlots,
  getDoctorWeekDays,
} from "@/data/mock";
import { cn } from "@/lib/utils";
import type { Appointment, PatientStatus, ScheduleSlot } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { QuickBookSheet } from "./QuickBookSheet";

const statusVariant: Record<
  PatientStatus,
  "default" | "success" | "warning" | "danger" | "info"
> = {
  записан: "info",
  пришёл: "success",
  "не пришёл": "danger",
  отменил: "warning",
};

interface DoctorDailyScheduleProps {
  doctorId: string;
  onPatientClick: (patientName: string) => void;
}

function formatDayDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}

function BookedCell({
  slot,
  onClick,
}: {
  slot: ScheduleSlot;
  onClick: () => void;
}) {
  const apt = slot.appointment!;
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full gap-3 rounded-2xl border border-emerald-100/80 bg-gradient-to-r from-emerald-50 to-teal-50 p-3.5 text-left shadow-sm shadow-emerald-100/50 transition-transform active:scale-[0.99]"
    >
      <span className="flex w-12 shrink-0 flex-col items-start">
        <span className="text-base font-bold tabular-nums text-emerald-800">
          {slot.time}
        </span>
      </span>
      <span className="min-w-0 flex-1 border-l border-emerald-100/80 pl-3">
        <span className="flex items-start justify-between gap-2">
          <span className="truncate text-sm font-semibold text-slate-900">
            {apt.patientName}
          </span>
          <Badge
            variant={statusVariant[apt.status]}
            className="shrink-0 text-[10px]"
          >
            {apt.status}
          </Badge>
        </span>
        <span className="mt-0.5 block text-xs text-emerald-700/90">
          {apt.service}
        </span>
      </span>
    </button>
  );
}

function FreeCell({
  slot,
  onClick,
}: {
  slot: ScheduleSlot;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white p-3.5 text-left shadow-sm transition-transform active:scale-[0.99] active:bg-slate-50"
    >
      <span className="w-12 shrink-0 text-base font-bold tabular-nums text-slate-800">
        {slot.time}
      </span>
      <span className="flex min-w-0 flex-1 items-center justify-between gap-2 border-l border-slate-100 pl-3">
        <span>
          <span className="block text-sm font-medium text-slate-600">
            Свободное время
          </span>
          <span className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
            <CalendarPlus className="h-3 w-3" />
            Нажмите, чтобы записать
          </span>
        </span>
      </span>
    </button>
  );
}

export function DoctorDailySchedule({
  doctorId,
  onPatientClick,
}: DoctorDailyScheduleProps) {
  const weekDays = useMemo(
    () => getDoctorWeekDays(DEMO_SCHEDULE_WEEK_START, DEMO_SCHEDULE_WEEK_START),
    []
  );

  const defaultDayIndex = weekDays.findIndex((d) => d.isToday);
  const [dayIndex, setDayIndex] = useState(
    defaultDayIndex >= 0 ? defaultDayIndex : 0
  );
  const [freeSlot, setFreeSlot] = useState<{ time: string; date: string } | null>(
    null
  );
  const [localBooked, setLocalBooked] = useState<Appointment[]>([]);

  const selectedDay = weekDays[dayIndex];
  const slots = useMemo(
    () => getDoctorDaySlots(doctorId, selectedDay.date, localBooked),
    [doctorId, selectedDay.date, localBooked]
  );

  const bookedCount = slots.filter((s) => s.type === "booked").length;
  const freeCount = slots.filter((s) => s.type === "free").length;

  const handleQuickBook = (patientName: string, procedure: string) => {
    if (!freeSlot) return;
    setLocalBooked((prev) => [
      ...prev,
      {
        id: `apt-local-${Date.now()}`,
        doctorId,
        patientName,
        service: procedure,
        date: freeSlot.date,
        time: freeSlot.time,
        status: "записан",
      },
    ]);
    setFreeSlot(null);
  };

  return (
    <motion.div className="space-y-3">
      <motion.div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {weekDays.map((day, i) => (
          <button
            key={day.date}
            type="button"
            onClick={() => setDayIndex(i)}
            className={cn(
              "flex min-w-[44px] shrink-0 flex-col items-center rounded-2xl px-3 py-2 transition-all duration-200",
              dayIndex === i
                ? "bg-teal-600 text-white shadow-md shadow-teal-600/25"
                : "bg-white text-slate-600 ring-1 ring-slate-200 active:bg-slate-50"
            )}
          >
            <span className="text-xs font-bold tracking-wide">{day.label}</span>
            <span
              className={cn(
                "mt-0.5 text-[10px] tabular-nums",
                dayIndex === i ? "text-teal-100" : "text-slate-400"
              )}
            >
              {new Date(`${day.date}T12:00:00`).getDate()}
            </span>
            {day.isToday && (
              <span
                className={cn(
                  "mt-1 h-1 w-1 rounded-full",
                  dayIndex === i ? "bg-white" : "bg-teal-500"
                )}
              />
            )}
          </button>
        ))}
      </motion.div>

      <motion.div className="flex items-center justify-between px-0.5 text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-teal-600" />
          {formatDayDate(selectedDay.date)}
        </span>
        <span>
          {bookedCount} приёма · {freeCount} свободно
        </span>
      </motion.div>

      <motion.div className="max-h-[380px] space-y-2 overflow-y-auto pr-0.5 scrollbar-hide">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay.date}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            {slots.map((slot) =>
              slot.type === "booked" && slot.appointment ? (
                <BookedCell
                  key={slot.id}
                  slot={slot}
                  onClick={() => onPatientClick(slot.appointment!.patientName)}
                />
              ) : (
                <FreeCell
                  key={slot.id}
                  slot={slot}
                  onClick={() =>
                    setFreeSlot({ time: slot.time, date: selectedDay.date })
                  }
                />
              )
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <QuickBookSheet
        open={!!freeSlot}
        time={freeSlot?.time ?? ""}
        dateLabel={
          freeSlot ? formatDayDate(freeSlot.date) : ""
        }
        onClose={() => setFreeSlot(null)}
        onConfirm={handleQuickBook}
      />
    </motion.div>
  );
}
