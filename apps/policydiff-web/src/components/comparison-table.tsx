import { Card } from "@ojpp/ui";
import { MarkdownRenderer } from "./markdown-renderer";

interface ComparisonPolicy {
  id: string;
  title: string;
  content: string;
  party: {
    name: string;
    color: string | null;
  } | null;
}

interface ComparisonTableProps {
  policies: ComparisonPolicy[];
  category: string;
}

export function ComparisonTable({ policies, category }: ComparisonTableProps) {
  if (policies.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-gray-500 shadow-card">
        <p>「{category}」に該当する政策がありません。</p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
      {policies.map((policy) => (
        <Card
          key={policy.id}
          padding="md"
          hover
          className="flex min-w-[280px] snap-start flex-col md:min-w-0"
        >
          <div className="mb-3 flex items-center gap-2">
            {policy.party?.color && (
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: policy.party.color }}
              />
            )}
            <span className="text-sm font-bold" style={{ color: policy.party?.color ?? undefined }}>
              {policy.party?.name ?? "不明"}
            </span>
          </div>
          <h3 className="mb-3 text-base font-bold">{policy.title}</h3>
          <div className="flex-1 text-sm">
            <MarkdownRenderer content={policy.content} />
          </div>
          <div className="mt-4 border-t pt-3">
            <a
              href={`/policy/${policy.id}`}
              className="text-sm font-medium text-green-600 transition-colors hover:text-green-700"
            >
              詳細を見る →
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
}
