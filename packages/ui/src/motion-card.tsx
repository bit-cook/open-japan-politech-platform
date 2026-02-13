"use client";

import { type ReactNode, useRef } from "react";
import { motion, useInView } from "motion/react";

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export function MotionCard({
  children,
  className = "",
  delay = 0,
  hover = true,
}: MotionCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={`rounded-xl border bg-white shadow-card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow:
                "0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              transition: { duration: 0.2 },
            }
          : undefined
      }
    >
      <div className="p-6">{children}</div>
    </motion.div>
  );
}
