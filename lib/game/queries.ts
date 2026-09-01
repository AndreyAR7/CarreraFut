import { prisma } from "@/lib/prisma";

export async function getCareerDetail(id: string, userId: string) {
  return prisma.playerCareer.findFirst({
    where: { id, userId },
    include: {
      currentClub: { include: { league: true, country: true } },
      onLoanFrom: true,
      nationality: true,
      pendingEvent: true,
      pendingOffer: true,
      seasons: { include: { club: true }, orderBy: { age: "asc" } },
      trophies: { include: { club: true }, orderBy: { age: "asc" } },
      events: { orderBy: { createdAt: "desc" }, take: 10 },
    },
  });
}

export type CareerDetail = NonNullable<Awaited<ReturnType<typeof getCareerDetail>>>;
