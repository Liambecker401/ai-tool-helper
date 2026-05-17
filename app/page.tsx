"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  RefreshCcw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getTools, matchTools } from "@/lib/matcher";
import {
  defaultUserPreferences,
  getPlanOption,
  hasPlanAccess,
  loadUserPreferences,
} from "@/lib/storage";
import { cn } from "@/lib/utils";
import type {
  Frequency,
  IntakeAnswers,
  RecommendationResult,
  SkillLevel,
  TaskCategory,
  Tool,
  UserPreferences,
} from "@/lib/types";

type StepIndex = 0 | 1 | 2 | 3;

type TaskOption = {
  label: string;
  value: TaskCategory | null;
};

type FrequencyOption = {
  label: string;
  value: Frequency;
};

type SkillOption = {
  label: string;
  value: SkillLevel;
};

type RecommendationWithTool = RecommendationResult & {
  tool: Tool;
};

const taskOptions: TaskOption[] = [
  { label: "Build something", value: "build" },
  { label: "Research or learn", value: "research" },
  { label: "Write or edit", value: "write" },
  { label: "Analyze data", value: "analyze" },
  { label: "Automate a task", value: "automate" },
  { label: "Write a script or code", value: "code" },
  { label: "Other", value: null },
];

const frequencyOptions: FrequencyOption[] = [
  { label: "Just once", value: "once" },
  { label: "A few times", value: "occasional" },
  { label: "Ongoing", value: "ongoing" },
];

const skillOptions: SkillOption[] = [
  { label: "No technical experience", value: "beginner" },
  { label: "Can follow instructions", value: "some" },
  { label: "Comfortable with technical tools", value: "technical" },
];

const steps = [
  "Task",
  "Frequency",
  "Experience",
  "Details",
] as const;

const initialAnswers: IntakeAnswers = {
  taskCategory: null,
  frequency: null,
  skillLevel: null,
  ephemerality: null,
  budget: null,
  freeText: "",
};

function getEphemeralityForFrequency(frequency: Frequency | null) {
  if (frequency === "once") {
    return "throwaway";
  }

  if (frequency === "occasional") {
    return "project";
  }

  if (frequency === "ongoing") {
    return "production";
  }

  return null;
}

function getPlanBadge(
  result: RecommendationWithTool,
  preferences: UserPreferences,
) {
  const requiredPlan = getPlanOption(result.tool.plansRequired.minimumPlan);
  const requiredTier = requiredPlan?.tier ?? "paid-mid";
  const hasAnyPlanPreference =
    Object.keys(preferences.planSelections).length > 0 ||
    preferences.budget !== null;
  const hasAccess = hasPlanAccess(
    result.tool.plansRequired.minimumPlan,
    preferences.planSelections,
  );
  const shouldUpgrade =
    hasAnyPlanPreference &&
    result.requiresUpgrade &&
    (requiredTier !== "free" || !result.withinBudget) &&
    !hasAccess;

  if (shouldUpgrade) {
    return {
      label: `Upgrade: ${result.tool.plansRequired.planLabel}`,
      className:
        "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200",
    };
  }

  if (!result.withinBudget) {
    return {
      label: `Above budget: ${result.tool.plansRequired.planLabel}`,
      className:
        "border-orange-300 bg-orange-50 text-orange-900 dark:border-orange-500/40 dark:bg-orange-500/10 dark:text-orange-200",
    };
  }

  if (hasAccess) {
    return {
      label: `Included: ${result.tool.plansRequired.planLabel}`,
      className:
        "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200",
    };
  }

  return {
    label: result.tool.plansRequired.planLabel,
    className:
      "border-border bg-secondary text-secondary-foreground dark:bg-secondary/50",
  };
}

function ProgressIndicator({ currentStep }: { currentStep: StepIndex }) {
  return (
    <ol className="grid gap-2 sm:grid-cols-4" aria-label="Recommendation steps">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isComplete = index < currentStep;

        return (
          <li
            className={cn(
              "flex min-h-12 items-center gap-3 rounded-md border px-3 py-2 text-sm",
              isActive && "border-primary bg-primary text-primary-foreground",
              isComplete && "border-emerald-200 bg-emerald-50 text-emerald-900",
            )}
            key={step}
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                isActive && "border-primary-foreground",
                isComplete && "border-emerald-600 bg-emerald-600 text-white",
              )}
            >
              {isComplete ? <Check className="size-3.5" /> : index + 1}
            </span>
            <span>{step}</span>
          </li>
        );
      })}
    </ol>
  );
}

