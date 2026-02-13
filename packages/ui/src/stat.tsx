"use client";

import { type ReactNode, useRef } from "react";
import { motion, useInView } from "motion/react";

interface StatProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: ReactNode;
}

export function Stat({ label, value, change, trend, icon }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const trendColor =
    trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-500";

  return (
    <motion.div
      ref={ref}
      className="rounded-xl border bg-white p-6 shadow-card"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <motion.p
        className="mt-2 text-3xl font-bold tracking-tight"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.1 }}
      >
        {value}
      </motion.p>
      {change && <p className={`mt-1 text-sm font-medium ${trendColor}`}>{change}</p>}
    </motion.div>
  );
}
