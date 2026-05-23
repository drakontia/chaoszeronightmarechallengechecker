import { ChallengeTab, Season } from "@/types";

export const challengeTabs: ChallengeTab[] = [
  { id: "weekly-score", labelKey: "tabs.weeklyScore" },
  { id: "mission-log", labelKey: "tabs.missionLog" },
  { id: "chaos-analysis", labelKey: "tabs.chaosAnalysis" },
  { id: "battle-report", labelKey: "tabs.battleReport" },
  { id: "annihilation", labelKey: "tabs.annihilation" },
];

export const seasons: Season[] = [
  {
    id: "season-3",
    nameKey: "season.s3",
    categories: [
      {
        id: "weekly-score",
        tasks: [
          {
            id: "weekly-1",
            status: "manual",
            titleKey: "tasks.weekly1.title",
            descriptionKey: "tasks.weekly1.description",
            rewardImage: "/rewards/crystal.svg",
            rewardAltKey: "rewards.crystal",
            progressKey: "progress.single",
          },
          {
            id: "weekly-2",
            status: "manual",
            titleKey: "tasks.weekly2.title",
            descriptionKey: "tasks.weekly2.description",
            rewardImage: "/rewards/coin.svg",
            rewardAltKey: "rewards.coin",
            progressKey: "progress.single",
          },
        ],
      },
      {
        id: "mission-log",
        tasks: [
          {
            id: "mission-1",
            status: "manual",
            titleKey: "tasks.mission1.title",
            descriptionKey: "tasks.mission1.description",
            rewardImage: "/rewards/ticket.svg",
            rewardAltKey: "rewards.ticket",
            progressKey: "progress.single",
          },
        ],
      },
      {
        id: "chaos-analysis",
        tasks: [
          {
            id: "analysis-1",
            status: "manual",
            titleKey: "tasks.analysis1.title",
            descriptionKey: "tasks.analysis1.description",
            rewardImage: "/rewards/chip.svg",
            rewardAltKey: "rewards.chip",
            progressKey: "progress.single",
          },
        ],
      },
      {
        id: "battle-report",
        tasks: [
          {
            id: "battle-1",
            status: "manual",
            titleKey: "tasks.battle1.title",
            descriptionKey: "tasks.battle1.description",
            rewardImage: "/rewards/coin.svg",
            rewardAltKey: "rewards.coin",
            progressKey: "progress.single",
          },
        ],
      },
      {
        id: "annihilation",
        tasks: [
          {
            id: "annihilation-child-1",
            status: "manual",
            titleKey: "tasks.annihilationChild1.title",
            descriptionKey: "tasks.annihilationChild1.description",
            rewardImage: "/rewards/ticket.svg",
            rewardAltKey: "rewards.ticket",
            progressKey: "progress.single",
          },
          {
            id: "annihilation-child-2",
            status: "manual",
            titleKey: "tasks.annihilationChild2.title",
            descriptionKey: "tasks.annihilationChild2.description",
            rewardImage: "/rewards/chip.svg",
            rewardAltKey: "rewards.chip",
            progressKey: "progress.single",
          },
          {
            id: "annihilation-parent",
            status: "derived",
            titleKey: "tasks.annihilationParent.title",
            descriptionKey: "tasks.annihilationParent.description",
            rewardImage: "/rewards/crystal.svg",
            rewardAltKey: "rewards.crystal",
            progressKey: "progress.derived",
            childIds: ["annihilation-child-1", "annihilation-child-2"],
          },
        ],
      },
    ],
  },
];

export const defaultSeasonId = seasons[0].id;
