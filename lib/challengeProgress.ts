import {
  ChallengeCategory,
  ChallengeTask,
  SeasonCategory,
  TabCompletion,
} from "@/types";

export const LOCAL_STORAGE_KEY = "chaos-zero-nightmare-checked-task-ids";

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
