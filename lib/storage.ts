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
    plan("chatgpt-go", "Go ($5-8/mo)", 1, "paid-low"),
    plan("chatgpt-plus", "Plus ($20/mo)", 2, "paid-low"),
    plan("chatgpt-pro", "Pro ($200/mo)", 3, "paid-high"),
    plan("chatgpt-team", "Team ($30/user)", 4, "paid-mid"),
    plan("chatgpt-enterprise", "Enterprise (custom)", 5, "paid-high"),
  ]),
  platform("claude", "Claude", [
    plan("claude-free", "Free", 0, "free"),
    plan("claude-pro", "Pro ($20/mo)", 1, "paid-low"),
    plan("claude-max-5x", "Max 5x ($100/mo)", 2, "paid-high"),
    plan("claude-max-20x", "Max 20x ($200/mo)", 3, "paid-high"),
    plan("claude-team", "Team ($25-150/user)", 4, "paid-mid"),
    plan("claude-enterprise", "Enterprise (custom)", 5, "paid-high"),
  ]),
  platform("gemini", "Gemini", [
    plan("gemini-free", "Free", 0, "free"),
    plan("gemini-ai-plus", "AI Plus ($7.99/mo)", 1, "paid-low"),
    plan("gemini-ai-pro", "AI Pro ($19.99/mo)", 2, "paid-low"),
    plan("gemini-ai-ultra", "AI Ultra ($249.99/mo)", 3, "paid-high"),
    plan("gemini-workspace", "Workspace bundled", 4, "paid-mid"),
  ]),
  platform("perplexity", "Perplexity", [
    plan("perplexity-free", "Free", 0, "free"),
    plan("perplexity-education", "Education Pro ($10/mo)", 1, "paid-low"),
    plan("perplexity-pro", "Pro ($20/mo)", 2, "paid-low"),
    plan("perplexity-max", "Max ($200/mo)", 3, "paid-high"),
    plan("perplexity-enterprise-pro", "Enterprise Pro ($40/seat)", 4, "paid-mid"),
    plan("perplexity-enterprise-max", "Enterprise Max ($325/seat)", 5, "paid-high"),
  ]),
  platform("grok", "Grok", [
    plan("grok-free", "Free", 0, "free"),
    plan("x-premium", "X Premium ($8/mo)", 1, "paid-low"),
    plan("x-premium-plus", "X Premium+ ($40/mo)", 2, "paid-mid"),
    plan("supergrok", "SuperGrok ($30/mo)", 3, "paid-mid"),
    plan("supergrok-heavy", "SuperGrok Heavy ($300/mo)", 4, "paid-high"),
    plan("grok-business", "Business ($30/seat)", 5, "paid-mid"),
  ]),
  platform("copilot", "Copilot", [
    plan("copilot-free", "Free", 0, "free"),
    plan("copilot-pro", "Copilot Pro ($22/mo)", 1, "paid-low"),
    plan("copilot-m365-business", "M365 Copilot Business ($21/user)", 2, "paid-mid"),
    plan("copilot-m365-enterprise", "M365 Copilot Enterprise ($30/user)", 3, "paid-mid"),
  ]),
  platform("midjourney", "Midjourney", [
    plan("midjourney-basic", "Basic ($10/mo)", 0, "paid-low"),
    plan("midjourney-standard", "Standard ($30/mo)", 1, "paid-mid"),
    plan("midjourney-pro", "Pro ($60/mo)", 2, "paid-mid"),
    plan("midjourney-mega", "Mega ($120/mo)", 3, "paid-high"),
  ]),
  platform("lovable", "Lovable", [
    plan("lovable-free", "Free", 0, "free"),
    plan("lovable-pro", "Pro ($25/mo)", 1, "paid-mid"),
  ]),
  platform("v0", "v0", [
    plan("v0-free", "Free", 0, "free"),
    plan("v0-premium", "Premium ($20/mo)", 1, "paid-low"),
  ]),
  platform("replit", "Replit", [
    plan("replit-free", "Free", 0, "free"),
    plan("replit-core", "Core ($20/mo)", 1, "paid-low"),
    plan("replit-pro", "Pro ($95/mo)", 2, "paid-high"),
    plan("replit-enterprise", "Enterprise (custom)", 3, "paid-high"),
  ]),
  platform("elevenlabs", "ElevenLabs", [
    plan("elevenlabs-free", "Free", 0, "free"),
    plan("elevenlabs-starter", "Starter ($5/mo)", 1, "paid-low"),
    plan("elevenlabs-creator", "Creator ($22/mo)", 2, "paid-mid"),
    plan("elevenlabs-pro", "Pro ($99/mo)", 3, "paid-high"),
    plan("elevenlabs-business", "Business (custom)", 4, "paid-high"),
  ]),
  platform("runway", "Runway", [
    plan("runway-free", "Free", 0, "free"),
    plan("runway-standard", "Standard ($15/mo)", 1, "paid-low"),
    plan("runway-pro", "Pro ($35/mo)", 2, "paid-mid"),
    plan("runway-business", "Business (custom)", 3, "paid-high"),
  ]),
  platform("notion", "Notion", [
    plan("notion-free", "Free", 0, "free"),
    plan("notion-plus", "Plus", 1, "paid-low"),
    plan("notion-business", "Business ($20/user)", 2, "paid-high"),
    plan("notion-enterprise", "Enterprise (custom)", 3, "paid-high"),
  ]),
  platform("adobe", "Adobe", [
    plan("adobe-firefly-free", "Firefly Free", 0, "free"),
    plan("adobe-firefly-premium", "Firefly Premium ($13/mo)", 1, "paid-low"),
    plan("adobe-creative-cloud", "Creative Cloud All Apps ($60/mo)", 2, "paid-mid"),
    plan("adobe-enterprise", "Enterprise (custom)", 3, "paid-high"),
  ]),
  platform("anthropic-api", "Anthropic API", [
    plan("anthropic-api", "Pay-as-you-go", 0, "paid-low"),
  ]),
  platform("bolt", "Bolt", [
    plan("bolt-free", "Free", 0, "free"),
    plan("bolt-pro", "Pro ($25/mo)", 1, "paid-mid"),
    plan("bolt-teams", "Teams ($30/user)", 2, "paid-mid"),
  ]),
  platform("canva", "Canva", [
    plan("canva-free", "Free", 0, "free"),
    plan("canva-pro", "Pro ($15/mo)", 1, "paid-low"),
    plan("canva-teams", "Teams ($10/user)", 2, "paid-low"),
  ]),
  platform("coda", "Coda", [plan("coda-paid", "Paid", 0, "paid-low")]),
  platform("cursor", "Cursor", [
    plan("cursor-free", "Free", 0, "free"),
    plan("cursor-pro", "Pro ($20/mo)", 1, "paid-low"),
    plan("cursor-business", "Business ($40/user)", 2, "paid-mid"),
  ]),
  platform("descript", "Descript", [
    plan("descript-free", "Free", 0, "free"),
    plan("descript-hobbyist", "Hobbyist ($12/mo)", 1, "paid-low"),
    plan("descript-creator", "Creator ($24/mo)", 2, "paid-mid"),
    plan("descript-business", "Business ($40/mo)", 3, "paid-mid"),
  ]),
  platform("figma", "Figma", [
    plan("figma-free", "Free", 0, "free"),
    plan("figma-professional", "Professional ($15/user)", 1, "paid-low"),
    plan("figma-organization", "Organization ($45/user)", 2, "paid-mid"),
    plan("figma-enterprise", "Enterprise (custom)", 3, "paid-high"),
  ]),
  platform("flux", "Flux", [plan("flux-free", "Free", 0, "free")]),
  platform("ideogram", "Ideogram", [
    plan("ideogram-free", "Free", 0, "free"),
    plan("ideogram-plus", "Plus ($8/mo)", 1, "paid-low"),
    plan("ideogram-pro", "Pro ($20/mo)", 2, "paid-low"),
  ]),
  platform("luma", "Luma", [
    plan("luma-free", "Free", 0, "free"),
    plan("luma-standard", "Standard ($10/mo)", 1, "paid-low"),
    plan("luma-pro", "Pro ($30/mo)", 2, "paid-mid"),
  ]),
  platform("mistral", "Mistral", [
    plan("mistral-free", "Le Chat Free", 0, "free"),
    plan("mistral-pro", "Le Chat Pro ($14.99/mo)", 1, "paid-low"),
    plan("mistral-api", "API (pay-as-you-go)", 2, "paid-low"),
  ]),
  platform("meta", "Meta AI", [
    plan("meta-free", "Free", 0, "free"),
    plan("meta-glasses", "Ray-Ban Meta Glasses", 1, "paid-mid"),
  ]),
  platform("openai-api", "OpenAI API", [
    plan("openai-api", "Pay-as-you-go", 0, "paid-low"),
  ]),
  platform("phind", "Phind", [
    plan("phind-free", "Free", 0, "free"),
    plan("phind-pro", "Pro ($20/mo)", 1, "paid-low"),
  ]),
  platform("pika", "Pika", [
    plan("pika-free", "Free", 0, "free"),
    plan("pika-standard", "Standard ($8/mo)", 1, "paid-low"),
    plan("pika-pro", "Pro ($28/mo)", 2, "paid-mid"),
  ]),
  platform("slack", "Slack", [
    plan("slack-pro", "Slack Pro ($7.25/user)", 0, "paid-low"),
    plan("slack-business", "Business+ ($12.50/user)", 1, "paid-low"),
    plan("slack-ai-addon", "AI Add-on (additional per seat)", 2, "paid-mid"),
  ]),
  platform("stable-diffusion", "Stable Diffusion", [
    plan("stable-diffusion-free", "Free/Open Source", 0, "free"),
    plan("stable-diffusion-api", "API (pay-as-you-go per image)", 1, "paid-low"),
  ]),
  platform("suno", "Suno", [
    plan("suno-free", "Free", 0, "free"),
    plan("suno-pro", "Pro ($8/mo)", 1, "paid-low"),
    plan("suno-premier", "Premier ($24/mo)", 2, "paid-mid"),
  ]),
  platform("udio", "Udio", [
    plan("udio-free", "Free", 0, "free"),
    plan("udio-standard", "Standard ($10/mo)", 1, "paid-low"),
    plan("udio-pro", "Pro ($30/mo)", 2, "paid-mid"),
  ]),
  platform("vertex-ai", "Vertex AI", [
    plan("vertex-ai-payg", "Pay-as-you-go", 0, "paid-low"),
  ]),
  platform("windsurf", "Windsurf", [
    plan("windsurf-free", "Free", 0, "free"),
    plan("windsurf-pro", "Pro ($15/mo)", 1, "paid-low"),
    plan("windsurf-team", "Team ($35/user)", 2, "paid-mid"),
  ]),
  platform("xai-api", "xAI API", [
    plan("xai-api", "Pay-as-you-go", 0, "paid-low"),
  ]),
  platform("you", "You.com", [
    plan("you-free", "Free", 0, "free"),
    plan("you-pro", "Pro ($20/mo)", 1, "paid-low"),
  ]),
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
