"use client";

import {
  appointmentsByMonth,
  appointmentsBySpecialty,
  doctorWorkload,
  ratingDynamics,
} from "@/data/mock";
import { Card } from "@/components/ui/Card";
import { ChevronRight } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartHeight = "h-48";

type MonthPayload = { month: string };
type SpecialtyPayload = { specialty: string };
type WorkloadPayload = { name: string };

function getBarPayload<T>(entry: unknown): T | undefined {
  const item = entry as { payload?: T };
  return item.payload;
}

function ChartHint() {
  return (
    <p className="mb-2 flex items-center gap-1 text-[10px] text-slate-400">
      Нажмите на элемент для деталей
      <ChevronRight className="h-3 w-3" />
    </p>
  );
}

export function AppointmentsChart({
  onMonthClick,
}: {
  onMonthClick?: (month: string) => void;
}) {
  return (
    <Card className="p-3">
      <h3 className="mb-1 text-sm font-semibold text-slate-900">
        Записи по месяцам
      </h3>
      <ChartHint />
      <div className={chartHeight}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={appointmentsByMonth} margin={{ left: -20, right: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} width={28} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 12 }} />
            <Bar
              dataKey="count"
              fill="#0d9488"
              radius={[4, 4, 0, 0]}
              cursor="pointer"
              onClick={(entry) => {
                const payload = getBarPayload<MonthPayload>(entry);
                if (payload?.month) onMonthClick?.(payload.month);
              }}
            >
              {appointmentsByMonth.map((_, i) => (
                <Cell key={i} className="transition-opacity hover:opacity-80" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function RevenueChart({
  onMonthClick,
}: {
  onMonthClick?: (month: string) => void;
}) {
  return (
    <Card className="p-3">
      <h3 className="mb-1 text-sm font-semibold text-slate-900">
        Выручка по месяцам
      </h3>
      <ChartHint />
      <div className={chartHeight}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={appointmentsByMonth} margin={{ left: -20, right: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis
              tick={{ fontSize: 10 }}
              width={28}
              tickFormatter={(v) => `${Number(v) / 1000}к`}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 12 }}
              formatter={(v) => [
                `${Number(v).toLocaleString("ru-RU")} ₽`,
                "Выручка",
              ]}
            />
            <Bar
              dataKey="revenue"
              fill="#0891b2"
              radius={[4, 4, 0, 0]}
              cursor="pointer"
              onClick={(entry) => {
                const payload = getBarPayload<MonthPayload>(entry);
                if (payload?.month) onMonthClick?.(payload.month);
              }}
            >
              {appointmentsByMonth.map((_, i) => (
                <Cell key={i} className="transition-opacity hover:opacity-80" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function RatingChart({
  onMonthClick,
}: {
  onMonthClick?: (month: string) => void;
}) {
  return (
    <Card className="p-3">
      <h3 className="mb-1 text-sm font-semibold text-slate-900">
        Динамика рейтинга
      </h3>
      <ChartHint />
      <div className={chartHeight}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ratingDynamics} margin={{ left: -20, right: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis domain={[4, 5]} tick={{ fontSize: 10 }} width={28} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 12 }} />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="#0d9488"
              strokeWidth={2}
              dot={({ cx, cy, payload }) => (
                <circle
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill="#0d9488"
                  stroke="#fff"
                  strokeWidth={2}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    onMonthClick?.((payload as MonthPayload).month)
                  }
                />
              )}
              activeDot={{
                r: 7,
                cursor: "pointer",
                onClick: (_e, dotProps) => {
                  const p = dotProps as unknown as { payload?: MonthPayload };
                  if (p.payload?.month) onMonthClick?.(p.payload.month);
                },
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function WorkloadChart({
  onDoctorClick,
}: {
  onDoctorClick?: (name: string) => void;
}) {
  return (
    <Card className="p-3">
      <h3 className="mb-1 text-sm font-semibold text-slate-900">
        Загрузка врачей, %
      </h3>
      <ChartHint />
      <div className={chartHeight}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={doctorWorkload}
            layout="vertical"
            margin={{ left: 4, right: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fontSize: 10 }}
              width={52}
            />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 12 }} />
            <Bar
              dataKey="utilization"
              fill="#14b8a6"
              radius={[0, 4, 4, 0]}
              cursor="pointer"
              onClick={(entry) => {
                const payload = getBarPayload<WorkloadPayload>(entry);
                if (payload?.name) onDoctorClick?.(payload.name);
              }}
            >
              {doctorWorkload.map((_, i) => (
                <Cell key={i} className="transition-opacity hover:opacity-80" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function SpecialtyChart({
  onSpecialtyClick,
}: {
  onSpecialtyClick?: (specialty: string) => void;
}) {
  return (
    <Card className="p-3">
      <h3 className="mb-1 text-sm font-semibold text-slate-900">
        По специальности
      </h3>
      <ChartHint />
      <div className={chartHeight}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={appointmentsBySpecialty}
            margin={{ left: -20, right: 4, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="specialty"
              tick={{ fontSize: 9 }}
              angle={-35}
              textAnchor="end"
              height={48}
            />
            <YAxis tick={{ fontSize: 10 }} width={28} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 12 }} />
            <Bar
              dataKey="count"
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
              cursor="pointer"
              onClick={(entry) => {
                const payload = getBarPayload<SpecialtyPayload>(entry);
                if (payload?.specialty)
                  onSpecialtyClick?.(payload.specialty);
              }}
            >
              {appointmentsBySpecialty.map((_, i) => (
                <Cell key={i} className="transition-opacity hover:opacity-80" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
