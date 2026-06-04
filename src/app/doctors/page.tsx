"use client";

import { DoctorCard } from "@/components/patient/DoctorCard";
import { DoctorFilters } from "@/components/patient/DoctorFilters";
import { doctors, getClinicById } from "@/data/mock";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [clinicId, setClinicId] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [quickFilter, setQuickFilter] = useState("default");

  const filtered = useMemo(() => {
    let list = [...doctors];

    if (clinicId !== "all") {
      list = list.filter((d) => d.clinicId === clinicId);
    }

    if (specialtyFilter !== "all") {
      list = list.filter((d) => d.specialty === specialtyFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((d) => {
        const clinic = getClinicById(d.clinicId);
        return (
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          clinic?.name.toLowerCase().includes(q)
        );
      });
    }

    if (quickFilter === "nearest") {
      list.sort(
        (a, b) =>
          new Date(a.nearestSlot).getTime() - new Date(b.nearestSlot).getTime()
      );
    } else {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [search, clinicId, specialtyFilter, quickFilter]);

  const highlightNearest = quickFilter === "nearest";

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="page-title">Запись к врачу</h1>
        <p className="page-subtitle">
          Томск · {filtered.length} стоматологов · демо
        </p>
      </motion.div>

      <DoctorFilters
        search={search}
        onSearchChange={setSearch}
        clinicId={clinicId}
        onClinicChange={setClinicId}
        specialtyFilter={specialtyFilter}
        onSpecialtyFilterChange={setSpecialtyFilter}
        quickFilter={quickFilter}
        onQuickFilterChange={setQuickFilter}
      />

      <div className="space-y-4">
        {filtered.map((doctor, i) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            index={i}
            urgentSlot={highlightNearest}
          />
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-slate-500">
            Врачи не найдены. Попробуйте изменить фильтры.
          </p>
        )}
      </div>
    </div>
  );
}
