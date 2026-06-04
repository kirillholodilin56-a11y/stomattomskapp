"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Rating } from "@/components/ui/Rating";
import { Button } from "@/components/ui/Button";
import { useReviews } from "@/context/ReviewsContext";
import { formatDate } from "@/lib/utils";
import type { Review } from "@/types";
import { MessageSquare } from "lucide-react";

const criteriaLabels = {
  treatmentQuality: "Качество лечения",
  attitude: "Отношение к пациенту",
  cleanliness: "Чистота",
  valueForMoney: "Цена / качество",
} as const;

export function ReviewCard({ review }: { review: Review }) {
  const { addReply } = useReviews();
  const [replyText, setReplyText] = useState(review.doctorReply || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveReply = () => {
    if (replyText.trim()) {
      addReply(review.id, replyText.trim());
      setIsEditing(false);
    }
  };

  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-slate-900">{review.patientName}</p>
          <p className="text-xs text-slate-400">{formatDate(review.date)}</p>
        </div>
        <Rating value={review.overallRating} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
        {(
          Object.entries(criteriaLabels) as [
            keyof typeof criteriaLabels,
            string,
          ][]
        ).map(([key, label]) => (
          <div key={key} className="rounded-lg bg-slate-50 p-2">
            <p className="text-slate-500">{label}</p>
            <p className="font-semibold text-slate-800">
              {review[key]}/5
            </p>
          </div>
        ))}
      </div>
      <p className="text-sm text-slate-700">{review.text}</p>
      {review.doctorReply && !isEditing && (
        <div className="rounded-xl bg-teal-50 p-3">
          <p className="mb-1 flex items-center gap-1 text-xs font-medium text-teal-700">
            <MessageSquare className="h-3 w-3" />
            Ответ врача
          </p>
          <p className="text-sm text-teal-900">{review.doctorReply}</p>
        </div>
      )}
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Публичный ответ пациенту..."
            rows={3}
            className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSaveReply}>
              Сохранить
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(false)}
            >
              Отмена
            </Button>
          </div>
        </div>
      ) : (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsEditing(true)}
        >
          {review.doctorReply ? "Изменить ответ" : "Ответить на отзыв"}
        </Button>
      )}
    </Card>
  );
}
