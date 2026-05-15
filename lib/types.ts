export type TaskCategory =
  | "build"
  | "research"
  | "write"
  | "analyze"
  | "automate"
  | "code"
  | "learn"
  | "design";

export type SkillLevel = "beginner" | "some" | "technical";

export type Frequency = "once" | "occasional" | "ongoing";

export type Tier = "free" | "paid-low" | "paid-mid" | "paid-high";

export type Ephemerality = "throwaway" | "project" | "production";

export interface CreditCost {
  estimate: "minimal" | "low" | "moderate" | "high";
  notes: string;
}

export interface TierRequirement {
  tier: Tier;
  label: string;
  monthlyCost: string;
}

export interface Tool {
  id: string;
  name: string;
  provider: string;
  categories: TaskCategory[];
  tags: string[];
  skillLevel: SkillLevel[];
  frequency: Frequency[];
  ephemerality: Ephemerality[];
  goodFor: string[];
  badFor: string[];
  accessSteps: string[];
  promptTemplate: string;
  tiers: TierRequirement[];
  creditCost: CreditCost;
  alternatives: string[];
  lastVerified: string;
}

export interface ModelRanking {
  id: string;
  name: string;
  provider: string;
  scores: {
    coding: number;
    reasoning: number;
    research: number;
    writing: number;
    speed: number;
  };
  bestFor: string;
  weakAt: string;
  tier: Tier;
  lastVerified: string;
}

export interface UserPreferences {
  ownedTools: string[];
  onlyShowOwned: boolean;
  flagBetterOptions: boolean;
}

export interface IntakeAnswers {
  taskCategory: TaskCategory | null;
  frequency: Frequency | null;
  skillLevel: SkillLevel | null;
  ephemerality: Ephemerality | null;
  budget: Tier | null;
  freeText: string;
}

export interface RecommendationResult {
  toolId: string;
  rank: 1 | 2 | 3;
  reasoning: string;
  estimatedUsage: string;
  withinBudget: boolean;
  requiresUpgrade: boolean;
}