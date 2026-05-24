import {
  ChallengeCategory,
  ChallengeTask,
  SeasonCategory,
  TabCompletion,
} from "@/types";

export const LOCAL_STORAGE_KEY = "chaos-zero-nightmare-checked-task-ids";
export const WEEKLY_RESET_KEY = "chaos-zero-nightmare-week-start";

/**
 * Returns the timestamp (ms) of the most recent Monday 03:00 in local time.
 * If it's Monday before 03:00, the previous Monday at 03:00 is returned.
 */
export const getWeekStartTimestamp = (date: Date = new Date()): number => {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const daysFromMonday = (day + 6) % 7; // 0=Mon, 1=Tue, ..., 6=Sun

  d.setDate(d.getDate() - daysFromMonday);
  d.setHours(3, 0, 0, 0);

  // If this Monday 03:00 is still in the future relative to `date`, step back one week
  if (d.getTime() > date.getTime()) {
    d.setDate(d.getDate() - 7);
  }

  return d.getTime();
};

export const getAchievedTaskIds = (
  tasks: ChallengeTask[],
  checkedTaskIds: string[],
): Set<string> => {
  const achieved = new Set<string>(checkedTaskIds);
  const byId = new Map(tasks.map((task) => [task.id, task]));

  let changed = true;
  while (changed) {
    changed = false;
    tasks.forEach((task) => {
      if (task.status !== "derived" || achieved.has(task.id)) {
        return;
      }

      const allChildrenCompleted =
        task.childIds?.every((childId) => {
          const childTask = byId.get(childId);
          return Boolean(childTask && achieved.has(childId));
        }) ?? false;

      if (allChildrenCompleted) {
        achieved.add(task.id);
        changed = true;
      }
    });
  }

  return achieved;
};

export const getTabCompletion = (
  categories: SeasonCategory[],
  achievedTaskIds: Set<string>,
  category: ChallengeCategory,
): TabCompletion => {
  const tabTasks = categories.find((value) => value.id === category)?.tasks ?? [];
  const total = tabTasks.length;

  if (total === 0) {
    return { completed: 0, total: 0, rate: 0 };
  }

  const completed = tabTasks.filter((task) => achievedTaskIds.has(task.id)).length;

  return {
    completed,
    total,
    rate: Math.round((completed / total) * 100),
  };
};
