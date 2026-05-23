import { expect, test } from "@playwright/test";

test("challenge checkbox can be toggled and persisted", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "カオスゼロナイトメア挑戦課題チェッカー" })).toBeVisible();

  const weeklyTask = page.getByRole("checkbox", { name: "週間スコア 5000 到達" });
  await weeklyTask.check();
  await expect(weeklyTask).toBeChecked();

  await page.reload();
  await expect(weeklyTask).toBeChecked();
});
