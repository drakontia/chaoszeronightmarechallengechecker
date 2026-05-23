import { describe, expect, test } from "vitest";
import { getAchievedTaskIds, getTabCompletion } from "@/lib/challengeProgress";
import { seasons } from "@/lib/challengeData";

describe("challengeProgress", () => {
  const categories = seasons[0].categories;
  const tasks = categories.flatMap((category) => category.tasks);

  // Real Season 3 data: 5 weekly-score tasks, 30 annihilation tasks
  const WEEKLY_TOTAL = 5;
  const ANNIHILATION_TOTAL = 30;

  describe("getAchievedTaskIds", () => {
    // ml-light-dark-song is a derived parent with children ml-light-of-song and ml-dark-of-song
    test("derives parent task completion when all children are checked", () => {
      const achieved = getAchievedTaskIds(tasks, ["ml-light-of-song", "ml-dark-of-song"]);

      expect(achieved.has("ml-light-dark-song")).toBe(true);
    });

    test("does not derive parent when only some children are checked", () => {
      const achieved = getAchievedTaskIds(tasks, ["ml-light-of-song"]);

      expect(achieved.has("ml-light-dark-song")).toBe(false);
    });

    test("includes manually checked tasks in achieved set", () => {
      const achieved = getAchievedTaskIds(tasks, ["ws-2000"]);

      expect(achieved.has("ws-2000")).toBe(true);
      expect(achieved.has("ws-3000")).toBe(false);
    });
  });

  describe("getTabCompletion", () => {
    test("returns 0/total (0%) when no tasks are checked", () => {
      const achieved = getAchievedTaskIds(tasks, []);
      const completion = getTabCompletion(categories, achieved, "weekly-score");

      expect(completion).toEqual({ completed: 0, total: WEEKLY_TOTAL, rate: 0 });
    });

    test("returns updated rate after toggling a task — rises from 0%", () => {
      const before = getTabCompletion(categories, getAchievedTaskIds(tasks, []), "weekly-score");
      const after = getTabCompletion(categories, getAchievedTaskIds(tasks, ["ws-2000"]), "weekly-score");

      expect(before.completed).toBe(0);
      expect(before.total).toBe(WEEKLY_TOTAL);
      expect(after.completed).toBe(1);
      expect(after.rate).toBeGreaterThan(0);
    });

    test("returns tab completion rate", () => {
      const achieved = getAchievedTaskIds(tasks, ["ws-2000"]);
      const completion = getTabCompletion(categories, achieved, "weekly-score");

      expect(completion.completed).toBe(1);
      expect(completion.total).toBe(WEEKLY_TOTAL);
      expect(completion.rate).toBeGreaterThan(0);
    });

    test("returns 100% when all tasks in a tab are checked", () => {
      const allWeeklyIds = ["ws-2000", "ws-3000", "ws-4000", "ws-6000", "ws-8000"];
      const achieved = getAchievedTaskIds(tasks, allWeeklyIds);
      const completion = getTabCompletion(categories, achieved, "weekly-score");

      expect(completion).toEqual({ completed: WEEKLY_TOTAL, total: WEEKLY_TOTAL, rate: 100 });
    });

    test("annihilation tab: rate rises when tasks are checked", () => {
      const allAnnihilationIds = Array.from({ length: 10 }, (_, i) => `an-cb-${i + 1}`)
        .concat(Array.from({ length: 10 }, (_, i) => `an-se-${i + 1}`))
        .concat(Array.from({ length: 10 }, (_, i) => `an-sc-${i + 1}`));

      const before = getTabCompletion(categories, getAchievedTaskIds(tasks, []), "annihilation");
      const afterOne = getTabCompletion(
        categories,
        getAchievedTaskIds(tasks, ["an-cb-1"]),
        "annihilation",
      );
      const afterAll = getTabCompletion(
        categories,
        getAchievedTaskIds(tasks, allAnnihilationIds),
        "annihilation",
      );

      expect(before.rate).toBe(0);
      expect(before.total).toBe(ANNIHILATION_TOTAL);
      expect(afterOne.rate).toBeGreaterThan(0);
      expect(afterAll.rate).toBe(100);
    });
  });
});
