import { ChallengeTab, Season } from "@/types";
import { rewardOf } from "./rewardHelper";

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
      // ─── 今週の達成スコア ───────────────────────────────────────────
      {
        id: "weekly-score",
        tasks: [
          {
            id: "ws-2000",
            status: "manual",
            titleKey: "tasks.ws2000.title",
            descriptionKey: "tasks.ws2000.description",
            rewards: [rewardOf("flawless_melody")],
            progressMax: 2000,
          },
          {
            id: "ws-3000",
            status: "manual",
            titleKey: "tasks.ws3000.title",
            descriptionKey: "tasks.ws3000.description",
            rewards: [rewardOf("flawless_melody")],
            progressMax: 3000,
          },
          {
            id: "ws-4000",
            status: "manual",
            titleKey: "tasks.ws4000.title",
            descriptionKey: "tasks.ws4000.description",
            rewards: [rewardOf("flawless_melody")],
            progressMax: 4000,
          },
          {
            id: "ws-6000",
            status: "manual",
            titleKey: "tasks.ws6000.title",
            descriptionKey: "tasks.ws6000.description",
            rewards: [rewardOf("flawless_melody")],
            progressMax: 6000,
          },
          {
            id: "ws-8000",
            status: "manual",
            titleKey: "tasks.ws8000.title",
            descriptionKey: "tasks.ws8000.description",
            rewards: [rewardOf("flawless_melody")],
            progressMax: 8000,
          },
        ],
      },

      // ─── 任務記録 ───────────────────────────────────────────────────
      {
        id: "mission-log",
        tasks: [
          // ストーリー任務
          {
            id: "ml-mayor",
            status: "manual",
            titleKey: "tasks.mlMayor.title",
            descriptionKey: "tasks.mlMayor.description",
            rewards: [
              rewardOf("flawless_melody", 100),
              rewardOf("hidemarie_sword")],

          },
          {
            id: "ml-stopit",
            status: "manual",
            titleKey: "tasks.mlStopIt.title",
            descriptionKey: "tasks.mlStopIt.description",
            rewards: [
              rewardOf("flawless_melody", 100),
              rewardOf("auroras_coat_of_arms")
            ],
          },
          {
            id: "ml-phantom",
            status: "manual",
            titleKey: "tasks.mlPhantom.title",
            descriptionKey: "tasks.mlPhantom.description",
            rewards: [
              rewardOf("flawless_melody", 100),
              rewardOf("unit", 50000),
            ],
          },
          {
            id: "ml-goodbye",
            status: "manual",
            titleKey: "tasks.mlGoodbye.title",
            descriptionKey: "tasks.mlGoodbye.description",
            rewards: [
              rewardOf("flawless_melody", 100),
              rewardOf("hidemarie")
            ],
          },
          {
            id: "ml-faily-tale",
            status: "manual",
            titleKey: "tasks.mlFailyTale.title",
            descriptionKey: "tasks.mlFailyTale.description",
            rewards: [
              rewardOf("flawless_melody", 100),
              rewardOf("tit_in_a_fairy_tale")
            ],
          },
          {
            id: "ml-friend",
            status: "manual",
            titleKey: "tasks.mlFriend.title",
            descriptionKey: "tasks.mlFriend.description",
            rewards: [
              rewardOf("flawless_melody", 100),
              rewardOf("claras_wand")
            ],
          },
          {
            id: "ml-pajamas",
            status: "manual",
            titleKey: "tasks.mlPajamas.title",
            descriptionKey: "tasks.mlPajamas.description",
            rewards: [
              rewardOf("flawless_melody", 100),
              rewardOf("unit", 50000),
            ],
          },
          {
            id: "ml-brave",
            status: "manual",
            titleKey: "tasks.mlBrave.title",
            descriptionKey: "tasks.mlBrave.description",
            rewards: [
              rewardOf("flawless_melody", 100),
              rewardOf("adelheid")
            ],
          },
          // 旋律コレクション
          {
            id: "ml-melody-1",
            status: "manual",
            titleKey: "tasks.mlMelody1.title",
            descriptionKey: "tasks.mlMelody1.description",
            rewards: [
              rewardOf("support_data", 3),
              rewardOf("battle_memory", 7),
            ],
          },
          {
            id: "ml-melody-2",
            status: "manual",
            titleKey: "tasks.mlMelody2.title",
            descriptionKey: "tasks.mlMelody2.description",
            rewards: [
              rewardOf("support_data", 3),
              rewardOf("battle_memory", 7),
            ],
          },
          {
            id: "ml-melody-3",
            status: "manual",
            titleKey: "tasks.mlMelody3.title",
            descriptionKey: "tasks.mlMelody3.description",
            rewards: [
              rewardOf("support_data", 3),
              rewardOf("battle_memory", 7),
            ],
          },
          {
            id: "ml-melody-4",
            status: "manual",
            titleKey: "tasks.mlMelody4.title",
            descriptionKey: "tasks.mlMelody4.description",
            rewards: [
              rewardOf("support_data", 3),
              rewardOf("battle_memory", 7),
            ],
          },
          {
            id: "ml-melody-5",
            status: "manual",
            titleKey: "tasks.mlMelody5.title",
            descriptionKey: "tasks.mlMelody5.description",
            rewards: [
              rewardOf("support_data", 3),
              rewardOf("battle_memory", 7),
            ],
          },
          // シーズン記録
          {
            id: "ml-record-1",
            status: "manual",
            titleKey: "tasks.mlRecord1.title",
            descriptionKey: "tasks.mlRecord1.description",
            rewards: [
              rewardOf("flawless_melody", 200),
              rewardOf("memory_traces", 50),],
            progressMax: 46000,
          },
          {
            id: "ml-record-2",
            status: "manual",
            titleKey: "tasks.mlRecord2.title",
            descriptionKey: "tasks.mlRecord2.description",
            rewards: [
              rewardOf("flawless_melody", 300),
              rewardOf("memory_traces", 50),
            ],
            progressMax: 52000,
          },
          {
            id: "ml-record-3",
            status: "manual",
            titleKey: "tasks.mlRecord3.title",
            descriptionKey: "tasks.mlRecord3.description",
            rewards: [
              rewardOf("flawless_melody", 400),
              rewardOf("memory_traces", 50),
            ],
            progressMax: 58000,
          },
          // ペルソナ
          {
            id: "ml-persona",
            status: "manual",
            titleKey: "tasks.mlPersona.title",
            descriptionKey: "tasks.mlPersona.description",
          },
          {
            id: "ml-light-song",
            status: "manual",
            titleKey: "tasks.mlLightSong.title",
            descriptionKey: "tasks.mlLightSong.description",
          },
          {
            id: "ml-dark-song",
            status: "manual",
            titleKey: "tasks.mlDarkSong.title",
            descriptionKey: "tasks.mlDarkSong.description",
          },
          {
            id: "ml-perfect-method",
            status: "manual",
            titleKey: "tasks.mlPerfectMethod.title",
            descriptionKey: "tasks.mlPerfectMethod.description",
            rewards: [rewardOf("perfect_method")],
          },
          // 光と闇の歌（derived）
          {
            id: "ml-light-dark-song",
            status: "derived",
            titleKey: "tasks.mlLightDarkSong.title",
            descriptionKey: "tasks.mlLightDarkSong.description",
            childIds: ["ml-light-of-song", "ml-dark-of-song"],
            rewards: [rewardOf("song_of_light_and_darkness")],
          },
          {
            id: "ml-light-of-song",
            status: "manual",
            titleKey: "tasks.mlLightOfSong.title",
            descriptionKey: "tasks.mlLightOfSong.description",
            isChild: true,
            rewards: [
              rewardOf("flawless_melody", 200),
              rewardOf("potencial_disk", 18)
            ],
          },
          {
            id: "ml-dark-of-song",
            status: "manual",
            titleKey: "tasks.mlDarkOfSong.title",
            descriptionKey: "tasks.mlDarkOfSong.description",
            isChild: true,
            rewards: [
              rewardOf("flawless_melody", 200),
              rewardOf("potencial_disk", 18)
            ],
          },
          // 刻印装備
          {
            id: "ml-light-equip",
            status: "manual",
            titleKey: "tasks.mlLightEquip.title",
            descriptionKey: "tasks.mlLightEquip.description",
          },
          {
            id: "ml-dark-equip",
            status: "manual",
            titleKey: "tasks.mlDarkEquip.title",
            descriptionKey: "tasks.mlDarkEquip.description",
          },
          // オールシーズン（derived）
          {
            id: "ml-allseason",
            status: "derived",
            titleKey: "tasks.mlAllSeason.title",
            descriptionKey: "tasks.mlAllSeason.description",
            rewards: [rewardOf("all_collector")],
            progressMax: 2,
            childIds: ["ml-season-a", "ml-season-b"],
          },
          {
            id: "ml-season-a",
            status: "manual",
            titleKey: "tasks.mlSeasonA.title",
            descriptionKey: "tasks.mlSeasonA.description",
            isChild: true,
          },
          {
            id: "ml-season-b",
            status: "manual",
            titleKey: "tasks.mlSeasonB.title",
            descriptionKey: "tasks.mlSeasonB.description",
            isChild: true,
          },
          // 銀河系のオーケストラ
          {
            id: "ml-orchestra",
            status: "manual",
            titleKey: "tasks.mlOrchestra.title",
            descriptionKey: "tasks.mlOrchestra.description",
            rewards: [rewardOf("singing_voice_resonates_across_the_galaxy")],
          },
        ],
      },

      // ─── カオス究明 ─────────────────────────────────────────────────
      {
        id: "chaos-analysis",
        tasks: [
          // カオス征服Ⅰ–Ⅷ
          {
            id: "ca-conquest-1", status: "manual", titleKey: "tasks.caConquest1.title", descriptionKey: "tasks.caConquest1.description",
            rewards: [rewardOf("singing_voice_resonates_across_the_galaxy")],
          },
          { id: "ca-conquest-2", status: "manual", titleKey: "tasks.caConquest2.title", descriptionKey: "tasks.caConquest2.description" },
          { id: "ca-conquest-3", status: "manual", titleKey: "tasks.caConquest3.title", descriptionKey: "tasks.caConquest3.description" },
          { id: "ca-conquest-4", status: "manual", titleKey: "tasks.caConquest4.title", descriptionKey: "tasks.caConquest4.description" },
          { id: "ca-conquest-5", status: "manual", titleKey: "tasks.caConquest5.title", descriptionKey: "tasks.caConquest5.description" },
          { id: "ca-conquest-6", status: "manual", titleKey: "tasks.caConquest6.title", descriptionKey: "tasks.caConquest6.description" },
          { id: "ca-conquest-7", status: "manual", titleKey: "tasks.caConquest7.title", descriptionKey: "tasks.caConquest7.description" },
          { id: "ca-conquest-8", status: "manual", titleKey: "tasks.caConquest8.title", descriptionKey: "tasks.caConquest8.description" },
          // 単体
          { id: "ca-last-heart", status: "manual", titleKey: "tasks.caLastHeart.title", descriptionKey: "tasks.caLastHeart.description" },
          { id: "ca-burning-anthem", status: "manual", titleKey: "tasks.caBurningAnthem.title", descriptionKey: "tasks.caBurningAnthem.description" },
          { id: "ca-give-up", status: "manual", titleKey: "tasks.caGiveUp.title", descriptionKey: "tasks.caGiveUp.description" },
          { id: "ca-annotation", status: "manual", titleKey: "tasks.caAnnotation.title", descriptionKey: "tasks.caAnnotation.description" },
          { id: "ca-lucky-goddess", status: "manual", titleKey: "tasks.caLuckyGoddess.title", descriptionKey: "tasks.caLuckyGoddess.description" },
          { id: "ca-mad-bid", status: "manual", titleKey: "tasks.caMadBid.title", descriptionKey: "tasks.caMadBid.description" },
          {
            id: "ca-abyssal-mark", status: "manual", titleKey: "tasks.caAbyssalMark.title", descriptionKey: "tasks.caAbyssalMark.description",
            rewards: [rewardOf("support_data", 5), rewardOf("battle_memory", 10)],
          },
          // 作品批評家（derived: 7 children）
          {
            id: "ca-art-critic",
            status: "derived",
            titleKey: "tasks.caArtCritic.title",
            descriptionKey: "tasks.caArtCritic.description",
            childIds: [
              "ca-discerning-audience",
              "ca-boring-audience",
              "ca-noise-audience",
              "ca-erosion-audience",
              "ca-mirror-audience",
              "ca-emotional-audience",
              "ca-symbolic-audience",
            ],
          },
          { id: "ca-discerning-audience", status: "manual", titleKey: "tasks.caDiscerningAudience.title", descriptionKey: "tasks.caDiscerningAudience.description", isChild: true },
          { id: "ca-boring-audience", status: "manual", titleKey: "tasks.caBoringAudience.title", descriptionKey: "tasks.caBoringAudience.description", isChild: true },
          { id: "ca-noise-audience", status: "manual", titleKey: "tasks.caNoiseAudience.title", descriptionKey: "tasks.caNoiseAudience.description", isChild: true },
          { id: "ca-erosion-audience", status: "manual", titleKey: "tasks.caErosionAudience.title", descriptionKey: "tasks.caErosionAudience.description", isChild: true },
          { id: "ca-mirror-audience", status: "manual", titleKey: "tasks.caMirrorAudience.title", descriptionKey: "tasks.caMirrorAudience.description", isChild: true },
          { id: "ca-emotional-audience", status: "manual", titleKey: "tasks.caEmotionalAudience.title", descriptionKey: "tasks.caEmotionalAudience.description", isChild: true },
          { id: "ca-symbolic-audience", status: "manual", titleKey: "tasks.caSymbolicAudience.title", descriptionKey: "tasks.caSymbolicAudience.description", isChild: true },
          { id: "ca-hidden-work", status: "manual", titleKey: "tasks.caHiddenWork.title", descriptionKey: "tasks.caHiddenWork.description", isChild: true },
          { id: "ca-last-exhibition", status: "manual", titleKey: "tasks.caLastExhibition.title", descriptionKey: "tasks.caLastExhibition.description", isChild: true },
          { id: "ca-all-relics", status: "manual", titleKey: "tasks.caAllRelics.title", descriptionKey: "tasks.caAllRelics.description", isChild: true },
          { id: "ca-stop-admiring", status: "manual", titleKey: "tasks.caStopAdmiring.title", descriptionKey: "tasks.caStopAdmiring.description", isChild: true },
          { id: "ca-eternal-noon", status: "manual", titleKey: "tasks.caEternalNoon.title", descriptionKey: "tasks.caEternalNoon.description", isChild: true },
          { id: "ca-art-is-hard", status: "manual", titleKey: "tasks.caArtIsHard.title", descriptionKey: "tasks.caArtIsHard.description", isChild: true },
          // すべての悲劇は本心だ（derived: 3 children）
          {
            id: "ca-all-tragedy",
            status: "derived",
            titleKey: "tasks.caAllTragedy.title",
            descriptionKey: "tasks.caAllTragedy.description",
            childIds: ["ca-first-erased", "ca-way-to-unite", "ca-most-valuable"],
          },
          { id: "ca-first-erased", status: "manual", titleKey: "tasks.caFirstErased.title", descriptionKey: "tasks.caFirstErased.description", isChild: true },
          { id: "ca-way-to-unite", status: "manual", titleKey: "tasks.caWayToUnite.title", descriptionKey: "tasks.caWayToUnite.description", isChild: true },
          { id: "ca-most-valuable", status: "manual", titleKey: "tasks.caMostValuable.title", descriptionKey: "tasks.caMostValuable.description", isChild: true },
          // 不完全な傑作の完成（derived: 3 children）
          {
            id: "ca-incomplete-masterpiece",
            status: "derived",
            titleKey: "tasks.caIncompleteMasterpiece.title",
            descriptionKey: "tasks.caIncompleteMasterpiece.description",
            childIds: ["ca-stuffed-breath", "ca-scratched-void", "ca-paradise-silence"],
          },
          { id: "ca-stuffed-breath", status: "manual", titleKey: "tasks.caStuffedBreath.title", descriptionKey: "tasks.caStuffedBreath.description", isChild: true },
          { id: "ca-scratched-void", status: "manual", titleKey: "tasks.caScratchedVoid.title", descriptionKey: "tasks.caScratchedVoid.description", isChild: true },
          { id: "ca-paradise-silence", status: "manual", titleKey: "tasks.caParadiseSilence.title", descriptionKey: "tasks.caParadiseSilence.description", isChild: true },
          { id: "ca-critic-legacy", status: "manual", titleKey: "tasks.caCriticLegacy.title", descriptionKey: "tasks.caCriticLegacy.description", isChild: true },
          { id: "ca-betrayal-moment", status: "manual", titleKey: "tasks.caBetrayalMoment.title", descriptionKey: "tasks.caBetrayalMoment.description", isChild: true },
          { id: "ca-incomprehensible-obsession", status: "manual", titleKey: "tasks.caIncomprehensibleObsession.title", descriptionKey: "tasks.caIncomprehensibleObsession.description", isChild: true },
          // メシアの信者（derived: 3 children shared with 名もなき芸術家）
          {
            id: "ca-messiah-believer",
            status: "derived",
            titleKey: "tasks.caMessiahBeliever.title",
            descriptionKey: "tasks.caMessiahBeliever.description",
            childIds: ["ca-most-desperate", "ca-eternal-anthem", "ca-stuffed-chest"],
          },
          { id: "ca-most-desperate", status: "manual", titleKey: "tasks.caMostDesperate.title", descriptionKey: "tasks.caMostDesperate.description", isChild: true },
          { id: "ca-eternal-anthem", status: "manual", titleKey: "tasks.caEternalAnthem.title", descriptionKey: "tasks.caEternalAnthem.description", isChild: true },
          { id: "ca-stuffed-chest", status: "manual", titleKey: "tasks.caStuffedChest.title", descriptionKey: "tasks.caStuffedChest.description", isChild: true },
          // 騒音の指揮者（derived: 3 children shared with 名もなき芸術家）
          {
            id: "ca-noise-conductor",
            status: "derived",
            titleKey: "tasks.caNoiseCondutor.title",
            descriptionKey: "tasks.caNoiseCondutor.description",
            childIds: ["ca-aria-high", "ca-abyss-vibration", "ca-blank-score"],
          },
          { id: "ca-aria-high", status: "manual", titleKey: "tasks.caAriaHigh.title", descriptionKey: "tasks.caAriaHigh.description", isChild: true },
          { id: "ca-abyss-vibration", status: "manual", titleKey: "tasks.caAbyssVibration.title", descriptionKey: "tasks.caAbyssVibration.description", isChild: true },
          { id: "ca-blank-score", status: "manual", titleKey: "tasks.caBlankScore.title", descriptionKey: "tasks.caBlankScore.description", isChild: true },
          // 虚像の収集家（derived: 3 children shared with 名もなき芸術家）
          {
            id: "ca-phantom-collector",
            status: "derived",
            titleKey: "tasks.caPhantomCollector.title",
            descriptionKey: "tasks.caPhantomCollector.description",
            childIds: ["ca-pure-corruption", "ca-sacrifice-salvation", "ca-faceless"],
          },
          { id: "ca-pure-corruption", status: "manual", titleKey: "tasks.caPureCorruption.title", descriptionKey: "tasks.caPureCorruption.description", isChild: true },
          { id: "ca-sacrifice-salvation", status: "manual", titleKey: "tasks.caSacrificeSalvation.title", descriptionKey: "tasks.caSacrificeSalvation.description", isChild: true },
          { id: "ca-faceless", status: "manual", titleKey: "tasks.caFaceless.title", descriptionKey: "tasks.caFaceless.description", isChild: true },
          // 悲劇の下描き（derived: 2 children shared with 名もなき芸術家）
          {
            id: "ca-tragedy-sketch",
            status: "derived",
            titleKey: "tasks.caTragdySketch.title",
            descriptionKey: "tasks.caTragdySketch.description",
            childIds: ["ca-blank-anthem", "ca-broken-divine"],
          },
          { id: "ca-blank-anthem", status: "manual", titleKey: "tasks.caBlankAnthem.title", descriptionKey: "tasks.caBlankAnthem.description", isChild: true },
          { id: "ca-broken-divine", status: "manual", titleKey: "tasks.caBrokenDivine.title", descriptionKey: "tasks.caBrokenDivine.description", isChild: true },
          // エリドナの栄光（derived: 6 children）
          {
            id: "ca-eridona-glory",
            status: "derived",
            titleKey: "tasks.caEridonaGlory.title",
            descriptionKey: "tasks.caEridonaGlory.description",
            childIds: [
              "ca-hidden-work",
              "ca-last-exhibition",
              "ca-all-relics",
              "ca-stop-admiring",
              "ca-eternal-noon",
              "ca-art-is-hard",
              "ca-tbd-3",
              "ca-first-erased",
              "ca-way-to-unite",
              "ca-most-valuable",
              "ca-stuffed-breath",
              "ca-scratched-void",
              "ca-paradise-silence",
            ],
            rewards: [rewardOf("glory_of_elinad")],
          },
          { id: "ca-tbd-3", status: "manual", titleKey: "tasks.caTbd.title", descriptionKey: "tasks.caTbd.description", isChild: true },
          // 名もなき芸術家（derived: 14 children including shared）
          {
            id: "ca-nameless-artist",
            status: "derived",
            titleKey: "tasks.caNamelessArtist.title",
            descriptionKey: "tasks.caNamelessArtist.description",
            childIds: [
              "ca-critic-legacy",
              "ca-betrayal-moment",
              "ca-incomprehensible-obsession",
              "ca-most-desperate",
              "ca-eternal-anthem",
              "ca-stuffed-chest",
              "ca-aria-high",
              "ca-abyss-vibration",
              "ca-tbd-2",
              "ca-blank-score",
              "ca-pure-corruption",
              "ca-sacrifice-salvation",
              "ca-faceless",
              "ca-blank-anthem",
              "ca-broken-divine",
            ],
            rewards: [rewardOf("nameless_artist")],
          },
          { id: "ca-tbd-2", status: "manual", titleKey: "tasks.caTbd.title", descriptionKey: "tasks.caTbd.description", isChild: true },
          {
            id: "ca-unknown-audition", status: "manual", titleKey: "tasks.caUnknownAudition.title", descriptionKey: "tasks.caUnknownAudition.description",
            rewards: [rewardOf("unknown_audition")],
          },
          {
            id: "ca-credit-collector", status: "manual", titleKey: "tasks.caCreditCollector.title", descriptionKey: "tasks.caCreditCollector.description",
            rewards: [rewardOf("credit_collector")],
          },
          // カーテンコールの解放（derived: 2 children）
          {
            id: "ca-curtain-call",
            status: "derived",
            titleKey: "tasks.caCurtainCall.title",
            descriptionKey: "tasks.caCurtainCall.description",
            childIds: ["ca-terrible-encore", "ca-tbd-1"],
            rewards: [rewardOf("release_of_the_curtain_call")],
          },
          { id: "ca-terrible-encore", status: "manual", titleKey: "tasks.caTerribleEncore.title", descriptionKey: "tasks.caTerribleEncore.description", isChild: true },
          { id: "ca-tbd-1", status: "manual", titleKey: "tasks.caTbd.title", descriptionKey: "tasks.caTbd.description", isChild: true },
        ],
      },

      // ─── 戦闘報告 ───────────────────────────────────────────────────
      {
        id: "battle-report",
        tasks: [
          {
            id: "br-end-critique", status: "manual", titleKey: "tasks.brEndCritique.title", descriptionKey: "tasks.brEndCritique.description",
            rewards: [
              rewardOf("universal_support_certificate", 15),
              rewardOf("universal_tactics_certificate", 15)
            ],
          },
          {
            id: "br-disturb-art", status: "manual", titleKey: "tasks.brDisturbArt.title", descriptionKey: "tasks.brDisturbArt.description",
            rewards: [
              rewardOf("universal_support_certificate", 15),
              rewardOf("universal_tactics_certificate", 15)
            ],
          },
          // 千の顔（derived: 3 children）
          {
            id: "br-thousand-faces",
            status: "derived",
            titleKey: "tasks.brThousandFaces.title",
            descriptionKey: "tasks.brThousandFaces.description",
            childIds: ["br-cruelbone", "br-serapion", "br-soul-collector", "br-hatred-condemnation", "br-tbd-5"],
            rewards: [rewardOf("thousand_faces")],
          },
          {
            id: "br-cruelbone", status: "manual", titleKey: "tasks.brCruelbone.title", descriptionKey: "tasks.brCruelbone.description", isChild: true,
            rewards: [rewardOf("flawless_melody", 200)],
          },
          {
            id: "br-serapion", status: "manual", titleKey: "tasks.brSerapion.title", descriptionKey: "tasks.brSerapion.description", isChild: true,
            rewards: [rewardOf("flawless_melody", 200)],
          },
          {
            id: "br-soul-collector", status: "manual", titleKey: "tasks.brSoulCollector.title", descriptionKey: "tasks.brSoulCollector.description", isChild: true,
            rewards: [rewardOf("flawless_melody", 200)],
          },
          {
            id: "br-hatred-condemnation", status: "manual", titleKey: "tasks.brHatredCondemnation.title", descriptionKey: "tasks.brHatredCondemnation.description", isChild: true,
            rewards: [rewardOf("flawless_melody", 200)],
          },
          { id: "br-tbd-5", status: "manual", titleKey: "tasks.brTbd.title", descriptionKey: "tasks.brTbd.description", isChild: true },
          // 舞台独占（derived: 3 children）
          {
            id: "br-stage-monopoly",
            status: "derived",
            titleKey: "tasks.brStageMonopoly.title",
            descriptionKey: "tasks.brStageMonopoly.description",
            childIds: ["br-phantom-extra", "br-hero-nightmare", "br-tbd-3"],
            rewards: [rewardOf("monopoly_on_stage")],

          },
          { id: "br-phantom-extra", status: "manual", titleKey: "tasks.brPhantomExtra.title", descriptionKey: "tasks.brPhantomExtra.description", isChild: true },
          {
            id: "br-hero-nightmare", status: "manual", titleKey: "tasks.brHeroNightmare.title", descriptionKey: "tasks.brHeroNightmare.description", isChild: true,
            rewards: [
              rewardOf("collapsed_elinad"),
              rewardOf("collapsed_elinad_profile")
            ],
          },
          { id: "br-tbd-3", status: "manual", titleKey: "tasks.brTbd.title", descriptionKey: "tasks.brTbd.description", isChild: true },
        ],
      },

      // ─── 壊滅作戦 ───────────────────────────────────────────────────
      {
        id: "annihilation",
        tasks: [
          // クルーエルボーン 難易度1–10
          { id: "an-cb-1", status: "manual", titleKey: "tasks.anCb1.title", descriptionKey: "tasks.anCb1.description" },
          { id: "an-cb-2", status: "manual", titleKey: "tasks.anCb2.title", descriptionKey: "tasks.anCb2.description" },
          { id: "an-cb-3", status: "manual", titleKey: "tasks.anCb3.title", descriptionKey: "tasks.anCb3.description" },
          { id: "an-cb-4", status: "manual", titleKey: "tasks.anCb4.title", descriptionKey: "tasks.anCb4.description" },
          { id: "an-cb-5", status: "manual", titleKey: "tasks.anCb5.title", descriptionKey: "tasks.anCb5.description" },
          { id: "an-cb-6", status: "manual", titleKey: "tasks.anCb6.title", descriptionKey: "tasks.anCb6.description" },
          { id: "an-cb-7", status: "manual", titleKey: "tasks.anCb7.title", descriptionKey: "tasks.anCb7.description" },
          { id: "an-cb-8", status: "manual", titleKey: "tasks.anCb8.title", descriptionKey: "tasks.anCb8.description" },
          { id: "an-cb-9", status: "manual", titleKey: "tasks.anCb9.title", descriptionKey: "tasks.anCb9.description" },
          { id: "an-cb-10", status: "manual", titleKey: "tasks.anCb10.title", descriptionKey: "tasks.anCb10.description" },
          // セラフィオン 難易度1–10
          { id: "an-se-1", status: "manual", titleKey: "tasks.anSe1.title", descriptionKey: "tasks.anSe1.description" },
          { id: "an-se-2", status: "manual", titleKey: "tasks.anSe2.title", descriptionKey: "tasks.anSe2.description" },
          { id: "an-se-3", status: "manual", titleKey: "tasks.anSe3.title", descriptionKey: "tasks.anSe3.description" },
          { id: "an-se-4", status: "manual", titleKey: "tasks.anSe4.title", descriptionKey: "tasks.anSe4.description" },
          { id: "an-se-5", status: "manual", titleKey: "tasks.anSe5.title", descriptionKey: "tasks.anSe5.description" },
          { id: "an-se-6", status: "manual", titleKey: "tasks.anSe6.title", descriptionKey: "tasks.anSe6.description" },
          { id: "an-se-7", status: "manual", titleKey: "tasks.anSe7.title", descriptionKey: "tasks.anSe7.description" },
          { id: "an-se-8", status: "manual", titleKey: "tasks.anSe8.title", descriptionKey: "tasks.anSe8.description" },
          { id: "an-se-9", status: "manual", titleKey: "tasks.anSe9.title", descriptionKey: "tasks.anSe9.description" },
          { id: "an-se-10", status: "manual", titleKey: "tasks.anSe10.title", descriptionKey: "tasks.anSe10.description" },
          // ソウルコレクター 難易度1–10
          { id: "an-sc-1", status: "manual", titleKey: "tasks.anSc1.title", descriptionKey: "tasks.anSc1.description" },
          { id: "an-sc-2", status: "manual", titleKey: "tasks.anSc2.title", descriptionKey: "tasks.anSc2.description" },
          { id: "an-sc-3", status: "manual", titleKey: "tasks.anSc3.title", descriptionKey: "tasks.anSc3.description" },
          { id: "an-sc-4", status: "manual", titleKey: "tasks.anSc4.title", descriptionKey: "tasks.anSc4.description" },
          { id: "an-sc-5", status: "manual", titleKey: "tasks.anSc5.title", descriptionKey: "tasks.anSc5.description" },
          { id: "an-sc-6", status: "manual", titleKey: "tasks.anSc6.title", descriptionKey: "tasks.anSc6.description" },
          { id: "an-sc-7", status: "manual", titleKey: "tasks.anSc7.title", descriptionKey: "tasks.anSc7.description" },
          { id: "an-sc-8", status: "manual", titleKey: "tasks.anSc8.title", descriptionKey: "tasks.anSc8.description" },
          { id: "an-sc-9", status: "manual", titleKey: "tasks.anSc9.title", descriptionKey: "tasks.anSc9.description" },
          { id: "an-sc-10", status: "manual", titleKey: "tasks.anSc10.title", descriptionKey: "tasks.anSc10.description" },
        ],
      },
    ],
  },
];

export const defaultSeasonId = seasons[0].id;
