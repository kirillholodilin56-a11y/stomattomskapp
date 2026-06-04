import type {
  Appointment,
  Clinic,
  ClinicService,
  Doctor,
  DoctorStats,
  PatientRecord,
  PublicReview,
  Review,
  ScheduleSlot,
  ScheduleWeekDay,
  Specialty,
} from "@/types";

export const specialties: Specialty[] = [
  "Терапия",
  "Хирургия",
  "Ортодонтия",
  "Имплантация",
  "Гигиена",
  "Детская стоматология",
];

export const clinics: Clinic[] = [
  {
    id: "clinic-smile",
    name: "Smile Clinic Томск",
    address: "пр. Ленина, 10, Томск",
    averageRating: 4.9,
  },
  {
    id: "clinic-master",
    name: "Мастер Дент",
    address: "ул. Гоголева, 55, Томск",
    averageRating: 4.7,
  },
  {
    id: "clinic-elixir",
    name: "Эликсир",
    address: "пр. Мира, 102, Томск",
    averageRating: 4.8,
  },
  {
    id: "clinic-dental",
    name: "Dental Studio",
    address: "ул. Алтайская, 24, Томск",
    averageRating: 4.6,
  },
  {
    id: "clinic-medstar",
    name: "Медстар",
    address: "ул. Иркутский тракт, 126, Томск",
    averageRating: 4.5,
  },
];

const slotDates = [
  "2026-05-19T09:00",
  "2026-05-19T11:30",
  "2026-05-19T14:00",
  "2026-05-20T10:00",
  "2026-05-20T15:30",
  "2026-05-21T09:30",
  "2026-05-21T12:00",
  "2026-05-22T16:00",
];

