import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { ChallengeTaskList } from "@/components/ChallengeTaskList";
import { ChallengeTask } from "@/types";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

afterEach(cleanup);

const childTask1: ChallengeTask = {
  id: "child-1",
  status: "manual",
  titleKey: "tasks.child1.title",
  descriptionKey: "tasks.child1.description",
  isChild: true,
};

const childTask2: ChallengeTask = {
  id: "child-2",
  status: "manual",
  titleKey: "tasks.child2.title",
  descriptionKey: "tasks.child2.description",
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
