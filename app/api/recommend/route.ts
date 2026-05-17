import Anthropic from "@anthropic-ai/sdk";

import type { AiRecommendation, IntakeAnswers, Tool } from "@/lib/types";

const SYSTEM_PROMPT =
  "You are an AI tool recommender. Return only valid JSON with no preamble or markdown. Keep reasoning to 2 sentences max per tool. Only recommend tools from the provided candidate list.";

type RecommendRequest = {
  intake: IntakeAnswers;
  candidates: Tool[];
  planSelections: Record<string, string>;
};

type RecommendResponse = {
  recommendations: AiRecommendation[];
};

function isRank(value: unknown): value is 1 | 2 | 3 {
  return value === 1 || value === 2 || value === 3;
}

function getMessageText(content: Anthropic.Messages.Message["content"]) {
  return content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("")
    .trim();
}

function normalizeRecommendations(
  value: unknown,
  candidates: Tool[],
): RecommendResponse {
  if (!value || typeof value !== "object") {
    throw new Error("Claude returned an invalid recommendation payload.");
  }

  const candidateIds = new Set(candidates.map((tool) => tool.id));
  const recommendationsValue = (value as Partial<RecommendResponse>)
    .recommendations;

  if (!Array.isArray(recommendationsValue)) {
    throw new Error("Claude did not return a recommendations array.");
  }

  const recommendations = recommendationsValue
    .filter((recommendation): recommendation is AiRecommendation => {
      if (!recommendation || typeof recommendation !== "object") {
        return false;
      }

      return (
        typeof recommendation.toolId === "string" &&
        candidateIds.has(recommendation.toolId) &&
        isRank(recommendation.rank) &&
        typeof recommendation.reasoning === "string" &&
        typeof recommendation.suggestedPrompt === "string" &&
        typeof recommendation.estimatedUsage === "string" &&
        typeof recommendation.upgradeRequired === "boolean"
      );
    })
    .slice(0, 3)
    .map((recommendation, index) => ({
      toolId: recommendation.toolId,
      rank: (index + 1) as 1 | 2 | 3,
      reasoning: recommendation.reasoning,
      suggestedPrompt: recommendation.suggestedPrompt,
      estimatedUsage: recommendation.estimatedUsage,
      upgradeRequired: recommendation.upgradeRequired,
    }));

  if (!recommendations.length) {
    throw new Error("Claude returned no usable recommendations.");
  }

  return { recommendations };
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "ANTHROPIC_API_KEY is not configured." },
        { status: 500 },
      );
    }

    const payload = (await request.json()) as Partial<RecommendRequest>;
    const candidates = Array.isArray(payload.candidates)
      ? payload.candidates.slice(0, 6)
      : [];

    if (!payload.intake || !candidates.length) {
      return Response.json(
        { error: "Request must include intake and candidate tools." },
        { status: 400 },
      );
    }

    const anthropic = new Anthropic({ apiKey });
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 800,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: JSON.stringify({
            requiredShape: {
              recommendations: [
                {
                  toolId: "string",
                  rank: "1 or 2 or 3",
                  reasoning: "string",
                  suggestedPrompt: "string",
                  estimatedUsage: "string",
                  upgradeRequired: "boolean",
                },
              ],
            },
            intake: payload.intake,
            candidateTools: candidates,
            planSelections: payload.planSelections ?? {},
          }),
        },
      ],
    });

    const text = getMessageText(message.content);
    const parsedValue = JSON.parse(text) as unknown;

    return Response.json(normalizeRecommendations(parsedValue, candidates));
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to generate recommendations.";

    return Response.json({ error: message }, { status: 500 });
  }
}
