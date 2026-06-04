"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { clinicServices as initialServices } from "@/data/mock";
import type { ClinicService } from "@/types";

interface ServicesContextValue {
  services: ClinicService[];
  updateServicePrice: (id: string, price: number) => void;
  toggleServiceActive: (id: string) => void;
}

const ServicesContext = createContext<ServicesContextValue | null>(null);

export function ServicesProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<ClinicService[]>(initialServices);

  const updateServicePrice = useCallback((id: string, price: number) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, price } : s))
    );
  }, []);

  const toggleServiceActive = useCallback((id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  }, []);

  return (
    <ServicesContext.Provider
      value={{ services, updateServicePrice, toggleServiceActive }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const ctx = useContext(ServicesContext);
  if (!ctx) throw new Error("useServices must be used within ServicesProvider");
  return ctx;
}