export const doctors: Doctor[] = [
  {
    id: "doc-1",
    name: "Кравцова Анна Михайловна",
    specialty: "Терапия",
    clinicId: "clinic-smile",
    rating: 4.9,
    reviewCount: 214,
    experience: 11,
    avatar: "КА",
    bio: "Стоматолог-терапевт. Лечение кариеса, эстетические пломбы, безболезненная анестезия.",
    nearestSlot: "2026-05-19T09:00",
    priceFrom: 3200,
    services: [
      { id: "s1", name: "Лечение кариеса", price: 4500, duration: 60 },
      { id: "s2", name: "Консультация терапевта", price: 1200, duration: 30 },
    ],
    availableSlots: slotDates,
  },
  {
    id: "doc-2",
    name: "Белов Дмитрий Сергеевич",
    specialty: "Гигиена",
    clinicId: "clinic-master",
    rating: 4.8,
    reviewCount: 156,
    experience: 7,
    avatar: "БД",
    bio: "Врач-гигиенист. Профессиональная чистка, Air Flow, отбеливание.",
    nearestSlot: "2026-05-19T11:30",
    priceFrom: 4200,
    services: [
      { id: "s3", name: "Профессиональная гигиена", price: 5500, duration: 60 },
      { id: "s4", name: "Отбеливание", price: 18000, duration: 90 },
    ],
    availableSlots: slotDates.slice(1),
  },
  {
    id: "doc-3",
    name: "Орлова Екатерина Владимировна",
    specialty: "Ортодонтия",
    clinicId: "clinic-elixir",
    rating: 4.9,
    reviewCount: 98,
    experience: 9,
    avatar: "ОЕ",
    bio: "Ортодонт. Брекеты, элайнеры, исправление прикуса у взрослых и детей.",
    nearestSlot: "2026-05-19T14:00",
    priceFrom: 2500,
    services: [
      { id: "s5", name: "Брекеты", price: 85000, duration: 60 },
      { id: "s6", name: "Консультация ортодонта", price: 2500, duration: 40 },
    ],
    availableSlots: slotDates.slice(2),
  },
  {
    id: "doc-4",
    name: "Громов Игорь Алексеевич",
    specialty: "Имплантация",
    clinicId: "clinic-dental",
    rating: 4.7,
    reviewCount: 87,
    experience: 14,
    avatar: "ГИ",
    bio: "Хирург-имплантолог. Имплантация, костная пластика, All-on-4.",
    nearestSlot: "2026-05-20T10:00",
    priceFrom: 35000,
    services: [
      { id: "s7", name: "Имплантация", price: 45000, duration: 90 },
      { id: "s8", name: "Консультация имплантолога", price: 2000, duration: 30 },
    ],
    availableSlots: slotDates.slice(3),
  },
  {
    id: "doc-5",
    name: "Соколова Мария Петровна",
    specialty: "Детская стоматология",
    clinicId: "clinic-medstar",
    rating: 4.9,
    reviewCount: 132,
    experience: 10,
    avatar: "СМ",
    bio: "Детский стоматолог. Лечение без страха, адаптация, герметизация фиссур.",
    nearestSlot: "2026-05-20T15:30",
    priceFrom: 2800,
    services: [
      { id: "s9", name: "Детская стоматология", price: 3500, duration: 45 },
      { id: "s10", name: "Лечение кариеса (дети)", price: 4200, duration: 50 },
    ],
    availableSlots: slotDates.slice(4),
  },
  {
    id: "doc-6",
    name: "Никитин Павел Олегович",
    specialty: "Хирургия",
    clinicId: "clinic-smile",
    rating: 4.8,
    reviewCount: 76,
    experience: 12,
    avatar: "НП",
    bio: "Стоматолог-хирург. Удаление зубов любой сложности, wisdom teeth.",
    nearestSlot: "2026-05-21T09:30",
    priceFrom: 3500,
    services: [
      { id: "s11", name: "Удаление зуба", price: 5500, duration: 45 },
      { id: "s12", name: "Удаление зуба мудрости", price: 8500, duration: 60 },
    ],
    availableSlots: slotDates.slice(5),
  },
  {
    id: "doc-7",
    name: "Волкова Ольга Игоревна",
    specialty: "Терапия",
    clinicId: "clinic-master",
    rating: 4.6,
    reviewCount: 64,
    experience: 6,
    avatar: "ВО",
    bio: "Терапевт-стоматолог. Реставрации, лечение пульпита, микроскоп.",
    nearestSlot: "2026-05-21T12:00",
    priceFrom: 3800,
    services: [
      { id: "s13", name: "Лечение кариеса", price: 5200, duration: 60 },
      { id: "s14", name: "Лечение пульпита", price: 9800, duration: 90 },
    ],
    availableSlots: slotDates.slice(6),
  },
  {
    id: "doc-8",
    name: "Лебедев Артём Дмитриевич",
    specialty: "Гигиена",
    clinicId: "clinic-elixir",
    rating: 4.7,
    reviewCount: 91,
    experience: 5,
    avatar: "ЛА",
    bio: "Гигиенист. Комплексная профилактика, обучение домашнему уходу.",
    nearestSlot: "2026-05-22T16:00",
    priceFrom: 4800,
    services: [
      { id: "s15", name: "Профессиональная гигиена", price: 6200, duration: 60 },
    ],
    availableSlots: slotDates,
  },
];

export const reviews: Review[] = [
  {
    id: "rev-1",
    doctorId: "doc-1",
    patientName: "Елена Р.",
    date: "2026-05-12",
    overallRating: 5,
    treatmentQuality: 5,
    attitude: 5,
    cleanliness: 5,
    valueForMoney: 4,
    text: "Очень аккуратное лечение, врач всё подробно объяснила. Smile Clinic — приятная атмосфера.",
    doctorReply: "Елена, спасибо! Рада, что визит прошёл комфортно.",
  },
  {
    id: "rev-2",
    doctorId: "doc-1",
    patientName: "Артём К.",
    date: "2026-05-06",
    overallRating: 5,
    treatmentQuality: 5,
    attitude: 5,
    cleanliness: 5,
    valueForMoney: 5,
    text: "Лечил кариес за один визит. Запись через приложение — 30 секунд, как обещали.",
  },
  {
    id: "rev-3",
    doctorId: "doc-2",
    patientName: "Ирина М.",
    date: "2026-05-09",
    overallRating: 5,
    treatmentQuality: 5,
    attitude: 4,
    cleanliness: 5,
    valueForMoney: 4,
    text: "Профгигиена в Мастер Дент на высоте. Зубы гладкие, дёсны не кровят.",
    doctorReply: "Ирина, ждём вас через 6 месяцев на поддерживающую гигиену!",
  },
  {
    id: "rev-4",
    doctorId: "doc-6",
    patientName: "Максим В.",
    date: "2026-05-03",
    overallRating: 5,
    treatmentQuality: 5,
    attitude: 5,
    cleanliness: 5,
    valueForMoney: 4,
    text: "Удаляли восьмёрку — быстро и без боли. Рекомендую хирурга в Smile Clinic.",
  },
  {
    id: "rev-5",
    doctorId: "doc-5",
    patientName: "Алина С.",
    date: "2026-04-28",
    overallRating: 5,
    treatmentQuality: 5,
    attitude: 5,
    cleanliness: 5,
    valueForMoney: 5,
    text: "Дочка (5 лет) перестала бояться стоматолога. Медстар — лучшие для детей в Томске.",
  },
];

