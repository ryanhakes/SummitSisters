import { Body, Container, Heading, Html, Preview, Text } from "@react-email/components";

export default function BroadcastUpdateEmail({
  eventTitle,
  message
}: {
  eventTitle: string;
  message: string;
}) {
  return (
    <Html>
      <Preview>Update for {eventTitle}</Preview>
      <Body style={{ fontFamily: "Inter, Arial, sans-serif", backgroundColor: "#F9F7F3" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "16px" }}>
          <Heading style={{ color: "#1F3D2B" }}>{eventTitle} update</Heading>
          <Text>{message}</Text>
          <Text>Thanks for being part of Summit Sisters.</Text>
        </Container>
      </Body>
    </Html>
  );
}
