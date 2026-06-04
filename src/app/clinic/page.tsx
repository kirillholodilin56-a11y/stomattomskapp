"use client";

import {
  AppointmentsChart,
  RatingChart,
  RevenueChart,
  SpecialtyChart,
  WorkloadChart,
} from "@/components/clinic/ClinicCharts";
import {
  ClinicAnalyticsSheetContent,
  getSheetTitle,
  type ClinicSheetState,
} from "@/components/clinic/analytics/ClinicAnalyticsSheet";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/Card";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { doctors, topServices } from "@/data/mock";
import { formatPrice } from "@/lib/utils";
import { Calendar, ChevronRight, Percent, Star, Wallet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ClinicDashboardPage() {
  const [sheet, setSheet] = useState<ClinicSheetState>(null);

  return (
    <div className="section-stack relative">
      <header>
        <h1 className="page-title">Аналитика</h1>
        <p className="page-subtitle">Smile Clinic Томск · демо · MVP</p>
      </header>

      <div className="kpi-grid">
        <StatCard
          compact
          label="Загрузка"
          value="87%"
          icon={<Calendar className="h-3.5 w-3.5" />}
          onClick={() => setSheet({ type: "kpi-load" })}
        />
        <StatCard
          compact
          label="Выручка"
          value={formatPrice(294000)}
          icon={<Wallet className="h-3.5 w-3.5" />}
          onClick={() => setSheet({ type: "revenue-total" })}
        />
        <StatCard
          compact
          label="Неявки"
          value="9.2%"
          icon={<Percent className="h-3.5 w-3.5" />}
          onClick={() => setSheet({ type: "kpi-no-show" })}
        />
        <StatCard
          compact
          label="Рейтинг"
          value="4.6"
          suffix="/ 5"
          icon={<Star className="h-3.5 w-3.5" />}
          onClick={() => setSheet({ type: "kpi-rating" })}
        />
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-800">Динамика</h2>
        <AppointmentsChart
          onMonthClick={(month) =>
            setSheet({ type: "appointments-month", month })
          }
        />
        <RevenueChart
          onMonthClick={(month) =>
            setSheet({ type: "revenue-month", month })
          }
        />
        <RatingChart
          onMonthClick={(month) =>
            setSheet({ type: "rating-month", month })
          }
        />
        <WorkloadChart
          onDoctorClick={(name) =>
            setSheet({ type: "workload-doctor", name })
          }
        />
        <SpecialtyChart
          onSpecialtyClick={(specialty) =>
            setSheet({ type: "specialty", specialty })
          }
        />
      </section>

      <Card className="p-3">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">
          Рейтинг врачей
        </h3>
        <ul className="space-y-2">
          {doctors.slice(0, 6).map((d, i) => (
            <li key={d.id}>
              <Link
                href={`/clinic/doctors/${d.id}`}
                className="flex items-center justify-between rounded-xl px-2 py-2.5 text-xs transition-colors active:bg-teal-50"
              >
                <span className="truncate pr-2 font-medium text-slate-800">
                  {i + 1}. {d.name}
                </span>
                <span className="flex shrink-0 items-center gap-1 font-semibold text-teal-700">
                  ★ {d.rating}
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-3">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Топ услуг</h3>
        <div className="space-y-2.5">
          {topServices.map((s) => (
            <div key={s.name} className="flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-teal-500"
                  style={{ width: `${(s.count / 52) * 100}%` }}
                />
              </div>
              <span className="w-20 shrink-0 truncate text-[11px] text-slate-600">
                {s.name}
              </span>
              <span className="w-6 shrink-0 text-right text-[11px] font-medium">
                {s.count}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <BottomSheet
        open={!!sheet}
        onClose={() => setSheet(null)}
        title={getSheetTitle(sheet)}
      >
        {sheet && <ClinicAnalyticsSheetContent state={sheet} />}
      </BottomSheet>
    </div>
  );
}
