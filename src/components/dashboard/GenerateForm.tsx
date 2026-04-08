"use client";

import { useState, useCallback } from "react";

type Tone = "casual" | "professional" | "humorous";

interface GeneratedPost {
  text: string;
  hashtags: string[];
}

interface GenerateResult {
  posts: GeneratedPost[];
  suggestedTime: string;
}

const TONE_OPTIONS: { value: Tone; label: string; description: string }[] = [
  { value: "casual", label: "カジュアル", description: "親しみやすいトーン" },
  {
    value: "professional",
    label: "プロフェッショナル",
    description: "ビジネス向け",
  },
  { value: "humorous", label: "ユーモア", description: "面白さ重視" },
];

export default function GenerateForm() {
  const [theme, setTheme] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState<Tone>("casual");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      setResult(null);

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            theme: theme.trim(),
            keywords: keywords.trim() || undefined,
            tone,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "生成に失敗しました");
        }

        setResult(data as GenerateResult);

        // Save to localStorage for history
        try {
          const history = JSON.parse(
            localStorage.getItem("sns-ai-history") || "[]"
          );
          history.unshift({
            id: crypto.randomUUID(),
            theme: theme.trim(),
            tone,
            posts: data.posts,
            suggestedTime: data.suggestedTime,
            createdAt: new Date().toISOString(),
          });
          // Keep last 50 entries
          localStorage.setItem(
            "sns-ai-history",
            JSON.stringify(history.slice(0, 50))
          );
          // Dispatch event so PostHistory can react
          window.dispatchEvent(new Event("sns-ai-history-updated"));
        } catch {
          // localStorage unavailable, ignore
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "予期しないエラーが発生しました"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [theme, keywords, tone]
  );

  const handleCopy = useCallback(
    async (text: string, hashtags: string[], index: number) => {
      const fullText = `${text}\n\n${hashtags.map((h) => `#${h}`).join(" ")}`;
      try {
        await navigator.clipboard.writeText(fullText);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      } catch {
        // Fallback: do nothing
      }
    },
    []
  );

  return (
    <div className="space-y-6">
      {/* Section label */}
      <span className="block text-[12px] font-bold uppercase tracking-wider text-[#3b82f6]">
        Generate Post
      </span>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-[12px] border-t-2 border-[#3b82f6] bg-[#111827] p-6 shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
      >
        <div className="space-y-5">
          {/* Theme */}
          <div>
            <label
              htmlFor="theme"
              className="mb-1.5 block text-sm font-bold text-[#f9fafb]"
            >
              テーマ <span className="text-red-400">*</span>
            </label>
            <input
              id="theme"
              type="text"
              required
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="例: 新商品のローンチ告知"
              className="w-full rounded-[6px] border border-[#1f2937] bg-[#111827] px-4 py-2.5 text-sm text-[#f9fafb] placeholder-[#6b7280] outline-none transition-colors focus:border-[#3b82f6]"
              disabled={isLoading}
            />
          </div>

          {/* Keywords */}
          <div>
            <label
              htmlFor="keywords"
              className="mb-1.5 block text-sm font-bold text-[#f9fafb]"
            >
              キーワード{" "}
              <span className="text-xs text-[#6b7280]">(任意)</span>
            </label>
            <input
              id="keywords"
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="例: AI, 効率化, ビジネス"
              className="w-full rounded-[6px] border border-[#1f2937] bg-[#111827] px-4 py-2.5 text-sm text-[#f9fafb] placeholder-[#6b7280] outline-none transition-colors focus:border-[#3b82f6]"
              disabled={isLoading}
            />
          </div>

          {/* Tone */}
          <fieldset>
            <legend className="mb-2 text-sm font-bold text-[#f9fafb]">
              トーン
            </legend>
            <div className="flex flex-wrap gap-3">
              {TONE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-[8px] border-2 bg-transparent px-4 py-2.5 text-sm transition-colors ${
                    tone === option.value
                      ? "border-[#3b82f6] text-[#3b82f6]"
                      : "border-[#1f2937] text-[#9ca3af] hover:border-[#3b82f6]/50 hover:text-[#f9fafb]"
                  } ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                >
                  <input
                    type="radio"
                    name="tone"
                    value={option.value}
                    checked={tone === option.value}
                    onChange={() => setTone(option.value)}
                    className="sr-only"
                    disabled={isLoading}
                  />
                  <span className="font-bold">{option.label}</span>
                  <span className="hidden text-xs opacity-70 sm:inline">
                    {option.description}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Submit - outline style */}
        <button
          type="submit"
          disabled={isLoading || !theme.trim()}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[8px] border-2 border-[#3b82f6] bg-transparent px-6 py-3 text-sm font-bold text-[#3b82f6] transition-all hover:bg-[#2563eb] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {isLoading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              生成中...
            </>
          ) : (
            "生成する"
          )}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div
          className="rounded-[8px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Section label */}
          <span className="block text-[12px] font-bold uppercase tracking-wider text-[#3b82f6]">
            Results
          </span>

          {/* Suggested time */}
          <div className="flex items-center gap-2 rounded-[8px] border border-[#3b82f6]/20 bg-[#3b82f6]/5 px-4 py-3 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 shrink-0 text-[#3b82f6]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-[#9ca3af]">
              おすすめ投稿時間:{" "}
              <span className="font-bold text-[#f9fafb]">
                {result.suggestedTime}
              </span>
            </span>
          </div>

          {/* Post cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {result.posts.map((post, index) => (
              <article
                key={index}
                className="group flex flex-col rounded-[12px] border-t-2 border-[#3b82f6] bg-[#111827] p-5 shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-colors"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6b7280]">
                    パターン {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(post.text, post.hashtags, index)}
                    className="flex items-center gap-1 rounded-[6px] border border-[#3b82f6] bg-transparent px-2 py-1 text-xs font-bold text-[#3b82f6] transition-colors hover:bg-[#2563eb] hover:text-white"
                    aria-label={`パターン ${index + 1} をコピー`}
                  >
                    {copiedIndex === index ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        <span className="text-green-400">コピー済み</span>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                          />
                        </svg>
                        コピー
                      </>
                    )}
                  </button>
                </div>

                <p className="flex-1 whitespace-pre-wrap text-sm leading-relaxed text-[#f9fafb]">
                  {post.text}
                </p>

                {post.hashtags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.hashtags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#3b82f6]/10 px-2.5 py-0.5 text-xs font-bold text-[#3b82f6]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