export const publicReviews: PublicReview[] = [
  {
    id: "pr-1",
    patientName: "Дарья Новикова",
    patientAvatar: "ДН",
    clinicId: "clinic-smile",
    doctorId: "doc-1",
    rating: 5,
    text: "Очень аккуратное лечение, врач всё подробно объяснил. Записалась онлайн — удобно и быстро.",
    date: "2026-05-14",
    verified: true,
  },
  {
    id: "pr-2",
    patientName: "Сергей Литвинов",
    patientAvatar: "СЛ",
    clinicId: "clinic-master",
    doctorId: "doc-2",
    rating: 5,
    text: "Профессиональная гигиена в Мастер Дент — лучший опыт в Томске. Чисто, современно, без боли.",
    date: "2026-05-11",
    verified: true,
  },
  {
    id: "pr-3",
    patientName: "Ольга Чернышёва",
    patientAvatar: "ОЧ",
    clinicId: "clinic-elixir",
    doctorId: "doc-3",
    rating: 5,
    text: "Ставлю брекеты в Эликсир. Врач показала 3D-модель будущей улыбки — очень вдохновляет!",
    date: "2026-05-10",
    verified: true,
  },
  {
    id: "pr-4",
    patientName: "Игорь Фёдоров",
    patientAvatar: "ИФ",
    clinicId: "clinic-dental",
    doctorId: "doc-4",
    rating: 4,
    text: "Имплантация в Dental Studio прошла спокойно. Дорого, но качество на уровне.",
    date: "2026-05-08",
    verified: true,
  },
  {
    id: "pr-5",
    patientName: "Наталья Громова",
    patientAvatar: "НГ",
    clinicId: "clinic-medstar",
    doctorId: "doc-5",
    rating: 5,
    text: "Детская стоматология на высоте — сын даже не плакал. Медстар, спасибо!",
    date: "2026-05-07",
    verified: true,
  },
  {
    id: "pr-6",
    patientName: "Алексей Панов",
    patientAvatar: "АП",
    clinicId: "clinic-smile",
    doctorId: "doc-6",
    rating: 5,
    text: "Удаление зуба мудрости за 20 минут. Врач успокоил, всё объяснил до процедуры.",
    date: "2026-05-05",
    verified: false,
  },
  {
    id: "pr-7",
    patientName: "Марина Козлова",
    patientAvatar: "МК",
    clinicId: "clinic-elixir",
    doctorId: "doc-8",
    rating: 5,
    text: "Отбеливание + гигиена — зубы на 3 тона светлее. Эликсир рекомендую подругам.",
    date: "2026-05-03",
    verified: true,
  },
  {
    id: "pr-8",
    patientName: "Виктор Семёнов",
    patientAvatar: "ВС",
    clinicId: "clinic-master",
    doctorId: "doc-7",
    rating: 4,
    text: "Лечение кариеса под микроскопом — аккуратно. Небольшое ожидание в коридоре.",
    date: "2026-04-30",
    verified: true,
  },
  {
    id: "pr-9",
    patientName: "Юлия Белова",
    patientAvatar: "ЮБ",
    clinicId: "clinic-smile",
    doctorId: "doc-1",
    rating: 5,
    text: "★ Лучшая стоматология Томска для терапии. Всегда записываюсь через приложение.",
    date: "2026-04-28",
    verified: true,
  },
  {
    id: "pr-10",
    patientName: "Роман Данилов",
    patientAvatar: "РД",
    clinicId: "clinic-dental",
    doctorId: "doc-4",
    rating: 5,
    text: "Консультация по имплантации — составили понятный план и смету без навязывания.",
    date: "2026-04-25",
    verified: false,
  },
];

