import type { FilterChip } from "@/components/ui/FilterChips";
import { clinicFilterOptions } from "@/data/mock";

export const bookingClinicChips: FilterChip[] = [
  { id: "all", label: "Все стоматологии" },
  ...clinicFilterOptions.filter((c) => c.id !== "all"),
];

export const bookingSpecialtyChips: FilterChip[] = [
  { id: "all", label: "Все направления" },
  { id: "Имплантация", label: "Имплантация" },
  { id: "Терапия", label: "Терапия" },
  { id: "Детская стоматология", label: "Детская стоматология" },
];

export const bookingQuickChips: FilterChip[] = [
  { id: "default", label: "По рейтингу" },
  { id: "nearest", label: "Ближайшее время" },
];
