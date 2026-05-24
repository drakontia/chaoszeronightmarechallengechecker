import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { ChallengeTaskList } from "@/components/ChallengeTaskList";
import { ChallengeTask } from "@/types";

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

const EMPTY_DESC_KEY = "tasks.ws2000.description";
const NONEMPTY_DESC_KEY = "tasks.mlMayor.description";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    if (key === EMPTY_DESC_KEY) return "";
    return key;
  },
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
