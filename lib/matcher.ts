import toolsJson from "@/data/tools.json";
import type {
  IntakeAnswers,
  RecommendationResult,
  Tier,
  Tool,
  UserPreferences,
} from "@/lib/types";
import { defaultUserPreferences } from "@/lib/storage";

const tools = toolsJson as Tool[];

const tierRank: Record<Tier, number> = {
  free: 0,
  "paid-low": 1,
  "paid-mid": 2,
  "paid-high": 3,
};

type ScoredTool = {
  tool: Tool;
  score: number;
  withinBudget: boolean;
  matchedSignals: string[];
};

function getLowestTier(tool: Tool): Tier {
  return tool.tiers.reduce<Tier>((lowestTier, tierRequirement) => {
    return tierRank[tierRequirement.tier] < tierRank[lowestTier]
      ? tierRequirement.tier
      : lowestTier;
  }, tool.tiers[0]?.tier ?? "paid-high");
}

function isWithinBudget(tool: Tool, budget: Tier | null) {
  if (!budget) {
    return true;
  }

  return tool.tiers.some(
    (tierRequirement) =>
      tierRank[tierRequirement.tier] <= tierRank[budget],
  );
}

function getTextMatchScore(tool: Tool, freeText: string) {
  const terms = freeText
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length > 2);

  if (!terms.length) {
    return 0;
  }

  const haystack = [
    tool.name,
    tool.provider,
    ...tool.categories,
    ...tool.tags,
    ...tool.goodFor,
    ...tool.badFor,
  ]
    .join(" ")
    .toLowerCase();

  return Math.min(
    20,
    terms.reduce((score, term) => score + (haystack.includes(term) ? 4 : 0), 0),
  );
}

function scoreTool(
  tool: Tool,
  intake: IntakeAnswers,
  preferences: UserPreferences,
): ScoredTool {
  let score = 0;
  const matchedSignals: string[] = [];
  const withinBudget = isWithinBudget(tool, intake.budget ?? preferences.budget);

  if (intake.taskCategory && tool.categories.includes(intake.taskCategory)) {
    score += 40;
    matchedSignals.push(`matches ${intake.taskCategory} work`);
  }

  if (intake.skillLevel && tool.skillLevel.includes(intake.skillLevel)) {
    score += 18;
    matchedSignals.push(`fits ${intake.skillLevel} users`);
  }

  if (intake.frequency && tool.frequency.includes(intake.frequency)) {
    score += 16;
    matchedSignals.push(`fits ${intake.frequency} use`);
  }

  if (
    intake.ephemerality &&
    tool.ephemerality.includes(intake.ephemerality)
  ) {
    score += 16;
    matchedSignals.push(`fits ${intake.ephemerality} work`);
  }

  if (withinBudget) {
    score += intake.budget ?? preferences.budget ? 14 : 0;
  } else {
    score -= preferences.flagBetterOptions ? 8 : 24;
    matchedSignals.push("may require a higher budget");
  }

  if (preferences.ownedTools.includes(tool.id)) {
    score += 12;
    matchedSignals.push("already in your toolkit");
  }

  score += getTextMatchScore(tool, intake.freeText);

  return { tool, score, withinBudget, matchedSignals };
}

function getEstimatedUsage(tool: Tool, withinBudget: boolean) {
  const cadence = tool.frequency.includes("ongoing")
    ? "Best for ongoing use"
    : tool.frequency.includes("occasional")
      ? "Best for occasional use"
      : "Best for one-off use";
  const budgetNote = withinBudget
    ? `Fits at ${getLowestTier(tool)} tier`
    : `Likely needs ${getLowestTier(tool)} tier or higher`;

  return `${cadence}. ${budgetNote}. Credit cost: ${tool.creditCost.estimate}.`;
}

function getReasoning(scoredTool: ScoredTool) {
  const signals = scoredTool.matchedSignals.slice(0, 3);

  if (!signals.length) {
    return `${scoredTool.tool.name} is a broad fit based on the available tool metadata.`;
  }

  return `${scoredTool.tool.name} ${signals.join(", ")}.`;
}

export function matchTools(
  intake: IntakeAnswers,
  preferences: UserPreferences = defaultUserPreferences,
): RecommendationResult[] {
  const candidateTools = preferences.onlyShowOwned
    ? tools.filter((tool) => preferences.ownedTools.includes(tool.id))
    : tools;

  return candidateTools
    .map((tool) => scoreTool(tool, intake, preferences))
    .filter((scoredTool) => scoredTool.score > 0)
    .sort((first, second) => {
      if (second.score !== first.score) {
        return second.score - first.score;
      }

      return first.tool.name.localeCompare(second.tool.name);
    })
    .slice(0, 3)
    .map((scoredTool, index) => ({
      toolId: scoredTool.tool.id,
      rank: (index + 1) as 1 | 2 | 3,
      reasoning: getReasoning(scoredTool),
      estimatedUsage: getEstimatedUsage(
        scoredTool.tool,
        scoredTool.withinBudget,
      ),
      withinBudget: scoredTool.withinBudget,
      requiresUpgrade: !scoredTool.withinBudget,
    }));
}

export function getTools(): Tool[] {
  return tools;
}
