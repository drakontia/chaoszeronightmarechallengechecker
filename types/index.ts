export type ChallengeCategory =
  | "weekly-score"
  | "mission-log"
  | "chaos-analysis"
  | "battle-report"
  | "annihilation";

export type ChallengeStatus = "manual" | "derived";

export interface ChallengeTask {
  id: string;
  status: ChallengeStatus;
  titleKey: string;
  descriptionKey: string;
  rewardImage?: string;
  rewardAltKey?: string;
  progressMax?: number;
  isChild?: boolean;
  childIds?: string[];
}

export interface SeasonCategory {
  id: ChallengeCategory;
  tasks: ChallengeTask[];
}

export interface Season {
  id: string;
  nameKey: string;
  categories: SeasonCategory[];
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
