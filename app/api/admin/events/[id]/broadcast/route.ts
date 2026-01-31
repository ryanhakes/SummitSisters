import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { broadcastSchema } from "@/lib/validation";
import { sendBroadcastEmail } from "@/lib/email";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  const parsed = broadcastSchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.redirect(new URL(`/admin/events/${params.id}/registrations?error=invalid`, request.url));
  }

  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: { registrations: true }
  });

  if (!event) {
    return new NextResponse("Not found", { status: 404 });
  }

  const recipients = event.registrations.map((registration) => registration.email);

  if (recipients.length) {
    await sendBroadcastEmail({
      to: recipients,
      eventTitle: event.title,
      subject: parsed.data.subject,
      message: parsed.data.message
    });
  }

  return NextResponse.redirect(new URL(`/admin/events/${params.id}/registrations?success=sent`, request.url));
}
