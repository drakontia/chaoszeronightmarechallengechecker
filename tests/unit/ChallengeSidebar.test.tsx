import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";
import { ChallengeSidebar } from "@/components/ChallengeSidebar";
import { challengeTabs } from "@/lib";
import { ChallengeCategory, TabCompletion } from "@/types";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

afterEach(cleanup);

const emptyCompletion: TabCompletion = { completed: 0, total: 0, rate: 0 };
const completionByTab: Record<ChallengeCategory, TabCompletion> = {
  "weekly-score": emptyCompletion,
  "mission-log": emptyCompletion,
  "chaos-analysis": emptyCompletion,
  "battle-report": emptyCompletion,
  annihilation: emptyCompletion,
};

describe("ChallengeSidebar", () => {
  test("the initially active tab has aria-selected='true'", () => {
    render(
      <ChallengeSidebar
        activeTab="weekly-score"
        tabs={challengeTabs}
        completionByTab={completionByTab}
        onTabChange={vi.fn()}
      />,
    );

    const activeTab = screen.getByRole("tab", { name: /tabs\.weeklyScore/ });
    expect(activeTab.getAttribute("aria-selected")).toBe("true");
  });

  test("inactive tabs have aria-selected='false'", () => {
    render(
      <ChallengeSidebar
        activeTab="weekly-score"
        tabs={challengeTabs}
        completionByTab={completionByTab}
        onTabChange={vi.fn()}
      />,
    );

    const inactiveTabs = screen
      .getAllByRole("tab")
      .filter((tab) => tab.getAttribute("aria-selected") === "false");

    expect(inactiveTabs).toHaveLength(challengeTabs.length - 1);
  });

  test("clicking a tab calls onTabChange with the correct tab id", async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();

    render(
      <ChallengeSidebar
        activeTab="weekly-score"
        tabs={challengeTabs}
        completionByTab={completionByTab}
        onTabChange={onTabChange}
      />,
    );

    const missionTab = screen.getByRole("tab", { name: /tabs\.missionLog/ });
    await user.click(missionTab);

    expect(onTabChange).toHaveBeenCalledOnce();
    expect(onTabChange).toHaveBeenCalledWith("mission-log");
  });

  test("clicking each tab calls onTabChange with that tab's id", async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();

    render(
      <ChallengeSidebar
        activeTab="weekly-score"
        tabs={challengeTabs}
        completionByTab={completionByTab}
        onTabChange={onTabChange}
      />,
    );

    for (const tab of challengeTabs) {
      const tabButton = screen.getByRole("tab", { name: new RegExp(tab.labelKey.replace(/\./g, "\\.")) });
      await user.click(tabButton);
      expect(onTabChange).toHaveBeenLastCalledWith(tab.id);
    }

    expect(onTabChange).toHaveBeenCalledTimes(challengeTabs.length);
  });
});
