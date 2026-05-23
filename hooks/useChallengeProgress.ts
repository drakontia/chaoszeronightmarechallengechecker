"use client";

import { useEffect, useMemo, useState } from "react";
import { ChallengeTask } from "@/types";
import { getAchievedTaskIds, LOCAL_STORAGE_KEY } from "@/lib";

export const useChallengeProgress = (tasks: ChallengeTask[]) => {
  const [checkedTaskIds, setCheckedTaskIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          const restored = parsed.filter(
            (value): value is string => typeof value === "string",
          );
          setCheckedTaskIds(restored);
        }
      } catch {
        window.localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
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
