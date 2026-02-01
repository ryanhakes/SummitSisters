import { z } from "zod";

export const registrationSchema = z.object({
  eventId: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  emergencyName: z.string().min(2),
  emergencyPhone: z.string().min(1),
  medicalNotes: z.string().optional().nullable(),
  howHeard: z.string().min(1),
  whyJoin: z.string().min(1),
  waiver: z.string().optional(),
  accessCode: z.string().optional().nullable(),
  website: z.string().optional().nullable()
});

export const eventSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  dateStart: z.string().optional(),
  dateEnd: z.string().optional().nullable(),
  timezone: z.string().optional(),
  locationName: z.string().optional(),
  address: z.string().optional().nullable(),
  googleMapsLink: z.string().url().optional().nullable(),
  capacity: z.coerce.number().int().positive().optional().nullable(),
  cost: z.coerce.number().min(0).optional().nullable(),
  difficulty: z.string().optional(),
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
