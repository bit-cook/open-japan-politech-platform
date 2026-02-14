"use client";

import { useInView } from "@ojpp/ui";
import { type ComponentType, useEffect, useRef, useState } from "react";

interface YearlyData {
  year: number;
  totalIncome: string | number;
  totalExpenditure: string | number;
}

interface Props {
  yearlyStats: YearlyData[];
}

export function DashboardCharts({ yearlyStats }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });
  const [Chart, setChart] = useState<ComponentType<{ data: YearlyData[] }> | null>(null);

  useEffect(() => {
    if (isInView && !Chart) {
      import("@/components/fund-chart").then((m) => {
        setChart(() => m.YearlyBarChart);
      });
    }
  }, [isInView, Chart]);

  return (
    <div ref={ref} style={{ minHeight: 300 }}>
      {Chart && <Chart data={yearlyStats} />}
    </div>
  );
}
