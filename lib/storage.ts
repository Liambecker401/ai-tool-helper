import type { Tier, UserPreferences } from "@/lib/types";

const STORAGE_KEY = "ai-tool-helper:user-preferences";

const TIERS: Tier[] = ["free", "paid-low", "paid-mid", "paid-high"];

export const defaultUserPreferences: UserPreferences = {
  ownedTools: [],
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

function normalizePreferences(value: unknown): UserPreferences {
  if (!value || typeof value !== "object") {
    return defaultUserPreferences;
  }

  const preferences = value as Partial<UserPreferences>;

  return {
    ownedTools: Array.isArray(preferences.ownedTools)
      ? preferences.ownedTools.filter(
          (toolId): toolId is string => typeof toolId === "string",
        )
      : defaultUserPreferences.ownedTools,
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
