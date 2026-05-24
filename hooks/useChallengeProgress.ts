"use client";

import { useEffect, useMemo, useState } from "react";
import { ChallengeTask } from "@/types";
import { getAchievedTaskIds, getWeekStartTimestamp, LOCAL_STORAGE_KEY, WEEKLY_RESET_KEY } from "@/lib";

export const useChallengeProgress = (
  tasks: ChallengeTask[],
  weeklyScoreTaskIds: string[] = [],
) => {
  const [checkedTaskIds, setCheckedTaskIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const currentWeekStart = getWeekStartTimestamp();

    let restored: string[] = [];
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          restored = parsed.filter(
            (value): value is string => typeof value === "string",
          );
        }
      } catch {
        window.localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }

    const storedWeekStart = Number(window.localStorage.getItem(WEEKLY_RESET_KEY) ?? 0);
    if (weeklyScoreTaskIds.length > 0 && currentWeekStart > storedWeekStart) {
      const weeklySet = new Set(weeklyScoreTaskIds);
      restored = restored.filter((id) => !weeklySet.has(id));
    }

    window.localStorage.setItem(WEEKLY_RESET_KEY, String(currentWeekStart));

    setCheckedTaskIds(restored);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(checkedTaskIds));
  }, [isHydrated, checkedTaskIds]);

  const achievedTaskIds = useMemo(
    () => getAchievedTaskIds(tasks, checkedTaskIds),
    [checkedTaskIds, tasks],
  );

  const toggleTask = (task: ChallengeTask) => {
    if (task.status === "derived") {
      return;
    }

    setCheckedTaskIds((current) =>
      current.includes(task.id)
        ? current.filter((taskId) => taskId !== task.id)
        : [...current, task.id],
    );
  };

  return {
    checkedTaskIds,
    achievedTaskIds,
    toggleTask,
  };
};
