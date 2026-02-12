import { Card, HeroSection } from "@ojpp/ui";
import { formatCurrency } from "@/lib/format";
import { DashboardCharts } from "./dashboard-charts";
import { HeroStats } from "./hero-stats";

interface StatsData {
  organizationCount: number;
  reportCount: number;
  totalIncome: string;
  totalExpenditure: string;
  recentReports: {
    id: string;
    fiscalYear: number;
    totalIncome: string;
    totalExpenditure: string;
    organization: {
      name: string;
      party: { name: string; color: string | null } | null;
    };
  }[];
  yearlyStats: {
    year: number;
    totalIncome: string;
    totalExpenditure: string;
    reportCount: number;
  }[];
}

async function getStats(): Promise<StatsData> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/stats`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export default async function Home() {
  let stats: StatsData | null = null;
  try {
    stats = await getStats();
  } catch {
    // Fallback to empty state
  }

  if (!stats) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-4 text-3xl font-bold">政治資金の流れを、誰でも見える形に</h2>
        <Card>
          <p className="text-center text-gray-500">
            データを読み込み中、またはデータベースにデータがありません。
            <br />
            <code className="text-xs">pnpm --filter @ojpp/ingestion ingest:finance</code>{" "}
            を実行してデータを投入してください。
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <HeroSection
        title="政治資金ダッシュボード"
        subtitle="全政党・全政治団体の資金の流れをリアルタイムで可視化"
        gradientFrom="from-blue-600"
        gradientTo="to-indigo-700"
      >
        <HeroStats
          organizationCount={stats.organizationCount}
          reportCount={stats.reportCount}
          totalIncome={stats.totalIncome}
          totalExpenditure={stats.totalExpenditure}
        />
      </HeroSection>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <section className="mb-12">
          <h3 className="mb-4 text-xl font-bold">年度別収支推移</h3>
          <Card hover>
            <DashboardCharts yearlyStats={stats.yearlyStats} />
          </Card>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold">最新の報告書</h3>
          <div className="overflow-x-auto rounded-xl border bg-white shadow-card">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50/80">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-600">団体名</th>
                  <th className="px-4 py-3 font-medium text-gray-600">政党</th>
                  <th className="px-4 py-3 font-medium text-gray-600">年度</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">収入</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">支出</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentReports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b transition-colors last:border-0 hover:bg-blue-50/50"
                  >
                    <td className="px-4 py-3">
                      <a
                        href={`/reports/${report.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {report.organization.name}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                        style={{ backgroundColor: report.organization.party?.color ?? "#6B7280" }}
                      >
                        {report.organization.party?.name ?? "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3">{report.fiscalYear}年</td>
                    <td className="px-4 py-3 text-right font-medium text-income">
                      {formatCurrency(report.totalIncome)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-expenditure">
                      {formatCurrency(report.totalExpenditure)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
