import { getTools, matchTools } from "@/lib/matcher";
import { defaultUserPreferences } from "@/lib/storage";
import type { AiRecommendation, IntakeAnswers, Tool } from "@/lib/types";

type RecommendApiResponse = {
  recommendations: AiRecommendation[];
};

export async function recommendTools(
  intake: IntakeAnswers,
  planSelections: Record<string, string>,
): Promise<AiRecommendation[]> {
  const candidateMatches = matchTools(
    intake,
    {
      ...defaultUserPreferences,
      planSelections,
      budget: intake.budget,
      onlyShowOwned: false,
    },
    6,
  );
  const toolsById = new Map(getTools().map((tool) => [tool.id, tool]));
  const candidates = candidateMatches
    .map((match) => toolsById.get(match.toolId))
    .filter((tool): tool is Tool => Boolean(tool))
    .slice(0, 6);

  const response = await fetch("/api/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intake,
      candidates,
      planSelections,
    }),
  });

  if (!response.ok) {
    throw new Error("We could not generate recommendations right now.");
  }

  const data = (await response.json()) as RecommendApiResponse;

  if (!Array.isArray(data.recommendations)) {
    throw new Error("The recommendation response was not in the expected shape.");
  }

  return data.recommendations;
}
