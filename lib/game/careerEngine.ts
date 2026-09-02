import { prisma } from "@/lib/prisma";
import { applyAgeCurve } from "./ageCurve";
import {
  buildStartingAttributes,
  clampStat,
  computeOverall,
  marketValueFromOverall,
} from "./attributes";
import { ClubOfferKind, ClubOfferOption } from "./clubOffers";
import { domesticCupName, INDIVIDUAL_AWARDS } from "./data/awards";
import { continentalTrophyName, countryCodesInConfederation } from "./data/confederations";
import { eligibleEvents, getEventByKey, getOption, pickRandomEvent, resolveOutcome } from "./eventEngine";
import { describeEffects, EffectTone, effectTone } from "./format";
import { randomInt, sampleN, sampleWeighted } from "./random";
import {
  decisiveShootoutChance,
  NationalTeamSimResult,
  simulateNationalTeamSeason,
  simulateSeason,
} from "./seasonSim";
import { Attributes, DIFFICULTY_INFO, Difficulty, EventDefinition, Foot, Position, STAT_KEYS } from "./types";

function buildEventOptionsPayload(event: EventDefinition) {
  return event.options.map((option) => ({
    key: option.key,
    label: option.label,
    description: option.description,
    outcomes: option.outcomes.map((outcome) => ({
      id: outcome.id,
      chance: outcome.chance,
      tag: describeEffects(outcome.effects),
      tone: effectTone(outcome.effects),
      // Only used client-side to match this outcome against the CareerEventLog row that lands
      // once the decision actually resolves — never rendered before that happens.
      summary: outcome.summary,
    })),
  }));
}

export interface CreateCareerInput {
  lastName: string;
  jerseyNumber: number;
  foot: Foot;
  nationalityId: string;
  position: Position;
  difficulty: Difficulty;
}

function attributesFromCareer(career: {
  pace: number;
  shooting: number;
  passing: number;
  defense: number;
  physical: number;
  mentality: number;
}): Attributes {
  return {
    pace: career.pace,
    shooting: career.shooting,
    passing: career.passing,
    defense: career.defense,
    physical: career.physical,
    mentality: career.mentality,
  };
}

// Every real career starts somewhere between 16 and 18 — varying it a little means not every
// playthrough looks identical from minute one.
const STARTING_AGE_MIN = 16;
const STARTING_AGE_MAX = 18;

export async function createCareer(userId: string, input: CreateCareerInput) {
  const attributes = buildStartingAttributes(input.position);
  const overall = computeOverall(attributes, input.position);
  const startingAge = randomInt(STARTING_AGE_MIN, STARTING_AGE_MAX);
  const marketValueEUR = marketValueFromOverall(overall, startingAge);

  const career = await prisma.playerCareer.create({
    data: {
      userId,
      lastName: input.lastName.trim().toUpperCase(),
      jerseyNumber: input.jerseyNumber,
      foot: input.foot,
      nationalityId: input.nationalityId,
      position: input.position,
      difficulty: input.difficulty,
      age: startingAge,
      seasonIndex: 0,
      marketValueEUR,
      ...attributes,
      overall,
      morale: 70,
      fitness: 100,
      starterShare: 0.55,
    },
  });

  const youthClubs = await prisma.club.findMany({
    where: { countryId: input.nationalityId, reputation: { lte: 2 } },
    include: { league: true, country: true },
  });

  const fallbackClubs =
    youthClubs.length >= 3
      ? youthClubs
      : await prisma.club.findMany({
          where: { reputation: { lte: 2 } },
          include: { league: true, country: true },
        });

  const chosen = sampleN(fallbackClubs, 3);
  const options: ClubOfferOption[] = chosen.map((club, index) => ({
    optionKey: `cantera_${index}`,
    label: club.name,
    description: `${club.league.name} · ${club.country.name}`,
    clubId: club.id,
    clubName: club.name,
    clubShort: club.shortName,
    clubColor: club.primaryColor,
    clubKey: club.key,
    leagueName: club.league.name,
    countryCode: club.country.code,
    reputation: club.reputation,
    clearsLoan: true,
  }));

  await prisma.pendingClubOffer.create({
    data: {
      careerId: career.id,
      age: startingAge,
      kind: "CANTERA" satisfies ClubOfferKind,
      title: "Oferta de cantera",
      description: "Tres clubes quieren sumarte a su proyecto juvenil. Elegí dónde empieza tu carrera.",
      optionsJson: JSON.stringify(options),
    },
  });

  return career;
}

// Club offers/loans keyed as "requests to sign you" — counting these tells us how many times
// the player has already changed clubs, so the first few can be kept in their home country
// (build a name locally before the world starts calling) and offers can lean toward upgrades.
const CLUB_OFFER_KINDS: ClubOfferKind[] = ["CANTERA", "TRANSFER", "LOAN_OUT", "LOAN_RETURN"];

// Decisive penalty-shootout decisions — resolveEventAction skips its usual automatic
// advanceSeason() call for these (see app/actions/career.ts), because that immediate next-season
// simulation could hand out an unrelated trophy in the very same reload a missed penalty shows
// on, making it look like the shootout itself was won.
export const SHOOTOUT_EVENT_KEYS = new Set(["mundial_penales", "champions_penales", "fichaje_penales"]);
const DOMESTIC_ONLY_TRANSITIONS = 3;
// Below this overall, European (UEFA) clubs simply aren't in the running yet — the career is
// meant to read as "build your name across the Americas first, Europe is the payoff move."
const EUROPE_OVERALL_THRESHOLD = 65;

