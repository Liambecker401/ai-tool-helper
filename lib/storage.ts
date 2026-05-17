import type { Tier, UserPreferences } from "@/lib/types";

const STORAGE_KEY = "ai-tool-helper:user-preferences";

const TIERS: Tier[] = ["free", "paid-low", "paid-mid", "paid-high"];

export type PlanOption = {
  id: string;
  label: string;
  rank: number;
  tier: Tier;
};

export type PlanPlatform = {
  id: string;
  label: string;
  plans: PlanOption[];
};

function plan(id: string, label: string, rank: number, tier: Tier): PlanOption {
  return { id, label, rank, tier };
}

function platform(id: string, label: string, plans: PlanOption[]): PlanPlatform {
  return { id, label, plans };
}

export const planPlatforms: PlanPlatform[] = [
  platform("chatgpt", "ChatGPT", [
    plan("chatgpt-free", "Free", 0, "free"),
    plan("chatgpt-plus", "Plus", 1, "paid-low"),
    plan("chatgpt-pro", "Pro", 2, "paid-high"),
  ]),
  platform("claude", "Claude", [
    plan("claude-free", "Free", 0, "free"),
    plan("claude-pro", "Pro", 1, "paid-low"),
    plan("claude-max", "Max", 2, "paid-high"),
  ]),
  platform("gemini", "Gemini", [
    plan("gemini-free", "Free", 0, "free"),
    plan("gemini-advanced", "Advanced", 1, "paid-low"),
  ]),
  platform("perplexity", "Perplexity", [
    plan("perplexity-free", "Free", 0, "free"),
    plan("perplexity-pro", "Pro", 1, "paid-low"),
  ]),
  platform("grok", "Grok", [
    plan("grok-free", "Free", 0, "free"),
    plan("supergrok", "SuperGrok", 1, "paid-mid"),
    plan("supergrok-heavy", "SuperGrok Heavy", 2, "paid-high"),
  ]),
  platform("copilot", "Copilot", [
    plan("copilot-free", "Free", 0, "free"),
    plan("copilot-pro", "Pro", 1, "paid-low"),
    plan("copilot-pro-plus", "Pro+", 2, "paid-mid"),
  ]),
  platform("midjourney", "Midjourney", [
    plan("midjourney-basic", "Basic", 0, "paid-low"),
    plan("midjourney-standard", "Standard", 1, "paid-mid"),
    plan("midjourney-pro", "Pro", 2, "paid-mid"),
  ]),
  platform("lovable", "Lovable", [
    plan("lovable-free", "Free", 0, "free"),
    plan("lovable-pro", "Pro", 1, "paid-mid"),
  ]),
  platform("v0", "v0", [
    plan("v0-free", "Free", 0, "free"),
    plan("v0-premium", "Premium", 1, "paid-low"),
  ]),
  platform("replit", "Replit", [
    plan("replit-free", "Free", 0, "free"),
    plan("replit-core", "Core", 1, "paid-low"),
    plan("replit-pro", "Pro", 2, "paid-high"),
  ]),
  platform("elevenlabs", "ElevenLabs", [
    plan("elevenlabs-free", "Free", 0, "free"),
    plan("elevenlabs-creator", "Creator", 1, "paid-mid"),
    plan("elevenlabs-pro", "Pro", 2, "paid-high"),
  ]),
  platform("runway", "Runway", [
    plan("runway-free", "Free", 0, "free"),
    plan("runway-standard", "Standard", 1, "paid-low"),
    plan("runway-pro", "Pro", 2, "paid-mid"),
  ]),
  platform("notion", "Notion", [
    plan("notion-plus", "Plus", 0, "paid-low"),
    plan("notion-business", "Business", 1, "paid-high"),
  ]),
  platform("adobe", "Adobe", [plan("adobe-free", "Free", 0, "free")]),
  platform("anthropic-api", "Anthropic API", [
    plan("anthropic-api", "Pay-as-you-go", 0, "paid-low"),
  ]),
  platform("bolt", "Bolt", [plan("bolt-free", "Free", 0, "free")]),
  platform("canva", "Canva", [plan("canva-free", "Free", 0, "free")]),
  platform("coda", "Coda", [plan("coda-paid", "Paid", 0, "paid-low")]),
  platform("cursor", "Cursor", [plan("cursor-free", "Free", 0, "free")]),
  platform("descript", "Descript", [
    plan("descript-free", "Free", 0, "free"),
  ]),
  platform("figma", "Figma", [
    plan("figma-professional", "Professional", 0, "paid-mid"),
  ]),
  platform("flux", "Flux", [plan("flux-free", "Free", 0, "free")]),
  platform("ideogram", "Ideogram", [
    plan("ideogram-free", "Free", 0, "free"),
  ]),
  platform("luma", "Luma", [plan("luma-free", "Free", 0, "free")]),
  platform("meta", "Meta AI", [
    plan("meta-free", "Free", 0, "free"),
    plan("meta-glasses", "Ray-Ban Meta Glasses", 1, "paid-mid"),
  ]),
  platform("openai-api", "OpenAI API", [
    plan("openai-api", "Pay-as-you-go", 0, "paid-low"),
  ]),
  platform("phind", "Phind", [plan("phind-free", "Free", 0, "free")]),
  platform("pika", "Pika", [plan("pika-free", "Free", 0, "free")]),
  platform("slack", "Slack", [
    plan("slack-ai-addon", "AI Add-on", 0, "paid-mid"),
  ]),
  platform("stable-diffusion", "Stable Diffusion", [
    plan("stable-diffusion-free", "Free", 0, "free"),
  ]),
  platform("suno", "Suno", [plan("suno-free", "Free", 0, "free")]),
  platform("udio", "Udio", [plan("udio-free", "Free", 0, "free")]),
  platform("vertex-ai", "Vertex AI", [
    plan("vertex-ai-payg", "Pay-as-you-go", 0, "paid-low"),
  ]),
  platform("windsurf", "Windsurf", [
    plan("windsurf-free", "Free", 0, "free"),
  ]),
  platform("xai-api", "xAI API", [
    plan("xai-api", "Pay-as-you-go", 0, "paid-low"),
  ]),
  platform("you", "You.com", [plan("you-free", "Free", 0, "free")]),
];

