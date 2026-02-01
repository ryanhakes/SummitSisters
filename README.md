# Summit Sisters MVP

Production-ready MVP for Summit Sisters — an Oregon-based Christian women’s outdoor ministry founded by Julie Hakes.

## Features
- Public website with mission, events, FAQs, and contact form.
- Event detail + registration flow with confirmation email + calendar invite.
- Admin dashboard to create/edit events, view registrants, export CSV, and broadcast updates.
- Privacy-minded data handling, honeypot spam protection, and admin-only routes.

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Prisma + Postgres (Neon or Supabase recommended)
- NextAuth (credentials password)
- Resend (transactional + broadcast email)

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and update values.
3. Run database migrations:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```
4. Seed sample events:
   ```bash
   npm run prisma:seed
   ```
5. Start the dev server:
   ```bash
   npm run dev
   ```

## Environment Variables
See `.env.example` for all required values.

| Variable | Description |
| --- | --- |
| DATABASE_URL | Postgres connection string (Neon/Supabase) |
| NEXTAUTH_URL | Base URL (e.g., http://localhost:3000) |
| NEXTAUTH_SECRET | Random secret for NextAuth |
| EMAIL_FROM | Sender address for emails |
| RESEND_API_KEY | Resend API key |
| CONTACT_INBOX | Julie's inbox for contact form |
| ADMIN_PASSWORD | Password for `/admin` login |

## Deploy to Vercel + Neon/Supabase
1. Create a Postgres database in Neon or Supabase.
2. Set `DATABASE_URL` in Vercel environment variables.
3. Add the rest of `.env.example` values in Vercel.
4. Deploy the repo to Vercel.
5. Run Prisma migrations in Vercel (or locally) using `npx prisma migrate deploy`.

## Launch Checklist (Vercel + Cloudflare)
1. Create a Neon/Supabase Postgres database and copy the connection string.
2. In Vercel, create a new project from this repo.
3. Set Vercel environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (https://summit-sisters.com)
   - `NEXTAUTH_SECRET`
   - `ADMIN_PASSWORD`
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `CONTACT_INBOX`
4. Deploy once, then run migrations:
   - `npx prisma migrate deploy`
5. In Vercel, add the custom domain `summit-sisters.com`.
6. In Cloudflare DNS, add the records Vercel provides for apex + www.
7. Verify HTTPS works and set www → apex (or apex → www) redirect in Vercel.

## Local SQLite Option
If you prefer SQLite for local development, update `prisma/schema.prisma` to use `provider = "sqlite"` and set
`DATABASE_URL="file:./dev.db"`, then run migrations again. Production should use Postgres via Neon/Supabase.

## Julie Admin Guide
### Add a new event
1. Go to `/admin` and sign in with your admin email.
2. Click **Create new event**.
3. Fill in the form and click **Create event**.

### Edit an event
1. Open `/admin`.
2. Click **Edit** next to the event.
3. Update details and save.

### View registrations
1. Open `/admin`.
2. Click **Registrations** next to the event.
3. Review attendee details and emergency contacts.

### Export CSV
1. On the registrations page, click **Export CSV**.
2. A CSV downloads for spreadsheets.

### Email attendees
1. On the registrations page, use the **Email attendees** form.
2. Add a subject + message and click **Send update**.

## Basic Checks
- Form validation uses Zod for registration, admin event creation, and contact.
- Admin routes require a successful password login (set by `ADMIN_PASSWORD`).

## Notes
- Healing hikes include a "not medical advice" reminder in event details.
- Registrant data is never sold and used only for event coordination.
