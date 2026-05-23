import { describe, expect, test } from "vitest";
import { getAchievedTaskIds, getTabCompletion } from "@/lib/challengeProgress";
import { seasons } from "@/lib/challengeData";

describe("challengeProgress", () => {
  const categories = seasons[0].categories;
  const tasks = categories.flatMap((category) => category.tasks);

  describe("getAchievedTaskIds", () => {
    test("derives parent task completion when all children are checked", () => {
      const achieved = getAchievedTaskIds(tasks, ["annihilation-child-1", "annihilation-child-2"]);

      expect(achieved.has("annihilation-parent")).toBe(true);
    });

    test("does not derive parent when only some children are checked", () => {
      const achieved = getAchievedTaskIds(tasks, ["annihilation-child-1"]);

      expect(achieved.has("annihilation-parent")).toBe(false);
    });

    test("includes manually checked tasks in achieved set", () => {
      const achieved = getAchievedTaskIds(tasks, ["weekly-1"]);

      expect(achieved.has("weekly-1")).toBe(true);
      expect(achieved.has("weekly-2")).toBe(false);
    });
  });

  describe("getTabCompletion", () => {
    test("returns 0/total (0%) when no tasks are checked", () => {
      const achieved = getAchievedTaskIds(tasks, []);
      const completion = getTabCompletion(categories, achieved, "weekly-score");

      expect(completion).toEqual({ completed: 0, total: 2, rate: 0 });
    });

    test("returns updated rate after toggling a task — 0/2 (0%) rises to 1/2 (50%)", () => {
      const before = getTabCompletion(categories, getAchievedTaskIds(tasks, []), "weekly-score");
      const after = getTabCompletion(categories, getAchievedTaskIds(tasks, ["weekly-1"]), "weekly-score");

      expect(before).toEqual({ completed: 0, total: 2, rate: 0 });
      expect(after).toEqual({ completed: 1, total: 2, rate: 50 });
    });

    test("returns tab completion rate", () => {
      const achieved = getAchievedTaskIds(tasks, ["weekly-1"]);
      const completion = getTabCompletion(categories, achieved, "weekly-score");

      expect(completion).toEqual({ completed: 1, total: 2, rate: 50 });
    });

    test("returns 100% when all tasks in a tab are checked", () => {
      const achieved = getAchievedTaskIds(tasks, ["weekly-1", "weekly-2"]);
      const completion = getTabCompletion(categories, achieved, "weekly-score");

      expect(completion).toEqual({ completed: 2, total: 2, rate: 100 });
    });

    test("annihilation tab: rate rises when child tasks are checked", () => {
      const before = getTabCompletion(categories, getAchievedTaskIds(tasks, []), "annihilation");
      const afterOne = getTabCompletion(
        categories,
        getAchievedTaskIds(tasks, ["annihilation-child-1"]),
        "annihilation",
      );
      const afterBoth = getTabCompletion(
        categories,
        getAchievedTaskIds(tasks, ["annihilation-child-1", "annihilation-child-2"]),
        "annihilation",
      );

      expect(before.rate).toBe(0);
      expect(afterOne.rate).toBeGreaterThan(0);
      expect(afterBoth.rate).toBe(100);
    });
  });
});
