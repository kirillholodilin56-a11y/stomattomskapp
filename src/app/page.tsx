"use client";

import { Button } from "@/components/ui/Button";
import { useRole } from "@/context/RoleContext";
import { motion } from "framer-motion";
import { BarChart3, Calendar, Clock, Shield, Star, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const features = [
  {
    icon: Calendar,
    title: "Запись за 30 секунд",
    text: "Smile Clinic, Мастер Дент, Эликсир и другие",
  },
  {
    icon: Star,
    title: "Отзывы пациентов",
    text: "Реальные клиники Томска — демо-данные",
  },
  {
    icon: BarChart3,
    title: "Личный кабинет",
    text: "Расписание и аналитика для врачей",
  },
];

export default function HomePage() {
  const { role } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (role === "doctor") router.replace("/doctor");
    if (role === "clinic") router.replace("/clinic");
  }, [role, router]);

  if (role !== "patient") {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-slate-500">
        Загрузка...
      </div>
    );
  }

  return (
    <div className="section-stack pb-2">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-700 px-4 py-8 text-white">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10" />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <span className="mb-3 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-medium">
            MVP · демо
          </span>
          <h1 className="text-2xl font-bold leading-tight">
            Запись к стоматологу без звонков
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-teal-50">
            Запись к стоматологу в Smile Clinic, Мастер Дент, Эликсир и другие
            клиники города — за 30 секунд.
          </p>
          <div className="mt-6">
            <Button
              href="/doctors"
              variant="secondary"
              size="lg"
              className="w-full !bg-white !text-teal-700"
            >
              Запись к врачу
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="space-y-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.06 }}
            className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <f.icon className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-0.5 text-xs text-slate-500">{f.text}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-4">
        <div className="space-y-2.5 text-xs text-slate-600">
          <span className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 shrink-0 text-teal-600" />
            5 клиник Томска в демо
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 shrink-0 text-teal-600" />
            Имплантация, брекеты, гигиена
          </span>
          <span className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 shrink-0 text-teal-600" />
            MVP · демо-данные
          </span>
        </div>
      </section>
    </div>
  );
}
