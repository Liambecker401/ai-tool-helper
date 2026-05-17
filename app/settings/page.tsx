"use client";

import { useEffect, useMemo, useState } from "react";

import toolsJson from "@/data/tools.json";
import {
  defaultUserPreferences,
  hasPlanAccess,
  loadUserPreferences,
  planPlatforms,
  saveUserPreferences,
} from "@/lib/storage";
import type { Tier, Tool, UserPreferences } from "@/lib/types";

const tools = toolsJson as Tool[];

const budgetOptions: { value: Tier | "any"; label: string; helper: string }[] = [
  { value: "any", label: "Any budget", helper: "Show every plan" },
  { value: "free", label: "Free ($0)", helper: "Only free plans" },
  {
    value: "paid-low",
    label: "Low ($1-24/mo)",
    helper: "Free and individual starter plans",
  },
  {
    value: "paid-mid",
    label: "Mid ($25-99/mo)",
    helper: "Free, low-cost, creator, and team plans",
  },
  {
    value: "paid-high",
    label: "High ($100+/mo or custom)",
    helper: "All paid, heavy, and enterprise plans",
  },
];

const tierRank: Record<Tier, number> = {
  free: 0,
  "paid-low": 1,
  "paid-mid": 2,
  "paid-high": 3,
};

function getToolsForPlan(planId: string) {
  return tools.filter((tool) => tool.plansRequired.minimumPlan === planId);
}

function planFitsBudget(planTier: Tier, budget: Tier | null) {
  return !budget || tierRank[planTier] <= tierRank[budget];
}

