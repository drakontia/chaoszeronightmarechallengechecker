import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useChallengeProgress } from "@/hooks/useChallengeProgress";
import { LOCAL_STORAGE_KEY, WEEKLY_RESET_KEY } from "@/lib";
import { ChallengeTask } from "@/types";

const manualTask: ChallengeTask = {
  id: "weekly-1",
  status: "manual",
  titleKey: "tasks.weekly1.title",
  descriptionKey: "tasks.weekly1.description",
  rewards: [{ image: "/rewards/crystal.svg", altKey: "rewards.crystal" }],
};

const manualTask2: ChallengeTask = {
  id: "weekly-2",
  status: "manual",
  titleKey: "tasks.weekly2.title",
  descriptionKey: "tasks.weekly2.description",
  rewards: [{ image: "/rewards/coin.svg", altKey: "rewards.coin" }],
};

const childTask1: ChallengeTask = {
  id: "annihilation-child-1",
  status: "manual",
  titleKey: "tasks.annihilationChild1.title",
  descriptionKey: "tasks.annihilationChild1.description",
  rewards: [{ image: "/rewards/ticket.svg", altKey: "rewards.ticket" }],
};

const childTask2: ChallengeTask = {
  id: "annihilation-child-2",
  status: "manual",
  titleKey: "tasks.annihilationChild2.title",
  descriptionKey: "tasks.annihilationChild2.description",
  rewards: [{ image: "/rewards/chip.svg", altKey: "rewards.chip" }],
};

const derivedTask: ChallengeTask = {
  id: "annihilation-parent",
  status: "derived",
  titleKey: "tasks.annihilationParent.title",
  descriptionKey: "tasks.annihilationParent.description",
  rewards: [{ image: "/rewards/crystal.svg", altKey: "rewards.crystal" }],
  childIds: ["annihilation-child-1", "annihilation-child-2"],
};

const allTasks = [manualTask, manualTask2, childTask1, childTask2, derivedTask];