// The handful of European "dream" clubs a player is actually hoping to see once they're good
// enough — without a boost these compete on equal footing with every other reputation-5 club in
// the sampling pool (River, Boca, Flamengo, Palmeiras...), so in practice they could go many
// careers without ever coming up even once the player is clearly good enough for them.
const ELITE_CLUB_KEYS = new Set([
  "realmadrid",
  "barcelona",
  "mancity",
  "manutd",
  "liverpool",
  "bayern",
  "juventus",
  "inter",
  "psg",
]);

function clubOfferWeight(club: { key: string }): number {
  return ELITE_CLUB_KEYS.has(club.key) ? 4 : 1;
}

async function countClubTransitions(careerId: string): Promise<number> {
  return prisma.careerEventLog.count({ where: { careerId, eventKey: { in: CLUB_OFFER_KINDS } } });
}

async function findClubCandidates(params: {
  excludeClubIds: string[];
  minReputation: number;
  maxReputation: number;
  domesticOnly: boolean;
  nationalityId: string;
  allowEurope: boolean;
  minCount: number;
}) {
  const baseWhere = {
    id: { notIn: params.excludeClubIds },
    reputation: { gte: params.minReputation, lte: params.maxReputation },
  };
  if (params.domesticOnly) {
    const domestic = await prisma.club.findMany({
      where: { ...baseWhere, countryId: params.nationalityId },
      include: { league: true, country: true },
    });
    if (domestic.length >= params.minCount) return domestic;
  }
  if (!params.allowEurope) {
    const europeCountries = await prisma.country.findMany({
      where: { code: { in: countryCodesInConfederation("UEFA") } },
      select: { id: true },
    });
    const nonEurope = await prisma.club.findMany({
      where: { ...baseWhere, countryId: { notIn: europeCountries.map((c) => c.id) } },
      include: { league: true, country: true },
    });
    if (nonEurope.length >= params.minCount) return nonEurope;
  }
  return prisma.club.findMany({ where: baseWhere, include: { league: true, country: true } });
}

async function generateTransferOffer(
  careerId: string,
  age: number,
  currentClubId: string,
  overall: number,
  nationalityId: string,
  domesticOnly: boolean,
  allowEurope: boolean,
  opts: { decline?: boolean; forceElite?: boolean } = {},
) {
  const decline = opts.decline ?? false;
  const forceElite = opts.forceElite ?? false;
  const currentClub = await prisma.club.findUniqueOrThrow({ where: { id: currentClubId } });
  const targetBand = Math.max(1, Math.min(5, Math.round(overall / 20)));
  // Most transfer offers are a step up rather than sideways/down — a career should feel like it's
  // building toward something. Occasionally allow a band-down option too, for realism. A decline
  // offer flips this: every option is a step DOWN, steering a veteran toward the exit instead. A
  // forced elite offer (reward for a hot streak) always aims straight at the very top band.
  const biasUp = !decline && Math.random() < 0.7;
  const minBand = decline ? 1 : forceElite ? 4 : biasUp ? targetBand : Math.max(1, targetBand - 1);
  const maxBand = decline ? Math.max(1, targetBand - 1) : forceElite ? 5 : Math.min(5, targetBand + 1);
  const candidates = await findClubCandidates({
    excludeClubIds: [currentClubId],
    minReputation: minBand,
    maxReputation: maxBand,
    domesticOnly: forceElite ? false : domesticOnly,
    nationalityId,
    allowEurope: forceElite ? true : allowEurope,
    minCount: 2,
  });
  if (candidates.length === 0) return false;

  // Weighted so a handful of marquee European clubs (Real Madrid, Barcelona...) show up
  // noticeably more often than an equally-reputable but less iconic peer, once eligible — see
  // ELITE_CLUB_KEYS.
  const chosen = sampleWeighted(candidates, clubOfferWeight, 2);
  const europeCodes = countryCodesInConfederation("UEFA");
  const includesEuropeanOffer = chosen.some((club) => europeCodes.includes(club.country.code));
  const options: ClubOfferOption[] = chosen.map((club, index) => ({
    optionKey: `transfer_${index}`,
    label: `Fichar por ${club.name}`,
    description: `${club.league.name} · ${club.country.name}`,
    clubId: club.id,
    clubName: club.name,
    clubShort: club.shortName,
    clubColor: club.primaryColor,
    clubKey: club.key,
    leagueName: club.league.name,
    countryCode: club.country.code,
    reputation: club.reputation,
    clearsLoan: true,
    marketValueMultiplier: decline ? 0.85 : 1.08,
    starterShareSet: decline ? 0.7 : 0.6,
  }));
  // A decline move is presented as the only path forward — no "stay at the big club" escape
  // hatch, since the whole point is to force the career toward its natural end back home.
  if (!decline) {
    options.push({
      optionKey: "transfer_stay",
      label: `Quedarte en ${currentClub.name}`,
      description: "Rechazás las ofertas y seguís en tu club actual.",
      clubId: null,
      moraleDelta: 3,
    });
  }

  await prisma.pendingClubOffer.create({
    data: {
      careerId,
      age,
      kind: "TRANSFER" satisfies ClubOfferKind,
      title: decline ? "El final se acerca" : includesEuropeanOffer ? "¡Ofertas desde Europa!" : "Mercado de pases",
      description: decline
        ? `A tu edad, ${currentClub.name} ya piensa en el recambio. Es momento de volver a un club más tranquilo, cerca de casa.`
        : includesEuropeanOffer
          ? "Tu nombre llegó a Europa, donde se mueve la plata grande del fútbol. Elegí bien tu próximo paso."
          : "Llegaron ofertas de otros clubes. Podés aceptar una o quedarte.",
      optionsJson: JSON.stringify(options),
    },
  });
  return true;
}