export const appointments: Appointment[] = [
  {
    id: "apt-1",
    doctorId: "doc-1",
    patientName: "Соколова Ирина",
    service: "Лечение кариеса",
    date: "2026-05-18",
    time: "09:00",
    status: "пришёл",
  },
  {
    id: "apt-2",
    doctorId: "doc-1",
    patientName: "Белов Павел",
    service: "Консультация",
    date: "2026-05-18",
    time: "11:00",
    status: "записан",
  },
  {
    id: "apt-3",
    doctorId: "doc-1",
    patientName: "Кузнецова Людмила",
    service: "Лечение кариеса",
    date: "2026-05-18",
    time: "14:00",
    status: "записан",
  },
  {
    id: "apt-4",
    doctorId: "doc-1",
    patientName: "Громов Алексей",
    service: "Лечение пульпита",
    date: "2026-05-17",
    time: "11:00",
    status: "не пришёл",
  },
  {
    id: "apt-5",
    doctorId: "doc-1",
    patientName: "Федорова Наталья",
    service: "Профессиональная чистка",
    date: "2026-05-20",
    time: "10:00",
    status: "записан",
  },
  {
    id: "apt-6",
    doctorId: "doc-1",
    patientName: "Орлов Виктор",
    service: "Имплантация",
    date: "2026-05-21",
    time: "15:00",
    status: "записан",
  },
  {
    id: "apt-7",
    doctorId: "doc-1",
    patientName: "Морозова Анна",
    service: "Лечение кариеса",
    date: "2026-05-19",
    time: "09:00",
    status: "записан",
  },
  {
    id: "apt-8",
    doctorId: "doc-1",
    patientName: "Петров Сергей",
    service: "Консультация",
    date: "2026-05-19",
    time: "14:00",
    status: "записан",
  },
  {
    id: "apt-9",
    doctorId: "doc-1",
    patientName: "Волкова Елена",
    service: "Профессиональная чистка",
    date: "2026-05-22",
    time: "11:00",
    status: "записан",
  },
  {
    id: "apt-10",
    doctorId: "doc-1",
    patientName: "Сидоров Максим",
    service: "Консультация",
    date: "2026-05-23",
    time: "12:00",
    status: "записан",
  },
];

export const DOCTOR_SCHEDULE_HOURS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

export const DEMO_SCHEDULE_WEEK_START = "2026-05-18";

export function getDoctorWeekDays(
  weekStart = DEMO_SCHEDULE_WEEK_START,
  today = DEMO_SCHEDULE_WEEK_START
): ScheduleWeekDay[] {
  const labels = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
  const start = new Date(`${weekStart}T12:00:00`);

  return labels.map((label, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const date = d.toISOString().slice(0, 10);
    return {
      key: label,
      label,
      date,
      isToday: date === today,
    };
  });
}

export function buildDaySlotsFromAppointments(
  date: string,
  dayAppts: Appointment[]
): ScheduleSlot[] {
  const sorted = [...dayAppts].sort((a, b) => a.time.localeCompare(b.time));

  const usedAptIds = new Set<string>();

  return DOCTOR_SCHEDULE_HOURS.map((time) => {
    const hour = time.slice(0, 2);
    const apt = sorted.find(
      (a) =>
        !usedAptIds.has(a.id) &&
        (a.time === time || a.time.startsWith(`${hour}:`))
    );

    if (apt) {
      usedAptIds.add(apt.id);
      return {
        id: `slot-${date}-${time}-booked`,
        time,
        type: "booked" as const,
        appointment: apt,
      };
    }

    return {
      id: `slot-${date}-${time}-free`,
      time,
      type: "free" as const,
    };
  });
}

