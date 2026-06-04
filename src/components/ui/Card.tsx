"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover, onClick }: CardProps) {
  const baseClass = cn(
    "rounded-2xl border border-slate-100/90 bg-white p-4 shadow-sm shadow-slate-200/40",
    onClick && "cursor-pointer",
    className
  );

  if (onClick || hover) {
    return (
      <motion.div
        whileTap={{ scale: 0.99 }}
        onClick={onClick}
        className={baseClass}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={baseClass}>{children}</div>;
}

export function StatCard({
  label,
  value,
  suffix,
  icon,
  trend,
  compact,
  onClick,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  icon?: React.ReactNode;
  trend?: string;
  compact?: boolean;
  onClick?: () => void;
}) {
  return (
    <Card className={cn(compact && "p-3", onClick && "active:ring-2 active:ring-teal-200")} onClick={onClick}>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[11px] font-medium leading-tight text-slate-500">
            {label}
          </span>
          {icon && (
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
              {icon}
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-0.5">
          <span className="text-lg font-bold text-slate-900">{value}</span>
          {suffix && (
            <span className="text-[11px] text-slate-500">{suffix}</span>
          )}
        </div>
        {trend && (
          <span className="line-clamp-2 text-[10px] leading-tight text-teal-600">
            {trend}
          </span>
        )}
      </div>
    </Card>
  );
}
