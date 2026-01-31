import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function formatDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({
    where: { id: params.id }
  });

  if (!event) {
    return new NextResponse("Event not found", { status: 404 });
  }

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Summit Sisters//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.id}`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(event.dateStart)}`,
    event.dateEnd ? `DTEND:${formatDate(event.dateEnd)}` : "",
    `SUMMARY:${event.title}`,
    `LOCATION:${event.locationName}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ]
    .filter(Boolean)
    .join("\r\n");

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename=${event.slug}.ics`
    }
  });
}
