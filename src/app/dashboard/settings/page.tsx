import Link from "next/link";
import SettingsForm from "@/components/dashboard/SettingsForm";

export const metadata = {
  title: "設定 - SNS AI Assist",
  description: "アカウント設定とプリファレンスを管理します。",
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ───── Header ───── */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/dashboard"
            className="text-lg font-bold tracking-tight text-foreground"
          >
            SNS AI Assist
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-sub transition-colors hover:text-foreground"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            ダッシュボードへ戻る
          </Link>
        </nav>
      </header>

      {/* ───── Main ───── */}
      <main className="px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            設定
          </h1>
        </div>

        <SettingsForm />
      </main>
    </div>
  );
}
