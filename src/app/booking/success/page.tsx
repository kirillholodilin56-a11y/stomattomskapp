"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useBooking } from "@/context/BookingContext";
import { getDoctorById } from "@/data/mock";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookingSuccessPage() {
  const router = useRouter();
  const { booking, resetBooking } = useBooking();
  const doctor = booking.doctorId ? getDoctorById(booking.doctorId) : null;
  const service = doctor?.services.find((s) => s.id === booking.serviceId);

  const goHome = () => {
    resetBooking();
    router.push("/");
  };

  if (!doctor || !service || !booking.date) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-12 text-center"
      >
        <p className="text-sm text-slate-500">Нет данных о записи</p>
        <Button className="mt-8 w-full max-w-xs" onClick={goHome}>
          На главную страницу
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-8 text-center"
    >
      <span className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600 shadow-inner ring-4 ring-emerald-50">
        <CheckCircle2 className="h-11 w-11" strokeWidth={2} />
      </span>
      <h1 className="text-xl font-bold text-slate-900">Запись подтверждена</h1>
      <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-slate-500">
        Детали записи сохранены в демо-приложении
      </p>

      <Card className="mt-6 w-full text-left">
        <dl className="space-y-2.5 text-sm">
          <Row label="Врач" value={doctor.name} />
          <Row label="Услуга" value={service.name} />
          <Row label="Дата" value={`${booking.date} · ${booking.time}`} />
          <Row label="Стоимость" value={formatPrice(service.price)} highlight />
          {booking.patientName ? (
            <Row label="Пациент" value={booking.patientName} />
          ) : null}
        </dl>
      </Card>

      <div className="mt-10 flex w-full justify-center">
        <Button size="lg" className="w-full max-w-xs" onClick={goHome}>
          На главную страницу
        </Button>
      </div>
    </motion.div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-slate-500">{label}</dt>
      <dd
        className={
          highlight
            ? "font-semibold text-teal-700"
            : "text-right font-medium"
        }
      >
        {value}
      </dd>
    </div>
  );
}
