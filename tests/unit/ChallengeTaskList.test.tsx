import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { ChallengeTaskList } from "@/components/ChallengeTaskList";
import { ChallengeTask } from "@/types";

const EMPTY_DESC_KEY = "tasks.ws2000.description";
const NONEMPTY_DESC_KEY = "tasks.mlMayor.description";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    if (key === EMPTY_DESC_KEY) return "";
    return key;
  },
}));

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

afterEach(cleanup);

const baseTask = (overrides: Partial<ChallengeTask>): ChallengeTask => ({
  id: "test-task",
  status: "manual",
  titleKey: "tasks.ws2000.title",
  descriptionKey: EMPTY_DESC_KEY,
  ...overrides,
});

const defaultProps = {
  achievedTaskIds: new Set<string>(),
  checkedTaskIds: [] as string[],
  onToggleTask: vi.fn(),
};

// Fixtures for derived/manual/reward/child tests
const childTask1: ChallengeTask = {
  id: "child-1",
  status: "manual",
  titleKey: "tasks.child1.title",
  descriptionKey: "tasks.child1.description",
  isChild: true,
};

const derivedTask: ChallengeTask = {
  id: "parent",
  status: "derived",
  titleKey: "tasks.parent.title",
  descriptionKey: "tasks.parent.description",
  childIds: ["child-1", "child-2"],
};

const derivedTaskNoChildren: ChallengeTask = {
  id: "parent-no-children",
  status: "derived",
  titleKey: "tasks.parent.title",
  descriptionKey: "tasks.parent.description",
};

const manualTask: ChallengeTask = {
  id: "manual-1",
  status: "manual",
  titleKey: "tasks.manual1.title",
  descriptionKey: "tasks.manual1.description",
  progressMax: 5,
};

// Fixtures for sorting tests
const sortableTasks: ChallengeTask[] = [
  { id: "task-a", status: "manual", titleKey: "Title A", descriptionKey: "Desc A" },
  { id: "task-b", status: "manual", titleKey: "Title B", descriptionKey: "Desc B" },
  { id: "task-c", status: "manual", titleKey: "Title C", descriptionKey: "Desc C" },
];

describe("ChallengeTaskList", () => {
  test("renders description paragraph when translation is non-empty", () => {
    const task = baseTask({ descriptionKey: NONEMPTY_DESC_KEY });

    render(<ChallengeTaskList tasks={[task]} {...defaultProps} />);

    expect(screen.getByText(NONEMPTY_DESC_KEY)).toBeTruthy();
  });

  test("does not render description paragraph when translation is empty", () => {
    const task = baseTask({ descriptionKey: EMPTY_DESC_KEY });

    render(<ChallengeTaskList tasks={[task]} {...defaultProps} />);

    // The description key itself should never appear in the DOM
    expect(screen.queryByText(EMPTY_DESC_KEY)).toBeNull();
  });
});

