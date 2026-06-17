import { describe, expect, test } from "vitest";
import { seasons } from "@/lib/challengeData";

describe("season 3 second-half placeholder replacements", () => {
  const season3 = seasons.find((s) => s.id === "season-3");
  const categories = season3?.categories ?? [];
  const tasks = categories.flatMap((category) => category.tasks);
  const taskIds = new Set(tasks.map((task) => task.id));

  test("replaces placeholder IDs with concrete second-half IDs", () => {
    expect(taskIds.has("ca-tbd-1")).toBe(false);
    expect(taskIds.has("ca-tbd-3")).toBe(false);
    expect(taskIds.has("br-tbd-5")).toBe(false);
    expect(taskIds.has("br-tbd-3")).toBe(false);

    expect(taskIds.has("ca-conductor-finale")).toBe(true);
    expect(taskIds.has("ca-invitation-beyond-mist")).toBe(true);
    expect(taskIds.has("br-encroaching-blackout")).toBe(true);
    expect(taskIds.has("br-arrogance-remnant")).toBe(true);
  });

  test("wires new child IDs into the existing derived parents", () => {
    const byId = new Map(tasks.map((task) => [task.id, task]));
    const eridonaChildren = byId.get("ca-eridona-glory")?.childIds ?? [];

    expect(byId.get("ca-curtain-call")?.childIds).toContain("ca-conductor-finale");
    expect(eridonaChildren).toHaveLength(13);
    expect(eridonaChildren).toContain("ca-hidden-work");
    expect(eridonaChildren).toContain("ca-last-exhibition");
    expect(eridonaChildren).toContain("ca-all-relics");
    expect(eridonaChildren).toContain("ca-stop-admiring");
    expect(eridonaChildren).toContain("ca-eternal-noon");
    expect(eridonaChildren).toContain("ca-art-is-hard");
    expect(eridonaChildren).toContain("ca-vivid-than-burning-city");
    expect(eridonaChildren).toContain("ca-first-erased");
    expect(eridonaChildren).toContain("ca-way-to-unite");
    expect(eridonaChildren).toContain("ca-most-valuable");
    expect(eridonaChildren).toContain("ca-stuffed-breath");
    expect(eridonaChildren).toContain("ca-scratched-void");
    expect(eridonaChildren).toContain("ca-paradise-silence");
    expect(eridonaChildren).not.toContain("ca-invitation-beyond-mist");
    expect(byId.get("br-thousand-faces")?.childIds).toContain("br-encroaching-blackout");
    expect(byId.get("br-stage-monopoly")?.childIds).toContain("br-arrogance-remnant");
  });

  test("adds remaining new mission-log tasks as regular tasks", () => {
    const missionLog = categories.find((category) => category.id === "mission-log");
    const missionIds = new Set((missionLog?.tasks ?? []).map((task) => task.id));

    expect(missionIds.has("ml-moving-melody")).toBe(true);
    expect(missionIds.has("ml-galaxy-idol")).toBe(true);
    expect(missionIds.has("ml-song-through-galaxy")).toBe(true);
    expect(missionIds.has("ml-see-you-again")).toBe(true);
    expect(missionIds.has("ml-our-performance")).toBe(true);
  });

  test("adds remaining new chaos-analysis tasks as regular tasks", () => {
    const chaosAnalysis = categories.find((category) => category.id === "chaos-analysis");
    const chaosIds = new Set((chaosAnalysis?.tasks ?? []).map((task) => task.id));

    expect(chaosIds.has("ca-script-vacant-seat")).toBe(true);
    expect(chaosIds.has("ca-unscripted-ending")).toBe(true);
    expect(chaosIds.has("ca-you-too-the-same")).toBe(true);
    expect(chaosIds.has("ca-love-is-a-lie")).toBe(true);
  });

  test("uses phantom theater rewards for arrogance remnant task", () => {
    const byId = new Map(tasks.map((task) => [task.id, task]));
    const rewardAltKeys = (byId.get("br-arrogance-remnant")?.rewards ?? []).map(
      (reward) => reward.altKey,
    );

    expect(rewardAltKeys).toEqual([
      "rewards.season3.phantom_theater_profile",
      "rewards.season3.phantom_theater",
    ]);
  });

  test("defines vivid-than-burning-city with requested details", () => {
    const byId = new Map(tasks.map((task) => [task.id, task]));
    const vivid = byId.get("ca-vivid-than-burning-city");

    expect(vivid?.isChild).toBe(true);
    expect(vivid?.descriptionKey).toBe("tasks.caVividThanBurningCity.description");
    expect(vivid?.progressMax ?? 1).toBe(1);
    expect(vivid?.rewards).toEqual([
      {
        image: "/rewards/season3/flawless_melody.png",
        altKey: "rewards.season3.flawless_melody",
        amount: 200,
      },
    ]);
  });
});
