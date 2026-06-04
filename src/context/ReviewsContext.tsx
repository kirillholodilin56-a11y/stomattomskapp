"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { reviews as initialReviews } from "@/data/mock";
import type { Review } from "@/types";

interface ReviewsContextValue {
  reviews: Review[];
  addReply: (reviewId: string, reply: string) => void;
}

const ReviewsContext = createContext<ReviewsContextValue | null>(null);

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const addReply = useCallback((reviewId: string, reply: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, doctorReply: reply } : r
      )
    );
  }, []);

  return (
    <ReviewsContext.Provider value={{ reviews, addReply }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error("useReviews must be used within ReviewsProvider");
  return ctx;
}
