"use client";

import { ScheduleTimeline } from "@/components/doctor/ScheduleTimeline";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Rating } from "@/components/ui/Rating";
import { StatCard } from "@/components/ui/Card";
import {
  getAppointmentsByDoctorId,
  getClinicById,
  getDoctorById,
  getDoctorDashboardStats,
  getReviewsByDoctorId,
} from "@/data/mock";
import { Star, TrendingUp, UserMinus, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ClinicDoctorViewPage() {
  const params = useParams();
  const doctor = getDoctorById(params.id as string);

  if (!doctor) {
    return (
      <div className="py-12 text-center text-sm text-slate-500">
        Врач не найден
        <Link href="/clinic" className="mt-4 block text-teal-600">
          ← Назад
        </Link>
      </div>
    );
  }

  const clinic = getClinicById(doctor.clinicId);
  const stats = getDoctorDashboardStats(doctor.id);
  const doctorAppointments = getAppointmentsByDoctorId(doctor.id);
  const doctorReviews = getReviewsByDoctorId(doctor.id);
  const upcoming = doctorAppointments.filter((a) => a.status === "записан");

  return (
    <div className="section-stack">
      <Link
        href="/clinic"
        className="text-xs font-medium text-teal-600"
      >
        ← Клиника
      </Link>

      <Card className="flex gap-3 p-4">
        <Avatar initials={doctor.avatar} size="lg" />
        <div className="min-w-0">
          <h1 className="text-base font-bold text-slate-900">{doctor.name}</h1>
          <p className="text-xs text-teal-600">{doctor.specialty}</p>
          {clinic && (
            <p className="mt-1 text-[11px] text-slate-500">{clinic.name}</p>
          )}
          <div className="mt-2">
            <Rating value={doctor.rating} size="sm" />
          </div>
        </div>
      </Card>

      <div className="kpi-grid">
        <StatCard compact label="Пациентов" value={stats.monthlyPatients} icon={<Users className="h-3.5 w-3.5" />} />
        <StatCard compact label="Неявки" value={`${stats.noShowRate}%`} icon={<UserMinus className="h-3.5 w-3.5" />} />
        <StatCard compact label="Конверсия" value={`${stats.conversionRate}%`} icon={<TrendingUp className="h-3.5 w-3.5" />} />
        <StatCard compact label="Рейтинг" value={stats.averageRating} suffix="/ 5" icon={<Star className="h-3.5 w-3.5" />} />
      </div>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-slate-900">
          Ближайшие приёмы
        </h2>
        <ScheduleTimeline
          appointments={upcoming.slice(0, 5)}
          emptyText="Нет предстоящих записей"
        />
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-slate-900">
          Отзывы ({doctorReviews.length})
        </h2>
        <div className="space-y-2">
          {doctorReviews.slice(0, 2).map((r) => (
            <Card key={r.id} className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{r.patientName}</span>
                <Rating value={r.overallRating} showValue={false} />
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-slate-600">{r.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-slate-900">
          Превью расписания
        </h2>
        <Card className="p-3">
          <div className="flex flex-wrap gap-2">
            {doctor.availableSlots.slice(0, 4).map((slot) => {
              const d = new Date(slot);
              return (
                <span
                  key={slot}
                  className="rounded-lg bg-teal-50 px-2 py-1 text-[10px] text-teal-800"
                >
                  {d.toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  {d.toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              );
            })}
          </div>
        </Card>
      </section>
    </div>
  );
}
