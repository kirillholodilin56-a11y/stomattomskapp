import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  size = "sm",
  showValue = true,
}: {
  value: number;
  size?: "sm" | "md";
  showValue?: boolean;
}) {
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              starSize,
              i <= Math.round(value)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-slate-700">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
