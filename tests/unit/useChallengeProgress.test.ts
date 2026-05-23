import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useChallengeProgress } from "@/hooks/useChallengeProgress";
import { LOCAL_STORAGE_KEY } from "@/lib";
import { ChallengeTask } from "@/types";

const manualTask: ChallengeTask = {
  id: "weekly-1",
  status: "manual",
  titleKey: "tasks.weekly1.title",
  descriptionKey: "tasks.weekly1.description",
  rewardImage: "/rewards/crystal.svg",
  rewardAltKey: "rewards.crystal",
  progressKey: "progress.single",
};

const manualTask2: ChallengeTask = {
  id: "weekly-2",
  status: "manual",
  titleKey: "tasks.weekly2.title",
  descriptionKey: "tasks.weekly2.description",
  rewardImage: "/rewards/coin.svg",
  rewardAltKey: "rewards.coin",
  progressKey: "progress.single",
};

const childTask1: ChallengeTask = {
  id: "annihilation-child-1",
  status: "manual",
  titleKey: "tasks.annihilationChild1.title",
  descriptionKey: "tasks.annihilationChild1.description",
  rewardImage: "/rewards/ticket.svg",
  rewardAltKey: "rewards.ticket",
  progressKey: "progress.single",
};

const childTask2: ChallengeTask = {
  id: "annihilation-child-2",
  status: "manual",
  titleKey: "tasks.annihilationChild2.title",
  descriptionKey: "tasks.annihilationChild2.description",
  rewardImage: "/rewards/chip.svg",
  rewardAltKey: "rewards.chip",
  progressKey: "progress.single",
};

const derivedTask: ChallengeTask = {
  id: "annihilation-parent",
  status: "derived",
  titleKey: "tasks.annihilationParent.title",
  descriptionKey: "tasks.annihilationParent.description",
  rewardImage: "/rewards/crystal.svg",
  rewardAltKey: "rewards.crystal",
  progressKey: "progress.derived",
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
});
