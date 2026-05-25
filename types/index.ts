export type ChallengeCategory =
  | "weekly-score"
  | "mission-log"
  | "chaos-analysis"
  | "battle-report"
  | "annihilation";

export type ChallengeStatus = "manual" | "derived";

export type RewardKey =
  | "flawless_melody"
  | "hidemarie_sword"
  | "auroras_coat_of_arms"
  | "hidemarie"
  | "support_data"
  | "all_collector"
  | "singing_voice_resonates_across the_galaxy"
  | "glory_of_elinad"
  | "nameless_artist"
  | "unknown_audition"
  | "credit_collector"
  | "release_of_the_curtain_call"
  | "thousand_faces"
  | "monopoly_on_stage";

export interface Reward {
  image: string;
  altKey: string;
  amount?: number;
}

export interface ChallengeTask {
  id: string;
  status: ChallengeStatus;
  titleKey: string;
  descriptionKey: string;
  rewards?: Reward[];
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