export function getDoctorDaySlots(
  doctorId: string,
  date: string,
  extra: Appointment[] = []
): ScheduleSlot[] {
  const dayAppts = [
    ...appointments.filter((a) => a.doctorId === doctorId && a.date === date),
    ...extra.filter((a) => a.doctorId === doctorId && a.date === date),
  ];
  return buildDaySlotsFromAppointments(date, dayAppts);
}

export const doctorStats: DoctorStats = {
  monthlyPatients: 92,
  noShowRate: 7.2,
  conversionRate: 93.5,
  averageRating: 4.9,
  popularServices: [
    { name: "Лечение кариеса", count: 38 },
    { name: "Профессиональная гигиена", count: 29 },
    { name: "Удаление зуба", count: 14 },
  ],
};

export const clinicServices: ClinicService[] = [
  {
    id: "cs-1",
    name: "Лечение кариеса",
    price: 4500,
    doctorName: "Кравцова А.М.",
    specialty: "Терапия",
    duration: 60,
    active: true,
    promotion: false,
  },
  {
    id: "cs-2",
    name: "Профессиональная гигиена",
    price: 5500,
    doctorName: "Белов Д.С.",
    specialty: "Гигиена",
    duration: 60,
    active: true,
    promotion: true,
  },
  {
    id: "cs-3",
    name: "Имплантация",
    price: 45000,
    doctorName: "Громов И.А.",
    specialty: "Имплантация",
    duration: 90,
    active: true,
    promotion: false,
  },
  {
    id: "cs-4",
    name: "Удаление зуба",
    price: 5500,
    doctorName: "Никитин П.О.",
    specialty: "Хирургия",
    duration: 45,
    active: true,
    promotion: false,
  },
  {
    id: "cs-5",
    name: "Брекеты",
    price: 85000,
    doctorName: "Орлова Е.В.",
    specialty: "Ортодонтия",
    duration: 60,
    active: true,
    promotion: true,
  },
  {
    id: "cs-6",
    name: "Отбеливание",
    price: 18000,
    doctorName: "Белов Д.С.",
    specialty: "Гигиена",
    duration: 90,
    active: true,
    promotion: true,
  },
  {
    id: "cs-7",
    name: "Детская стоматология",
    price: 3500,
    doctorName: "Соколова М.П.",
    specialty: "Детская стоматология",
    duration: 45,
    active: true,
    promotion: false,
  },
  {
    id: "cs-8",
    name: "Консультация ортодонта",
    price: 2500,
    doctorName: "Орлова Е.В.",
    specialty: "Ортодонтия",
    duration: 40,
    active: true,
    promotion: false,
  },
];

export const appointmentsByMonth = [
  { month: "Янв", count: 98, revenue: 412000 },
  { month: "Фев", count: 112, revenue: 468000 },
  { month: "Мар", count: 125, revenue: 521000 },
  { month: "Апр", count: 138, revenue: 587000 },
  { month: "Май", count: 152, revenue: 634000 },
  { month: "Июн", count: 78, revenue: 328000 },
];

export const ratingDynamics = [
  { month: "Янв", rating: 4.5 },
  { month: "Фев", rating: 4.6 },
  { month: "Мар", rating: 4.6 },
  { month: "Апр", rating: 4.7 },
  { month: "Май", rating: 4.7 },
  { month: "Июн", rating: 4.8 },
];

export const doctorWorkload = [
  { name: "Кравцова", utilization: 94 },
  { name: "Белов", utilization: 88 },
  { name: "Орлова", utilization: 82 },
  { name: "Громов", utilization: 76 },
  { name: "Соколова", utilization: 91 },
  { name: "Никитин", utilization: 85 },
];

export const appointmentsBySpecialty = [
  { specialty: "Терапия", count: 52 },
  { specialty: "Гигиена", count: 38 },
  { specialty: "Хирургия", count: 24 },
  { specialty: "Ортодонтия", count: 18 },
  { specialty: "Имплантация", count: 12 },
  { specialty: "Детская", count: 22 },
];

