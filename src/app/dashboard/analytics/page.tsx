import { AnalyticsView } from "@/components/dashboard/AnalyticsView";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          投稿分析
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          投稿のエンゲージメントを分析し、改善提案を確認できます。
        </p>
        <div className="mt-8">
          <AnalyticsView />
        </div>
      </div>
    </main>
  );
}