describe("useChallengeProgress", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("localStorage restoration on mount", () => {
    test("restores saved checkedTaskIds from localStorage", async () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(["weekly-1", "weekly-2"]));

      const { result } = renderHook(() => useChallengeProgress(allTasks));

      expect(result.current.checkedTaskIds).toEqual(["weekly-1", "weekly-2"]);
    });

    test("starts with empty checkedTaskIds when localStorage has no data", () => {
      const { result } = renderHook(() => useChallengeProgress(allTasks));

      expect(result.current.checkedTaskIds).toEqual([]);
    });

    test("clears invalid JSON and starts empty when stored value is not parseable", () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, "not-valid-json{{{");

      const { result } = renderHook(() => useChallengeProgress(allTasks));

      // State is empty after the bad value is discarded
      expect(result.current.checkedTaskIds).toEqual([]);
      // The write effect then persists the empty array, so the key holds "[]"
      expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "null")).toEqual([]);
    });

    test("starts empty when stored value is a non-array JSON value", () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ id: "weekly-1" }));

      const { result } = renderHook(() => useChallengeProgress(allTasks));

      expect(result.current.checkedTaskIds).toEqual([]);
    });

    test("filters out non-string items from stored array", () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(["weekly-1", 42, null, "weekly-2"]));

      const { result } = renderHook(() => useChallengeProgress(allTasks));

      expect(result.current.checkedTaskIds).toEqual(["weekly-1", "weekly-2"]);
    });
  });

  describe("toggleTask", () => {
    test("adds an unchecked task to checkedTaskIds", () => {
      const { result } = renderHook(() => useChallengeProgress(allTasks));

      act(() => {
        result.current.toggleTask(manualTask);
      });

      expect(result.current.checkedTaskIds).toContain("weekly-1");
    });

    test("removes an already-checked task from checkedTaskIds", () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(["weekly-1"]));

      const { result } = renderHook(() => useChallengeProgress(allTasks));

      act(() => {
        result.current.toggleTask(manualTask);
      });

      expect(result.current.checkedTaskIds).not.toContain("weekly-1");
    });

    test("does nothing when toggling a derived-status task", () => {
      const { result } = renderHook(() => useChallengeProgress(allTasks));

      act(() => {
        result.current.toggleTask(derivedTask);
      });

      expect(result.current.checkedTaskIds).toEqual([]);
    });
  });

  describe("achievedTaskIds", () => {
    test("includes manually checked tasks", () => {
      const { result } = renderHook(() => useChallengeProgress(allTasks));

      act(() => {
        result.current.toggleTask(manualTask);
      });

      expect(result.current.achievedTaskIds.has("weekly-1")).toBe(true);
    });

    test("derives parent task when all children are checked", () => {
      const { result } = renderHook(() => useChallengeProgress(allTasks));

      act(() => {
        result.current.toggleTask(childTask1);
      });
      act(() => {
        result.current.toggleTask(childTask2);
      });

      expect(result.current.achievedTaskIds.has("annihilation-parent")).toBe(true);
    });

    test("does not derive parent when only some children are checked", () => {
      const { result } = renderHook(() => useChallengeProgress(allTasks));

      act(() => {
        result.current.toggleTask(childTask1);
      });

      expect(result.current.achievedTaskIds.has("annihilation-parent")).toBe(false);
    });

    test("starts with empty achievedTaskIds when no tasks are checked", () => {
      const { result } = renderHook(() => useChallengeProgress(allTasks));

      expect(result.current.achievedTaskIds.size).toBe(0);
    });
  });

  describe("localStorage persistence after toggle", () => {
    test("updates localStorage after toggling a task on", () => {
      const { result } = renderHook(() => useChallengeProgress(allTasks));

      act(() => {
        result.current.toggleTask(manualTask);
      });

      const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]");
      expect(stored).toContain("weekly-1");
    });

    test("updates localStorage after toggling a task off", () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(["weekly-1", "weekly-2"]));

      const { result } = renderHook(() => useChallengeProgress(allTasks));

      act(() => {
        result.current.toggleTask(manualTask);
      });

      const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]");
      expect(stored).not.toContain("weekly-1");
      expect(stored).toContain("weekly-2");
    });
  });

  describe("weekly reset", () => {
    const weeklyTaskId = "ws-2000";
    const nonWeeklyTaskId = "weekly-1"; // manualTask id

    const wsTask: ChallengeTask = {
      id: weeklyTaskId,
      status: "manual",
      titleKey: "tasks.ws2000.title",
      descriptionKey: "tasks.ws2000.description",
    };

    const allTasksWithWs = [...allTasks, wsTask];
    const weeklyScoreTaskIds = [weeklyTaskId];

    // Monday 2024-05-13 10:00 local — well into the current week
    const mondayAfter3am = new Date(2024, 4, 13, 10, 0, 0, 0).getTime();
    // The previous Monday 2024-05-06 10:00 local
    const prevMondayAfter3am = new Date(2024, 4, 6, 10, 0, 0, 0).getTime();
    // Week start for 2024-05-13: Mon 03:00
    const currentWeekStart = new Date(2024, 4, 13, 3, 0, 0, 0).getTime();

    beforeEach(() => {
      // Fix "now" to 2024-05-13 10:00 local (Monday, after 3AM)
      vi.useFakeTimers();
      vi.setSystemTime(mondayAfter3am);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    test("clears weekly-score task IDs when stored week start is from a previous week", () => {
      // Stored data has both ws and non-ws IDs, but the week start is from last week
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify([nonWeeklyTaskId, weeklyTaskId]),
      );
      localStorage.setItem(WEEKLY_RESET_KEY, String(prevMondayAfter3am));

      const { result } = renderHook(() =>
        useChallengeProgress(allTasksWithWs, weeklyScoreTaskIds),
      );

      expect(result.current.checkedTaskIds).not.toContain(weeklyTaskId);
    });

    test("preserves non-weekly task IDs when stored week start is from a previous week", () => {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify([nonWeeklyTaskId, weeklyTaskId]),
      );
      localStorage.setItem(WEEKLY_RESET_KEY, String(prevMondayAfter3am));

      const { result } = renderHook(() =>
        useChallengeProgress(allTasksWithWs, weeklyScoreTaskIds),
      );

      expect(result.current.checkedTaskIds).toContain(nonWeeklyTaskId);
    });

    test("preserves all task IDs when stored week start is in the current week", () => {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify([nonWeeklyTaskId, weeklyTaskId]),
      );
      localStorage.setItem(WEEKLY_RESET_KEY, String(currentWeekStart));

      const { result } = renderHook(() =>
        useChallengeProgress(allTasksWithWs, weeklyScoreTaskIds),
      );

      expect(result.current.checkedTaskIds).toContain(weeklyTaskId);
      expect(result.current.checkedTaskIds).toContain(nonWeeklyTaskId);
    });

    test("updates WEEKLY_RESET_KEY to the current week start after reset", () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([weeklyTaskId]));
      localStorage.setItem(WEEKLY_RESET_KEY, String(prevMondayAfter3am));

      renderHook(() => useChallengeProgress(allTasksWithWs, weeklyScoreTaskIds));

      const stored = localStorage.getItem(WEEKLY_RESET_KEY);
      expect(Number(stored)).toBe(currentWeekStart);
    });

    test("sets WEEKLY_RESET_KEY when not previously stored", () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([weeklyTaskId]));
      // No WEEKLY_RESET_KEY stored → treated as first visit

      renderHook(() => useChallengeProgress(allTasksWithWs, weeklyScoreTaskIds));

      const stored = localStorage.getItem(WEEKLY_RESET_KEY);
      expect(Number(stored)).toBe(currentWeekStart);
    });

    test("works with default (empty) weeklyScoreTaskIds — no tasks cleared", () => {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify([nonWeeklyTaskId]),
      );
      localStorage.setItem(WEEKLY_RESET_KEY, String(prevMondayAfter3am));

      // Pass empty weekly task IDs → nothing should be cleared
      const { result } = renderHook(() =>
        useChallengeProgress(allTasks, []),
      );

      expect(result.current.checkedTaskIds).toContain(nonWeeklyTaskId);
    });
  });
});
