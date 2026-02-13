"use client";

import { useRef } from "react";
import { useInView } from "@ojpp/ui";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#F97316",
];

interface YearlyData {
  year: number;
  totalIncome: string | number;
  totalExpenditure: string | number;
}

export function YearlyBarChart({ data }: { data: YearlyData[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const chartData = data.map((d) => ({
    year: `${d.year}年`,
    収入: Number(d.totalIncome) / 100_000_000,
    支出: Number(d.totalExpenditure) / 100_000_000,
  }));

  return (
    <div ref={ref}>
      {isInView && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="expenditureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#DC2626" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v: number) => `${v.toFixed(0)}億`} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)}億円`]}
              contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB" }}
            />
            <Legend />
            <Bar dataKey="収入" fill="url(#incomeGradient)" radius={[4, 4, 0, 0]} animationDuration={1200} animationBegin={200} />
            <Bar dataKey="支出" fill="url(#expenditureGradient)" radius={[4, 4, 0, 0]} animationDuration={1200} animationBegin={400} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

interface PieData {
  name: string;
  value: number;
}

export function CategoryPieChart({ data }: { data: PieData[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref}>
      {isInView && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
              animationDuration={1000}
              animationBegin={300}
              label={({ name, percent }: { name: string; percent: number }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${(value / 100_000_000).toFixed(1)}億円`]}
              contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB" }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

interface PartyBarData {
  name: string;
  color: string;
  totalIncome: string | number;
  totalExpenditure: string | number;
}

export function PartyComparisonChart({ data }: { data: PartyBarData[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const chartData = data.map((d) => ({
    name: d.name,
    収入: Number(d.totalIncome) / 100_000_000,
    支出: Number(d.totalExpenditure) / 100_000_000,
  }));

  return (
    <div ref={ref}>
      {isInView && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              type="number"
              tickFormatter={(v: number) => `${v.toFixed(0)}億`}
              tick={{ fontSize: 12 }}
            />
            <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)}億円`]}
              contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB" }}
            />
            <Legend />
            <Bar dataKey="収入" fill="url(#incomeGradient)" radius={[0, 4, 4, 0]} animationDuration={1200} animationBegin={200} />
            <Bar dataKey="支出" fill="url(#expenditureGradient)" radius={[0, 4, 4, 0]} animationDuration={1200} animationBegin={400} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
