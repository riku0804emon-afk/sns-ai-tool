"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Tone = "casual" | "professional" | "humorous";

interface Settings {
  defaultTone: Tone;
  apiKey: string;
  weeklyReport: boolean;
}

const TONE_LABELS: Record<Tone, string> = {
  casual: "カジュアル",
  professional: "プロフェッショナル",
  humorous: "ユーモア",
};

// ---------------------------------------------------------------------------
// Toast component
// ---------------------------------------------------------------------------
function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-[12px] border border-border bg-card px-5 py-3 text-sm font-medium text-[#22c55e] shadow-lg border-l-4 border-l-[#22c55e]"
    >
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {message}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toggle component
// ---------------------------------------------------------------------------
function Toggle({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  id: string;
}) {
  return (
    <button
      id={id}
      role="switch"
      type="button"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        checked ? "bg-accent" : "bg-[#374151]"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// SettingsForm
// ---------------------------------------------------------------------------
export default function SettingsForm() {
  const { data: session } = useSession();

  const [settings, setSettings] = useState<Settings>({
    defaultTone: "casual",
    apiKey: "",
    weeklyReport: true,
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- Fetch current settings on mount ---
  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data: Settings) => {
        setSettings(data);
      })
      .catch((err) => {
        console.error("Failed to fetch settings:", err);
      });
  }, []);

  // --- Save handler ---
  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setToastMessage("設定を保存しました");
      } else {
        const data = await res.json();
        setToastMessage(data.error ?? "保存に失敗しました");
      }
    } catch {
      setToastMessage("ネットワークエラーが発生しました");
    } finally {
      setSaving(false);
    }
  }, [settings]);

  const dismissToast = useCallback(() => setToastMessage(null), []);

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-8">
        {/* ──── Profile Section ──── */}
        <section className="rounded-[12px] border border-white/10 bg-card p-6 sm:p-8 border-t-2 border-t-accent">
          <h2 className="mb-1 text-xs font-bold uppercase tracking-wider text-accent">
            プロフィール
          </h2>
          <p className="mb-6 text-sm text-sub">アカウント情報</p>

          <div className="flex items-center gap-5">
            {/* Avatar */}
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name ?? "アバター"}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full ring-2 ring-accent/30"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card ring-2 ring-accent/30">
                <svg
                  className="h-8 w-8 text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-base font-medium text-foreground">
                {session?.user?.name ?? "未ログイン"}
              </p>
              {session?.user?.twitterUsername ? (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-sub">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-3.5 w-3.5 fill-current"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  @{session.user.twitterUsername}
                  <span className="ml-1 inline-block rounded-[6px] bg-[#22c55e]/15 px-2 py-0.5 text-xs font-medium text-[#22c55e]">
                    連携済み
                  </span>
                </p>
              ) : (
                <p className="mt-1 text-sm text-muted">
                  X アカウント未連携
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ──── Settings Section ──── */}
        <section className="rounded-[12px] border border-white/10 bg-card p-6 sm:p-8">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-wider text-accent">
            設定
          </h2>

          <div className="space-y-6">
            {/* Default Tone */}
            <div>
              <label
                htmlFor="defaultTone"
                className="mb-2 block text-sm font-medium text-sub"
              >
                デフォルトトーン
              </label>
              <select
                id="defaultTone"
                value={settings.defaultTone}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    defaultTone: e.target.value as Tone,
                  }))
                }
                className="w-full rounded-[6px] border border-border bg-card px-4 py-2.5 text-sm text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                {(Object.entries(TONE_LABELS) as [Tone, string][]).map(
                  ([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ),
                )}
              </select>
            </div>

            {/* API Key */}
            <div>
              <label
                htmlFor="apiKey"
                className="mb-2 block text-sm font-medium text-sub"
              >
                APIキー
              </label>
              <div className="relative">
                <input
                  id="apiKey"
                  type={showApiKey ? "text" : "password"}
                  value={settings.apiKey}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      apiKey: e.target.value,
                    }))
                  }
                  placeholder="sk-ant-..."
                  className="w-full rounded-[6px] border border-border bg-card px-4 py-2.5 pr-12 text-sm text-foreground placeholder-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey((prev) => !prev)}
                  aria-label={
                    showApiKey ? "APIキーを隠す" : "APIキーを表示する"
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-[6px] p-1.5 text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {showApiKey ? (
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
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
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
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-muted">
                Anthropic APIキーを入力してください
              </p>
            </div>

            {/* Weekly Report Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <label
                  htmlFor="weeklyReport"
                  className="block text-sm font-medium text-sub"
                >
                  週次レポート
                </label>
                <p className="mt-0.5 text-xs text-muted">
                  毎週月曜日に分析レポートを受信します
                </p>
              </div>
              <Toggle
                id="weeklyReport"
                checked={settings.weeklyReport}
                onChange={(val) =>
                  setSettings((prev) => ({ ...prev, weeklyReport: val }))
                }
              />
            </div>
          </div>
        </section>

        {/* ──── Save Button ──── */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex h-11 items-center justify-center rounded-[8px] border-2 border-accent bg-transparent px-8 text-sm font-semibold text-accent transition-all hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                保存中...
              </>
            ) : (
              "保存"
            )}
          </button>
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={dismissToast} />
      )}
    </>
  );
}
