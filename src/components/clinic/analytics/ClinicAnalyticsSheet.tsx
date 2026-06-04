"use client";

import {
  clinicRevenueOverview,
  getClinicLoadDetail,
  getClinicRatingDetail,
  getDoctorWorkloadDetail,
  getMonthAppointmentsDetail,
  getMonthRatingDetail,
  getMonthRevenueDetail,
  getNoShowDetail,
  getSpecialtyAnalyticsDetail,
} from "@/data/clinicAnalytics";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Star } from "lucide-react";
import { ProgressRow, SectionTitle, StatPill } from "./AnalyticsPrimitives";

export type ClinicSheetState =
  | { type: "revenue-total" }
  | { type: "revenue-month"; month: string }
  | { type: "appointments-month"; month: string }
  | { type: "rating-month"; month: string }
  | { type: "workload-doctor"; name: string }
  | { type: "specialty"; specialty: string }
  | { type: "kpi-load" }
  | { type: "kpi-no-show" }
  | { type: "kpi-rating" }
  | null;

export function getSheetTitle(state: ClinicSheetState): string {
  if (!state) return "";
  switch (state.type) {
    case "revenue-total":
      return "Выручка · детализация";
    case "revenue-month":
      return `Выручка · ${state.month}`;
    case "appointments-month":
      return `Записи · ${state.month}`;
    case "rating-month":
      return `Отзывы · ${state.month}`;
    case "workload-doctor":
      return `Загрузка · ${state.name}`;
    case "specialty":
      return state.specialty;
    case "kpi-load":
      return "Загрузка клиники";
    case "kpi-no-show":
      return "Неявки";
    case "kpi-rating":
      return "Рейтинг клиники";
    default:
      return "Аналитика";
  }
}

export function ClinicAnalyticsSheetContent({
  state,
}: {
  state: NonNullable<ClinicSheetState>;
}) {
  switch (state.type) {
    case "revenue-total":
      return <RevenueTotalContent />;
    case "revenue-month":
      return <RevenueMonthContent month={state.month} />;
    case "appointments-month":
      return <AppointmentsMonthContent month={state.month} />;
    case "rating-month":
      return <RatingMonthContent month={state.month} />;
    case "workload-doctor":
      return <WorkloadDoctorContent name={state.name} />;
    case "specialty":
      return <SpecialtyContent specialty={state.specialty} />;
    case "kpi-load":
      return <LoadKpiContent />;
    case "kpi-no-show":
      return <NoShowKpiContent />;
    case "kpi-rating":
      return <RatingKpiContent />;
    default:
      return null;
  }
}

