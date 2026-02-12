import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
  animate?: boolean;
}

export function Card({
  children,
  className = "",
  padding = "md",
  hover = false,
  animate = false,
}: CardProps) {
  const paddingClass = { sm: "p-4", md: "p-6", lg: "p-8" }[padding];
  const hoverClass = hover
    ? "transition-all duration-300 hover:shadow-card-hover hover:scale-[1.01]"
    : "";
  const animateClass = animate ? "animate-fade-in" : "";
  return (
    <div
      className={`rounded-xl border bg-white shadow-card ${paddingClass} ${hoverClass} ${animateClass} ${className}`}
    >
      {children}
    </div>
  );
}
