"use client";

import { FilterChips } from "@/components/ui/FilterChips";
import {
  bookingClinicChips,
  bookingQuickChips,
  bookingSpecialtyChips,
} from "@/data/bookingFilters";
import { Search } from "lucide-react";

interface DoctorFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  clinicId: string;
  onClinicChange: (value: string) => void;
  specialtyFilter: string;
  onSpecialtyFilterChange: (value: string) => void;
  quickFilter: string;
  onQuickFilterChange: (value: string) => void;
}

export function DoctorFilters({
  search,
  onSearchChange,
  clinicId,
  onClinicChange,
  specialtyFilter,
  onSpecialtyFilterChange,
  quickFilter,
  onQuickFilterChange,
}: DoctorFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Поиск по имени, клинике..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
      </div>

      <FilterChips
        chips={bookingClinicChips}
        activeId={clinicId}
        onChange={onClinicChange}
      />

      <FilterChips
        chips={bookingSpecialtyChips}
        activeId={specialtyFilter}
        onChange={onSpecialtyFilterChange}
      />

      <FilterChips
        chips={bookingQuickChips}
        activeId={quickFilter}
        onChange={onQuickFilterChange}
      />
    </div>
  );
}
