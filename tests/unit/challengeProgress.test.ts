import { describe, expect, test } from "vitest";
import { getAchievedTaskIds, getTabCompletion } from "@/lib/challengeProgress";
import { seasons } from "@/lib/challengeData";

describe("challengeProgress", () => {
  const tasks = seasons[0].tasks;

  test("derives parent task completion when all children are checked", () => {
    const achieved = getAchievedTaskIds(tasks, ["annihilation-child-1", "annihilation-child-2"]);

    expect(achieved.has("annihilation-parent")).toBe(true);
  });

  test("returns tab completion rate", () => {
    const achieved = getAchievedTaskIds(tasks, ["weekly-1"]);
    const completion = getTabCompletion(tasks, achieved, "weekly-score");

    expect(completion).toEqual({ completed: 1, total: 2, rate: 50 });
  });
});
