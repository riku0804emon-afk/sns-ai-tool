import OpenAI from "openai";

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
// Types
// ---------------------------------------------------------------------------
export type Tone = "casual" | "professional" | "humorous";

export interface GeneratedPost {
  text: string;
  hashtags: string[];
}

export interface GeneratePostsResult {
  posts: GeneratedPost[];
  suggestedTime: string;
}

// ---------------------------------------------------------------------------
// Tone label mapping (for prompt)
// ---------------------------------------------------------------------------
const toneLabels: Record<Tone, string> = {
  casual: "カジュアル・親しみやすい",
  professional: "プロフェッショナル・信頼感のある",
  humorous: "ユーモア・面白い",
};

// ---------------------------------------------------------------------------
// Build the system prompt for SNS marketing content generation
// ---------------------------------------------------------------------------
function buildSystemPrompt(): string {
  return `あなたはSNSマーケティングの専門家です。X（旧Twitter）向けの投稿文を作成するプロです。
以下のルールを必ず守ってください:

- 各投稿文は140文字以内に収めること（ハッシュタグは文字数に含めない）
- ターゲットオーディエンスの関心を引く魅力的な文章にすること
- エンゲージメント（いいね・リポスト・リプライ）を促進する内容にすること
- 自然な日本語で、読みやすく簡潔に書くこと
- 各投稿には関連するハッシュタグを2〜4個提案すること

回答は必ず以下のJSON形式で返してください。JSON以外のテキストは一切含めないでください:
{
  "posts": [
    { "text": "投稿文1", "hashtags": ["#タグ1", "#タグ2"] },
    { "text": "投稿文2", "hashtags": ["#タグ1", "#タグ2"] },
    { "text": "投稿文3", "hashtags": ["#タグ1", "#タグ2"] }
  ]
}`;
}

// ---------------------------------------------------------------------------
// Build the user prompt
// ---------------------------------------------------------------------------
function buildUserPrompt(
  theme: string,
  keywords: string | undefined,
  tone: Tone
): string {
  const parts = [`テーマ: ${theme}`, `トーン: ${toneLabels[tone]}`];

  if (keywords) {
    parts.push(`キーワード: ${keywords}`);
  }

  parts.push("", "上記の条件に基づいて、X投稿文を3パターン作成してください。");

  return parts.join("\n");
}

// ---------------------------------------------------------------------------
// Suggest optimal posting time based on the theme
// ---------------------------------------------------------------------------
function suggestPostingTime(tone: Tone): string {
  const suggestions: Record<Tone, string> = {
    casual:
      "12:00〜13:00（昼休み）または 20:00〜22:00（夜のリラックスタイム）",
    professional: "7:00〜8:00（通勤時間）または 18:00〜19:00（退勤後）",
    humorous: "21:00〜23:00（夜のリラックスタイム）",
  };
  return suggestions[tone];
}

// ---------------------------------------------------------------------------
// Main function: generate 3 post variations via OpenRouter
// ---------------------------------------------------------------------------
export async function generatePosts(
  theme: string,
  keywords: string | undefined,
  tone: Tone
): Promise<GeneratePostsResult> {
  const completion = await getClient().chat.completions.create({
    model: getModel(),
    max_tokens: 1024,
    messages: [
      { role: "system", content: buildSystemPrompt() },
      { role: "user", content: buildUserPrompt(theme, keywords, tone) },
    ],
  });

  const rawText = completion.choices[0]?.message?.content?.trim();
  if (!rawText) {
    throw new Error("AIからテキスト応答を取得できませんでした。");
  }

  // Parse JSON from the response (handle possible markdown code fences)
  let jsonString = rawText;
  const fenceMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    jsonString = fenceMatch[1].trim();
  }

  let parsed: { posts: GeneratedPost[] };
  try {
    parsed = JSON.parse(jsonString);
  } catch {
    throw new Error("AIの応答をJSONとして解析できませんでした。");
  }

  if (
    !parsed.posts ||
    !Array.isArray(parsed.posts) ||
    parsed.posts.length === 0
  ) {
    throw new Error("AIの応答に投稿データが含まれていません。");
  }

  const posts: GeneratedPost[] = parsed.posts.map((post) => ({
    text: String(post.text ?? ""),
    hashtags: Array.isArray(post.hashtags) ? post.hashtags.map(String) : [],
  }));

  return {
    posts,
    suggestedTime: suggestPostingTime(tone),
  };
}
