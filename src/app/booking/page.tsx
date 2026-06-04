"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useBooking } from "@/context/BookingContext";
import { getDoctorById } from "@/data/mock";
import { cn, formatPrice, formatShortDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Step = 1 | 2 | 3;

export default function BookingPage() {
  const router = useRouter();
  const { booking, setService, setDateTime, setPatientInfo } = useBooking();
  const [step, setStep] = useState<Step>(1);

  const doctor = booking.doctorId ? getDoctorById(booking.doctorId) : null;
  const selectedService = doctor?.services.find((s) => s.id === booking.serviceId);

  if (!doctor) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-500">Сначала выберите врача</p>
        <Button href="/doctors" className="mt-4">
          Найти врача
        </Button>
      </div>
    );
  }

  const canStep2 = !!booking.serviceId;
  const canStep3 = !!booking.date && !!booking.time;
  const canSubmit =
    booking.patientName.trim() &&
    booking.patientPhone.trim() &&
    canStep3;

  const handleSubmit = () => {
    if (!canSubmit) return;
    router.push("/booking/success");
  };

  return (
    <div className="section-stack">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Запись на приём</h1>
        <p className="text-sm text-slate-500">
          {doctor.name} · MVP-сценарий
        </p>
      </div>

      <div className="flex gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={cn(
              "h-1 flex-1 rounded-full",
              step >= s ? "bg-teal-600" : "bg-slate-200"
            )}
          />
        ))}
      </div>

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-3"
        >
          <h2 className="font-semibold text-slate-900">Выберите услугу</h2>
          {doctor.services.map((s) => (
            <Card
              key={s.id}
              onClick={() => setService(s.id)}
              className={cn(
                "cursor-pointer transition-colors",
                booking.serviceId === s.id && "ring-2 ring-teal-500"
              )}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-xs text-slate-400">{s.duration} мин</p>
                </div>
                <span className="font-semibold text-teal-700">
                  {formatPrice(s.price)}
                </span>
              </div>
            </Card>
          ))}
          <Button
            className="w-full"
            disabled={!canStep2}
            onClick={() => setStep(2)}
          >
            Далее
          </Button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h2 className="font-semibold text-slate-900">
            Дата и время (пример расписания)
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {doctor.availableSlots.map((slot) => {
              const d = new Date(slot);
              const dateStr = slot.split("T")[0];
              const timeStr = d.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              });
              const isSelected =
                booking.date === dateStr && booking.time === timeStr;

              return (
                <button
                  key={slot}
                  onClick={() => setDateTime(dateStr, timeStr)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-sm transition-colors",
                    isSelected
                      ? "border-teal-600 bg-teal-50 text-teal-800"
                      : "border-slate-200 bg-white hover:border-teal-300"
                  )}
                >
                  {formatShortDate(slot)}
                  <br />
                  <span className="font-medium">{timeStr}</span>
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(1)}>
              Назад
            </Button>
            <Button
              className="flex-1"
              disabled={!canStep3}
              onClick={() => setStep(3)}
            >
              Далее
            </Button>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <Card className="bg-slate-50">
            <p className="text-sm text-slate-600">
              <strong>{selectedService?.name}</strong>
              <br />
              {booking.date} · {booking.time}
              <br />
              {selectedService && formatPrice(selectedService.price)}
            </p>
          </Card>
          <Input
            label="Ваше имя"
            value={booking.patientName}
            onChange={(e) => setPatientInfo({ patientName: e.target.value })}
            placeholder="Иван Иванов"
          />
          <Input
            label="Телефон"
            type="tel"
            value={booking.patientPhone}
            onChange={(e) => setPatientInfo({ patientPhone: e.target.value })}
            placeholder="+7 (999) 000-00-00"
          />
          <Input
            label="Email (необязательно)"
            type="email"
            value={booking.patientEmail}
            onChange={(e) => setPatientInfo({ patientEmail: e.target.value })}
            placeholder="email@example.com"
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(2)}>
              Назад
            </Button>
            <Button
              className="flex-1"
              disabled={!canSubmit}
              onClick={handleSubmit}
            >
              Подтвердить запись
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
