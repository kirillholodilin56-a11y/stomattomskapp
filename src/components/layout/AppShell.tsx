"use client";

import { DemoBanner } from "@/components/ui/DemoBanner";
import { cn } from "@/lib/utils";
import { AppNav } from "./AppNav";
import { Header } from "./Header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-dvh w-full items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-0 md:p-4"
      aria-label="MedBook mobile app preview"
    >
      <div
        className={cn(
          "relative flex h-dvh w-full max-w-[420px] flex-col overflow-hidden bg-slate-50",
          "transform-gpu isolation isolate",
          "md:h-[min(852px,100dvh)] md:rounded-[2.75rem] md:border md:border-slate-700/50",
          "md:shadow-[0_25px_80px_-12px_rgba(0,0,0,0.55)]"
        )}
      >
        <div className="hidden shrink-0 items-center justify-center bg-slate-50 pt-2 md:flex">
          <div className="h-7 w-28 rounded-full bg-slate-900/10" />
        </div>

        <DemoBanner />
        <Header />

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain scrollbar-hide">
          <main className="px-4 py-4">{children}</main>
        </div>

        <AppNav />
      </div>
    </div>
  );
}
