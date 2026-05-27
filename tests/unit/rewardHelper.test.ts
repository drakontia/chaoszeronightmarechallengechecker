import { describe, expect, test } from "vitest";
import { rewardOf } from "@/lib/rewardHelper";

describe("rewardOf", () => {
  test("returns correct image and altKey for a season3 reward", () => {
    const reward = rewardOf("flawless_melody");

    expect(reward.image).toBe("/rewards/season3/flawless_melody.png");
    expect(reward.altKey).toBe("rewards.season3.flawless_melody");
    expect(reward.amount).toBeUndefined();
  });

  test("returns correct image and altKey for a common (non-season3) reward", () => {
    const reward = rewardOf("support_data");

    expect(reward.image).toBe("/rewards/support_data.png");
    expect(reward.altKey).toBe("rewards.support_data");
  });

  test("includes amount when provided", () => {
    const reward = rewardOf("flawless_melody", 100);

    expect(reward.amount).toBe(100);
    expect(reward.image).toBe("/rewards/season3/flawless_melody.png");
    expect(reward.altKey).toBe("rewards.season3.flawless_melody");
  });

  test("omits amount when not provided", () => {
    const reward = rewardOf("hidemarie_sword");

    expect(reward.amount).toBeUndefined();
  });

  test("returns correct image for a reward with special characters in name", () => {
    const reward = rewardOf("singing_voice_resonates_across_the_galaxy");

    expect(reward.image).toBe("/rewards/season3/singing_voice_resonates_across_the_galaxy.png");
    expect(reward.altKey).toBe("rewards.season3.singing_voice_resonates_across_the_galaxy");
  });

  test("each reward key maps to a unique image path", () => {
    const keys = [
      "flawless_melody",
      "hidemarie_sword",
      "auroras_coat_of_arms",
      "hidemarie",
      "support_data",
      "all_collector",
      "glory_of_elinad",
      "nameless_artist",
      "unknown_audition",
      "credit_collector",
      "release_of_the_curtain_call",
      "thousand_faces",
      "monopoly_on_stage",
    ] as const;

    const images = keys.map((k) => rewardOf(k).image);
    const unique = new Set(images);

    expect(unique.size).toBe(keys.length);
  });
});
