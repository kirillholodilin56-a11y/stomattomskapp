"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Rating } from "@/components/ui/Rating";
import { getClinicById } from "@/data/mock";
import { formatPrice } from "@/lib/utils";
import type { Doctor } from "@/types";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function DoctorCard({
  doctor,
  index = 0,
  urgentSlot = false,
}: {
  doctor: Doctor;
  index?: number;
  urgentSlot?: boolean;
}) {
  const clinic = getClinicById(doctor.clinicId);
  const slotDate = new Date(doctor.nearestSlot);
  const slotFormatted = slotDate.toLocaleString("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/doctors/${doctor.id}`}>
        <Card
          hover
          className={`flex gap-4 transition-shadow ${
            urgentSlot ? "ring-2 ring-emerald-400/60 shadow-md shadow-emerald-100" : ""
          }`}
        >
          <Avatar initials={doctor.avatar} />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-slate-900">{doctor.name}</h3>
                <p className="text-sm text-teal-600">{doctor.specialty}</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Rating value={doctor.rating} />
              <span className="text-xs text-slate-400">
                ({doctor.reviewCount})
              </span>
            </div>
            {clinic && (
              <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">{clinic.name}</span>
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <Badge variant={urgentSlot ? "success" : "info"}>
                <Calendar className="mr-1 inline h-3 w-3" />
                {urgentSlot ? `Скоро: ${slotFormatted}` : slotFormatted}
              </Badge>
              <span className="text-sm font-semibold text-slate-900">
                от {formatPrice(doctor.priceFrom)}
              </span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
