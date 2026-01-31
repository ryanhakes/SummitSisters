import { describe, expect, it } from "vitest";
import { registrationSchema } from "@/lib/validation";
import { isAdminEmail } from "@/lib/auth";

describe("registrationSchema", () => {
  it("accepts a minimal valid registration", () => {
    const result = registrationSchema.safeParse({
      eventId: "evt_123",
      name: "Jane Doe",
      email: "jane@example.com",
      emergencyName: "Sarah Doe",
      emergencyPhone: "555-555-5555",
      howHeard: "Instagram",
      whyJoin: "I want to grow in faith.",
      waiver: "on"
    });

    expect(result.success).toBe(true);
  });
});

describe("isAdminEmail", () => {
  it("matches ADMIN_EMAIL", () => {
    process.env.ADMIN_EMAIL = "admin@example.com";
    expect(isAdminEmail("admin@example.com")).toBe(true);
  });
});