export default function SettingsPage() {
  const [preferences, setPreferences] = useState<UserPreferences>(
    defaultUserPreferences,
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setPreferences(loadUserPreferences());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveUserPreferences(preferences);
    }
  }, [isLoaded, preferences]);

  const accessibleToolCount = useMemo(() => {
    return tools.filter((tool) =>
      hasPlanAccess(
        tool.plansRequired.minimumPlan,
        preferences.planSelections,
      ),
    ).length;
  }, [preferences.planSelections]);

  const filteredPlanPlatforms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const selectedBudgetFilter = preferences.budget;

    return planPlatforms
      .map((planPlatform) => ({
        ...planPlatform,
        plans: planPlatform.plans.filter((planOption) =>
          planFitsBudget(planOption.tier, selectedBudgetFilter),
        ),
      }))
      .filter((planPlatform) => {
        if (!planPlatform.plans.length) {
          return false;
        }

        if (!normalizedQuery) {
          return true;
        }

        const platformTools = planPlatform.plans.flatMap((planOption) =>
          getToolsForPlan(planOption.id),
        );
        const searchableText = [
          planPlatform.label,
          ...planPlatform.plans.map((planOption) => planOption.label),
          ...platformTools.flatMap((tool) => [tool.name, tool.provider]),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      });
  }, [preferences.budget, query]);

  function updatePreferences(updates: Partial<UserPreferences>) {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      ...updates,
    }));
  }

  function selectPlan(platformId: string, planId: string) {
    const planSelections = { ...preferences.planSelections };

    if (planId) {
      planSelections[platformId] = planId;
    } else {
      delete planSelections[platformId];
    }

    updatePreferences({ planSelections });
  }

  function setBudget(value: string) {
    const budget = value === "any" ? null : (value as Tier);
    const planSelections = Object.fromEntries(
      Object.entries(preferences.planSelections).filter(
        ([platformId, selectedPlanId]) => {
          const planPlatform = planPlatforms.find(
            (platform) => platform.id === platformId,
          );
          const selectedPlan = planPlatform?.plans.find(
            (planOption) => planOption.id === selectedPlanId,
          );

          return selectedPlan && planFitsBudget(selectedPlan.tier, budget);
        },
      ),
    );

    updatePreferences({
      budget,
      planSelections,
    });
  }

  function clearPlanSelections() {
    updatePreferences({ planSelections: {} });
  }

  function selectFreePlans() {
    updatePreferences({
      planSelections: Object.fromEntries(
        planPlatforms.flatMap((planPlatform) => {
          const freePlan = planPlatform.plans.find(
            (planOption) => planOption.tier === "free",
          );

          return freePlan ? [[planPlatform.id, freePlan.id]] : [];
        }),
      ),
    });
  }

  const selectedBudget = preferences.budget ?? "any";
  const selectedPlanCount = Object.keys(preferences.planSelections).length;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10">
      <section>
        <p className="text-sm font-medium text-muted-foreground">Settings</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Plan access
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Pick the exact plans you have. These selections are saved locally
              in this browser and used to filter recommendations.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {selectedPlanCount} plans selected · {accessibleToolCount} tools
            accessible
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-4 text-card-foreground">
          <label className="text-sm font-medium" htmlFor="budget">
            Budget preference
          </label>
          <select
            className="mt-3 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            id="budget"
            onChange={(event) => setBudget(event.target.value)}
            value={selectedBudget}
          >
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-muted-foreground">
            {
              budgetOptions.find((option) => option.value === selectedBudget)
                ?.helper
            }
          </p>
        </div>

        <div className="rounded-lg border bg-card p-4 text-card-foreground">
          <p className="text-sm font-medium">Recommendation behavior</p>
          <div className="mt-4 grid gap-3">
            <label className="flex items-start gap-3 text-sm">
              <input
                checked={preferences.onlyShowOwned}
                className="mt-1 size-4"
                onChange={(event) =>
                  updatePreferences({ onlyShowOwned: event.target.checked })
                }
                type="checkbox"
              />
              <span>
                <span className="block font-medium">
                  Only show tools in my selected plans
                </span>
                <span className="text-muted-foreground">
                  Hide recommendations that require a different plan.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm">
              <input
                checked={preferences.flagBetterOptions}
                className="mt-1 size-4"
                onChange={(event) =>
                  updatePreferences({
                    flagBetterOptions: event.target.checked,
                  })
                }
                type="checkbox"
              />
              <span>
                <span className="block font-medium">
                  Flag better options outside my subscriptions
                </span>
                <span className="text-muted-foreground">
                  Keep upgrade-worthy matches visible when relevant.
                </span>
              </span>
            </label>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Platform plans
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose the highest plan you have for each platform. The budget
              preference filters which plan choices are shown here.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className="h-9 rounded-md border px-3 text-sm hover:bg-muted"
              onClick={selectFreePlans}
              type="button"
            >
              Select free plans
            </button>
            <button
              className="h-9 rounded-md border px-3 text-sm hover:bg-muted"
              onClick={clearPlanSelections}
              type="button"
            >
              Clear
            </button>
          </div>
        </div>

        <label className="sr-only" htmlFor="plan-search">
          Search platforms
        </label>
        <input
          className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          id="plan-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search platforms, plans, or tools"
          type="search"
          value={query}
        />

        <div className="grid gap-3 md:grid-cols-2">
          {filteredPlanPlatforms.map((planPlatform) => {
            const savedPlanId = preferences.planSelections[planPlatform.id];
            const selectedPlanId =
              savedPlanId &&
              planPlatform.plans.some(
                (planOption) => planOption.id === savedPlanId,
              )
                ? savedPlanId
                : "";
            const includedTools = planPlatform.plans.flatMap((planOption) =>
              getToolsForPlan(planOption.id),
            );

            return (
              <div
                className="rounded-lg border bg-card p-4 text-card-foreground"
                key={planPlatform.id}
              >
                <label
                  className="text-sm font-medium"
                  htmlFor={`plan-${planPlatform.id}`}
                >
                  {planPlatform.label}
                </label>
                <select
                  className="mt-3 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  id={`plan-${planPlatform.id}`}
                  onChange={(event) =>
                    selectPlan(planPlatform.id, event.target.value)
                  }
                  value={selectedPlanId}
                >
                  <option value="">No plan selected</option>
                  {planPlatform.plans.map((planOption) => (
                    <option key={planOption.id} value={planOption.id}>
                      {planOption.label}
                    </option>
                  ))}
                </select>
                <p className="mt-3 text-sm text-muted-foreground">
                  {includedTools.length
                    ? `${includedTools.length} tool modes mapped here`
                    : "No tool modes currently mapped here"}
                </p>
                {includedTools.length > 0 && (
                  <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                    {includedTools.map((tool) => tool.name).join(", ")}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
