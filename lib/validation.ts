import { z } from "zod";

export const registrationSchema = z.object({
  eventId: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  emergencyName: z.string().min(2),
  emergencyPhone: z.string().min(6),
  medicalNotes: z.string().optional().nullable(),
  howHeard: z.string().min(2),
  whyJoin: z.string().min(5),
  waiver: z.string().optional(),
  accessCode: z.string().optional().nullable(),
  website: z.string().optional().nullable()
});

export const eventSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  dateStart: z.string().min(1),
  dateEnd: z.string().optional().nullable(),
  timezone: z.string().min(2),
  locationName: z.string().min(2),
  address: z.string().optional().nullable(),
  googleMapsLink: z.string().url().optional().nullable(),
  capacity: z.coerce.number().int().positive().optional().nullable(),
  cost: z.coerce.number().min(0).optional().nullable(),
  difficulty: z.string().min(2),
  distance: z.string().optional().nullable(),
  elevationGain: z.string().optional().nullable(),
  packingList: z.string().optional().nullable(),
  image: z.string().url().optional().nullable(),
  accessCode: z.string().optional().nullable(),
  isPrivate: z.boolean().optional(),
  published: z.boolean().optional()
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
  website: z.string().optional().nullable()
});

export const broadcastSchema = z.object({
  subject: z.string().min(2),
  message: z.string().min(4)
});
