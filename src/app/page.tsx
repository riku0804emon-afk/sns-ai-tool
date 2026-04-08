import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#000000] font-[Inter,system-ui,sans-serif] text-[#f9fafb]">
      {/* ───── Header ───── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#000000]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <span className="text-[14px] font-bold uppercase tracking-[0.08em] text-[#f9fafb]">
            SNS AI Assist
          </span>
          <div className="flex items-center gap-8">
            <a
              href="#features"
              className="hidden text-[14px] font-bold uppercase tracking-[0.06em] text-[#9ca3af] transition-colors duration-150 hover:text-[#f9fafb] md:block"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hidden text-[14px] font-bold uppercase tracking-[0.06em] text-[#9ca3af] transition-colors duration-150 hover:text-[#f9fafb] md:block"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="hidden text-[14px] font-bold uppercase tracking-[0.06em] text-[#9ca3af] transition-colors duration-150 hover:text-[#f9fafb] md:block"
            >
              Pricing
            </a>
            <Link
              href="/login"
              className="rounded-[2px] border-2 border-[#76b900] bg-transparent px-5 py-2 text-[14px] font-bold text-[#76b900] transition-all duration-150 hover:bg-[#76b900] hover:text-white"
            >
              Login
            </Link>
          </div>
        </nav>
      </header>

      {/* ───── Hero ───── */}
      <section className="bg-[#000000] px-6 pt-24 pb-28 md:pt-32 md:pb-36">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#76b900]/30 bg-[#76b900]/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#76b900]" />
            <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#76b900]">
              SNS AI Assist
            </span>
          </div>
          <h1 className="text-[36px] font-bold leading-[1.25] tracking-tight md:text-[48px]">
            AIがあなたの
            <br />
            <span className="text-[#76b900]">SNS運用</span>を加速する
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-[1.67] text-[#9ca3af] md:text-[18px]">
            投稿文の生成からエンゲージメント分析、週次レポートまで。
            <br className="hidden md:block" />
            SNS運用に必要なすべてをAIがサポートします。
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard"
              className="inline-flex h-12 items-center justify-center rounded-[2px] border-2 border-[#76b900] bg-transparent px-8 text-[14px] font-bold text-[#76b900] transition-all duration-150 hover:bg-[#76b900] hover:text-white"
            >
              無料で始める
            </Link>
            <a
              href="#features"
              className="inline-flex h-12 items-center justify-center rounded-[2px] border-2 border-[#6b7280] bg-transparent px-8 text-[14px] font-bold text-[#9ca3af] transition-all duration-150 hover:border-[#9ca3af] hover:text-[#f9fafb]"
            >
              機能を見る
            </a>
          </div>
        </div>
      </section>

      {/* ───── Accent Divider ───── */}
      <div className="h-[2px] bg-[#76b900]" />

      {/* ───── Features ───── */}
      <section id="features" className="bg-[#1a1a1a] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#76b900]">
            01 / Features
          </p>
          <h2 className="mb-4 text-[24px] font-bold leading-[1.25] tracking-tight md:text-[30px]">
            SNS運用を、もっとスマートに
          </h2>
          <p className="mb-16 max-w-lg text-[16px] leading-[1.67] text-[#9ca3af]">
            3つの主要機能であなたのSNS運用を強力にサポート
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="rounded-[2px] border border-white/10 border-t-2 border-t-[#76b900] bg-[#000000] p-8 shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-all duration-150 hover:shadow-[0_10px_15px_rgba(0,0,0,0.4)]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[2px] bg-[#76b900]/15">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#76b900]"
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
              <h3 className="mb-3 text-[18px] font-bold leading-[1.25]">
                AI投稿文生成
              </h3>
              <p className="text-[14px] leading-[1.67] text-[#9ca3af]">
                テーマを入れるだけで、最適な投稿文を3パターン生成。トーンやターゲットに合わせた文章をAIが提案します。
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="rounded-[2px] border border-white/10 border-t-2 border-t-[#76b900] bg-[#000000] p-8 shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-all duration-150 hover:shadow-[0_10px_15px_rgba(0,0,0,0.4)]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[2px] bg-[#76b900]/15">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#76b900]"
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
              <h3 className="mb-3 text-[18px] font-bold leading-[1.25]">
                エンゲージメント分析
              </h3>
              <p className="text-[14px] leading-[1.67] text-[#9ca3af]">
                伸びる投稿の傾向をAIが分析。いいね・リプライ・インプレッションのデータからパターンを発見します。
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="rounded-[2px] border border-white/10 border-t-2 border-t-[#76b900] bg-[#000000] p-8 shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-all duration-150 hover:shadow-[0_10px_15px_rgba(0,0,0,0.4)]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[2px] bg-[#76b900]/15">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#76b900]"
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
              <h3 className="mb-3 text-[18px] font-bold leading-[1.25]">
                週次レポート
              </h3>
              <p className="text-[14px] leading-[1.67] text-[#9ca3af]">
                毎週の振り返りと改善提案を自動配信。数値の変化とネクストアクションをわかりやすくまとめます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Accent Divider ───── */}
      <div className="h-[2px] bg-[#76b900]" />

      {/* ───── How It Works ───── */}
      <section id="how-it-works" className="bg-[#000000] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#76b900]">
            02 / How it works
          </p>
          <h2 className="mb-4 text-[24px] font-bold leading-[1.25] tracking-tight md:text-[30px]">
            3ステップで始められる
          </h2>
          <p className="mb-16 max-w-lg text-[16px] leading-[1.67] text-[#9ca3af]">
            複雑な設定は不要。すぐにAIの力を活用できます。
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-[2px] border border-white/10 border-t-2 border-t-[#76b900] bg-[#1a1a1a] p-8 shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#76b900] text-[14px] font-bold text-[#76b900]">
                01
              </div>
              <h3 className="mb-3 text-[18px] font-bold leading-[1.25]">
                アカウント登録
              </h3>
              <p className="text-[14px] leading-[1.67] text-[#9ca3af]">
                メールアドレスで無料登録。30秒で完了し、すぐにダッシュボードにアクセスできます。
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-[2px] border border-white/10 border-t-2 border-t-[#76b900] bg-[#1a1a1a] p-8 shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#76b900] text-[14px] font-bold text-[#76b900]">
                02
              </div>
              <h3 className="mb-3 text-[18px] font-bold leading-[1.25]">
                SNSアカウント連携
              </h3>
              <p className="text-[14px] leading-[1.67] text-[#9ca3af]">
                X(Twitter)やInstagramなどのアカウントを連携。データの取得と分析が自動で始まります。
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-[2px] border border-white/10 border-t-2 border-t-[#76b900] bg-[#1a1a1a] p-8 shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#76b900] text-[14px] font-bold text-[#76b900]">
                03
              </div>
              <h3 className="mb-3 text-[18px] font-bold leading-[1.25]">
                AIが運用を最適化
              </h3>
              <p className="text-[14px] leading-[1.67] text-[#9ca3af]">
                投稿文の生成、最適な投稿時間の提案、エンゲージメント分析をAIが自動で行います。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Accent Divider ───── */}
      <div className="h-[2px] bg-[#76b900]" />

      {/* ───── Pricing ───── */}
      <section id="pricing" className="bg-[#1a1a1a] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#76b900]">
            03 / Pricing
          </p>
          <h2 className="mb-4 text-[24px] font-bold leading-[1.25] tracking-tight md:text-[30px]">
            シンプルな料金体系
          </h2>
          <p className="mb-16 max-w-lg text-[16px] leading-[1.67] text-[#9ca3af]">
            まずは無料プランでお試しください。いつでもアップグレード可能です。
          </p>

          <div className="grid gap-6 md:grid-cols-2 md:max-w-3xl">
            {/* Free Plan */}
            <div className="rounded-[2px] border border-white/10 border-t-2 border-t-[#6b7280] bg-[#000000] p-8 shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
              <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">
                Free
              </p>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-[36px] font-bold leading-[1.25]">
                  ¥0
                </span>
                <span className="text-[14px] text-[#6b7280]">/ 月</span>
              </div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-3 text-[14px] leading-[1.5] text-[#9ca3af]">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#22c55e]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  月10回の投稿文生成
                </li>
                <li className="flex items-start gap-3 text-[14px] leading-[1.5] text-[#9ca3af]">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#22c55e]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  基本的なエンゲージメント分析
                </li>
                <li className="flex items-start gap-3 text-[14px] leading-[1.5] text-[#9ca3af]">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#22c55e]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  1アカウント連携
                </li>
              </ul>
              <Link
                href="/dashboard"
                className="flex h-12 w-full items-center justify-center rounded-[2px] border-2 border-[#6b7280] bg-transparent text-[14px] font-bold text-[#9ca3af] transition-all duration-150 hover:border-[#9ca3af] hover:text-[#f9fafb]"
              >
                無料で始める
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative rounded-[2px] border border-[#76b900]/30 border-t-2 border-t-[#76b900] bg-[#000000] p-8 shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
              <div className="absolute -top-3 right-6 rounded-full bg-[#76b900] px-3 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                おすすめ
              </div>
              <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[#76b900]">
                Pro
              </p>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-[36px] font-bold leading-[1.25]">
                  ¥2,980
                </span>
                <span className="text-[14px] text-[#6b7280]">/ 月</span>
              </div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-3 text-[14px] leading-[1.5] text-[#9ca3af]">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#22c55e]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  無制限の投稿文生成
                </li>
                <li className="flex items-start gap-3 text-[14px] leading-[1.5] text-[#9ca3af]">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#22c55e]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  高度なエンゲージメント分析
                </li>
                <li className="flex items-start gap-3 text-[14px] leading-[1.5] text-[#9ca3af]">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#22c55e]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  週次レポート自動配信
                </li>
                <li className="flex items-start gap-3 text-[14px] leading-[1.5] text-[#9ca3af]">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#22c55e]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  5アカウント連携
                </li>
                <li className="flex items-start gap-3 text-[14px] leading-[1.5] text-[#9ca3af]">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#22c55e]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  優先サポート
                </li>
              </ul>
              <Link
                href="/dashboard"
                className="flex h-12 w-full items-center justify-center rounded-[2px] border-2 border-[#76b900] bg-transparent text-[14px] font-bold text-[#76b900] transition-all duration-150 hover:bg-[#76b900] hover:text-white"
              >
                Proプランを始める
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Accent Divider ───── */}
      <div className="h-[2px] bg-[#76b900]" />

      {/* ───── CTA ───── */}
      <section className="bg-[#000000] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2px] border-2 border-[#76b900] bg-[#1a1a1a] p-12 text-center shadow-[0_4px_6px_rgba(0,0,0,0.3)] md:p-16">
            <h2 className="text-[24px] font-bold leading-[1.25] tracking-tight md:text-[30px]">
              今すぐSNS運用を変えよう
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[16px] leading-[1.67] text-[#9ca3af]">
              無料プランで主要機能をお試しいただけます。クレジットカード不要。
            </p>
            <Link
              href="/dashboard"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-[2px] border-2 border-[#76b900] bg-transparent px-8 text-[14px] font-bold text-[#76b900] transition-all duration-150 hover:bg-[#76b900] hover:text-white"
            >
              無料で始める
            </Link>
          </div>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="border-t border-white/10 bg-[#000000]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <span className="text-[14px] font-bold uppercase tracking-[0.08em] text-[#f9fafb]">
                SNS AI Assist
              </span>
              <p className="mt-2 text-[13px] text-[#6b7280]">
                AIでSNS運用をもっとスマートに。
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              <Link
                href="/terms"
                className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#6b7280] transition-colors duration-150 hover:text-[#f9fafb]"
              >
                利用規約
              </Link>
              <Link
                href="/privacy"
                className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#6b7280] transition-colors duration-150 hover:text-[#f9fafb]"
              >
                プライバシー
              </Link>
              <Link
                href="/contact"
                className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#6b7280] transition-colors duration-150 hover:text-[#f9fafb]"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-8">
            <p className="text-[12px] text-[#6b7280]">
              &copy; 2026 SNS AI Assist. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
