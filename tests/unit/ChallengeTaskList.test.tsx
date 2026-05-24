import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { ChallengeTaskList } from "@/components/ChallengeTaskList";
import { ChallengeTask } from "@/types";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

afterEach(cleanup);

const tasks: ChallengeTask[] = [
  { id: "task-a", status: "manual", titleKey: "Title A", descriptionKey: "Desc A" },
  { id: "task-b", status: "manual", titleKey: "Title B", descriptionKey: "Desc B" },
  { id: "task-c", status: "manual", titleKey: "Title C", descriptionKey: "Desc C" },
];

describe("ChallengeTaskList", () => {
  test("uncompleted tasks appear before completed tasks", () => {
    const achievedTaskIds = new Set(["task-a"]);

    render(
      <ChallengeTaskList
        tasks={tasks}
        achievedTaskIds={achievedTaskIds}
        checkedTaskIds={["task-a"]}
        onToggleTask={vi.fn()}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    const labels = checkboxes.map((cb) => cb.getAttribute("aria-label"));

    const achievedIndex = labels.indexOf("Title A");
    const uncompleted = labels.filter((l) => l !== "Title A");

    uncompleted.forEach((label) => {
      const idx = labels.indexOf(label);
      expect(idx).toBeLessThan(achievedIndex);
    });
  });

  test("all tasks are still rendered after sorting", () => {
    const achievedTaskIds = new Set(["task-b"]);

    render(
      <ChallengeTaskList
        tasks={tasks}
        achievedTaskIds={achievedTaskIds}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    expect(screen.getByRole("checkbox", { name: "Title A" })).toBeDefined();
    expect(screen.getByRole("checkbox", { name: "Title B" })).toBeDefined();
    expect(screen.getByRole("checkbox", { name: "Title C" })).toBeDefined();
  });
});
