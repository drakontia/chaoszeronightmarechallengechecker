import { Reward, RewardKey } from "@/types";

const REWARD_MAP: Record<RewardKey, { image: string; altKey: string }> = {
  crystal: {
    image: "/rewards/crystal.png",
    altKey: "rewards.crystal",
  },
  unit: {
    image: "/rewards/unit.png",
    altKey: "rewards.unit",
  },
  support_data: {
    image: "/rewards/support_data.png",
    altKey: "rewards.support_data",
  },
  battle_memory: {
    image: "/rewards/battle_memory.png",
    altKey: "rewards.battle_memory",
  },
  potencial_disk: {
    image: "/rewards/potencial_disk.png",
    altKey: "rewards.potencial_disk",
  },
  universal_support_certificate: {
    image: "/rewards/universal_support_certificate.png",
    altKey: "rewards.universal_support_certificate",
  },
  universal_tactics_certificate: {
    image: "/rewards/universal_tactics_certificate.png",
    altKey: "rewards.universal_tactics_certificate",
  },
  memory_traces: {
    image: "/rewards/memory_traces.png",
    altKey: "rewards.memory_traces",
  },
  memory_particles: {
    image: "/rewards/memory_particles.png",
    altKey: "rewards.memory_particles",
  },
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
  perfect_method: {
    image: "/rewards/season3/perfect_method.png",
    altKey: "rewards.season3.perfect_method",
  },
  song_of_light_and_darkness: {
    image: "/rewards/season3/song_of_light_and_darkness.png",
    altKey: "rewards.season3.song_of_light_and_darkness",
  },
  all_collector: {
    image: "/rewards/season3/all_collector.png",
    altKey: "rewards.season3.all_collector",
  },
  singing_voice_resonates_across_the_galaxy: {
    image: "/rewards/season3/singing_voice_resonates_across_the_galaxy.png",
    altKey: "rewards.season3.singing_voice_resonates_across_the_galaxy",
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
  tit_in_a_fairy_tale: {
    image: "/rewards/season3/tit_in_a_fairy_tale.png",
    altKey: "rewards.season3.tit_in_a_fairy_tale",
  },
  claras_wand: {
    image: "/rewards/season3/claras_wand.png",
    altKey: "rewards.season3.claras_wand",
  },
  adelheid: {
    image: "/rewards/season3/adelheid.png",
    altKey: "rewards.season3.adelheid",
  },
  collapsed_elinad: {
    image: "/rewards/season3/collapsed_elinad.png",
    altKey: "rewards.season3.collapsed_elinad",
  },
  collapsed_elinad_profile: {
    image: "/rewards/season3/collapsed_elinad_profile.png",
    altKey: "rewards.season3.collapsed_elinad_profile",
  },
  aria_penlight: {
    image: "/rewards/crystal.png",
    altKey: "rewards.season3.aria_penlight",
  },
  tenebrea_penlight: {
    image: "/rewards/crystal.png",
    altKey: "rewards.season3.tenebrea_penlight",
  },
  singing_voice_tenebrea: {
    image: "/rewards/crystal.png",
    altKey: "rewards.season3.singing_voice_tenebrea",
  },
  edinity_profile: {
    image: "/rewards/crystal.png",
    altKey: "rewards.season3.edinity_profile",
  },
  edinity: {
    image: "/rewards/crystal.png",
    altKey: "rewards.season3.edinity",
  },
  phantom_theater_profile: {
    image: "/rewards/crystal.png",
    altKey: "rewards.season3.phantom_theater_profile",
  },
  phantom_theater: {
    image: "/rewards/crystal.png",
    altKey: "rewards.season3.phantom_theater",
  },
};

export function rewardOf(key: RewardKey, amount?: number): Reward {
  const { image, altKey } = REWARD_MAP[key];
  return amount !== undefined ? { image, altKey, amount } : { image, altKey };
}