async function generateLoanOutOffer(
  careerId: string,
  age: number,
  currentClubId: string,
  currentClubReputation: number,
  nationalityId: string,
  domesticOnly: boolean,
  allowEurope: boolean,
) {
  const candidates = await findClubCandidates({
    excludeClubIds: [currentClubId],
    minReputation: 1,
    maxReputation: Math.max(1, currentClubReputation - 1),
    domesticOnly,
    nationalityId,
    allowEurope,
    minCount: 2,
  });
  if (candidates.length === 0) return false;

  const chosen = sampleN(candidates, 2);
  const options: ClubOfferOption[] = chosen.map((club, index) => ({
    optionKey: `loan_${index}`,
    label: `Préstamo en ${club.name}`,
    description: `${club.league.name} · ${club.country.name}`,
    clubId: club.id,
    clubName: club.name,
    clubShort: club.shortName,
    clubColor: club.primaryColor,
    clubKey: club.key,
    leagueName: club.league.name,
    countryCode: club.country.code,
    reputation: club.reputation,
    setsLoanFrom: currentClubId,
    starterShareSet: 0.75,
  }));
  options.push({
    optionKey: "loan_stay",
    label: "Quedarte en el club",
    description: "Tu club quiere que sumes minutos en otro equipo. Elegí dónde seguir tu desarrollo.",
    clubId: null,
    moraleDelta: -3,
  });

  await prisma.pendingClubOffer.create({
    data: {
      careerId,
      age,
      kind: "LOAN_OUT" satisfies ClubOfferKind,
      title: "Salida a préstamo",
      description: "Tu club quiere que sumes minutos en otro equipo. Elegí dónde seguir tu desarrollo.",
      optionsJson: JSON.stringify(options),
    },
  });
  return true;
}

async function generateLoanReturnOffer(
  careerId: string,
  age: number,
  currentLoanClubId: string,
  originClubId: string,
) {
  const [originClub, loanClub] = await Promise.all([
    prisma.club.findUniqueOrThrow({ where: { id: originClubId }, include: { league: true, country: true } }),
    prisma.club.findUniqueOrThrow({ where: { id: currentLoanClubId }, include: { league: true, country: true } }),
  ]);

  const newLoanCandidates = await prisma.club.findMany({
    where: {
      id: { notIn: [originClubId, currentLoanClubId] },
      reputation: { lte: Math.max(1, loanClub.reputation) },
    },
    include: { league: true, country: true },
  });

  const options: ClubOfferOption[] = [
    {
      optionKey: "return_home",
      label: `Volver a ${originClub.name}`,
      description: `${originClub.league.name} · ${originClub.country.name}`,
      clubId: originClub.id,
      clubShort: originClub.shortName,
      clubColor: originClub.primaryColor,
      clubKey: originClub.key,
      countryCode: originClub.country.code,
      clearsLoan: true,
      starterShareSet: 0.5,
    },
    {
      optionKey: "sign_permanent",
      label: `Ficharte por ${loanClub.name}`,
      description: `${loanClub.league.name} · ${loanClub.country.name}`,
      clubId: loanClub.id,
      clubShort: loanClub.shortName,
      clubColor: loanClub.primaryColor,
      clubKey: loanClub.key,
      countryCode: loanClub.country.code,
      clearsLoan: true,
      marketValueMultiplier: 1.05,
      starterShareSet: 0.65,
    },
  ];

  const newLoanClub = sampleN(newLoanCandidates, 1)[0];
  if (newLoanClub) {
    options.push({
      optionKey: "loan_again",
      label: `Nuevo préstamo en ${newLoanClub.name}`,
      description: `${newLoanClub.league.name} · ${newLoanClub.country.name}`,
      clubId: newLoanClub.id,
      clubShort: newLoanClub.shortName,
      clubColor: newLoanClub.primaryColor,
      clubKey: newLoanClub.key,
      countryCode: newLoanClub.country.code,
      setsLoanFrom: originClub.id,
      starterShareSet: 0.75,
    });
  }

  await prisma.pendingClubOffer.create({
    data: {
      careerId,
      age,
      kind: "LOAN_RETURN" satisfies ClubOfferKind,
      title: "Regreso a tu club",
      description: "Volvés de tu préstamo. Definí el próximo paso de tu carrera.",
      optionsJson: JSON.stringify(options),
    },
  });
}

export async function resolveClubOffer(careerId: string, userId: string, optionKey: string) {
  const career = await prisma.playerCareer.findFirstOrThrow({ where: { id: careerId, userId } });
  const pending = await prisma.pendingClubOffer.findUniqueOrThrow({ where: { careerId } });
  const options: ClubOfferOption[] = JSON.parse(pending.optionsJson);
  const option = options.find((o) => o.optionKey === optionKey);
  if (!option) throw new Error("Opción inválida");

  const data: Record<string, unknown> = {};
  if (option.clubId) data.currentClubId = option.clubId;
  if (option.clearsLoan) data.onLoanFromId = null;
  if (option.setsLoanFrom !== undefined && option.setsLoanFrom !== null) {
    data.onLoanFromId = option.setsLoanFrom;
  }
  if (option.starterShareSet !== undefined) data.starterShare = option.starterShareSet;
  if (option.marketValueMultiplier) {
    data.marketValueEUR = Math.round(career.marketValueEUR * option.marketValueMultiplier);
  }
  if (option.moraleDelta) {
    data.morale = Math.max(0, Math.min(100, career.morale + option.moraleDelta));
  }

  await prisma.$transaction([
    prisma.playerCareer.update({ where: { id: careerId }, data }),
    prisma.careerEventLog.create({
      data: {
        careerId,
        age: pending.age,
        eventKey: pending.kind,
        eventTitle: pending.title,
        optionKey: option.optionKey,
        optionLabel: option.label,
        outcomeSummary: option.label,
        statDeltaJson: JSON.stringify(option),
      },
    }),
    prisma.pendingClubOffer.delete({ where: { careerId } }),
  ]);
}

