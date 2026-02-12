"use client";

import { Button, Card } from "@ojpp/ui";

export default function ErrorPage({
  error: err,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Card>
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-red-600">エラーが発生しました</h2>
          <p className="mb-4 text-gray-600">{err.message || "予期しないエラーが発生しました。"}</p>
          <Button onClick={() => reset()}>再試行</Button>
        </div>
      </Card>
    </div>
  );
}
