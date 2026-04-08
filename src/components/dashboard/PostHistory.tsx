"use client";

import { useState, useEffect, useCallback } from "react";

interface HistoryPost {
  text: string;
  hashtags: string[];
}

interface HistoryEntry {
  id: string;
  theme: string;
  tone: string;
  posts: HistoryPost[];
  suggestedTime: string;
  createdAt: string;
}

const TONE_LABELS: Record<string, string> = {
  casual: "カジュアル",
  professional: "プロ",
  humorous: "ユーモア",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ja-JP", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PostHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadHistory = useCallback(() => {
    try {
      const stored = localStorage.getItem("sns-ai-history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  useEffect(() => {
    loadHistory();

    const handler = () => loadHistory();
    window.addEventListener("sns-ai-history-updated", handler);
    return () => window.removeEventListener("sns-ai-history-updated", handler);
  }, [loadHistory]);

  if (history.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="history-heading">
      <h2
        id="history-heading"
        className="mb-4 text-lg font-semibold text-white"
      >
        生成履歴
      </h2>

      <div className="space-y-3">
        {history.map((entry) => {
          const isExpanded = expandedId === entry.id;

          return (
            <div
              key={entry.id}
              className="rounded-xl border border-white/10 bg-gray-900 transition-colors hover:border-white/15"
            >
              {/* Summary row */}
              <button
                type="button"
                onClick={() =>
                  setExpandedId(isExpanded ? null : entry.id)
                }
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
                aria-expanded={isExpanded}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium text-gray-200">
                      {entry.theme}
                    </span>
                    <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-gray-500">
                      {TONE_LABELS[entry.tone] || entry.tone}
                    </span>
                  </div>
                  <span className="mt-0.5 block text-xs text-gray-500">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="border-t border-white/5 px-5 py-4">
                  <div className="space-y-3">
                    {entry.posts.map((post, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-gray-800/50 p-3"
                      >
                        <span className="mb-1 block text-[11px] font-medium text-gray-500">
                          パターン {i + 1}
                        </span>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
                          {post.text}
                        </p>
                        {post.hashtags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {post.hashtags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs text-[#3B82F6]"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="mt-3 text-xs text-gray-500">
                    おすすめ投稿時間: {entry.suggestedTime}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
