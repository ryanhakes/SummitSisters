import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eventSchema } from "@/lib/validation";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  const parsed = eventSchema.safeParse({
    ...raw,
    isPrivate: raw.isPrivate === "on",
    published: raw.published === "on"
  });

  if (!parsed.success) {
    return NextResponse.redirect(new URL("/admin/events/new?error=invalid", request.url));
  }

  const event = await prisma.event.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description,
      dateStart: new Date(parsed.data.dateStart),
      dateEnd: parsed.data.dateEnd ? new Date(parsed.data.dateEnd) : null,
      timezone: parsed.data.timezone,
      locationName: parsed.data.locationName,
      address: parsed.data.address || null,
      googleMapsLink: parsed.data.googleMapsLink || null,
      capacity: parsed.data.capacity ?? null,
      cost: parsed.data.cost ?? null,
      difficulty: parsed.data.difficulty,
      distance: parsed.data.distance || null,
      elevationGain: parsed.data.elevationGain || null,
      packingList: parsed.data.packingList || null,
      image: parsed.data.image || null,
      isPrivate: parsed.data.isPrivate ?? false,
      accessCode: parsed.data.accessCode || null,
      published: parsed.data.published ?? true
    }
  });

  return NextResponse.redirect(new URL(`/admin/events/${event.id}/edit?success=created`, request.url));
}
