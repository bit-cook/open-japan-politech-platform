"use client";

import { useRef } from "react";
import { motion, useInView } from "@ojpp/ui";

interface PartyResult {
  seatsWon: number;
  party: {
    name: string;
    shortName: string | null;
    color: string | null;
  };
}

export function SeatBar({
  results,
  totalSeats,
  majorityLine,
  height = "h-12",
}: {
  results: PartyResult[];
  totalSeats: number;
  majorityLine?: { seats: number; label: string };
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref}>
      {/* Stacked bar with spring animation */}
      <div className="relative">
        <div className={`flex ${height} w-full overflow-hidden rounded-lg`}>
          {results.map((r, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-center text-xs font-bold text-white"
              style={{
                backgroundColor: r.party.color || "#6B7280",
                minWidth: r.seatsWon > 0 ? "2px" : "0",
              }}
              initial={{ width: "0%" }}
              animate={
                isInView
                  ? { width: `${(r.seatsWon / totalSeats) * 100}%` }
                  : { width: "0%" }
              }
              transition={{
                duration: 0.8,
                delay: i * 0.06,
                type: "spring",
                stiffness: 60,
                damping: 15,
              }}
              title={`${r.party.name}: ${r.seatsWon}議席`}
            >
              {r.seatsWon >= totalSeats * 0.05 ? (
                <span className="truncate px-1">
                  {r.party.shortName || r.party.name} {r.seatsWon}
                </span>
              ) : null}
            </motion.div>
          ))}
        </div>
        {/* Majority line with draw-in animation */}
        {majorityLine && (
          <div
            className="absolute top-0 bottom-0 z-10 flex flex-col items-center"
            style={{ left: `${(majorityLine.seats / totalSeats) * 100}%` }}
          >
            <motion.div
              className="h-full border-l-2 border-dashed border-gray-800/70"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ transformOrigin: "top" }}
            />
            <motion.span
              className="absolute -top-6 whitespace-nowrap rounded bg-gray-800 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              {majorityLine.label}
            </motion.span>
          </div>
        )}
      </div>
      {/* Legend with fade-in */}
      <motion.div
        className="mt-3 flex flex-wrap gap-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        {results
          .filter((r) => r.seatsWon > 0)
          .map((r, i) => (
            <span key={i} className="inline-flex items-center gap-1 text-xs">
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{ backgroundColor: r.party.color || "#6B7280" }}
              />
              {r.party.shortName || r.party.name} {r.seatsWon}
            </span>
          ))}
      </motion.div>
    </div>
  );
}