const planById = new Map(
  planPlatforms.flatMap((planPlatform) =>
    planPlatform.plans.map((planOption) => [
      planOption.id,
      { ...planOption, platformId: planPlatform.id },
    ]),
  ),
);

export const defaultUserPreferences: UserPreferences = {
  planSelections: {},
  budget: null,
  onlyShowOwned: false,
  flagBetterOptions: true,
};

function canUseLocalStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function isTier(value: unknown): value is Tier {
  return typeof value === "string" && TIERS.includes(value as Tier);
}

function normalizePlanSelections(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).filter(([platformId, planId]) => {
      if (typeof platformId !== "string" || typeof planId !== "string") {
        return false;
      }

      const planOption = planById.get(planId);

      return Boolean(planOption && planOption.platformId === platformId);
    }),
  );
}

function normalizePreferences(value: unknown): UserPreferences {
  if (!value || typeof value !== "object") {
    return defaultUserPreferences;
  }

  const preferences = value as Partial<UserPreferences>;

  return {
    planSelections: normalizePlanSelections(preferences.planSelections),
    budget:
      preferences.budget === null || isTier(preferences.budget)
        ? preferences.budget
        : defaultUserPreferences.budget,
    onlyShowOwned:
      typeof preferences.onlyShowOwned === "boolean"
        ? preferences.onlyShowOwned
        : defaultUserPreferences.onlyShowOwned,
    flagBetterOptions:
      typeof preferences.flagBetterOptions === "boolean"
        ? preferences.flagBetterOptions
        : defaultUserPreferences.flagBetterOptions,
  };
}

export function getPlanOption(planId: string) {
  return planById.get(planId);
}

export function getPlanPlatformId(planId: string) {
  return getPlanOption(planId)?.platformId;
}

export function hasPlanAccess(
  minimumPlan: string,
  planSelections: Record<string, string>,
) {
  const requiredPlan = getPlanOption(minimumPlan);

  if (!requiredPlan) {
    return Object.values(planSelections).includes(minimumPlan);
  }

  const selectedPlanId = planSelections[requiredPlan.platformId];

  if (!selectedPlanId) {
    return false;
  }

  const selectedPlan = getPlanOption(selectedPlanId);

  return Boolean(
    selectedPlan &&
      selectedPlan.platformId === requiredPlan.platformId &&
      selectedPlan.rank >= requiredPlan.rank,
  );
}

export function loadUserPreferences(): UserPreferences {
  if (!canUseLocalStorage()) {
    return defaultUserPreferences;
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return defaultUserPreferences;
    }

    return normalizePreferences(JSON.parse(storedValue));
  } catch {
    return defaultUserPreferences;
  }
}

export function saveUserPreferences(preferences: UserPreferences) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(normalizePreferences(preferences)),
  );
}

export function updateUserPreferences(
  updates: Partial<UserPreferences>,
): UserPreferences {
  const nextPreferences = normalizePreferences({
    ...loadUserPreferences(),
    ...updates,
  });

  saveUserPreferences(nextPreferences);

  return nextPreferences;
}

export function clearUserPreferences() {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}
