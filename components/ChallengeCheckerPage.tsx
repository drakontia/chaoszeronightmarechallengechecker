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
  const { achievedTaskIds, checkedTaskIds, toggleTask } = useChallengeProgress(season.tasks);

  const completionByTab = useMemo(
    () =>
      challengeTabs.reduce(
        (acc, tab) => {
          acc[tab.id] = getTabCompletion(season.tasks, achievedTaskIds, tab.id);
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
    [achievedTaskIds, season.tasks],
  );

  const currentTasks = useMemo(
    () => season.tasks.filter((task) => task.category === activeTab),
    [activeTab, season.tasks],
  );

  const cycleSeason = () => {
    const currentIndex = seasons.findIndex((value) => value.id === seasonId);
    const nextIndex = (currentIndex + 1) % seasons.length;
    setSeasonId(seasons[nextIndex].id);
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:px-8">
      <ChallengeHeader />

      <section className="space-y-6">
        <button
          type="button"
          onClick={cycleSeason}
          className="text-left text-3xl font-bold tracking-tight text-zinc-900 transition hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          {t(season.nameKey)}
        </button>

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
