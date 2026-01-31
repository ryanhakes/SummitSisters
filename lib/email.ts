import { Resend } from "resend";
import { render } from "@react-email/render";
import RegistrationConfirmationEmail from "@/emails/registration-confirmation";
import BroadcastUpdateEmail from "@/emails/broadcast-update";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRegistrationEmail({
  to,
  name,
  eventTitle,
  eventDate,
  eventLocation,
  calendarLink
}: {
  to: string;
  name: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  calendarLink: string;
}) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    return;
  }

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: `You're registered for ${eventTitle}`,
    html: render(
      RegistrationConfirmationEmail({
        name,
        eventTitle,
        eventDate,
        eventLocation,
        calendarLink
      })
    )
  });
}

export async function sendBroadcastEmail({
  to,
  eventTitle,
  subject,
  message
}: {
  to: string[];
  eventTitle: string;
  subject: string;
  message: string;
}) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    return;
  }

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html: render(BroadcastUpdateEmail({ eventTitle, message }))
  });
}

export async function sendContactEmail({
  name,
  email,
  message
}: {
  name: string;
  email: string;
  message: string;
}) {
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_INBOX) {
    return;
  }

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "Summit Sisters <hello@summitsisters.org>",
    to: process.env.CONTACT_INBOX,
    subject: `New Summit Sisters message from ${name}`,
    html: render(
      BroadcastUpdateEmail({
        eventTitle: "Contact form",
        message: `${message}\n\nReply to: ${email}`
      })
    )
  });
}