export interface ResolvedOutcome {
  outcomeId: string;
  summary: string;
  tag: string;
  tone: EffectTone;
}

export async function resolveEvent(
  careerId: string,
  userId: string,
  optionKey: string,
): Promise<ResolvedOutcome> {
  const career = await prisma.playerCareer.findFirstOrThrow({
    where: { id: careerId, userId },
    include: { nationality: true, currentClub: { include: { league: true, country: true } } },
  });
  const pending = await prisma.pendingEvent.findUniqueOrThrow({ where: { careerId } });
  const event = getEventByKey(pending.eventKey);
  if (!event) throw new Error("Evento no encontrado");
  const option = getOption(event, optionKey);
  if (!option) throw new Error("Opción inválida");

  const outcome = resolveOutcome(option);
  const attributes = attributesFromCareer(career);
  const nextAttributes = { ...attributes };
  if (outcome.effects.statDeltas) {
    for (const key of STAT_KEYS) {
      const delta = outcome.effects.statDeltas[key];
      if (delta) nextAttributes[key] = clampStat(nextAttributes[key] + delta);
    }
  }
  const nextOverall = computeOverall(nextAttributes, career.position as Position);

  const nextMorale = Math.max(
    0,
    Math.min(100, career.morale + (outcome.effects.moraleDelta ?? 0)),
  );
  const nextFitness = Math.max(
    0,
    Math.min(100, career.fitness + (outcome.effects.fitnessDelta ?? 0)),
  );
  const nextStarterShare = Math.max(
    0.05,
    Math.min(0.95, career.starterShare + (outcome.effects.starterShareDelta ?? 0)),
  );
  const nextReputation = Math.max(0, career.reputation + (outcome.effects.reputationDelta ?? 0));
  const nextMarketValue = outcome.effects.marketValueMultiplier
    ? Math.round(career.marketValueEUR * outcome.effects.marketValueMultiplier)
    : career.marketValueEUR;
  const matchPenalty =
    (outcome.effects.suspensionMatches ?? 0) + Math.round((outcome.effects.injuryWeeks ?? 0) / 2);
  const wonWorldCup = Boolean(outcome.effects.awardsWorldCup);
  const wonContinentalTitle = Boolean(outcome.effects.awardsContinentalTitle) && Boolean(career.currentClub);
  const continentalCelebrationName = wonContinentalTitle
    ? `${continentalTrophyName(career.currentClub!.country.code)} (${career.currentClub!.name})`
    : null;

  // A won signing-trial shootout moves the player to a better club immediately — same shape as
  // a regular transfer, just auto-accepted since the player already "earned" it with the kick.
  let promotionClub: Awaited<ReturnType<typeof prisma.club.findFirstOrThrow>> | null = null;
  if (outcome.effects.promotesToBetterClub && career.currentClub) {
    const candidates = await findClubCandidates({
      excludeClubIds: [career.currentClub.id],
      minReputation: Math.min(5, career.currentClub.reputation + 1),
      maxReputation: 5,
      domesticOnly: false,
      nationalityId: career.nationalityId,
      allowEurope: nextOverall >= EUROPE_OVERALL_THRESHOLD,
      minCount: 1,
    });
    promotionClub = sampleWeighted(candidates, clubOfferWeight, 1)[0] ?? null;
  }

  // A scandal breaking (see pendingScandalKey) forces the player OUT to a noticeably worse club
  // and a real market-value hit — the mirror image of promotesToBetterClub.
  let demotionClub: Awaited<ReturnType<typeof prisma.club.findFirstOrThrow>> | null = null;
  if (outcome.effects.forcesDemotionScandal && career.currentClub) {
    const candidates = await findClubCandidates({
      excludeClubIds: [career.currentClub.id],
      minReputation: 1,
      maxReputation: Math.max(1, career.currentClub.reputation - 1),
      domesticOnly: true,
      nationalityId: career.nationalityId,
      allowEurope: false,
      minCount: 1,
    });
    demotionClub = sampleN(candidates, 1)[0] ?? null;
  }

  const clubChangeMarketMultiplier = promotionClub ? 1.1 : demotionClub ? 0.6 : 1;

  const celebrationTrophies: { name: string; tier: string }[] = [];
  if (wonWorldCup) celebrationTrophies.push({ name: `Mundial (${career.nationality.name})`, tier: "WORLD" });
  if (wonContinentalTitle) celebrationTrophies.push({ name: continentalCelebrationName!, tier: "CONTINENTAL" });

  // A "positive"-toned narrative decision extends the streak; anything else resets it. Reaching 3
  // rewards the player with a forced elite-club offer (see advanceSeason) and resets back to 0.
  const outcomeTone = effectTone(outcome.effects);
  const nextPositiveStreak = outcomeTone === "positive" ? career.positiveDecisionStreak + 1 : 0;

  // A risky choice schedules its fallout for a couple of decisions later instead of applying it
  // now; resolving THIS event never itself clears a countdown some earlier decision already set.
  const scandalFollowupKey = outcome.effects.scandalFollowupKey;

  await prisma.$transaction([
    prisma.playerCareer.update({
      where: { id: careerId },
      data: {
        ...nextAttributes,
        overall: nextOverall,
        morale: nextMorale,
        fitness: nextFitness,
        starterShare: nextStarterShare,
        reputation: nextReputation,
        marketValueEUR: Math.round(nextMarketValue * clubChangeMarketMultiplier),
        pendingMatchPenalty: career.pendingMatchPenalty + matchPenalty,
        positiveDecisionStreak: nextPositiveStreak,
        ...(promotionClub ? { currentClubId: promotionClub.id, starterShare: 0.55 } : {}),
        ...(demotionClub ? { currentClubId: demotionClub.id, starterShare: 0.5 } : {}),
        ...(scandalFollowupKey
          ? { pendingScandalKey: scandalFollowupKey, pendingScandalSeasonsLeft: randomInt(2, 3) }
          : {}),
        ...(celebrationTrophies.length > 0 ? { celebrationJson: JSON.stringify({ trophies: celebrationTrophies }) } : {}),
      },
    }),
    prisma.careerEventLog.create({
      data: {
        careerId,
        age: pending.age,
        eventKey: event.key,
        eventTitle: event.title,
        optionKey: option.key,
        optionLabel: option.label,
        outcomeSummary: outcome.summary,
        statDeltaJson: JSON.stringify(outcome.effects),
      },
    }),
    prisma.pendingEvent.delete({ where: { careerId } }),
    ...(wonWorldCup
      ? [
          prisma.trophy.create({
            data: {
              careerId,
              age: pending.age,
              name: `Mundial (${career.nationality.name})`,
              tier: "WORLD",
              isNationalTeam: true,
            },
          }),
        ]
      : []),
    ...(wonContinentalTitle
      ? [
          prisma.trophy.create({
            data: {
              careerId,
              age: pending.age,
              name: continentalCelebrationName!,
              tier: "CONTINENTAL",
              clubId: career.currentClubId,
            },
          }),
        ]
      : []),
  ]);

  return {
    outcomeId: outcome.id,
    summary: outcome.summary,
    tag: describeEffects(outcome.effects),
    tone: effectTone(outcome.effects),
  };
}

