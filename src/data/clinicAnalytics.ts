import {
  appointmentsByMonth,
  doctors,
  publicReviews,
  ratingDynamics,
} from "@/data/mock";
import { getPublicReviewWithMeta } from "@/data/mock";

export const clinicRevenueOverview = {
  total: 294000,
  period: "Май 2026 · Smile Clinic",
  byDoctor: [
    { name: "Кравцова А.М.", amount: 245000, percent: 28 },
    { name: "Громов И.А.", amount: 198000, percent: 23 },
    { name: "Белов Д.С.", amount: 173000, percent: 20 },
    { name: "Орлова Е.В.", amount: 156000, percent: 18 },
    { name: "Никитин П.О.", amount: 89000, percent: 11 },
  ],
  byService: [
    { name: "Имплантация", amount: 320000, percent: 37 },
    { name: "Лечение кариеса", amount: 180000, percent: 21 },
    { name: "Отбеливание", amount: 95000, percent: 11 },
    { name: "Гигиена", amount: 70000, percent: 8 },
    { name: "Брекеты", amount: 185000, percent: 23 },
  ],
};

const monthMeta: Record<string, { full: string; index: number }> = {
  Янв: { full: "Январь 2026", index: 0 },
  Фев: { full: "Февраль 2026", index: 1 },
  Мар: { full: "Март 2026", index: 2 },
  Апр: { full: "Апрель 2026", index: 3 },
  Май: { full: "Май 2026", index: 4 },
  Июн: { full: "Июнь 2026", index: 5 },
};

const doctorNames = [
  "Кравцова А.М.",
  "Белов Д.С.",
  "Орлова Е.В.",
  "Громов И.А.",
  "Соколова М.П.",
  "Никитин П.О.",
];

const serviceNames = [
  "Имплантация",
  "Лечение кариеса",
  "Отбеливание",
  "Профессиональная гигиена",
  "Брекеты",
  "Консультация",
];

const utilizationMap: Record<string, number> = {
  Кравцова: 94,
  Белов: 88,
  Орлова: 82,
  Громов: 76,
  Соколова: 91,
  Никитин: 85,
};

const specialtyCounts: Record<string, number> = {
  Терапия: 52,
  Гигиена: 38,
  Хирургия: 24,
  Ортодонтия: 18,
  Имплантация: 12,
  Детская: 22,
};

