"use client";

import Image from "next/image";
import { Info, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ChallengeTask } from "@/types";

interface ChallengeTaskListProps {
  tasks: ChallengeTask[];
  achievedTaskIds: Set<string>;
  checkedTaskIds: string[];
  onToggleTask: (task: ChallengeTask) => void;
}

export function ChallengeTaskList({
  tasks,
  achievedTaskIds,
  checkedTaskIds,
  onToggleTask,
}: ChallengeTaskListProps) {
  const t = useTranslations();
  const [openPopupTaskId, setOpenPopupTaskId] = useState<string | null>(null);

  const taskById = useMemo(() => {
    const map = new Map<string, ChallengeTask>();
    for (const task of tasks) map.set(task.id, task);
    return map;
  }, [tasks]);

  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => {
      const aAchieved = achievedTaskIds.has(a.id) ? 1 : 0;
      const bAchieved = achievedTaskIds.has(b.id) ? 1 : 0;
      return aAchieved - bAchieved;
    }),
    [tasks, achievedTaskIds],
  );

  return (
    <section className="w-full rounded-xl border border-zinc-200 bg-white p-4 shadow-sm" aria-label={t("tasks.section")}>
      <ul className="space-y-3">
        {sortedTasks.map((task) => {
          const achieved = achievedTaskIds.has(task.id);
          const manuallyChecked = checkedTaskIds.includes(task.id);
          const isDerived = task.status === "derived";
          const isPopupOpen = openPopupTaskId === task.id;

          return (
            <li
              key={task.id}
              className={`grid grid-cols-[auto_1fr_auto_84px_96px] items-center gap-3 rounded-lg border border-zinc-200 p-3 ${
                achieved ? "bg-emerald-50" : "bg-white"
              }`}
            >
              <input
                type="checkbox"
                className="h-5 w-5 cursor-pointer rounded border-zinc-300 text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                checked={achieved}
                onChange={() => onToggleTask(task)}
                aria-label={t(task.titleKey)}
                disabled={isDerived}
              />

              <div className={task.isChild ? "pl-5" : ""}>
                <p className="text-base font-semibold text-zinc-900">{t(task.titleKey)}</p>
                {t(task.descriptionKey) && <p className="text-sm text-zinc-600">{t(task.descriptionKey)}</p>}
              </div>

              <div className="relative flex items-center">
                {isDerived && (
                  <>
                    <button
                      type="button"
                      aria-label={t("tasks.childList.open")}
                      onClick={() => setOpenPopupTaskId(isPopupOpen ? null : task.id)}
                      className="rounded p-1 text-zinc-500 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    >
                      <Info size={18} />
                    </button>
                    {isPopupOpen && (
                      <div
                        role="dialog"
                        className="absolute left-6 top-0 z-10 min-w-48 rounded-lg border border-zinc-200 bg-white p-3 shadow-lg"
                      >
                        <ul className="space-y-1">
                          {(task.childIds ?? []).map((childId) => {
                            const child = taskById.get(childId);
                            const childAchieved = achievedTaskIds.has(childId);
                            return (
                              <li
                                key={childId}
                                className="flex items-center gap-2"
                                aria-label={child ? `${t(child.titleKey)}${childAchieved ? ` ${t("tasks.childList.completed")}` : ""}` : childId}
                              >
                                <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                                  {childAchieved && <Check size={14} className="text-emerald-600" />}
                                </span>
                                <span className={`flex-1 text-sm ${childAchieved ? "text-zinc-400" : "text-zinc-700"}`}>
                                  {child ? t(child.titleKey) : childId}
                                </span>
                                <span className={`text-xs ${childAchieved ? "text-zinc-400" : "text-zinc-700"}`}>{t("tasks.childList.completed")}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="flex justify-center">
                {task.rewardImage && task.rewardAltKey && (
                  <Image src={task.rewardImage} alt={t(task.rewardAltKey)} width={56} height={56} />
                )}
              </div>

              <p className="text-sm font-medium text-zinc-700">
                {isDerived
                  ? `${task.childIds?.filter((id) => achievedTaskIds.has(id)).length ?? 0}/${task.childIds?.length ?? 0}`
                  : manuallyChecked
                    ? t("progress.done")
                    : `0/${task.progressMax ?? 1}`}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
