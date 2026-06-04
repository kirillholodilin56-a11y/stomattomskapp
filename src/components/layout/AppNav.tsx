"use client";

import { useRole } from "@/context/RoleContext";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";
import { motion } from "framer-motion";
import { Building2, Star, Stethoscope, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const mainTabs: {
  role?: UserRole;
  href: string;
  label: string;
  icon: typeof User;
}[] = [
  { role: "patient", href: "/doctors", label: "Пациент", icon: User },
  { role: "doctor", href: "/doctor", label: "Врач", icon: Stethoscope },
  { role: "clinic", href: "/clinic", label: "Клиника", icon: Building2 },
  { href: "/reviews", label: "Отзывы", icon: Star },
];

export function AppNav() {
  const { role, setRole } = useRole();
  const pathname = usePathname();
  const router = useRouter();

  const handleRoleTab = (tabRole: UserRole, href: string) => {
    setRole(tabRole);
    router.push(href);
  };

  return (
    <nav className="z-40 shrink-0 px-3 pb-2 pb-safe">
      <div className="overflow-hidden rounded-t-2xl rounded-b-2xl border border-white/60 bg-white/80 shadow-[0_-4px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <motion.div
          layout
          className="flex items-stretch justify-around px-0.5 py-1.5"
        >
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isReviewsTab = tab.href === "/reviews";
            const isPatientArea =
              tab.role === "patient" &&
              (pathname === "/" ||
                pathname === "/doctors" ||
                pathname.startsWith("/doctors/") ||
                pathname.startsWith("/booking") ||
                pathname === "/profile");
            const isActive = isReviewsTab
              ? pathname === "/reviews" || pathname.startsWith("/reviews/")
              : tab.role === role &&
                (pathname === tab.href ||
                  pathname.startsWith(`${tab.href}/`) ||
                  isPatientArea);

            if (isReviewsTab) {
              return (
                <Link
                  key={tab.href}
                  href="/reviews"
                  className={cn(
                    "flex min-h-[56px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 transition-all duration-200 active:scale-95",
                    isActive
                      ? "bg-teal-50 text-teal-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
                  <span className="max-w-full truncate text-[10px] font-semibold leading-tight">
                    {tab.label}
                  </span>
                </Link>
              );
            }

            return (
              <button
                key={tab.role}
                type="button"
                onClick={() => handleRoleTab(tab.role!, tab.href)}
                className={cn(
                  "flex min-h-[56px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 transition-all duration-200 active:scale-95",
                  isActive
                    ? "bg-teal-50 text-teal-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
                <span className="max-w-full truncate text-[10px] font-semibold leading-tight">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </motion.div>
      </div>
    </nav>
  );
}
