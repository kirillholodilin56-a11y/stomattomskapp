"use client";

import { ReviewCard } from "@/components/doctor/ReviewCard";
import { Card } from "@/components/ui/Card";
import { Rating } from "@/components/ui/Rating";
import { useReviews } from "@/context/ReviewsContext";
import { clinics } from "@/data/mock";
import { motion } from "framer-motion";
import { Award, Building2 } from "lucide-react";

const DEMO_DOCTOR_ID = "doc-1";
const clinicAvg = clinics.find((c) => c.id === "clinic-smile")?.averageRating ?? 4.9;
const doctorRating = 4.9;
const colleagueRank = 1;
const totalColleagues = 6;

export default function DoctorReviewsPage() {
  const { reviews } = useReviews();
  const doctorReviews = reviews.filter((r) => r.doctorId === DEMO_DOCTOR_ID);

  const avgCriteria = doctorReviews.length
    ? {
        treatment:
          doctorReviews.reduce((s, r) => s + r.treatmentQuality, 0) /
          doctorReviews.length,
        attitude:
          doctorReviews.reduce((s, r) => s + r.attitude, 0) /
          doctorReviews.length,
        cleanliness:
          doctorReviews.reduce((s, r) => s + r.cleanliness, 0) /
          doctorReviews.length,
        value:
          doctorReviews.reduce((s, r) => s + r.valueForMoney, 0) /
          doctorReviews.length,
      }
    : null;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="page-title">Отзывы</h1>
        <p className="page-subtitle">Демо · ответ на отзыв</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p className="text-sm text-slate-500">Ваш рейтинг</p>
          <div className="mt-2">
            <Rating value={doctorRating} size="md" />
          </div>
          <p className="mt-2 text-xs text-teal-600">
            +{(doctorRating - clinicAvg).toFixed(1)} к среднему по клинике (
            {clinicAvg})
          </p>
        </Card>
        <Card>
          <p className="mb-2 flex items-center gap-1 text-sm text-slate-500">
            <Building2 className="h-4 w-4" />
            Средний по клинике
          </p>
          <Rating value={clinicAvg} size="md" />
        </Card>
        <Card>
          <p className="mb-2 flex items-center gap-1 text-sm text-slate-500">
            <Award className="h-4 w-4" />
            Среди коллег
          </p>
          <p className="text-2xl font-bold text-slate-900">
            #{colleagueRank}{" "}
            <span className="text-base font-normal text-slate-500">
              из {totalColleagues}
            </span>
          </p>
        </Card>
      </div>

      {avgCriteria && (
        <Card>
          <h3 className="mb-3 font-semibold text-slate-900">Средние оценки</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-slate-500">Качество лечения</p>
              <p className="font-semibold">{avgCriteria.treatment.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-slate-500">Отношение</p>
              <p className="font-semibold">{avgCriteria.attitude.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-slate-500">Чистота</p>
              <p className="font-semibold">
                {avgCriteria.cleanliness.toFixed(1)}
              </p>
            </div>
            <div>
              <p className="text-slate-500">Цена / качество</p>
              <p className="font-semibold">{avgCriteria.value.toFixed(1)}</p>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {doctorReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
