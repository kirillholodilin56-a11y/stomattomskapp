"use client";

import { useState } from "react";
import { AppointmentList } from "@/components/doctor/AppointmentList";
import { PatientSheetContent } from "@/components/doctor/PatientSheetContent";
import { DoctorDailySchedule } from "@/components/doctor/DoctorDailySchedule";
import { StatCard } from "@/components/ui/Card";
import { BottomSheet } from "@/components/ui/BottomSheet";
import {
  appointments,
  doctorStats,
  getPatientByName,
} from "@/data/mock";
import type { PatientRecord } from "@/types";
import { Calendar, Star, TrendingUp, UserMinus, Users } from "lucide-react";

const today = "2026-05-18";
const DEMO_DOCTOR_ID = "doc-1";

export default function DoctorDashboardPage() {
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(
    null
  );

  const doctorAppointments = appointments.filter(
    (a) => a.doctorId === DEMO_DOCTOR_ID
  );
  const todayAppointments = doctorAppointments.filter((a) => a.date === today);
  const upcomingAppointments = doctorAppointments.filter(
    (a) => a.date > today
  );
  const handlePatientClick = (name: string) => {
    const record = getPatientByName(name);
    if (record) setSelectedPatient(record);
  };

  return (
    <div className="section-stack relative">
      <header>
        <h1 className="page-title">Личный кабинет</h1>
        <p className="page-subtitle">Кравцова А.М. · Smile Clinic · демо</p>
      </header>

      <div className="kpi-grid">
        <StatCard
          compact
          label="Пациентов"
          value={doctorStats.monthlyPatients}
          icon={<Users className="h-3.5 w-3.5" />}
        />
        <StatCard
          compact
          label="Неявки"
          value={`${doctorStats.noShowRate}%`}
          icon={<UserMinus className="h-3.5 w-3.5" />}
        />
        <StatCard
          compact
          label="Конверсия"
          value={`${doctorStats.conversionRate}%`}
          icon={<TrendingUp className="h-3.5 w-3.5" />}
        />
        <StatCard
          compact
          label="Рейтинг"
          value={doctorStats.averageRating}
          suffix="/ 5"
          icon={<Star className="h-3.5 w-3.5" />}
        />
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-900">
          Лента пациентов
        </h2>
        <div className="space-y-4">
          <AppointmentList
            title="Сегодня"
            appointments={todayAppointments}
            onPatientClick={handlePatientClick}
          />
          <AppointmentList
            title="Предстоящие"
            appointments={upcomingAppointments}
            onPatientClick={handlePatientClick}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Calendar className="h-4 w-4 text-teal-600" />
          Моё расписание
        </h2>
        <DoctorDailySchedule
          doctorId={DEMO_DOCTOR_ID}
          onPatientClick={handlePatientClick}
        />
      </section>

      <BottomSheet
        open={!!selectedPatient}
        onClose={() => setSelectedPatient(null)}
        title={selectedPatient?.fullName ?? ""}
      >
        {selectedPatient && (
          <PatientSheetContent patient={selectedPatient} />
        )}
      </BottomSheet>
    </div>
  );
}
