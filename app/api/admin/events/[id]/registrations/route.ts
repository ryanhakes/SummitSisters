import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

function toCsv(rows: Array<Record<string, string>>) {
  const headers = Object.keys(rows[0] || {});
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const lines = [headers.join(",")].concat(
    rows.map((row) => headers.map((header) => escape(row[header] || "")).join(","))
  );
  return lines.join("\n");
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: { registrations: true }
  });

  if (!event) {
    return new NextResponse("Not found", { status: 404 });
  }

  const rows = event.registrations.map((registration) => ({
    name: registration.name,
    email: registration.email,
    phone: registration.phone ?? "",
    emergencyName: registration.emergencyName,
    emergencyPhone: registration.emergencyPhone,
    medicalNotes: registration.medicalNotes ?? "",
    howHeard:
      typeof registration.answers === "object" && registration.answers !== null && "howHeard" in registration.answers
        ? String((registration.answers as Record<string, string>).howHeard ?? "")
        : "",
    whyJoin:
      typeof registration.answers === "object" && registration.answers !== null && "whyJoin" in registration.answers
        ? String((registration.answers as Record<string, string>).whyJoin ?? "")
        : "",
    registeredAt: registration.createdAt.toISOString()
  }));

  const url = new URL(request.url);
  const format = url.searchParams.get("format");

  if (format === "csv") {
    const csv = toCsv(rows);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=${event.slug}-registrations.csv`
      }
    });
  }

  return NextResponse.json(rows);
}
