"use client";

import { useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface PostData {
  text: string;
  likes: number;
  retweets: number;
  replies: number;
}

interface AnalysisResult {
  topPerforming: string;
  trend: string;
  suggestions: string[];
  engagementRate: string;
}

// ---------------------------------------------------------------------------
// Sample data (MVP: replace with real X data later)
// ---------------------------------------------------------------------------
const SAMPLE_POSTS: PostData[] = [
  {
    text: "AIを使ったマーケティング自動化で、作業時間を50%削減できました！具体的な方法をスレッドで解説します",
    likes: 342,
    retweets: 128,
    replies: 45,
  },
  {
    text: "朝の習慣を変えたら生産性が劇的に上がった話。ポイントは「最初の30分」の使い方です",
    likes: 189,
    retweets: 67,
    replies: 23,
  },
  {
    text: "フリーランス3年目の収支報告。月収100万円を安定させるために実践した5つのこと",
    likes: 521,
    retweets: 203,
    replies: 89,
  },
  {
    text: "ChatGPTのプロンプト設計で意識すべき3つの原則。これを知るだけでアウトプットの質が段違い",
    likes: 276,
    retweets: 95,
    replies: 34,
  },
  {
    text: "週末のカフェ作業、集中力が上がるBGMプレイリストを共有します。作業効率2倍になりました",
    likes: 98,
    retweets: 31,
    replies: 12,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function calcRate(value: number, total: number): string {
  if (total === 0) return "0.0";
  return ((value / total) * 100).toFixed(1);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function StatCard({
  label,
  value,
  sub,
  accentColor,
}: {
  label: string;
  value: string;
  sub: string;
  accentColor: string;
}) {
  return (
    <div
      className="rounded-[12px] border border-[#1f2937] bg-[#111827] p-5"
      style={{ borderTop: `2px solid ${accentColor}` }}
    >
      <p className="text-xs font-bold uppercase tracking-wider text-[#9ca3af]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-[#f9fafb]">{value}</p>
      <p className="mt-1 text-sm text-[#6b7280]">{sub}</p>
    </div>
  );
}

function PostRow({ post, index }: { post: PostData; index: number }) {
  const total = post.likes + post.retweets + post.replies;
  return (
    <div className="flex flex-col gap-2 rounded-[8px] border border-[#1f2937] bg-[#111827] p-4 transition-all duration-150 hover:border-l-2 hover:border-l-[#3b82f6] sm:flex-row sm:items-start sm:gap-4">
      <span className="shrink-0 text-xs font-semibold text-[#6b7280]">
        #{index + 1}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-relaxed text-[#f9fafb]">{post.text}</p>
        <div className="mt-2 flex flex-wrap gap-4 text-xs text-[#9ca3af]">
          <span>
            <HeartIcon /> {post.likes}
          </span>
          <span>
            <RetweetIcon /> {post.retweets}
          </span>
          <span>
            <ReplyIcon /> {post.replies}
          </span>
          <span className="text-[#3b82f6]">
            合計エンゲージメント: {total}
          </span>
        </div>
      </div>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg
      className="mr-1 inline-block h-3.5 w-3.5 text-[#22c55e]"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
    </svg>
  );
}

function RetweetIcon() {
  return (
    <svg
      className="mr-1 inline-block h-3.5 w-3.5 text-[#8b5cf6]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

function ReplyIcon() {
  return (
    <svg
      className="mr-1 inline-block h-3.5 w-3.5 text-[#3b82f6]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 10h10a5 5 0 015 5v3M3 10l4-4m-4 4l4 4"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function AnalyticsView() {
  const [posts] = useState<PostData[]>(SAMPLE_POSTS);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Aggregate stats
  const totalLikes = posts.reduce((s, p) => s + p.likes, 0);
  const totalRetweets = posts.reduce((s, p) => s + p.retweets, 0);
  const totalReplies = posts.reduce((s, p) => s + p.replies, 0);
  const totalEngagement = totalLikes + totalRetweets + totalReplies;

  async function handleAnalyze() {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posts }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "分析に失敗しました。");
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "分析に失敗しました。"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* ----- Engagement rate cards ----- */}
      <section aria-label="エンゲージメント概要">
        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#3b82f6]">
          Engagement Overview
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="いいね率"
            value={`${calcRate(totalLikes, totalEngagement)}%`}
            sub={`${totalLikes.toLocaleString()} いいね`}
            accentColor="#22c55e"
          />
          <StatCard
            label="RT率"
            value={`${calcRate(totalRetweets, totalEngagement)}%`}
            sub={`${totalRetweets.toLocaleString()} リツイート`}
            accentColor="#8b5cf6"
          />
          <StatCard
            label="リプライ率"
            value={`${calcRate(totalReplies, totalEngagement)}%`}
            sub={`${totalReplies.toLocaleString()} リプライ`}
            accentColor="#3b82f6"
          />
        </div>
      </section>

      {/* ----- Posts list ----- */}
      <section aria-label="投稿一覧">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#3b82f6]">
          Posts
        </p>
        <h2 className="mb-4 text-lg font-semibold text-[#f9fafb]">
          投稿データ
          <span className="ml-2 text-sm font-normal text-[#6b7280]">
            ({posts.length}件)
          </span>
        </h2>
        <div className="space-y-3">
          {posts.map((post, i) => (
            <PostRow key={i} post={post} index={i} />
          ))}
        </div>
      </section>

      {/* ----- Analyze button ----- */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-[8px] border-2 border-[#3b82f6] bg-transparent px-5 py-2.5 text-sm font-medium text-[#3b82f6] transition-all duration-150 hover:bg-[#2563eb] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2 focus:ring-offset-[#030712] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              分析中...
            </>
          ) : (
            "AIで分析する"
          )}
        </button>
        {loading && (
          <span className="text-xs text-[#6b7280]">
            Claude Haiku が分析しています...
          </span>
        )}
      </div>

      {/* ----- Error ----- */}
      {error && (
        <div
          role="alert"
          className="rounded-[8px] border border-red-800/50 bg-red-950/40 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </div>
      )}

      {/* ----- AI Analysis Result ----- */}
      {analysis && (
        <section
          aria-label="AI分析結果"
          className="space-y-5 rounded-[12px] border border-[#1f2937] bg-[#111827] p-6"
          style={{ borderTop: "2px solid #3b82f6" }}
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[#f9fafb]">
            <svg
              className="h-5 w-5 text-[#3b82f6]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-1.007.858a2.25 2.25 0 00-.756 1.685V19.5a2.25 2.25 0 01-2.25 2.25h-5.974a2.25 2.25 0 01-2.25-2.25v-2.457a2.25 2.25 0 00-.756-1.685L5 14.5m14 0V5.654a2.25 2.25 0 00-1.144-1.96l-.856-.428a2.25 2.25 0 00-2.01 0l-.856.428A2.25 2.25 0 0012.25 5.654V14.5"
              />
            </svg>
            AI分析コメント
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3b82f6]">
                トップパフォーマンス
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#9ca3af]">
                {analysis.topPerforming}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3b82f6]">
                エンゲージメント傾向
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#9ca3af]">
                {analysis.trend}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3b82f6]">
                エンゲージメント率評価
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#9ca3af]">
                {analysis.engagementRate}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3b82f6]">
                改善提案
              </h3>
              <ul className="mt-2 space-y-2">
                {analysis.suggestions.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 border-l-2 border-[#3b82f6] pl-3 text-sm text-[#9ca3af]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3b82f6]/20 text-xs font-semibold text-[#3b82f6]">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
