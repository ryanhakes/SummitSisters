import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eventSchema } from "@/lib/validation";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const events = await prisma.event.findMany({
    orderBy: { dateStart: "desc" },
    include: {
      _count: {
        select: { registrations: true }
      }
    }
  });

  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());

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
    return NextResponse.redirect(new URL("/admin/events/new?error=invalid", request.url), 303);
  }

  const data = parsed.data;

  // Provide defaults for required fields
  const eventData = {
    title: data.title || "Untitled Event",
    slug: data.slug || `event-${Date.now()}`,
    description: data.description || "No description provided",
    dateStart: data.dateStart ? new Date(data.dateStart) : new Date(),
    dateEnd: data.dateEnd ? new Date(data.dateEnd) : null,
    timezone: data.timezone || "US/Eastern",
    locationName: data.locationName || "TBD",
    address: data.address || null,
    googleMapsLink: data.googleMapsLink || null,
    capacity: data.capacity ?? null,
    cost: data.cost ?? null,
    difficulty: data.difficulty || "Moderate",
    distance: data.distance || null,
    elevationGain: data.elevationGain || null,
    packingList: data.packingList || null,
    image: data.image || null,
    isPrivate: data.isPrivate ?? false,
    accessCode: data.accessCode || null,
    published: data.published ?? true
  };

  const event = await prisma.event.create({
    data: eventData
  });

  return NextResponse.redirect(new URL(`/admin?success=created`, request.url), 303);
}
