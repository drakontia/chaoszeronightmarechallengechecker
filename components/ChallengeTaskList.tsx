import Image from "next/image";
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

  return (
    <section className="w-full rounded-xl border border-zinc-200 bg-white p-4 shadow-sm" aria-label={t("tasks.section")}>
      <ul className="space-y-3">
        {tasks.map((task) => {
          const achieved = achievedTaskIds.has(task.id);
          const manuallyChecked = checkedTaskIds.includes(task.id);
          const isDerived = task.status === "derived";

          return (
            <li
              key={task.id}
              className={`grid grid-cols-[auto,1fr,84px,96px] items-center gap-3 rounded-lg border border-zinc-200 p-3 ${
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

              <div className={task.id.includes("child") ? "pl-5" : ""}>
                <p className="text-base font-semibold text-zinc-900">{t(task.titleKey)}</p>
                <p className="text-sm text-zinc-600">{t(task.descriptionKey)}</p>
                {isDerived && <p className="text-xs text-indigo-700">{t("tasks.derivedNotice")}</p>}
              </div>

              <div className="flex justify-center">
                <Image src={task.rewardImage} alt={t(task.rewardAltKey)} width={56} height={56} />
              </div>

              <p className="text-sm font-medium text-zinc-700">
                {isDerived ? t(task.progressKey) : manuallyChecked ? t("progress.done") : t(task.progressKey)}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