describe("ChallengeTaskList — task sort order", () => {
  test("uncompleted tasks appear before completed tasks", () => {
    const achievedTaskIds = new Set(["task-a"]);

    render(
      <ChallengeTaskList
        tasks={sortableTasks}
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
        tasks={sortableTasks}
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

describe("ChallengeTaskList — derived task progress display", () => {
  test("shows 0/N when no children are achieved", () => {
    render(
      <ChallengeTaskList
        tasks={[derivedTask]}
        achievedTaskIds={new Set()}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    expect(screen.getByText("0/2")).toBeTruthy();
  });

  test("shows achieved/N when some children are achieved", () => {
    render(
      <ChallengeTaskList
        tasks={[derivedTask]}
        achievedTaskIds={new Set(["child-1"])}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    expect(screen.getByText("1/2")).toBeTruthy();
  });

  test("shows N/N when all children are achieved", () => {
    render(
      <ChallengeTaskList
        tasks={[derivedTask]}
        achievedTaskIds={new Set(["child-1", "child-2"])}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    expect(screen.getByText("2/2")).toBeTruthy();
  });

  test("shows 0/0 when derived task has no childIds", () => {
    render(
      <ChallengeTaskList
        tasks={[derivedTaskNoChildren]}
        achievedTaskIds={new Set()}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    expect(screen.getByText("0/0")).toBeTruthy();
  });
});

describe("ChallengeTaskList — manual task progress display", () => {
  test("shows 0/progressMax for an unchecked manual task", () => {
    render(
      <ChallengeTaskList
        tasks={[manualTask]}
        achievedTaskIds={new Set()}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    expect(screen.getByText("0/5")).toBeTruthy();
  });

  test("shows progress.done for a checked manual task", () => {
    render(
      <ChallengeTaskList
        tasks={[manualTask]}
        achievedTaskIds={new Set(["manual-1"])}
        checkedTaskIds={["manual-1"]}
        onToggleTask={vi.fn()}
      />,
    );

    expect(screen.getByText("progress.done")).toBeTruthy();
  });
});

describe("ChallengeTaskList — reward image", () => {
  test("renders reward image when rewardImage and rewardAltKey are set", () => {
    const taskWithReward: ChallengeTask = {
      id: "reward-task",
      status: "manual",
      titleKey: "tasks.reward.title",
      descriptionKey: "tasks.reward.description",
      rewardImage: "/images/reward.png",
      rewardAltKey: "tasks.reward.alt",
    };

    render(
      <ChallengeTaskList
        tasks={[taskWithReward]}
        achievedTaskIds={new Set()}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    expect(screen.getByAltText("tasks.reward.alt")).toBeTruthy();
  });
});

describe("ChallengeTaskList — child task indentation", () => {
  test("applies pl-5 class to child task content wrapper", () => {
    render(
      <ChallengeTaskList
        tasks={[childTask1]}
        achievedTaskIds={new Set()}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    const title = screen.getByText("tasks.child1.title");
    expect(title.parentElement?.className).toContain("pl-5");
  });
});

describe("ChallengeTaskList — checkbox interaction", () => {
  test("calls onToggleTask with the task when checkbox is clicked", () => {
    const onToggleTask = vi.fn();

    render(
      <ChallengeTaskList
        tasks={[manualTask]}
        achievedTaskIds={new Set()}
        checkedTaskIds={[]}
        onToggleTask={onToggleTask}
      />,
    );

    fireEvent.click(screen.getByRole("checkbox"));
    expect(onToggleTask).toHaveBeenCalledWith(manualTask);
  });
});

describe("ChallengeTaskList — derivedNotice removal", () => {
  test("does not show derivedNotice text for derived tasks", () => {
    render(
      <ChallengeTaskList
        tasks={[derivedTask]}
        achievedTaskIds={new Set()}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    expect(screen.queryByText("tasks.derivedNotice")).toBeNull();
  });
});

describe("ChallengeTaskList — info icon for derived tasks", () => {
  test("renders info icon button for derived tasks", () => {
    render(
      <ChallengeTaskList
        tasks={[derivedTask]}
        achievedTaskIds={new Set()}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "tasks.childList.open" })).toBeTruthy();
  });

  test("does not render info icon button for non-derived tasks", () => {
    render(
      <ChallengeTaskList
        tasks={[manualTask]}
        achievedTaskIds={new Set()}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    expect(screen.queryByRole("button", { name: "tasks.childList.open" })).toBeNull();
  });
});

const childTask2: ChallengeTask = {
  id: "child-2",
  status: "manual",
  titleKey: "tasks.child2.title",
  descriptionKey: "tasks.child2.description",
  isChild: true,
};

describe("ChallengeTaskList — child task popup", () => {
  test("popup is not visible before clicking info icon", () => {
    render(
      <ChallengeTaskList
        tasks={[derivedTask, childTask1, childTask2]}
        achievedTaskIds={new Set()}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  test("popup shows child task names after clicking info icon", () => {
    render(
      <ChallengeTaskList
        tasks={[derivedTask, childTask1, childTask2]}
        achievedTaskIds={new Set()}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "tasks.childList.open" }));

    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getAllByText("tasks.child1.title").length).toBeGreaterThan(0);
    expect(screen.getAllByText("tasks.child2.title").length).toBeGreaterThan(0);
  });

  test("completed child task shows 完了 label in popup", () => {
    render(
      <ChallengeTaskList
        tasks={[derivedTask, childTask1, childTask2]}
        achievedTaskIds={new Set(["child-1"])}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "tasks.childList.open" }));

    const dialog = screen.getByRole("dialog");
    expect(dialog.textContent).toContain("tasks.childList.completed");
  });

  test("uncompleted child task does not show 完了 label in popup", () => {
    render(
      <ChallengeTaskList
        tasks={[derivedTask, childTask1, childTask2]}
        achievedTaskIds={new Set()}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "tasks.childList.open" }));

    const dialog = screen.getByRole("dialog");
    expect(dialog.textContent).not.toContain("tasks.childList.completed");
  });

  test("completed child task shows checkmark in popup", () => {
    render(
      <ChallengeTaskList
        tasks={[derivedTask, childTask1, childTask2]}
        achievedTaskIds={new Set(["child-1"])}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "tasks.childList.open" }));

    // Completed child should have aria-label indicating completion
    expect(screen.getByLabelText("tasks.child1.title tasks.childList.completed")).toBeTruthy();
  });

  test("uncompleted child task does not show checkmark", () => {
    render(
      <ChallengeTaskList
        tasks={[derivedTask, childTask1, childTask2]}
        achievedTaskIds={new Set()}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "tasks.childList.open" }));

    expect(screen.queryByLabelText("tasks.child1.title tasks.childList.completed")).toBeNull();
  });

  test("popup closes when info icon is clicked again", () => {
    render(
      <ChallengeTaskList
        tasks={[derivedTask, childTask1, childTask2]}
        achievedTaskIds={new Set()}
        checkedTaskIds={[]}
        onToggleTask={vi.fn()}
      />,
    );

    const btn = screen.getByRole("button", { name: "tasks.childList.open" });
    fireEvent.click(btn);
    expect(screen.getByRole("dialog")).toBeTruthy();

    fireEvent.click(btn);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