function OptionButton<T extends string | null>({
  label,
  selected,
  value,
  onSelect,
}: {
  label: string;
  selected: boolean;
  value: T;
  onSelect: (value: T) => void;
}) {
  return (
    <button
      className={cn(
        "min-h-12 rounded-md border bg-background px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        selected && "border-primary bg-primary text-primary-foreground",
      )}
      onClick={() => onSelect(value)}
      type="button"
    >
      {label}
    </button>
  );
}

function PlanBadge({
  result,
  preferences,
}: {
  result: RecommendationWithTool;
  preferences: UserPreferences;
}) {
  const badge = getPlanBadge(result, preferences);

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-xs font-medium",
        badge.className,
      )}
    >
      {badge.label}
    </span>
  );
}

function PromptTemplate({
  prompt,
  copied,
  onCopy,
}: {
  prompt: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="rounded-md border bg-muted/40 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">Prompt template</p>
        <Button onClick={onCopy} size="sm" type="button" variant="outline">
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{prompt}</p>
    </div>
  );
}

function AccessSteps({ tool }: { tool: Tool }) {
  return (
    <div className="grid gap-3">
      <div>
        <p className="text-sm font-medium">How to access it</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {tool.accessSteps[0] ?? "Open the tool and start a new task."}
        </p>
      </div>
      <div>
        <p className="text-sm font-medium">Step by step</p>
        <ol className="mt-2 grid gap-2 text-sm leading-6 text-muted-foreground">
          {tool.accessSteps.map((step, index) => (
            <li className="flex gap-2" key={`${tool.id}-step-${step}`}>
              <span className="font-medium text-foreground">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
          <li className="flex gap-2">
            <span className="font-medium text-foreground">
              {tool.accessSteps.length + 1}.
            </span>
            <span>Paste the prompt template and replace any task details.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-medium text-foreground">
              {tool.accessSteps.length + 2}.
            </span>
            <span>Review the answer, then ask for revisions or next steps.</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function PrimaryRecommendation({
  result,
  preferences,
  copiedPromptId,
  onCopyPrompt,
}: {
  result: RecommendationWithTool;
  preferences: UserPreferences;
  copiedPromptId: string | null;
  onCopyPrompt: (tool: Tool) => void;
}) {
  return (
    <section className="rounded-md border bg-card p-5 text-card-foreground shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Best match
          </p>
          <h2 className="mt-2 text-2xl font-semibold">{result.tool.name}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            {result.reasoning}
          </p>
        </div>
        <PlanBadge result={result} preferences={preferences} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <AccessSteps tool={result.tool} />
        <div className="grid content-start gap-3">
          <PromptTemplate
            copied={copiedPromptId === result.tool.id}
            onCopy={() => onCopyPrompt(result.tool)}
            prompt={result.tool.promptTemplate}
          />
          <div className="rounded-md border bg-background p-3">
            <p className="text-sm font-medium">Usage fit</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {result.estimatedUsage}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecondaryRecommendation({
  result,
  preferences,
  expanded,
  copiedPromptId,
  onCopyPrompt,
  onToggle,
}: {
  result: RecommendationWithTool;
  preferences: UserPreferences;
  expanded: boolean;
  copiedPromptId: string | null;
  onCopyPrompt: (tool: Tool) => void;
  onToggle: () => void;
}) {
  return (
    <article className="rounded-md border bg-card p-4 text-card-foreground">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            Alternative {result.rank}
          </p>
          <h3 className="mt-2 text-lg font-semibold">{result.tool.name}</h3>
        </div>
        <Button onClick={onToggle} size="sm" type="button" variant="outline">
          {expanded ? (
            <ChevronUp className="size-3.5" />
          ) : (
            <ChevronDown className="size-3.5" />
          )}
          {expanded ? "Collapse" : "Expand"}
        </Button>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {result.reasoning}
      </p>
      {expanded && (
        <div className="mt-4 grid gap-4 border-t pt-4">
          <PlanBadge result={result} preferences={preferences} />
          <AccessSteps tool={result.tool} />
          <PromptTemplate
            copied={copiedPromptId === result.tool.id}
            onCopy={() => onCopyPrompt(result.tool)}
            prompt={result.tool.promptTemplate}
          />
        </div>
      )}
    </article>
  );
}

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<StepIndex>(0);
  const [answers, setAnswers] = useState<IntakeAnswers>(initialAnswers);
  const [hasTaskSelection, setHasTaskSelection] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>(
    defaultUserPreferences,
  );
  const [recommendations, setRecommendations] = useState<
    RecommendationWithTool[]
  >([]);
  const [expandedToolIds, setExpandedToolIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const toolsById = useMemo(() => {
    return new Map(getTools().map((tool) => [tool.id, tool]));
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPreferences(loadUserPreferences());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function setTaskCategory(taskCategory: TaskCategory | null) {
    setHasTaskSelection(true);
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      taskCategory,
    }));
  }

  function setFrequency(frequency: Frequency) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      frequency,
      ephemerality: getEphemeralityForFrequency(frequency),
    }));
  }

  function setSkillLevel(skillLevel: SkillLevel) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      skillLevel,
    }));
  }

  function goNext() {
    setCurrentStep((step) => Math.min(step + 1, 3) as StepIndex);
  }

  function goBack() {
    setCurrentStep((step) => Math.max(step - 1, 0) as StepIndex);
  }

  function skipToDetails() {
    setHasTaskSelection(false);
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      taskCategory: null,
    }));
    setCurrentStep(3);
  }

  function getRecommendationSet() {
    const intake: IntakeAnswers = {
      ...answers,
      budget: preferences.budget,
      freeText: answers.freeText.trim(),
    };
    const recommendationPreferences = {
      ...preferences,
      onlyShowOwned: false,
    };

    return matchTools(intake, recommendationPreferences)
      .map((result) => {
        const tool = toolsById.get(result.toolId);

        return tool ? { ...result, tool } : null;
      })
      .filter((result): result is RecommendationWithTool => Boolean(result));
  }

  function submit() {
    const nextRecommendations = getRecommendationSet();

    setRecommendations(nextRecommendations);
    setExpandedToolIds(new Set());
    setCopiedPromptId(null);
    setFeedback(null);
    setHasSubmitted(true);
  }

  function tryAgain() {
    setHasSubmitted(false);
    setAnswers(initialAnswers);
    setHasTaskSelection(false);
    setRecommendations([]);
    setExpandedToolIds(new Set());
    setCopiedPromptId(null);
    setFeedback(null);
    setCurrentStep(0);
  }

  function toggleExpanded(toolId: string) {
    setExpandedToolIds((currentToolIds) => {
      const nextToolIds = new Set(currentToolIds);

      if (nextToolIds.has(toolId)) {
        nextToolIds.delete(toolId);
      } else {
        nextToolIds.add(toolId);
      }

      return nextToolIds;
    });
  }

  async function copyPrompt(tool: Tool) {
    await navigator.clipboard.writeText(tool.promptTemplate);
    setCopiedPromptId(tool.id);
  }

  const canContinue =
    (currentStep === 0 && hasTaskSelection) ||
    (currentStep === 1 && Boolean(answers.frequency)) ||
    (currentStep === 2 && Boolean(answers.skillLevel));
  const canSubmit = answers.freeText.trim().length > 0;
  const primaryRecommendation = recommendations[0];
  const secondaryRecommendations = recommendations.slice(1, 3);

  if (hasSubmitted) {
    return (
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
        <section>
          <p className="text-sm font-medium text-muted-foreground">
            Recommendation
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Your best AI workflow</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Ranked from the tools knowledge base using your task details,
                experience level, usage frequency, and saved plan preferences.
              </p>
            </div>
            <Button onClick={tryAgain} type="button" variant="outline">
              <RefreshCcw className="size-4" />
              Try Again
            </Button>
          </div>
        </section>

        {primaryRecommendation ? (
          <>
            <PrimaryRecommendation
              copiedPromptId={copiedPromptId}
              onCopyPrompt={copyPrompt}
              preferences={preferences}
              result={primaryRecommendation}
            />

            <section className="grid gap-4 md:grid-cols-2">
              {secondaryRecommendations.map((result) => (
                <SecondaryRecommendation
                  copiedPromptId={copiedPromptId}
                  expanded={expandedToolIds.has(result.tool.id)}
                  key={result.tool.id}
                  onCopyPrompt={copyPrompt}
                  onToggle={() => toggleExpanded(result.tool.id)}
                  preferences={preferences}
                  result={result}
                />
              ))}
            </section>

            <section className="flex flex-col gap-3 rounded-md border bg-card p-4 text-card-foreground sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Was this recommendation useful?
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setFeedback("up")}
                  type="button"
                  variant={feedback === "up" ? "default" : "outline"}
                >
                  <ThumbsUp className="size-4" />
                  Thumbs up
                </Button>
                <Button
                  onClick={() => setFeedback("down")}
                  type="button"
                  variant={feedback === "down" ? "default" : "outline"}
                >
                  <ThumbsDown className="size-4" />
                  Thumbs down
                </Button>
                <Button onClick={tryAgain} type="button" variant="outline">
                  <RefreshCcw className="size-4" />
                  Try Again
                </Button>
              </div>
            </section>
          </>
        ) : (
          <section className="rounded-md border bg-card p-6 text-card-foreground">
            <h2 className="text-xl font-semibold">No strong match yet</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Add a little more detail about the output you want, the app or
              file you are working with, and whether this is a one-time task or
              an ongoing workflow.
            </p>
            <Button className="mt-5" onClick={tryAgain} type="button">
              <RefreshCcw className="size-4" />
              Try Again
            </Button>
          </section>
        )}
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10">
      <section>
        <p className="text-sm font-medium text-muted-foreground">
          Recommendation engine
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Find the right AI tool</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
          Answer a few quick questions and get a specific tool, access path,
          workflow, and prompt template for the task in front of you.
        </p>
      </section>

      <ProgressIndicator currentStep={currentStep} />

      <section className="rounded-md border bg-card p-5 text-card-foreground shadow-sm">
        {currentStep === 0 && (
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Step 1
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  What kind of task?
                </h2>
              </div>
              <Button onClick={skipToDetails} type="button" variant="outline">
                Skip
              </Button>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {taskOptions.map((option) => (
                <OptionButton
                  key={option.label}
                  label={option.label}
                  onSelect={setTaskCategory}
                  selected={
                    hasTaskSelection && answers.taskCategory === option.value
                  }
                  value={option.value}
                />
              ))}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <p className="text-sm font-medium text-muted-foreground">Step 2</p>
            <h2 className="mt-2 text-2xl font-semibold">
              How often will you do this?
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {frequencyOptions.map((option) => (
                <OptionButton
                  key={option.value}
                  label={option.label}
                  onSelect={setFrequency}
                  selected={answers.frequency === option.value}
                  value={option.value}
                />
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <p className="text-sm font-medium text-muted-foreground">Step 3</p>
            <h2 className="mt-2 text-2xl font-semibold">
              Your experience level?
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {skillOptions.map((option) => (
                <OptionButton
                  key={option.value}
                  label={option.label}
                  onSelect={setSkillLevel}
                  selected={answers.skillLevel === option.value}
                  value={option.value}
                />
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <p className="text-sm font-medium text-muted-foreground">Step 4</p>
            <label className="mt-2 block text-2xl font-semibold" htmlFor="task">
              Describe what you need in 1-3 sentences
            </label>
            <textarea
              className="mt-6 min-h-36 w-full resize-y rounded-md border bg-background px-3 py-3 text-sm leading-6 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              id="task"
              onChange={(event) =>
                setAnswers((currentAnswers) => ({
                  ...currentAnswers,
                  freeText: event.target.value,
                }))
              }
              placeholder="Example: I need to turn a messy spreadsheet of customer survey responses into themes, charts, and a short summary for my team."
              value={answers.freeText}
            />
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Button
            disabled={currentStep === 0}
            onClick={goBack}
            type="button"
            variant="outline"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>

          {currentStep < 3 && canContinue && (
            <Button onClick={goNext} type="button">
              Next
              <ArrowRight className="size-4" />
            </Button>
          )}

          {currentStep === 3 && canSubmit && (
            <Button onClick={submit} type="button">
              Get Recommendation
              <ArrowRight className="size-4" />
            </Button>
          )}
        </div>
      </section>
    </main>
  );
}
