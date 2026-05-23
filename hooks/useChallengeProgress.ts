"use client";

import { useEffect, useMemo, useState } from "react";
import { ChallengeTask } from "@/types";
import { getAchievedTaskIds, LOCAL_STORAGE_KEY } from "@/lib";

export const useChallengeProgress = (tasks: ChallengeTask[]) => {
  const [checkedTaskIds, setCheckedTaskIds] = useState<string[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) {
        return;
      }

      const restored = parsed.filter(
        (value): value is string => typeof value === "string",
      );
      const frameId = window.requestAnimationFrame(() => {
        setCheckedTaskIds(restored);
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    } catch {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
      return;
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(checkedTaskIds));
  }, [checkedTaskIds]);

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
