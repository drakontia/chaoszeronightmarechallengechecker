import { Reward, RewardKey } from "@/types";

const REWARD_MAP: Record<RewardKey, { image: string; altKey: string }> = {
  flawless_melody: {
    image: "/rewards/season3/flawless_melody.png",
    altKey: "rewards.season3.flawless_melody",
  },
  hidemarie_sword: {
    image: "/rewards/season3/hidemarie_sword.png",
    altKey: "rewards.season3.hidemarie_sword",
  },
  auroras_coat_of_arms: {
    image: "/rewards/season3/auroras_coat_of_arms.png",
    altKey: "rewards.season3.auroras_coat_of_arms",
  },
  hidemarie: {
    image: "/rewards/season3/hidemarie.png",
    altKey: "rewards.season3.hidemarie",
  },
  support_data: {
    image: "/rewards/support_data.png",
    altKey: "rewards.support_data",
  },
  all_collector: {
    image: "/rewards/season3/all_collector.png",
    altKey: "rewards.season3.all_collector",
  },
  "singing_voice_resonates_across the_galaxy": {
    image: "/rewards/season3/singing_voice_resonates_across the_galaxy.png",
    altKey: "rewards.season3.singing_voice_resonates_across the_galaxy",
  },
  glory_of_elinad: {
    image: "/rewards/season3/glory_of_elinad.png",
    altKey: "rewards.season3.glory_of_elinad",
  },
  nameless_artist: {
    image: "/rewards/season3/nameless_artist.png",
    altKey: "rewards.season3.nameless_artist",
  },
  unknown_audition: {
    image: "/rewards/season3/unknown_audition.png",
    altKey: "rewards.season3.unknown_audition",
  },
  credit_collector: {
    image: "/rewards/season3/credit_collector.png",
    altKey: "rewards.season3.credit_collector",
  },
  release_of_the_curtain_call: {
    image: "/rewards/season3/release_of_the_curtain_call.png",
    altKey: "rewards.season3.release_of_the_curtain_call",
  },
  thousand_faces: {
    image: "/rewards/season3/thousand_faces.png",
    altKey: "rewards.season3.thousand_faces",
  },
  monopoly_on_stage: {
    image: "/rewards/season3/monopoly_on_stage.png",
    altKey: "rewards.season3.monopoly_on_stage",
  },
};

export function rewardOf(key: RewardKey, amount?: number): Reward {
  const { image, altKey } = REWARD_MAP[key];
  return amount !== undefined ? { image, altKey, amount } : { image, altKey };
}
