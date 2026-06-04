"use client";

import { PublicReviewCard } from "@/components/reviews/PublicReviewCard";
import { FilterChips } from "@/components/ui/FilterChips";
import { clinicFilterOptions, publicReviews } from "@/data/mock";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useMemo, useState } from "react";

export default function ReviewsPage() {
  const [clinicFilter, setClinicFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState<"all" | "5" | "4">("all");

  const filtered = useMemo(() => {
    let list = [...publicReviews];
    if (clinicFilter !== "all") {
      list = list.filter((r) => r.clinicId === clinicFilter);
    }
    if (ratingFilter !== "all") {
      list = list.filter((r) => r.rating >= Number(ratingFilter));
    }
    return list;
  }, [clinicFilter, ratingFilter]);

  const avgRating =
    filtered.length > 0
      ? filtered.reduce((s, r) => s + r.rating, 0) / filtered.length
      : 0;

  return (
    <div className="section-stack pb-2">
      <header>
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          </span>
          <div>
            <h1 className="page-title">Отзывы пациентов</h1>
            <p className="page-subtitle">
              Стоматологии Томска · {filtered.length} отзывов · демо
            </p>
          </div>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 p-4 text-center"
      >
        <p className="text-3xl font-bold text-slate-900">
          {avgRating > 0 ? avgRating.toFixed(1) : "—"}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          средняя оценка по выбранным клиникам
        </p>
      </motion.div>

      <FilterChips
        chips={clinicFilterOptions}
        activeId={clinicFilter}
        onChange={setClinicFilter}
      />

      <div className="flex gap-2">
        {(["all", "5", "4"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setRatingFilter(f)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              ratingFilter === f
                ? "bg-teal-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200"
            }`}
          >
            {f === "all" ? "Все оценки" : `${f}★+`}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((review, i) => (
          <PublicReviewCard key={review.id} review={review} index={i} />
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-500">
            Нет отзывов по выбранным фильтрам
          </p>
        )}
      </div>
    </div>
  );
}
