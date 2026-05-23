"use client";

import { useTranslations } from "next-intl";
import { ChallengeCategory, ChallengeTab, TabCompletion } from "@/types";
import { ProgressRate } from "@/components/ui";

interface ChallengeSidebarProps {
  activeTab: ChallengeCategory;
  tabs: ChallengeTab[];
  completionByTab: Record<ChallengeCategory, TabCompletion>;
  onTabChange: (tab: ChallengeCategory) => void;
}

export function ChallengeSidebar({
  activeTab,
  tabs,
  completionByTab,
  onTabChange,
}: ChallengeSidebarProps) {
  const t = useTranslations();

  return (
    <aside className="w-full rounded-xl border border-zinc-200 bg-white p-3 shadow-sm md:w-80">
      <ul className="space-y-2" role="tablist" aria-label={t("tabs.ariaLabel")}>
        {tabs.map((tab) => {
          const completion = completionByTab[tab.id];
          const isActive = tab.id === activeTab;

          return (
            <li key={tab.id}>
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab.id)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  isActive ? "bg-zinc-900 text-white" : "bg-zinc-50 text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                <span className="text-sm font-medium">{t(tab.labelKey)}</span>
                <ProgressRate {...completion} />
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
