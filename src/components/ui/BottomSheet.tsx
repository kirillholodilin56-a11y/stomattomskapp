"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-slate-900/45 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[88%] flex-col rounded-t-3xl bg-white shadow-2xl"
          >
            <motion.div className="flex justify-center py-3">
              <div className="h-1 w-10 rounded-full bg-slate-200" />
            </motion.div>
            <div className="flex-1 overflow-y-auto px-5 pb-4">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                {title}
              </h2>
              {children}
            </div>
            <div className="border-t border-slate-100 px-5 py-4 pb-safe">
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 py-3.5",
                  "text-sm font-semibold text-slate-700 active:bg-slate-200"
                )}
              >
                <X className="h-5 w-5" />
                Закрыть
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
