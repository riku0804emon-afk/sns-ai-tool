import { NextResponse } from "next/server";
import OpenAI from "openai";

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
// OpenRouter client (server-side only)
// ---------------------------------------------------------------------------
function getClient() {
  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });
}

function getModel() {
  return process.env.OPENROUTER_MODEL ?? "google/gemini-2.0-flash-001";
}

// ---------------------------------------------------------------------------
// POST /api/analyze
// ---------------------------------------------------------------------------
export async function POST(request: Request) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY が設定されていません。" },
        { status: 500 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "リクエストボディのJSONが不正です。" },
        { status: 400 }
      );
    }

    const { posts } = body as { posts?: unknown };

    if (!Array.isArray(posts) || posts.length === 0) {
      return NextResponse.json(
        { error: "posts は1件以上の配列で指定してください。" },
        { status: 400 }
      );
    }

    // Validate each post entry
    for (const post of posts) {
      if (
        typeof post !== "object" ||
        post === null ||
        typeof (post as PostData).text !== "string" ||
        typeof (post as PostData).likes !== "number" ||
        typeof (post as PostData).retweets !== "number" ||
        typeof (post as PostData).replies !== "number"
      ) {
        return NextResponse.json(
          {
            error:
              "各投稿は { text: string, likes: number, retweets: number, replies: number } の形式で指定してください。",
          },
          { status: 400 }
        );
      }
    }

    const validPosts = posts as PostData[];

    // Build analysis prompt
    const postsDescription = validPosts
      .map(
        (p, i) =>
          `投稿${i + 1}: "${p.text}" (いいね: ${p.likes}, RT: ${p.retweets}, リプライ: ${p.replies})`
      )
      .join("\n");

    const completion = await getClient().chat.completions.create({
      model: getModel(),
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content: `あなたはSNSマーケティングのデータアナリストです。X（旧Twitter）の投稿データを分析し、エンゲージメント改善のアドバイスを提供します。

回答は必ず以下のJSON形式で返してください。JSON以外のテキストは一切含めないでください:
{
  "topPerforming": "最もエンゲージメントが高い投稿の特徴の説明",
  "trend": "全体的なエンゲージメント傾向の分析",
  "suggestions": ["改善提案1", "改善提案2", "改善提案3"],
  "engagementRate": "全体のエンゲージメント率の評価コメント"
}`,
        },
        {
          role: "user",
          content: `以下のX投稿データを分析して、エンゲージメントの傾向と改善提案を教えてください。\n\n${postsDescription}`,
        },
      ],
    });

    const rawText = completion.choices[0]?.message?.content?.trim();
    if (!rawText) {
      throw new Error("AIからテキスト応答を取得できませんでした。");
    }

    // Parse JSON (handle possible markdown code fences)
    let jsonString = rawText;
    const fenceMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
      jsonString = fenceMatch[1].trim();
    }

    let analysis: AnalysisResult;
    try {
      analysis = JSON.parse(jsonString);
    } catch {
      throw new Error("AIの応答をJSONとして解析できませんでした。");
    }

    // Validate parsed structure
    if (
      typeof analysis.topPerforming !== "string" ||
      typeof analysis.trend !== "string" ||
      !Array.isArray(analysis.suggestions) ||
      typeof analysis.engagementRate !== "string"
    ) {
      throw new Error("AIの応答形式が期待と異なります。");
    }

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("[POST /api/analyze] Error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "分析中に予期しないエラーが発生しました。";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
