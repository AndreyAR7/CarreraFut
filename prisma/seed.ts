import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { CLUBS, LEAGUES } from "../lib/game/data/clubs";
import { COUNTRIES } from "../lib/game/data/countries";
import { PrismaClient } from "../lib/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const countryIdByCode = new Map<string, string>();
  for (const country of COUNTRIES) {
    const row = await prisma.country.upsert({
      where: { code: country.code },
      update: {
        name: country.name,
        flag: country.flag,
        footballPower: country.footballPower,
      },
      create: {
        code: country.code,
        name: country.name,
        flag: country.flag,
        footballPower: country.footballPower,
      },
    });
    countryIdByCode.set(country.code, row.id);
  }

  const leagueIdByKey = new Map<string, string>();
  for (const league of LEAGUES) {
    const countryId = countryIdByCode.get(league.countryCode);
    if (!countryId) {
      throw new Error(`País no encontrado para la liga ${league.key}`);
    }
    const row = await prisma.league.upsert({
      where: { key: league.key },
      update: {
        name: league.name,
        tier: league.tier,
        matchesPerSeason: league.matchesPerSeason,
        countryId,
      },
      create: {
        key: league.key,
        name: league.name,
        tier: league.tier,
        matchesPerSeason: league.matchesPerSeason,
        countryId,
      },
    });
    leagueIdByKey.set(league.key, row.id);
  }

  for (const club of CLUBS) {
    const league = LEAGUES.find((l) => l.key === club.leagueKey);
    if (!league) throw new Error(`Liga no encontrada para el club ${club.key}`);
    const leagueId = leagueIdByKey.get(club.leagueKey)!;
    const countryId = countryIdByCode.get(league.countryCode)!;
    await prisma.club.upsert({
      where: { key: club.key },
      update: {
        name: club.name,
        shortName: club.shortName,
        reputation: club.reputation,
        primaryColor: club.primaryColor,
        leagueId,
        countryId,
      },
      create: {
        key: club.key,
        name: club.name,
        shortName: club.shortName,
        reputation: club.reputation,
        primaryColor: club.primaryColor,
        leagueId,
        countryId,
      },
    });
  }

  console.log(
    `Seed listo: ${COUNTRIES.length} países, ${LEAGUES.length} ligas, ${CLUBS.length} clubes.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
