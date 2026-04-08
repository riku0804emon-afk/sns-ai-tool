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
      <span className="mb-2 block text-[12px] font-bold uppercase tracking-wider text-[#76b900]">
        History
      </span>
      <h2
        id="history-heading"
        className="mb-4 text-lg font-bold text-[#f9fafb]"
      >
        生成履歴
      </h2>

      <div className="overflow-hidden rounded-[2px] bg-[#1a1a1a] shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
        {history.map((entry, entryIndex) => {
          const isExpanded = expandedId === entry.id;

          return (
            <div
              key={entry.id}
              className={`transition-colors ${
                entryIndex !== history.length - 1
                  ? "border-b border-[rgba(255,255,255,0.1)]"
                  : ""
              } ${isExpanded ? "border-l-2 border-l-[#76b900]" : "border-l-2 border-l-transparent"}`}
            >
              {/* Summary row */}
              <button
                type="button"
                onClick={() =>
                  setExpandedId(isExpanded ? null : entry.id)
                }
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[rgba(255,255,255,0.03)]"
                aria-expanded={isExpanded}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold text-[#f9fafb]">
                      {entry.theme}
                    </span>
                    <span className="shrink-0 rounded-[2px] border border-[#333333] bg-transparent px-2 py-0.5 text-[11px] font-bold text-[#6b7280]">
                      {TONE_LABELS[entry.tone] || entry.tone}
                    </span>
                  </div>
                  <span className="mt-0.5 block text-xs text-[#6b7280]">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 shrink-0 text-[#6b7280] transition-transform ${
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
                <div className="border-t border-[rgba(255,255,255,0.1)] px-5 py-4">
                  <div className="space-y-3">
                    {entry.posts.map((post, i) => (
                      <div
                        key={i}
                        className="rounded-[2px] border border-[#333333] bg-[#000000] p-3"
                      >
                        <span className="mb-1 block text-[11px] font-bold text-[#6b7280]">
                          パターン {i + 1}
                        </span>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#9ca3af]">
                          {post.text}
                        </p>
                        {post.hashtags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {post.hashtags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-bold text-[#76b900]"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="mt-3 text-xs text-[#6b7280]">
                    おすすめ投稿時間:{" "}
                    <span className="font-bold text-[#9ca3af]">
                      {entry.suggestedTime}
                    </span>
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
