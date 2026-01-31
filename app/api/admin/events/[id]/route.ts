import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eventSchema } from "@/lib/validation";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());

  if (raw._method === "delete") {
    await prisma.event.delete({
      where: { id: params.id }
    });
    return NextResponse.redirect(new URL("/admin?success=deleted", request.url));
  }

  const parsed = eventSchema.safeParse({
    ...raw,
    isPrivate: raw.isPrivate === "on",
    published: raw.published === "on"
  });

  if (!parsed.success) {
    return NextResponse.redirect(new URL(`/admin/events/${params.id}/edit?error=invalid`, request.url));
  }

  await prisma.event.update({
    where: { id: params.id },
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

  return NextResponse.redirect(new URL(`/admin/events/${params.id}/edit?success=updated`, request.url));
}