function RevenueTotalContent() {
  const data = clinicRevenueOverview;
  return (
    <div className="space-y-5 pb-2">
      <div className="rounded-2xl bg-gradient-to-br from-cyan-50 to-teal-50 p-4 text-center">
        <p className="text-2xl font-bold text-slate-900">
          {formatPrice(data.total)}
        </p>
        <p className="mt-1 text-xs text-slate-500">{data.period}</p>
      </div>

      <div>
        <SectionTitle>По врачам</SectionTitle>
        <div className="space-y-3">
          {data.byDoctor.map((row) => (
            <ProgressRow
              key={row.name}
              label={row.name}
              value={row.amount}
              percent={row.percent}
            />
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>По услугам</SectionTitle>
        <div className="space-y-3">
          {data.byService.map((row) => (
            <ProgressRow
              key={row.name}
              label={row.name}
              value={row.amount}
              percent={row.percent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function RevenueMonthContent({ month }: { month: string }) {
  const d = getMonthRevenueDetail(month);
  return (
    <div className="space-y-4 pb-2">
      <div className="grid grid-cols-2 gap-2">
        <StatPill label="Выручка" value={formatPrice(d.revenue)} accent />
        <StatPill label="Записей" value={String(d.appointments)} />
        <StatPill label="Средний чек" value={formatPrice(d.averageCheck)} />
        <StatPill
          label="Повторные"
          value={`${d.repeatPatientsPercent}%`}
        />
      </div>

      <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-3 text-xs">
        <p className="text-slate-500">Лучший врач</p>
        <p className="font-semibold text-slate-900">
          {d.topDoctor.name} · {formatPrice(d.topDoctor.amount)}
        </p>
        <p className="mt-2 text-slate-500">Топ услуга</p>
        <p className="font-semibold text-slate-900">
          {d.topService.name} · {formatPrice(d.topService.amount)}
        </p>
      </div>

      <div>
        <SectionTitle>Врачи</SectionTitle>
        <div className="space-y-2.5">
          {d.doctorsContribution.map((r) => (
            <ProgressRow
              key={r.name}
              label={r.name}
              value={r.amount}
              percent={r.percent}
            />
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>Услуги</SectionTitle>
        <div className="space-y-2.5">
          {d.servicesContribution.map((r) => (
            <ProgressRow
              key={r.name}
              label={r.name}
              value={r.amount}
              percent={r.percent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AppointmentsMonthContent({ month }: { month: string }) {
  const d = getMonthAppointmentsDetail(month);
  return (
    <div className="space-y-4 pb-2">
      <p className="text-xs text-slate-500">{d.monthFull}</p>
      <div className="grid grid-cols-2 gap-2">
        <StatPill label="Всего записей" value={String(d.total)} accent />
        <StatPill label="Завершено" value={String(d.completed)} />
        <StatPill label="Отмены" value={String(d.cancelled)} />
        <StatPill label="Неявки" value={`${d.noShowRate}%`} />
      </div>

      <div className="rounded-2xl border border-slate-100 p-3 text-xs">
        <p>
          <span className="text-slate-500">Самый загруженный день: </span>
          <span className="font-semibold">{d.busiestDay}</span>
        </p>
        <p className="mt-1">
          <span className="text-slate-500">Самый загруженный врач: </span>
          <span className="font-semibold">{d.busiestDoctor}</span>
        </p>
      </div>

      <div>
        <SectionTitle>По врачам</SectionTitle>
        <div className="space-y-2">
          {d.byDoctor.map((r) => (
            <div
              key={r.name}
              className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs"
            >
              <span className="font-medium text-slate-800">{r.name}</span>
              <span className="font-semibold text-teal-700">{r.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RatingMonthContent({ month }: { month: string }) {
  const d = getMonthRatingDetail(month);
  return (
    <div className="space-y-4 pb-2">
      <div className="flex items-center gap-3 rounded-2xl bg-amber-50 p-4">
        <span className="text-3xl font-bold text-slate-900">
          {d.averageRating.toFixed(1)}
        </span>
        <div>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i <= Math.round(d.averageRating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-200"
                }`}
              />
            ))}
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {d.reviewCount} отзывов · {d.monthFull}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {d.reviews.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {r.patientName}
                </p>
                <p className="text-[10px] text-slate-500">
                  {r.clinicName} · {r.doctorName}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {r.verified && (
                  <Badge variant="success" className="text-[9px]">
                    ✓
                  </Badge>
                )}
                <span className="text-xs font-bold text-amber-500">
                  {"★".repeat(r.rating)}
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              «{r.text}»
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkloadDoctorContent({ name }: { name: string }) {
  const d = getDoctorWorkloadDetail(name);
  return (
    <div className="space-y-4 pb-2">
      <div className="grid grid-cols-2 gap-2">
        <StatPill label="Загрузка" value={`${d.utilization}%`} accent />
        <StatPill label="Пациентов" value={String(d.patientsMonth)} />
        <StatPill label="Пик часов" value={d.busiestHour} />
        <StatPill
          label="Слоты"
          value={`${d.occupiedSlots} занято / ${d.freeSlots} св.`}
        />
      </div>

      <div>
        <SectionTitle>Расписание (превью)</SectionTitle>
        <div className="space-y-1.5">
          {d.schedule.map((slot) => (
            <div
              key={slot.time}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs ${
                slot.status === "busy"
                  ? "bg-emerald-50 text-emerald-900"
                  : "border border-dashed border-slate-200 bg-white text-slate-500"
              }`}
            >
              <span className="font-bold tabular-nums">{slot.time}</span>
              <span>
                {slot.status === "busy"
                  ? slot.patient
                  : "Свободно"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpecialtyContent({ specialty }: { specialty: string }) {
  const d = getSpecialtyAnalyticsDetail(specialty);
  return (
    <div className="space-y-4 pb-2">
      <div className="grid grid-cols-2 gap-2">
        <StatPill label="Записей" value={String(d.appointments)} accent />
        <StatPill label="Рост" value={`+${d.growthPercent}%`} />
        <StatPill label="Новые" value={String(d.newPatients)} />
        <StatPill label="Повторные" value={String(d.repeatPatients)} />
      </div>
      <StatPill label="Выручка" value={formatPrice(d.revenue)} accent />
      <p className="text-xs text-slate-500">
        Ведущий врач: <span className="font-semibold text-slate-800">{d.topDoctor}</span>
      </p>
    </div>
  );
}

function LoadKpiContent() {
  const d = getClinicLoadDetail();
  return (
    <div className="space-y-4 pb-2">
      <StatPill label="Загрузка кресел" value={`${d.utilization}%`} accent />
      <div className="grid grid-cols-2 gap-2">
        <StatPill label="Кресла" value={`${d.chairsActive}/${d.chairsTotal}`} />
        <StatPill label="Ожидание" value={`${d.avgWaitMin} мин`} />
      </div>
      <p className="text-xs text-slate-500">
        Пиковые дни: {d.peakDays.join(", ")}
      </p>
    </div>
  );
}

function NoShowKpiContent() {
  const d = getNoShowDetail();
  return (
    <div className="space-y-4 pb-2">
      <StatPill label="Неявки" value={`${d.rate}%`} accent />
      <p className="text-xs text-slate-600">
        Всего неявок: <strong>{d.totalNoShows}</strong> · Чаще: {d.topReason}
      </p>
      <SectionTitle>По врачам</SectionTitle>
      <div className="space-y-2">
        {d.byDoctor.map((r) => (
          <ProgressRow
            key={r.name}
            label={r.name}
            value={r.rate}
            percent={Math.round(r.rate * 10)}
            format="count"
          />
        ))}
      </div>
    </div>
  );
}

function RatingKpiContent() {
  const d = getClinicRatingDetail();
  return (
    <div className="space-y-4 pb-2">
      <StatPill label="Средний рейтинг" value={`${d.average} / 5`} accent />
      <p className="text-xs text-slate-500">{d.totalReviews} отзывов всего</p>
      <SectionTitle>Распределение</SectionTitle>
      <div className="space-y-2">
        {d.distribution.map((row) => (
          <ProgressRow
            key={row.stars}
            label={`${row.stars} ★`}
            value={row.percent}
            percent={row.percent}
            format="count"
          />
        ))}
      </div>
    </div>
  );
}
