"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Rating } from "@/components/ui/Rating";
import { getPublicReviewWithMeta } from "@/data/mock";
import { formatShortDate } from "@/lib/utils";
import type { PublicReview } from "@/types";
import { BadgeCheck, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function PublicReviewCard({
  review,
  index = 0,
}: {
  review: PublicReview;
  index?: number;
}) {
  const { clinic, doctor } = getPublicReviewWithMeta(review);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="rounded-2xl border border-slate-100/90 bg-white p-4 shadow-sm shadow-slate-200/30"
    >
      <div className="flex gap-3">
        <Avatar initials={review.patientAvatar} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-900">
              {review.patientName}
            </span>
            {review.verified && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-medium text-teal-700">
                <BadgeCheck className="h-3 w-3" />
                Проверен
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[11px] text-slate-400">
            {formatShortDate(review.date)}
          </p>
        </div>
        <Rating value={review.rating} showValue={false} />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-700">
        {review.text}
      </p>

      <div className="mt-3 space-y-1 rounded-xl bg-slate-50 px-3 py-2.5 text-[11px] text-slate-600">
        {clinic && (
          <p className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3 shrink-0 text-teal-600" />
            <span className="truncate font-medium">{clinic.name}</span>
          </p>
        )}
        {doctor && (
          <p className="truncate pl-[18px] text-slate-500">{doctor.name}</p>
        )}
      </div>
    </motion.article>
  );
}
