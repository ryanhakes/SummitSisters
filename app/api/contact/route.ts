import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse({
    ...raw,
    website: raw.website ? String(raw.website) : undefined
  });

  if (!parsed.success) {
    return NextResponse.redirect(new URL("/contact?error=invalid", request.url));
  }

  if (parsed.data.website) {
    return NextResponse.redirect(new URL("/contact?error=spam", request.url));
  }

  await sendContactEmail(parsed.data);

  return NextResponse.redirect(new URL("/contact?success=sent", request.url));
}
