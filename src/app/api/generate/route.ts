import { NextResponse } from "next/server";
import { generatePosts, type Tone } from "@/lib/claude";

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
const VALID_TONES: Tone[] = ["casual", "professional", "humorous"];

function isValidTone(value: unknown): value is Tone {
  return typeof value === "string" && VALID_TONES.includes(value as Tone);
}

// ---------------------------------------------------------------------------
// POST /api/generate
// ---------------------------------------------------------------------------
export async function POST(request: Request) {
  try {
    // --- Check API key configuration ---
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY が設定されていません。" },
        { status: 500 }
      );
    }

    // --- Parse request body ---
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "リクエストボディのJSONが不正です。" },
        { status: 400 }
      );
    }

    const { theme, keywords, tone } = body as Record<string, unknown>;

    // --- Validate required fields ---
    if (!theme || typeof theme !== "string" || theme.trim().length === 0) {
      return NextResponse.json(
        { error: "theme は必須です（空でない文字列を指定してください）。" },
        { status: 400 }
      );
    }

    if (keywords !== undefined && typeof keywords !== "string") {
      return NextResponse.json(
        { error: "keywords は文字列で指定してください。" },
        { status: 400 }
      );
    }

    if (!isValidTone(tone)) {
      return NextResponse.json(
        {
          error: `tone は ${VALID_TONES.join(", ")} のいずれかを指定してください。`,
        },
        { status: 400 }
      );
    }

    // --- Generate posts via Claude API ---
    const result = await generatePosts(
      theme.trim(),
      keywords ? (keywords as string).trim() : undefined,
      tone
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("[POST /api/generate] Error:", error);

    // Surface Anthropic API errors with a meaningful message
    const message =
      error instanceof Error
        ? error.message
        : "投稿文の生成中に予期しないエラーが発生しました。";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