function seeded(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function getMonthRevenueDetail(month: string) {
  const base = appointmentsByMonth.find((m) => m.month === month);
  const meta = monthMeta[month] ?? { full: month, index: 0 };
  const revenue = base?.revenue ?? 400000;
  const count = base?.count ?? 100;
  const idx = meta.index;

  const doctorsContribution = doctorNames.slice(0, 4).map((name, i) => {
    const amount = Math.round(
      revenue * (0.35 - i * 0.06) * (0.9 + seeded(idx + i) * 0.2)
    );
    return {
      name,
      amount,
      percent: Math.round((amount / revenue) * 100),
    };
  });

  const servicesContribution = serviceNames.slice(0, 4).map((name, i) => {
    const amount = Math.round(
      revenue * (0.3 - i * 0.05) * (0.85 + seeded(idx + i + 10) * 0.25)
    );
    return {
      name,
      amount,
      percent: Math.round((amount / revenue) * 100),
    };
  });

  return {
    month,
    monthFull: meta.full,
    revenue,
    appointments: count,
    topDoctor: doctorsContribution[0],
    topService: servicesContribution[0],
    averageCheck: Math.round(revenue / count),
    repeatPatientsPercent: Math.round(58 + seeded(idx + 20) * 18),
    doctorsContribution,
    servicesContribution,
  };
}

export function getMonthAppointmentsDetail(month: string) {
  const base = appointmentsByMonth.find((m) => m.month === month);
  const meta = monthMeta[month] ?? { full: month, index: 0 };
  const count = base?.count ?? 100;
  const idx = meta.index;

  return {
    month,
    monthFull: meta.full,
    total: count,
    completed: Math.round(count * (0.88 + seeded(idx) * 0.05)),
    cancelled: Math.round(count * (0.06 + seeded(idx + 1) * 0.02)),
    noShowRate: Math.round((7 + seeded(idx + 2) * 4) * 10) / 10,
    busiestDay: ["Вторник", "Среда", "Четверг", "Пятница"][idx % 4],
    busiestDoctor: doctorNames[idx % doctorNames.length],
    byDoctor: doctorNames.slice(0, 5).map((name, i) => ({
      name,
      count: Math.round(
        count * (0.28 - i * 0.04) * (0.9 + seeded(idx + i) * 0.2)
      ),
    })),
  };
}

export function getMonthRatingDetail(month: string) {
  const base = ratingDynamics.find((m) => m.month === month);
  const meta = monthMeta[month] ?? { full: month, index: 0 };

  const reviews = publicReviews
    .slice(meta.index * 2, meta.index * 2 + 4)
    .map((r) => {
      const { clinic, doctor } = getPublicReviewWithMeta(r);
      return {
        id: r.id,
        patientName: r.patientName,
        rating: r.rating,
        text: r.text,
        verified: r.verified,
        clinicName: clinic?.name.replace(" Томск", "") ?? "Smile Clinic",
        doctorName:
          doctor?.name.split(" ").slice(0, 2).join(" ") ?? "Врач",
      };
    });

  const fallback = [
    {
      id: "demo-1",
      patientName: "Елена Морозова",
      rating: 5,
      text: "Очень внимательный врач, всё объяснили по этапам лечения.",
      verified: true,
      clinicName: "Smile Clinic",
      doctorName: "Кравцова А.",
    },
    {
      id: "demo-2",
      patientName: "Павел Иванов",
      rating: 5,
      text: "Удобная запись через приложение, без звонков в регистратуру.",
      verified: true,
      clinicName: "Smile Clinic",
      doctorName: "Белов Д.",
    },
  ];

  return {
    month,
    monthFull: meta.full,
    averageRating: base?.rating ?? 4.7,
    reviewCount: reviews.length > 0 ? reviews.length + 10 : 12,
    reviews: reviews.length > 0 ? reviews : fallback,
  };
}

export function getDoctorWorkloadDetail(shortName: string) {
  const doctor = doctors.find((d) => d.name.startsWith(shortName));
  const util = utilizationMap[shortName] ?? 85;

  const hours = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];
  const schedule = hours.map((time, i) => ({
    time,
    status: (i % 3 === 1 ? "free" : "busy") as "free" | "busy",
    patient: i % 3 === 1 ? undefined : ["Соколова И.", "Белов П.", "Кузнецова Л."][i % 3],
  }));

  return {
    name: doctor?.name ?? shortName,
    utilization: util,
    patientsMonth: Math.round(38 + util * 0.4),
    busiestHour: "11:00–13:00",
    freeSlots: schedule.filter((s) => s.status === "free").length,
    occupiedSlots: schedule.filter((s) => s.status === "busy").length,
    schedule,
  };
}

export function getSpecialtyAnalyticsDetail(specialty: string) {
  const base = appointmentsByMonth[4];
  const aptCount = specialtyCounts[specialty] ?? 20;

  return {
    specialty,
    appointments: aptCount,
    newPatients: Math.round(aptCount * 0.42),
    repeatPatients: Math.round(aptCount * 0.58),
    revenue: Math.round((base?.revenue ?? 600000) * (aptCount / 166)),
    growthPercent: Math.round(8 + seeded(specialty.length) * 12),
    topDoctor: doctorNames[specialty.length % doctorNames.length],
  };
}

export function getClinicLoadDetail() {
  return {
    utilization: 87,
    peakDays: ["Вт", "Ср", "Чт"],
    chairsActive: 4,
    chairsTotal: 5,
    avgWaitMin: 12,
  };
}

export function getNoShowDetail() {
  return {
    rate: 9.2,
    totalNoShows: 14,
    topReason: "Забыли о записи",
    byDoctor: doctorNames.slice(0, 4).map((name, i) => ({
      name,
      rate: Math.round((6 + i * 1.5) * 10) / 10,
    })),
  };
}

export function getClinicRatingDetail() {
  return {
    average: 4.6,
    totalReviews: 214,
    distribution: [
      { stars: 5, percent: 72 },
      { stars: 4, percent: 20 },
      { stars: 3, percent: 6 },
      { stars: 2, percent: 2 },
    ],
  };
}
