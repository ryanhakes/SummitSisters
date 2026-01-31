import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registrationSchema } from "@/lib/validation";
import { sendRegistrationEmail } from "@/lib/email";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  const fallbackUrl = request.headers.get("referer") || `${new URL(request.url).origin}/events`;

  const parsed = registrationSchema.safeParse({
    ...raw,
    phone: raw.phone ? String(raw.phone) : undefined,
    medicalNotes: raw.medicalNotes ? String(raw.medicalNotes) : undefined,
    accessCode: raw.accessCode ? String(raw.accessCode) : undefined,
    website: raw.website ? String(raw.website) : undefined
  });

  if (!parsed.success) {
    return NextResponse.redirect(new URL(`${fallbackUrl}?error=invalid`, request.url));
  }

  if (parsed.data.website) {
    return NextResponse.redirect(new URL(`${fallbackUrl}?error=spam`, request.url));
  }

  const event = await prisma.event.findUnique({
    where: { id: params.id }
  });

  if (!event) {
    return NextResponse.redirect(new URL(`/events?error=notfound`, request.url));
  }

  if (event.isPrivate && event.accessCode && parsed.data.accessCode !== event.accessCode) {
    return NextResponse.redirect(new URL(`/events/${event.slug}?error=access`, request.url));
  }

  if (event.capacity) {
    const count = await prisma.registration.count({
      where: { eventId: event.id }
    });
    if (count >= event.capacity) {
      return NextResponse.redirect(new URL(`/events/${event.slug}?error=full`, request.url));
    }
  }

  await prisma.registration.create({
    data: {
      eventId: event.id,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      emergencyName: parsed.data.emergencyName,
      emergencyPhone: parsed.data.emergencyPhone,
      medicalNotes: parsed.data.medicalNotes || null,
      waiverAcceptedAt: new Date(),
      answers: {
        howHeard: parsed.data.howHeard,
        whyJoin: parsed.data.whyJoin
      }
    }
  });

  await sendRegistrationEmail({
    to: parsed.data.email,
    name: parsed.data.name,
    eventTitle: event.title,
    eventDate: event.dateStart.toLocaleString("en-US", { timeZone: event.timezone }),
    eventLocation: event.locationName,
    calendarLink: `${new URL(request.url).origin}/api/events/${event.id}/calendar`
  });

  return NextResponse.redirect(new URL(`/events/${event.slug}?success=registered`, request.url));
}
