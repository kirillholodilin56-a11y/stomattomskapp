"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Calendar, Settings, User } from "lucide-react";

const mockAppointments = [
  {
    doctor: "Иванова Е.С.",
    specialty: "Терапевт",
    date: "2026-05-20",
    time: "09:30",
    service: "Первичный приём",
  },
];

export default function ProfilePage() {
  return (
    <div className="section-stack">
      <header>
        <h1 className="page-title">Профиль</h1>
        <p className="page-subtitle">Демо-профиль пациента</p>
      </header>

      <Card className="flex items-center gap-4">
        <Avatar initials="АП" size="lg" />
        <div>
          <p className="font-semibold text-slate-900">Алексей Петров</p>
          <p className="text-sm text-slate-500">+7 (999) 123-45-67</p>
          <p className="text-sm text-slate-400">patient@demo.ru</p>
        </div>
      </Card>

      <section>
        <h2 className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
          <Calendar className="h-5 w-5 text-teal-600" />
          Мои записи (демо)
        </h2>
        {mockAppointments.map((apt, i) => (
          <Card key={i} className="mb-3">
            <p className="font-medium">{apt.doctor}</p>
            <p className="text-sm text-teal-600">{apt.specialty}</p>
            <p className="mt-1 text-sm text-slate-500">
              {apt.service} · {apt.date} · {apt.time}
            </p>
          </Card>
        ))}
      </section>

      <Card className="flex items-center gap-3 text-slate-500">
        <User className="h-5 w-5" />
        <span className="text-sm">Личные данные (MVP — без редактирования)</span>
      </Card>
      <Card className="flex items-center gap-3 text-slate-500">
        <Settings className="h-5 w-5" />
        <span className="text-sm">Настройки уведомлений (демо)</span>
      </Card>

      <Button variant="outline" href="/doctors" className="w-full">
        Записаться к врачу
      </Button>
    </div>
  );
}
