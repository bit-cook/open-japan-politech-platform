import type { ReactNode } from "react";

interface StatProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: ReactNode;
}

export function Stat({ label, value, change, trend, icon }: StatProps) {
  const trendColor =
    trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-500";

  return (
    <div className="rounded-xl border bg-white p-6 shadow-card animate-slide-up">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
      {change && <p className={`mt-1 text-sm font-medium ${trendColor}`}>{change}</p>}
    </div>
  );
}
