import type { ReactNode } from "react";

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
    <div
      className={`group relative overflow-hidden rounded-xl bg-white shadow-card transition-all duration-300 hover:shadow-glow hover:scale-[1.02] ${className}`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo}`}
      />
      <div className="p-6">{children}</div>
    </div>
  );

  if (href) {
    return <a href={href}>{cardContent}</a>;
  }
  return cardContent;
}
