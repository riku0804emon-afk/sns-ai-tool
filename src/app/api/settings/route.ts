import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Default user settings (MVP: no DB, return static defaults)
// ---------------------------------------------------------------------------
const DEFAULT_SETTINGS = {
  defaultTone: "casual" as const,
  apiKey: "",
  weeklyReport: true,
};

// ---------------------------------------------------------------------------
// GET /api/settings
// ---------------------------------------------------------------------------
export async function GET() {
  return NextResponse.json(DEFAULT_SETTINGS);
}

// ---------------------------------------------------------------------------
// PUT /api/settings
// ---------------------------------------------------------------------------
export async function PUT(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "リクエストボディのJSONが不正です。" },
        { status: 400 },
      );
    }

    const { defaultTone, apiKey, weeklyReport } = body as Record<
      string,
      unknown
    >;

    // --- Validate fields ---
    const validTones = ["casual", "professional", "humorous"];
    if (defaultTone !== undefined && !validTones.includes(defaultTone as string)) {
      return NextResponse.json(
        {
          error: `defaultTone は ${validTones.join(", ")} のいずれかを指定してください。`,
        },
        { status: 400 },
      );
    }

    if (apiKey !== undefined && typeof apiKey !== "string") {
      return NextResponse.json(
        { error: "apiKey は文字列で指定してください。" },
        { status: 400 },
      );
    }

    if (weeklyReport !== undefined && typeof weeklyReport !== "boolean") {
      return NextResponse.json(
        { error: "weeklyReport は真偽値で指定してください。" },
        { status: 400 },
      );
    }

    // MVP: Log the update and return success
    console.log("[PUT /api/settings] Updated settings:", {
      defaultTone,
      apiKey: apiKey ? "***" : "",
      weeklyReport,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PUT /api/settings] Error:", error);
    return NextResponse.json(
      { error: "設定の更新中にエラーが発生しました。" },
      { status: 500 },
    );
  }
}
