"use client";

import { useRole } from "@/context/RoleContext";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/": "Запись к стоматологу",
  "/doctors": "Запись к врачу",
  "/booking": "Запись",
  "/booking/success": "Готово",
  "/profile": "Профиль",
  "/doctor": "Личный кабинет",
  "/doctor/reviews": "Отзывы врача",
  "/clinic": "Клиника",
  "/clinic/services": "Услуги",
  "/integration": "Интеграция",
  "/reviews": "Отзывы",
};

export function Header() {
  const pathname = usePathname();
  const { role } = useRole();

  const title =
    pathname.startsWith("/clinic/doctors/")
      ? "Врач · клиника"
      : pathname.startsWith("/doctors/") && pathname !== "/doctors"
        ? "Врач"
        : titles[pathname] ??
        (role === "doctor"
          ? "Личный кабинет"
          : role === "clinic"
            ? "Клиника"
            : "DentBook");

  return (
    <header className="z-30 shrink-0 border-b border-slate-100/80 bg-white/85 backdrop-blur-xl">
      <div className="flex items-center gap-2.5 px-4 py-3 pt-safe">
        <Link href={role === "patient" ? "/doctors" : role === "doctor" ? "/doctor" : "/clinic"} className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-md shadow-teal-600/20">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold tracking-tight text-slate-900">
              {title}
            </p>
            <p className="truncate text-[10px] text-slate-400">
              Томск · демо-данные
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
