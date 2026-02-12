import type { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  gradientFrom?: string;
  gradientTo?: string;
  children?: ReactNode;
}

export function HeroSection({
  title,
  subtitle,
  gradientFrom = "from-blue-600",
  gradientTo = "to-indigo-700",
  children,
}: HeroSectionProps) {
  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientTo} py-16 pb-20 text-white`}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <h2 className="mb-3 text-4xl font-bold tracking-tight animate-fade-in">{title}</h2>
        <p className="mb-8 max-w-2xl text-lg text-white/80 animate-slide-up">{subtitle}</p>
        {children && <div className="animate-slide-up">{children}</div>}
      </div>
    </section>
  );
}
