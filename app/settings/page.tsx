"use client";

import { useEffect, useMemo, useState } from "react";

import toolsJson from "@/data/tools.json";
import {
  defaultUserPreferences,
  loadUserPreferences,
  saveUserPreferences,
} from "@/lib/storage";
import type { Tier, Tool, UserPreferences } from "@/lib/types";
import { cn } from "@/lib/utils";

const tools = toolsJson as Tool[];

const budgetOptions: { value: Tier | "any"; label: string; helper: string }[] = [
  { value: "any", label: "Any budget", helper: "Show every suitable tool" },
  { value: "free", label: "Free", helper: "Prefer free tiers only" },
  { value: "paid-low", label: "Low", helper: "Up to roughly $20/month" },
  { value: "paid-mid", label: "Mid", helper: "Team or creator plans" },
  { value: "paid-high", label: "High", helper: "Pro, heavy, or enterprise use" },
];

function getToolSummary(tool: Tool) {
  const tier = tool.tiers[0]?.label ?? "Pricing varies";
  const categories = tool.categories.slice(0, 3).join(", ");

  return `${tool.provider} · ${categories} · ${tier}`;
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

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return tools;
    }

    return tools.filter((tool) => {
      const searchableText = [
        tool.name,
        tool.provider,
        ...tool.categories,
        ...tool.tags,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [query]);

  function updatePreferences(updates: Partial<UserPreferences>) {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      ...updates,
    }));
  }

  function toggleOwnedTool(toolId: string) {
    const ownedTools = preferences.ownedTools.includes(toolId)
      ? preferences.ownedTools.filter((ownedToolId) => ownedToolId !== toolId)
      : [...preferences.ownedTools, toolId];

    updatePreferences({ ownedTools });
  }

  function setBudget(value: string) {
    updatePreferences({
      budget: value === "any" ? null : (value as Tier),
    });
  }

  function clearOwnedTools() {
    updatePreferences({ ownedTools: [] });
  }

  function selectFreeTools() {
    updatePreferences({
      ownedTools: tools
        .filter((tool) =>
          tool.tiers.some((tierRequirement) => tierRequirement.tier === "free"),
        )
        .map((tool) => tool.id),
    });
  }

  const selectedBudget = preferences.budget ?? "any";

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10">
      <section>
        <p className="text-sm font-medium text-muted-foreground">Settings</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Preferences
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Saved locally in this browser for recommendation filtering.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {preferences.ownedTools.length} owned
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
                  Only show tools I have
                </span>
                <span className="text-muted-foreground">
                  Hide recommendations outside your owned list.
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
              Owned tools
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Select the tools and modes you can already access.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className="h-9 rounded-md border px-3 text-sm hover:bg-muted"
              onClick={selectFreeTools}
              type="button"
            >
              Select free tools
            </button>
            <button
              className="h-9 rounded-md border px-3 text-sm hover:bg-muted"
              onClick={clearOwnedTools}
              type="button"
            >
              Clear
            </button>
          </div>
        </div>

        <label className="sr-only" htmlFor="tool-search">
          Search tools
        </label>
        <input
          className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          id="tool-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search tools by name, provider, category, or tag"
          type="search"
          value={query}
        />

        <div className="grid gap-3 md:grid-cols-2">
          {filteredTools.map((tool) => {
            const isOwned = preferences.ownedTools.includes(tool.id);

            return (
              <label
                className={cn(
                  "flex min-h-24 cursor-pointer gap-3 rounded-lg border bg-card p-4 text-sm text-card-foreground transition-colors",
                  isOwned && "border-primary bg-muted",
                )}
                key={tool.id}
              >
                <input
                  checked={isOwned}
                  className="mt-1 size-4"
                  onChange={() => toggleOwnedTool(tool.id)}
                  type="checkbox"
                />
                <span className="min-w-0">
                  <span className="block font-medium">{tool.name}</span>
                  <span className="mt-1 block text-muted-foreground">
                    {getToolSummary(tool)}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </section>
    </main>
  );
}
