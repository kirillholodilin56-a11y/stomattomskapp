"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { BookingState } from "@/types";

const initialState: BookingState = {
  doctorId: null,
  serviceId: null,
  date: null,
  time: null,
  patientName: "",
  patientPhone: "",
  patientEmail: "",
};

interface BookingContextValue {
  booking: BookingState;
  setDoctor: (doctorId: string) => void;
  setService: (serviceId: string) => void;
  setDateTime: (date: string, time: string) => void;
  setPatientInfo: (info: Partial<Pick<BookingState, "patientName" | "patientPhone" | "patientEmail">>) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(initialState);

  const setDoctor = useCallback((doctorId: string) => {
    setBooking((prev) => ({
      ...initialState,
      doctorId,
      patientName: prev.patientName,
      patientPhone: prev.patientPhone,
      patientEmail: prev.patientEmail,
    }));
  }, []);

  const setService = useCallback((serviceId: string) => {
    setBooking((prev) => ({ ...prev, serviceId }));
  }, []);

  const setDateTime = useCallback((date: string, time: string) => {
    setBooking((prev) => ({ ...prev, date, time }));
  }, []);

  const setPatientInfo = useCallback(
    (info: Partial<Pick<BookingState, "patientName" | "patientPhone" | "patientEmail">>) => {
      setBooking((prev) => ({ ...prev, ...info }));
    },
    []
  );

  const resetBooking = useCallback(() => {
    setBooking(initialState);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        booking,
        setDoctor,
        setService,
        setDateTime,
        setPatientInfo,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
