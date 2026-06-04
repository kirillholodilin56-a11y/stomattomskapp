export type UserRole = "patient" | "doctor" | "clinic";

export type Specialty =
  | "Терапия"
  | "Хирургия"
  | "Ортодонтия"
  | "Имплантация"
  | "Гигиена"
  | "Детская стоматология";

export type PatientStatus = "записан" | "пришёл" | "не пришёл" | "отменил";

export interface Clinic {
  id: string;
  name: string;
  address: string;
  averageRating: number;
}

export interface DoctorService {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  clinicId: string;
  rating: number;
  reviewCount: number;
  experience: number;
  avatar: string;
  bio: string;
  nearestSlot: string;
  priceFrom: number;
  services: DoctorService[];
  availableSlots: string[];
}

export interface Review {
  id: string;
  doctorId: string;
  patientName: string;
  date: string;
  overallRating: number;
  treatmentQuality: number;
  attitude: number;
  cleanliness: number;
  valueForMoney: number;
  text: string;
  doctorReply?: string;
}

export interface PublicReview {
  id: string;
  patientName: string;
  patientAvatar: string;
  clinicId: string;
  doctorId: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  service: string;
  date: string;
  time: string;
  status: PatientStatus;
}

export type ScheduleSlotType = "booked" | "free";

export interface ScheduleSlot {
  id: string;
  time: string;
  type: ScheduleSlotType;
  appointment?: Appointment;
}

export interface ScheduleWeekDay {
  key: string;
  label: string;
  date: string;
  isToday?: boolean;
}

export interface PatientRecord {
  id: string;
  fullName: string;
  phone: string;
  visits: {
    date: string;
    service: string;
    status: string;
    notes?: string;
  }[];
  plannedProcedures: string[];
  treatmentStatus: string;
}

export interface ClinicService {
  id: string;
  name: string;
  price: number;
  doctorName: string;
  specialty: Specialty;
  duration: number;
  active: boolean;
  promotion: boolean;
}

export interface BookingState {
  doctorId: string | null;
  serviceId: string | null;
  date: string | null;
  time: string | null;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
}

export interface DoctorStats {
  monthlyPatients: number;
  noShowRate: number;
  conversionRate: number;
  averageRating: number;
  popularServices: { name: string; count: number }[];
}
