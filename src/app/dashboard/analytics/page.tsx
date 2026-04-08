import { AnalyticsView } from "@/components/dashboard/AnalyticsView";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-[#f9fafb]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-wider text-[#76b900]">
          Analytics
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#f9fafb] sm:text-3xl">
          投稿分析
        </h1>
        <p className="mt-2 text-sm text-[#9ca3af]">
          投稿のエンゲージメントを分析し、改善提案を確認できます。
        </p>
        <div className="mt-8">
          <AnalyticsView />
        </div>
      </div>
    </main>
  );
}
