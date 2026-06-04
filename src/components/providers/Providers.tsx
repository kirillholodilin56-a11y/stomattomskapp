"use client";

import { BookingProvider } from "@/context/BookingContext";
import { ReviewsProvider } from "@/context/ReviewsContext";
import { RoleProvider } from "@/context/RoleContext";
import { ServicesProvider } from "@/context/ServicesContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <BookingProvider>
        <ReviewsProvider>
          <ServicesProvider>{children}</ServicesProvider>
        </ReviewsProvider>
      </BookingProvider>
    </RoleProvider>
  );
}
