import {
  Body,
  Container,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text
} from "@react-email/components";

export default function RegistrationConfirmationEmail({
  name,
  eventTitle,
  eventDate,
  eventLocation,
  calendarLink
}: {
  name: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  calendarLink: string;
}) {
  return (
    <Html>
      <Preview>Your Summit Sisters adventure is confirmed</Preview>
      <Body style={{ fontFamily: "Inter, Arial, sans-serif", backgroundColor: "#F9F7F3" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "16px" }}>
          <Heading style={{ color: "#1F3D2B" }}>You&apos;re in, {name}!</Heading>
          <Text>We&apos;re so excited to adventure together. Here are your event details:</Text>
          <Section>
            <Text><strong>Event:</strong> {eventTitle}</Text>
            <Text><strong>Date:</strong> {eventDate}</Text>
            <Text><strong>Location:</strong> {eventLocation}</Text>
            <Link href={calendarLink}>Add to calendar</Link>
          </Section>
          <Hr />
          <Text>We&apos;ll send a packing list and meetup reminder closer to the adventure.</Text>
          <Text>With love, Summit Sisters</Text>
        </Container>
      </Body>
    </Html>
  );
}
