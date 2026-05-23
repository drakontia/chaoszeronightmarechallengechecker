export type ChallengeCategory =
  | "weekly-score"
  | "mission-log"
  | "chaos-analysis"
  | "battle-report"
  | "annihilation";

export type ChallengeStatus = "manual" | "derived";

export interface ChallengeTask {
  id: string;
  category: ChallengeCategory;
  status: ChallengeStatus;
  titleKey: string;
  descriptionKey: string;
  rewardImage: string;
  rewardAltKey: string;
  progressKey: string;
  childIds?: string[];
}

export interface Season {
  id: string;
  nameKey: string;
  tasks: ChallengeTask[];
}

export interface ChallengeTab {
  id: ChallengeCategory;
  labelKey: string;
}

export interface TabCompletion {
  completed: number;
  total: number;
  rate: number;
}
