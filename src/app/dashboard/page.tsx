import GenerateForm from "@/components/dashboard/GenerateForm";
import PostHistory from "@/components/dashboard/PostHistory";

export const metadata = {
  title: "ダッシュボード | SNS AI Assist",
  description: "AIを活用してSNS投稿文を生成・管理するダッシュボード",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <div>
        <span className="mb-2 block text-[12px] font-bold uppercase tracking-wider text-[#3b82f6]">
          Dashboard
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-[#f9fafb]">
          投稿文を生成
        </h1>
        <p className="mt-1 text-sm text-[#9ca3af]">
          テーマを入力してAIに投稿文を生成させましょう
        </p>
      </div>

      <GenerateForm />

      <PostHistory />
    </div>
  );
}
