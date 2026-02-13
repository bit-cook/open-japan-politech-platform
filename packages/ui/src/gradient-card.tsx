"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

interface GradientCardProps {
  children: ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  href?: string;
}

export function GradientCard({
  children,
  className = "",
  gradientFrom = "from-blue-500",
  gradientTo = "to-indigo-600",
  href,
}: GradientCardProps) {
  const cardContent = (
    <motion.div
      className={`group relative overflow-hidden rounded-xl bg-white shadow-card ${className}`}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 20px rgb(59 130 246 / 0.15)",
        transition: { duration: 0.2 },
      }}
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo}`}
      />
      {/* Shimmer overlay on hover */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <div className="p-6">{children}</div>
    </motion.div>
  );

  if (href) {
    return <a href={href}>{cardContent}</a>;
  }
  return cardContent;
}
