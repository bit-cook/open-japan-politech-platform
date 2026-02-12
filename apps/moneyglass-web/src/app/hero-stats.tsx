"use client";

import { AnimatedCounter } from "@ojpp/ui";

interface HeroStatsProps {
  organizationCount: number;
  reportCount: number;
  totalIncome: string;
  totalExpenditure: string;
}

function toOku(value: string): number {
  return Math.round(Number(value) / 100_000_000);
}

export function HeroStats({
  organizationCount,
  reportCount,
  totalIncome,
  totalExpenditure,
}: HeroStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
        <p className="text-sm text-white/70">登録団体数</p>
        <p className="mt-1 text-2xl font-bold">
          <AnimatedCounter end={organizationCount} />
        </p>
      </div>
      <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
        <p className="text-sm text-white/70">報告書数</p>
        <p className="mt-1 text-2xl font-bold">
          <AnimatedCounter end={reportCount} />
        </p>
      </div>
      <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
        <p className="text-sm text-white/70">総収入</p>
        <p className="mt-1 text-2xl font-bold">
          <AnimatedCounter end={toOku(totalIncome)} suffix="億円" />
        </p>
      </div>
      <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
        <p className="text-sm text-white/70">総支出</p>
        <p className="mt-1 text-2xl font-bold">
          <AnimatedCounter end={toOku(totalExpenditure)} suffix="億円" />
        </p>
      </div>
    </div>
  );
}
