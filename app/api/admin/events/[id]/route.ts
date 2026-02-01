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
    console.log("Deleting event:", params.id);
    try {
      await prisma.event.delete({
        where: { id: params.id }
      });
      console.log("Event deleted successfully");
      return NextResponse.redirect(new URL("/admin?success=deleted", request.url));
    } catch (error) {
      console.error("Delete error:", error);
      return NextResponse.redirect(new URL("/admin?error=delete", request.url));
    }
  }

  // Convert empty strings to null for optional fields
  const processed = {
    ...raw,
    capacity: raw.capacity === "" ? null : raw.capacity,
    cost: raw.cost === "" ? null : raw.cost,
    googleMapsLink: raw.googleMapsLink === "" ? null : raw.googleMapsLink,
    image: raw.image === "" ? null : raw.image,
    isPrivate: raw.isPrivate === "on",
    published: raw.published === "on"
  };

  const parsed = eventSchema.safeParse(processed);

  if (!parsed.success) {
    console.log("Validation errors:", parsed.error.issues);
    return NextResponse.redirect(new URL(`/admin/events/${params.id}/edit?error=invalid`, request.url));
  }

  const data = parsed.data;

  await prisma.event.update({
    where: { id: params.id },
    data: {
      title: data.title || undefined,
      slug: data.slug || undefined,
      description: data.description || undefined,
      dateStart: data.dateStart ? new Date(data.dateStart) : undefined,
      dateEnd: data.dateEnd ? new Date(data.dateEnd) : null,
      timezone: data.timezone || undefined,
      locationName: data.locationName || undefined,
      address: data.address || null,
      googleMapsLink: data.googleMapsLink || null,
      capacity: data.capacity ?? null,
      cost: data.cost ?? null,
      difficulty: data.difficulty || undefined,
      distance: data.distance || null,
      elevationGain: data.elevationGain || null,
      packingList: data.packingList || null,
      image: data.image || null,
      isPrivate: data.isPrivate ?? undefined,
      accessCode: data.accessCode || null,
      published: data.published ?? undefined
    }
  });

  return NextResponse.redirect(new URL(`/admin?success=updated`, request.url));
}
