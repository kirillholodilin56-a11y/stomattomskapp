"use client";

import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { FileSpreadsheet, Plug } from "lucide-react";

const options = [
  {
    icon: Plug,
    title: "API-интеграция",
    description:
      "Если у клиники уже есть CRM с расписанием, платформа синхронизирует свободные слоты и записи в реальном времени.",
    note: "В MVP не подключено — демонстрация возможности",
  },
  {
    icon: FileSpreadsheet,
    title: "Ручное управление",
    description:
      "Для небольших клиник администратор может загрузить расписание через Excel или заполнить его вручную.",
    note: "Пример сценария для пилотных клиник",
  },
];

export default function IntegrationPage() {
  return (
    <motion.div className="section-stack">
      <header>
        <h1 className="page-title">Интеграция</h1>
        <p className="page-subtitle">Два варианта · MVP</p>
      </header>

      <div className="space-y-3">
        {options.map((opt, i) => (
          <motion.div
            key={opt.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <opt.icon className="h-6 w-6" />
              </span>
              <h2 className="text-lg font-semibold text-slate-900">
                {opt.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{opt.description}</p>
              <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                {opt.note}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-slate-50">
        <p className="text-sm text-slate-600">
          Реальные интеграции с МИС и CRM в этом прототипе не активны. Все
          данные — демо для презентации продукта инвесторам и клиникам.
        </p>
      </Card>
    </motion.div>
  );
}
