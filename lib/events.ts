import { prisma } from "@/lib/prisma";

export async function getUpcomingEvents(limit?: number) {
  return prisma.event.findMany({
    where: { published: true },
    orderBy: { dateStart: "desc" },
    take: limit
  });
}

export async function getEventBySlug(slug: string) {
  return prisma.event.findFirst({
    where: { slug, published: true }
  });
}

export async function getEventById(id: string) {
  return prisma.event.findUnique({
    where: { id }
  });
}
