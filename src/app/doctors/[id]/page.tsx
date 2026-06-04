"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Rating } from "@/components/ui/Rating";
import { useBooking } from "@/context/BookingContext";
import {
  getClinicById,
  getDoctorById,
  getReviewsByDoctorId,
} from "@/data/mock";
import { formatPrice, formatShortDate } from "@/lib/utils";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function DoctorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { setDoctor } = useBooking();
  const doctor = getDoctorById(params.id as string);

  const doctorReviews = useMemo(
    () => (doctor ? getReviewsByDoctorId(doctor.id) : []),
    [doctor]
  );

  if (!doctor) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-500">Врач не найден</p>
        <Button href="/doctors" className="mt-4">
          К списку врачей
        </Button>
      </div>
    );
  }

  const clinic = getClinicById(doctor.clinicId);

  const handleBook = () => {
    setDoctor(doctor.id);
    router.push("/booking");
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex gap-4">
          <Avatar initials={doctor.avatar} size="lg" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">{doctor.name}</h1>
            <p className="text-teal-600">{doctor.specialty}</p>
            <div className="mt-2">
              <Rating value={doctor.rating} />
              <span className="ml-2 text-sm text-slate-400">
                {doctor.reviewCount} отзывов
              </span>
            </div>
            {clinic && (
              <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                <MapPin className="h-4 w-4" />
                {clinic.name} · {clinic.address}
              </p>
            )}
            <p className="mt-1 text-sm text-slate-500">
              Стаж {doctor.experience} лет
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-600">{doctor.bio}</p>
      </Card>

      <section>
        <h2 className="mb-3 font-semibold text-slate-900">Услуги и цены</h2>
        <div className="space-y-2">
          {doctor.services.map((s) => (
            <Card key={s.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-slate-900">{s.name}</p>
                <p className="text-xs text-slate-400">
                  <Clock className="mr-1 inline h-3 w-3" />
                  {s.duration} мин
                </p>
              </div>
              <span className="font-semibold text-teal-700">
                {formatPrice(s.price)}
              </span>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-semibold text-slate-900">
          Свободные слоты (пример расписания)
        </h2>
        <div className="flex flex-wrap gap-2">
          {doctor.availableSlots.slice(0, 6).map((slot) => {
            const d = new Date(slot);
            return (
              <span
                key={slot}
                className="rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-sm text-teal-800"
              >
                {formatShortDate(slot)}{" "}
                {d.toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-semibold text-slate-900">Отзывы</h2>
        <div className="space-y-3">
          {doctorReviews.length > 0 ? (
            doctorReviews.slice(0, 3).map((r) => (
              <Card key={r.id}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{r.patientName}</span>
                  <Rating value={r.overallRating} showValue={false} />
                </div>
                <p className="mt-2 text-sm text-slate-600">{r.text}</p>
              </Card>
            ))
          ) : (
            <Card>
              <p className="text-sm text-slate-500">Пока нет отзывов (демо)</p>
            </Card>
          )}
        </div>
      </section>

      <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg">
        <Button className="w-full" size="lg" onClick={handleBook}>
          Записаться · от {formatPrice(doctor.priceFrom)}
        </Button>
        <Link
          href="/doctors"
          className="mt-2 block text-center text-sm text-slate-500 hover:text-teal-600"
        >
          ← Все врачи
        </Link>
      </div>
    </div>
  );
}
