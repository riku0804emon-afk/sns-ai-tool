import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0a1628] to-[#0f172a] text-white">
      {/* ───── Header ───── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight">
            SNS AI Assist
          </span>
          <Link
            href="/login"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            ログイン
          </Link>
        </nav>
      </header>

      {/* ───── Hero ───── */}
      <section className="flex flex-col items-center justify-center px-6 pt-40 pb-24 text-center md:pt-48 md:pb-32">
        <span className="mb-6 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-400">
          Beta公開中
        </span>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl md:leading-tight">
          AIがあなたの
          <br />
          <span className="text-[#3B82F6]">SNS運用</span>を加速する
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
          投稿文の生成からエンゲージメント分析、週次レポートまで。
          <br className="hidden md:block" />
          SNS運用に必要なすべてをAIがサポートします。
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-[#3B82F6] px-8 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-600 hover:shadow-blue-500/40"
          >
            無料で始める
          </Link>
          <a
            href="#features"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/15 px-8 text-sm font-medium text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
          >
            機能を見る
          </a>
        </div>
      </section>

      {/* ───── Features ───── */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            SNS運用を、もっとスマートに
          </h2>
          <p className="mt-4 text-zinc-400">
            3つの主要機能であなたのSNS運用を強力にサポート
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-blue-500/30 hover:bg-white/[0.05]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-lg font-semibold">AI投稿文生成</h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              テーマを入れるだけで、最適な投稿文を3パターン生成。トーンやターゲットに合わせた文章をAIが提案します。
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-blue-500/30 hover:bg-white/[0.05]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-lg font-semibold">エンゲージメント分析</h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              伸びる投稿の傾向をAIが分析。いいね・リプライ・インプレッションのデータからパターンを発見します。
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-blue-500/30 hover:bg-white/[0.05]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-lg font-semibold">週次レポート</h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              毎週の振り返りと改善提案を自動配信。数値の変化とネクストアクションをわかりやすくまとめます。
            </p>
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent p-12 text-center md:p-16">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            今すぐSNS運用を変えよう
          </h2>
          <p className="mx-auto mt-4 max-w-md text-zinc-400">
            無料プランで主要機能をお試しいただけます。クレジットカード不要。
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-[#3B82F6] px-8 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-600 hover:shadow-blue-500/40"
          >
            無料で始める
          </Link>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="border-t border-white/10 bg-[#0a0a0a]/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-500 md:flex-row">
          <span>&copy; 2026 SNS AI Assist. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/terms" className="transition-colors hover:text-zinc-300">
              利用規約
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-zinc-300">
              プライバシーポリシー
            </Link>
            <Link href="/contact" className="transition-colors hover:text-zinc-300">
              お問い合わせ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
