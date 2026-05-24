"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ChallengeHeader } from "@/components/ChallengeHeader";
import { ChallengeSidebar } from "@/components/ChallengeSidebar";
import { ChallengeTaskList } from "@/components/ChallengeTaskList";
import { challengeTabs, defaultSeasonId, getTabCompletion, seasons } from "@/lib";
import { useChallengeProgress } from "@/hooks";
import { ChallengeCategory } from "@/types";

export function ChallengeCheckerPage() {
  const t = useTranslations();
  const [seasonId, setSeasonId] = useState(defaultSeasonId);
  const [activeTab, setActiveTab] = useState<ChallengeCategory>("weekly-score");

  const season = seasons.find((value) => value.id === seasonId) ?? seasons[0];
  const seasonTasks = useMemo(
    () => season.categories.flatMap((category) => category.tasks),
    [season.categories],
  );
  const weeklyScoreTaskIds = useMemo(
    () => season.categories.find((c) => c.id === "weekly-score")?.tasks.map((t) => t.id) ?? [],
    [season.categories],
  );
  const { achievedTaskIds, checkedTaskIds, toggleTask } = useChallengeProgress(seasonTasks, weeklyScoreTaskIds);

  const completionByTab = useMemo(
    () =>
      challengeTabs.reduce(
        (acc, tab) => {
          acc[tab.id] = getTabCompletion(season.categories, achievedTaskIds, tab.id);
          return acc;
        },
        {
          "weekly-score": { completed: 0, total: 0, rate: 0 },
          "mission-log": { completed: 0, total: 0, rate: 0 },
          "chaos-analysis": { completed: 0, total: 0, rate: 0 },
          "battle-report": { completed: 0, total: 0, rate: 0 },
          annihilation: { completed: 0, total: 0, rate: 0 },
        },
      ),
    [achievedTaskIds, season.categories],
  );

  const currentTasks = useMemo(
    () => season.categories.find((category) => category.id === activeTab)?.tasks ?? [],
    [activeTab, season.categories],
  );

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:px-8">
      <ChallengeHeader />

      <section className="space-y-6">
        <select
          value={seasonId}
          onChange={(e) => setSeasonId(e.target.value)}
          aria-label={t("season.selectorLabel")}
          className="cursor-pointer rounded-lg border border-zinc-200 bg-white px-3 py-2 text-3xl font-bold tracking-tight text-zinc-900 shadow-sm transition hover:border-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          {seasons.map((s) => (
            <option key={s.id} value={s.id}>
              {t(s.nameKey)}
            </option>
          ))}
        </select>

        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <ChallengeSidebar
            activeTab={activeTab}
            tabs={challengeTabs}
            completionByTab={completionByTab}
            onTabChange={setActiveTab}
          />

          <ChallengeTaskList
            tasks={currentTasks}
            achievedTaskIds={achievedTaskIds}
            checkedTaskIds={checkedTaskIds}
            onToggleTask={toggleTask}
          />
        </div>
      </section>
    </main>
  );
}
