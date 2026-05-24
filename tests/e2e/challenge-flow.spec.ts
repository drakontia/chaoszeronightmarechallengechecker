import { expect, test } from "@playwright/test";

test("clicking a sidebar tab switches the active tab and updates task list", async ({ page }) => {
  await page.goto("/");

  // Initially weekly-score tab is active - its tasks should be visible
  const weeklyTab = page.getByRole("tab", { name: /今週の達成スコア/ });
  await expect(weeklyTab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("checkbox", { name: "【銀河に響く歌声】今週の達成スコア2000達成" })).toBeVisible();

  // Click "任務記録" (mission-log) tab
  const missionTab = page.getByRole("tab", { name: /任務記録/ });
  await missionTab.click();

  // mission-log should now be active and show its tasks
  await expect(missionTab).toHaveAttribute("aria-selected", "true");
  await expect(weeklyTab).toHaveAttribute("aria-selected", "false");
  await expect(page.getByText("エディニティ号の市長")).toBeVisible();
  await expect(page.getByRole("checkbox", { name: "【銀河に響く歌声】今週の達成スコア2000達成" })).not.toBeVisible();
});

test("challenge checkbox can be toggled and persisted", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "カオスゼロナイトメア挑戦課題チェッカー" })).toBeVisible();

  const weeklyTask = page.getByRole("checkbox", { name: "【銀河に響く歌声】今週の達成スコア2000達成" });
  await weeklyTask.check();
  await expect(weeklyTask).toBeChecked();

  await page.reload();
  await expect(weeklyTask).toBeChecked();
});

test("checking a task checkbox increases the tab progress rate", async ({ page }) => {
  await page.goto("/");

  const weeklyTab = page.getByRole("tab", { name: /今週の達成スコア/ });
  await expect(weeklyTab).toContainText("0/5 (0%)");

  const weeklyTask = page.getByRole("checkbox", { name: "【銀河に響く歌声】今週の達成スコア2000達成" });
  await weeklyTask.check();

  await expect(weeklyTab).toContainText("1/5 (20%)");
});