export const topServices = [
  { name: "Лечение кариеса", count: 48 },
  { name: "Профгигиена", count: 35 },
  { name: "Удаление зуба", count: 18 },
  { name: "Отбеливание", count: 14 },
  { name: "Брекеты", count: 9 },
];

export function getClinicById(id: string) {
  return clinics.find((c) => c.id === id);
}

export function getDoctorById(id: string) {
  return doctors.find((d) => d.id === id);
}

export function getReviewsByDoctorId(doctorId: string) {
  return reviews.filter((r) => r.doctorId === doctorId);
}

export function getPublicReviewWithMeta(review: PublicReview) {
  const clinic = getClinicById(review.clinicId);
  const doctor = getDoctorById(review.doctorId);
  return { review, clinic, doctor };
}

export const patientRecords: PatientRecord[] = [
  {
    id: "pat-1",
    fullName: "Соколова Ирина",
    phone: "+7 (913) 812-34-56",
    treatmentStatus: "Лечение завершено",
    plannedProcedures: ["Контрольный осмотр через 6 мес."],
    visits: [
      {
        date: "2026-05-18",
        service: "Лечение кариеса",
        status: "пришёл",
        notes: "Пломба 36, рекомендована гигиена",
      },
      {
        date: "2026-04-10",
        service: "Консультация",
        status: "пришёл",
        notes: "Первичный осмотр",
      },
    ],
  },
  {
    id: "pat-2",
    fullName: "Белов Павел",
    phone: "+7 (913) 555-12-88",
    treatmentStatus: "В процессе лечения",
    plannedProcedures: ["Лечение кариеса 15.05", "Профгигиена"],
    visits: [
      {
        date: "2026-05-18",
        service: "Консультация терапевта",
        status: "записан",
      },
    ],
  },
  {
    id: "pat-3",
    fullName: "Кузнецова Людмила",
    phone: "+7 (3822) 45-67-89",
    treatmentStatus: "Запланировано",
    plannedProcedures: ["Лечение кариеса"],
    visits: [
      {
        date: "2026-05-18",
        service: "Лечение кариеса",
        status: "записан",
      },
    ],
  },
  {
    id: "pat-4",
    fullName: "Громов Алексей",
    phone: "+7 (913) 901-22-33",
    treatmentStatus: "Неявка",
    plannedProcedures: ["Повторная запись на терапию"],
    visits: [
      {
        date: "2026-05-17",
        service: "Лечение пульпита",
        status: "не пришёл",
        notes: "Перезаписать на следующую неделю",
      },
    ],
  },
  {
    id: "pat-5",
    fullName: "Федорова Наталья",
    phone: "+7 (913) 444-77-11",
    treatmentStatus: "Запланировано",
    plannedProcedures: ["Профессиональная гигиена"],
    visits: [
      {
        date: "2026-05-20",
        service: "Профессиональная гигиена",
        status: "записан",
      },
    ],
  },
];

export function getPatientByName(name: string): PatientRecord | undefined {
  return patientRecords.find((p) => p.fullName === name);
}

export function getAppointmentsByDoctorId(doctorId: string) {
  return appointments.filter((a) => a.doctorId === doctorId);
}

export function getDoctorDashboardStats(doctorId: string): DoctorStats {
  const doctor = getDoctorById(doctorId);
  const doctorAppts = getAppointmentsByDoctorId(doctorId);
  const noShows = doctorAppts.filter((a) => a.status === "не пришёл").length;
  const total = doctorAppts.length || 1;

  return {
    monthlyPatients: Math.round(doctor?.reviewCount ? doctor.reviewCount / 2.5 : 40),
    noShowRate: Math.round((noShows / total) * 1000) / 10 || 7.2,
    conversionRate: 92.5,
    averageRating: doctor?.rating ?? 4.8,
    popularServices: doctor?.services.slice(0, 3).map((s, i) => ({
      name: s.name,
      count: 30 - i * 8,
    })) ?? [],
  };
}

export const clinicFilterOptions = [
  { id: "all", label: "Все клиники" },
  ...clinics.map((c) => ({ id: c.id, label: c.name.replace(" Томск", "") })),
];
