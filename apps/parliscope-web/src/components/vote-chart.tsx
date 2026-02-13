"use client";

import { useRef } from "react";
import { motion, useInView } from "@ojpp/ui";

interface VoteCount {
  FOR: number;
  AGAINST: number;
  ABSTAIN: number;
  ABSENT: number;
}

export function VoteChart({ votes }: { votes: VoteCount }) {
  const total = votes.FOR + votes.AGAINST + votes.ABSTAIN + votes.ABSENT;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  if (total === 0) {
    return <p className="text-sm text-gray-500">投票データなし</p>;
  }

  const items = [
    { label: "賛成", count: votes.FOR, color: "bg-green-500", hex: "#22c55e" },
    { label: "反対", count: votes.AGAINST, color: "bg-red-500", hex: "#ef4444" },
    { label: "棄権", count: votes.ABSTAIN, color: "bg-yellow-500", hex: "#eab308" },
    { label: "欠席", count: votes.ABSENT, color: "bg-gray-400", hex: "#9ca3af" },
  ];

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex h-6 w-full overflow-hidden rounded-full">
        {items.map((item, i) =>
          item.count > 0 ? (
            <motion.div
              key={item.label}
              style={{ backgroundColor: item.hex }}
              initial={{ width: "0%" }}
              animate={
                isInView
                  ? { width: `${(item.count / total) * 100}%` }
                  : { width: "0%" }
              }
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                type: "spring",
                stiffness: 60,
                damping: 15,
              }}
              title={`${item.label}: ${item.count}`}
            />
          ) : null,
        )}
      </div>
      <motion.div
        className="flex flex-wrap gap-4 text-sm"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className={`h-3 w-3 rounded-full ${item.color}`} />
            <span>
              {item.label}: {item.count}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