const RETIREMENT_MIN_AGE = 34;
const RETIREMENT_MAX_AGE = 41;

function retirementChance(age: number): number {
  if (age < RETIREMENT_MIN_AGE) return 0;
  return Math.min(0.75, (age - (RETIREMENT_MIN_AGE - 1)) * 0.09);
}

// A whole career should realistically land at most a couple of each individual award — after the
// cap the chance is hard-zeroed, and even before that each prior win quarters the odds again.
const MAX_CAREER_WINS_PER_INDIVIDUAL_AWARD = 2;

function individualAwardChance(baseChance: number, priorWins: number): number {
  if (priorWins >= MAX_CAREER_WINS_PER_INDIVIDUAL_AWARD) return 0;
  return baseChance / (priorWins + 1) ** 2;
}

// Big clubs (European giants especially) don't keep 35+ year olds around — past this age the
// career is steered toward a decline move, usually back to the player's own country, instead of
// staying indefinitely at a top club until the random retirement roll eventually lands.
const VETERAN_DECLINE_AGE = 35;
// A trophy at a young age is exactly the kind of breakout that gets scouted abroad — bypass the
// usual overall gate and lean much harder into a transfer offer that season.
const RISING_TALENT_MAX_AGE = 25;

export async function advanceSeason(careerId: string, userId: string) {
  let career = await prisma.playerCareer.findFirstOrThrow({
    where: { id: careerId, userId },
    include: { currentClub: { include: { league: true, country: true } }, nationality: true },
  });

  if (career.status !== "ACTIVE") return;
  if (!career.currentClubId || !career.currentClub) {
    throw new Error("Todavía no elegiste club");
  }

  const existingPendingEvent = await prisma.pendingEvent.findUnique({ where: { careerId } });
  const existingPendingOffer = await prisma.pendingClubOffer.findUnique({ where: { careerId } });
  if (existingPendingEvent || existingPendingOffer) {
    throw new Error("Tenés una decisión pendiente");
  }

  const seasonsPerDecision = DIFFICULTY_INFO[career.difficulty as Difficulty].seasonsPerDecision;
  const celebrations: { name: string; tier: string }[] = [];

  // Individual awards should feel like the 1-2 "dream moments" of a whole career, not a yearly
  // coin flip — track how many of each the player already has (seeded once here, then updated
  // in-memory as more are won across this batch) so the odds decay hard after the first one and
  // hit zero at the cap, instead of accumulating indefinitely over a 15-20 season career.
  const priorIndividualTrophies = await prisma.trophy.findMany({
    where: { careerId, tier: "INDIVIDUAL" },
    select: { name: true },
  });
  const awardCounts = {
    GOLDEN_BOOT: priorIndividualTrophies.filter((t) => t.name.startsWith(INDIVIDUAL_AWARDS.GOLDEN_BOOT)).length,
    BALLON_DOR: priorIndividualTrophies.filter((t) => t.name.startsWith(INDIVIDUAL_AWARDS.BALLON_DOR)).length,
    PUSKAS: priorIndividualTrophies.filter((t) => t.name.startsWith(INDIVIDUAL_AWARDS.PUSKAS)).length,
  };

  for (let i = 0; i < seasonsPerDecision; i++) {
    career = await prisma.playerCareer.findFirstOrThrow({
      where: { id: careerId, userId },
      include: { currentClub: { include: { league: true, country: true } }, nationality: true },
    });

    if (career.status !== "ACTIVE" || !career.currentClub) break;

    const attributes = attributesFromCareer(career);
    const overall = computeOverall(attributes, career.position as Position);
    const playsContinental = career.currentClub.reputation >= 4;

    const result = simulateSeason({
      position: career.position as Position,
      attributes,
      overall,
      clubReputation: career.currentClub.reputation,
      matchesPerSeason: career.currentClub.league.matchesPerSeason,
      starterShare: career.starterShare,
      fitness: career.fitness,
      morale: career.morale,
      playsContinental,
    });

    if (career.pendingMatchPenalty > 0 && result.matchesPlayed > 0) {
      const reducedMatches = Math.max(0, result.matchesPlayed - career.pendingMatchPenalty);
      const ratio = reducedMatches / result.matchesPlayed;
      result.goals = Math.round(result.goals * ratio);
      result.assists = Math.round(result.assists * ratio);
      result.matchesPlayed = reducedMatches;
    }

    const isMajorTournamentYear = (career.age - 16) % 4 === 3;
    let ntResult: NationalTeamSimResult = {
      calledUp: false,
      caps: 0,
      goals: 0,
      assists: 0,
      playedMajorTournament: false,
      wonMajorTournament: false,
    };
    ntResult = simulateNationalTeamSeason({
      age: career.age,
      overall,
      attributes,
      position: career.position as Position,
      reputation: career.reputation,
      countryFootballPower: career.nationality.footballPower,
      alreadyCapped: career.ntCaps > 0,
      isMajorTournamentYear,
    });

    const nextAttributes = applyAgeCurve(attributes, career.age);
    const nextAge = career.age + 1;
    const nextOverall = computeOverall(nextAttributes, career.position as Position);
    const nextMarketValue = marketValueFromOverall(nextOverall, nextAge);
    const nextMorale = Math.max(30, Math.min(100, career.morale + (career.morale < 70 ? 4 : -1)));
    const nextFitness = Math.max(50, Math.min(100, career.fitness + (career.fitness < 100 ? 10 : 0)));

    const retiring = Math.random() < retirementChance(nextAge) || nextAge >= RETIREMENT_MAX_AGE;

    // A shootout hands the outcome to the player instead of auto-resolving it — only on
    // seasons that aren't already ending in retirement, and it takes priority over the
    // regular end-of-batch club offer / narrative event.
    let shootoutTriggered = false;
    if (!retiring && isMajorTournamentYear && ntResult.calledUp) {
      const shootoutChance = decisiveShootoutChance({
        overall,
        countryFootballPower: career.nationality.footballPower,
      });
      if (Math.random() < shootoutChance) {
        shootoutTriggered = true;
        ntResult = { ...ntResult, wonMajorTournament: false };
      }
    }

    // Same idea for a continental final: only when the club run actually reached it, and only
    // one decisive penalty moment per batch (a World Cup shootout already covers that drama).
    let continentalShootoutTriggered = false;
    if (
      !retiring &&
      !shootoutTriggered &&
      playsContinental &&
      (result.continentalResult === "FINAL" || result.continentalResult === "CAMPEON")
    ) {
      const continentalShootoutChance = decisiveShootoutChance({
        overall,
        countryFootballPower: career.currentClub.reputation,
      });
      if (Math.random() < continentalShootoutChance) {
        continentalShootoutTriggered = true;
        result.continentalTitleWon = false;
      }
    }

    const leagueTrophyName = `${career.currentClub.league.name} (${career.currentClub.name})`;
    const cupTrophyName = `${domesticCupName(career.currentClub.country.code)} (${career.currentClub.name})`;
    const continentalTrophyFullName = `${continentalTrophyName(career.currentClub.country.code)} (${career.currentClub.name})`;

    if (result.leagueTitleWon) celebrations.push({ name: leagueTrophyName, tier: "LEAGUE" });
    if (result.cupTitleWon) celebrations.push({ name: cupTrophyName, tier: "DOMESTIC_CUP" });
    if (result.continentalTitleWon) celebrations.push({ name: continentalTrophyFullName, tier: "CONTINENTAL" });
    if (ntResult.wonMajorTournament) celebrations.push({ name: `Mundial (${career.nationality.name})`, tier: "WORLD" });

    // Rare individual awards — low-probability "dream" moments that reward an outstanding
    // season rather than firing every year, so landing one actually feels special. Each one also
    // decays hard after a prior win and stops entirely past MAX_CAREER_WINS_PER_INDIVIDUAL_AWARD,
    // so a whole career realistically lands at most a couple of each — not a handful.
    const wonMajorTeamTrophy = result.leagueTitleWon || result.continentalTitleWon || ntResult.wonMajorTournament;
    const goldenBootChance =
      result.goals >= 20 ? Math.max(0, Math.min(0.18, (result.goals - 18) * 0.015 + (nextOverall - 75) / 400)) : 0;
    const ballonDorChance =
      nextOverall >= 88 && wonMajorTeamTrophy ? Math.max(0, Math.min(0.08, (nextOverall - 88) * 0.015 + 0.02)) : 0;
    const puskasChance = result.goals >= 8 ? 0.015 : 0;

    const wonGoldenBoot = Math.random() < individualAwardChance(goldenBootChance, awardCounts.GOLDEN_BOOT);
    const wonBallonDor = Math.random() < individualAwardChance(ballonDorChance, awardCounts.BALLON_DOR);
    const wonPuskas = Math.random() < individualAwardChance(puskasChance, awardCounts.PUSKAS);

    if (wonGoldenBoot) {
      celebrations.push({ name: `${INDIVIDUAL_AWARDS.GOLDEN_BOOT} — ${career.currentClub.league.name}`, tier: "INDIVIDUAL" });
      awardCounts.GOLDEN_BOOT += 1;
    }
    if (wonBallonDor) {
      celebrations.push({ name: INDIVIDUAL_AWARDS.BALLON_DOR, tier: "INDIVIDUAL" });
      awardCounts.BALLON_DOR += 1;
    }
    if (wonPuskas) {
      celebrations.push({ name: INDIVIDUAL_AWARDS.PUSKAS, tier: "INDIVIDUAL" });
      awardCounts.PUSKAS += 1;
    }

    await prisma.$transaction([
      prisma.seasonLog.create({
        data: {
          careerId,
          age: career.age,
          clubId: career.currentClubId,
          onLoan: Boolean(career.onLoanFromId),
          overall,
          matches: result.matchesPlayed,
          goals: result.goals,
          assists: result.assists,
          avgRating: result.avgRating,
          leagueResult: result.leagueResult,
          cupResult: result.cupResult,
          continentalResult: result.continentalResult ?? null,
          ntCallUp: ntResult.calledUp,
          ntCaps: ntResult.caps,
          ntGoals: ntResult.goals,
          ntAssists: ntResult.assists,
        },
      }),
      prisma.playerCareer.update({
        where: { id: careerId },
        data: {
          ...nextAttributes,
          overall: nextOverall,
          age: nextAge,
          seasonIndex: career.seasonIndex + 1,
          marketValueEUR: nextMarketValue,
          morale: nextMorale,
          fitness: nextFitness,
          pendingMatchPenalty: 0,
          ntCaps: career.ntCaps + ntResult.caps,
          ntGoals: career.ntGoals + ntResult.goals,
          ntAssists: career.ntAssists + ntResult.assists,
          status: retiring ? "RETIRED" : "ACTIVE",
        },
      }),
      ...(result.leagueTitleWon
        ? [
            prisma.trophy.create({
              data: { careerId, age: career.age, name: leagueTrophyName, tier: "LEAGUE", clubId: career.currentClubId },
            }),
          ]
        : []),
      ...(result.cupTitleWon
        ? [
            prisma.trophy.create({
              data: { careerId, age: career.age, name: cupTrophyName, tier: "DOMESTIC_CUP", clubId: career.currentClubId },
            }),
          ]
        : []),
      ...(result.continentalTitleWon
        ? [
            prisma.trophy.create({
              data: {
                careerId,
                age: career.age,
                name: continentalTrophyFullName,
                tier: "CONTINENTAL",
                clubId: career.currentClubId,
              },
            }),
          ]
        : []),
      ...(ntResult.wonMajorTournament
        ? [
            prisma.trophy.create({
              data: {
                careerId,
                age: career.age,
                name: `Mundial (${career.nationality.name})`,
                tier: "WORLD",
                isNationalTeam: true,
              },
            }),
          ]
        : []),
      ...(wonGoldenBoot
        ? [
            prisma.trophy.create({
              data: {
                careerId,
                age: career.age,
                name: `${INDIVIDUAL_AWARDS.GOLDEN_BOOT} — ${career.currentClub.league.name}`,
                tier: "INDIVIDUAL",
                clubId: career.currentClubId,
              },
            }),
          ]
        : []),
      ...(wonBallonDor
        ? [
            prisma.trophy.create({
              data: {
                careerId,
                age: career.age,
                name: INDIVIDUAL_AWARDS.BALLON_DOR,
                tier: "INDIVIDUAL",
                clubId: career.currentClubId,
              },
            }),
          ]
        : []),
      ...(wonPuskas
        ? [
            prisma.trophy.create({
              data: {
                careerId,
                age: career.age,
                name: INDIVIDUAL_AWARDS.PUSKAS,
                tier: "INDIVIDUAL",
                clubId: career.currentClubId,
              },
            }),
          ]
        : []),
    ]);

    if (retiring) {
      if (celebrations.length > 0) {
        await prisma.playerCareer.update({
          where: { id: careerId },
          data: { celebrationJson: JSON.stringify({ trophies: celebrations, retiring: true }) },
        });
      }
      return;
    }

    if (shootoutTriggered) {
      const shootoutEvent = getEventByKey("mundial_penales")!;
      await prisma.pendingEvent.create({
        data: {
          careerId,
          age: nextAge,
          eventKey: shootoutEvent.key,
          title: shootoutEvent.title,
          description: shootoutEvent.description,
          optionsJson: JSON.stringify(buildEventOptionsPayload(shootoutEvent)),
        },
      });
      if (celebrations.length > 0) {
        await prisma.playerCareer.update({
          where: { id: careerId },
          data: { celebrationJson: JSON.stringify({ trophies: celebrations }) },
        });
      }
      return;
    }

    if (continentalShootoutTriggered) {
      const shootoutEvent = getEventByKey("champions_penales")!;
      await prisma.pendingEvent.create({
        data: {
          careerId,
          age: nextAge,
          eventKey: shootoutEvent.key,
          title: shootoutEvent.title,
          description: shootoutEvent.description,
          optionsJson: JSON.stringify(buildEventOptionsPayload(shootoutEvent)),
        },
      });
      if (celebrations.length > 0) {
        await prisma.playerCareer.update({
          where: { id: careerId },
          data: { celebrationJson: JSON.stringify({ trophies: celebrations }) },
        });
      }
      return;
    }
  }

  if (celebrations.length > 0) {
    await prisma.playerCareer.update({
      where: { id: careerId },
      data: { celebrationJson: JSON.stringify({ trophies: celebrations }) },
    });
  }

  const finalCareer = await prisma.playerCareer.findFirstOrThrow({
    where: { id: careerId, userId },
    include: { currentClub: true },
  });
  if (finalCareer.status !== "ACTIVE" || !finalCareer.currentClubId || !finalCareer.currentClub) return;

  // A scandal scheduled a couple of decisions ago (see pendingScandalKey) takes priority over
  // everything else once its countdown runs out — the fallout has to actually land.
  if (finalCareer.pendingScandalKey) {
    const remaining = (finalCareer.pendingScandalSeasonsLeft ?? 1) - 1;
    if (remaining <= 0) {
      const scandalEvent = getEventByKey(finalCareer.pendingScandalKey)!;
      await prisma.playerCareer.update({
        where: { id: careerId },
        data: { pendingScandalKey: null, pendingScandalSeasonsLeft: null },
      });
      await prisma.pendingEvent.create({
        data: {
          careerId,
          age: finalCareer.age,
          eventKey: scandalEvent.key,
          title: scandalEvent.title,
          description: scandalEvent.description,
          optionsJson: JSON.stringify(buildEventOptionsPayload(scandalEvent)),
        },
      });
      return;
    }
    await prisma.playerCareer.update({
      where: { id: careerId },
      data: { pendingScandalSeasonsLeft: remaining },
    });
  }

  if (finalCareer.onLoanFromId) {
    await generateLoanReturnOffer(
      careerId,
      finalCareer.age,
      finalCareer.currentClubId,
      finalCareer.onLoanFromId,
    );
    return;
  }

  const priorTransitions = await countClubTransitions(careerId);
  let domesticOnly = priorTransitions < DOMESTIC_ONLY_TRANSITIONS;
  let allowEurope = finalCareer.overall >= EUROPE_OVERALL_THRESHOLD;

  // A trophy at a young age is a breakout season — it should open Europe's door even before the
  // usual overall threshold, and make a transfer noticeably more likely to come calling at all.
  const isRisingTalent = finalCareer.age <= RISING_TALENT_MAX_AGE && celebrations.length > 0;
  if (isRisingTalent) {
    allowEurope = true;
    domesticOnly = false;
  }

  // Past VETERAN_DECLINE_AGE, a top club (abroad or a big reputation club at home) doesn't hang
  // on to the player — force a decline move back toward home before the normal random roll even
  // gets a chance, so the career visibly winds down instead of coasting at the top indefinitely.
  const isVeteran = finalCareer.age > VETERAN_DECLINE_AGE;
  const stillAtTopClub =
    finalCareer.currentClub.countryId !== finalCareer.nationalityId || finalCareer.currentClub.reputation > 2;
  if (isVeteran && stillAtTopClub) {
    const created = await generateTransferOffer(
      careerId,
      finalCareer.age,
      finalCareer.currentClubId,
      finalCareer.overall,
      finalCareer.nationalityId,
      true,
      false,
      { decline: true },
    );
    if (created) return;
  }

  // 3 "positive"-toned decisions in a row is a real hot streak — reward it with a guaranteed
  // offer from one of the very top clubs instead of the usual banded roll. Always consumes the
  // streak, even if no elite candidate turns out to be available, so it can't retrigger forever.
  if (finalCareer.positiveDecisionStreak >= 3) {
    await prisma.playerCareer.update({ where: { id: careerId }, data: { positiveDecisionStreak: 0 } });
    const created = await generateTransferOffer(
      careerId,
      finalCareer.age,
      finalCareer.currentClubId,
      finalCareer.overall,
      finalCareer.nationalityId,
      false,
      true,
      { forceElite: true },
    );
    if (created) return;
  }

  // Transfer/loan chances raised again — clubs come calling noticeably more often, so the career
  // keeps moving instead of stalling out at one team for ages. A young breakout season raises the
  // transfer chance further still.
  const transferChance = isRisingTalent ? 0.6 : 0.34;
  const roll = Math.random();
  if (roll < transferChance) {
    // Sometimes the move gets earned dramatically instead of just picked from a list: scouts are
    // in the stands and a penalty in a friendly decides it. Only offered when a genuinely better
    // club is actually available, and only for younger players (matches fichaje_penales's own
    // narrative — a veteran isn't out there trying to impress scouts in a friendly).
    if (finalCareer.age <= 33) {
      const trialCandidates = await findClubCandidates({
        excludeClubIds: [finalCareer.currentClubId],
        minReputation: Math.min(5, finalCareer.currentClub.reputation + 1),
        maxReputation: 5,
        domesticOnly,
        nationalityId: finalCareer.nationalityId,
        allowEurope,
        minCount: 1,
      });
      if (trialCandidates.length > 0 && Math.random() < 0.4) {
        const trialEvent = getEventByKey("fichaje_penales")!;
        await prisma.pendingEvent.create({
          data: {
            careerId,
            age: finalCareer.age,
            eventKey: trialEvent.key,
            title: trialEvent.title,
            description: trialEvent.description,
            optionsJson: JSON.stringify(buildEventOptionsPayload(trialEvent)),
          },
        });
        return;
      }
    }

    const created = await generateTransferOffer(
      careerId,
      finalCareer.age,
      finalCareer.currentClubId,
      finalCareer.overall,
      finalCareer.nationalityId,
      domesticOnly,
      allowEurope,
    );
    if (created) return;
  } else if (
    roll < transferChance + 0.2 &&
    finalCareer.overall < finalCareer.currentClub.reputation * 18 + 15
  ) {
    const created = await generateLoanOutOffer(
      careerId,
      finalCareer.age,
      finalCareer.currentClubId,
      finalCareer.currentClub.reputation,
      finalCareer.nationalityId,
      domesticOnly,
      allowEurope,
    );
    if (created) return;
  }

  // Same question showing up again and again felt repetitive — bias event selection toward
  // whatever this career hasn't already seen (see pickRandomEvent's own ~90/10 split).
  const seenEventRows = await prisma.careerEventLog.findMany({
    where: { careerId, eventKey: { notIn: CLUB_OFFER_KINDS } },
    distinct: ["eventKey"],
    select: { eventKey: true },
  });
  const seenKeys = new Set(seenEventRows.map((row) => row.eventKey));

  const isAbroad = finalCareer.currentClub.countryId !== finalCareer.nationalityId;
  const event = pickRandomEvent({
    age: finalCareer.age,
    excludeKeys: [...SHOOTOUT_EVENT_KEYS, "escandalo_dopaje_estalla", "escandalo_arreglo_estalla"],
    isAbroad,
    seenKeys,
  });
  if (!event) return;

  await prisma.pendingEvent.create({
    data: {
      careerId,
      age: finalCareer.age,
      eventKey: event.key,
      title: event.title,
      description: event.description,
      optionsJson: JSON.stringify(buildEventOptionsPayload(event)),
    },
  });
}

export function listEligibleEventCount(age: number) {
  return eligibleEvents({ age }).length;
}
