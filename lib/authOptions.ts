import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type RateLimitEntry = {
  count: number;
  lastAttempt: number;
  blockedUntil?: number;
};

const globalForAuth = global as unknown as {
  adminRateLimit?: Map<string, RateLimitEntry>;
};

const rateLimitStore =
  globalForAuth.adminRateLimit || new Map<string, RateLimitEntry>();

if (!globalForAuth.adminRateLimit) {
  globalForAuth.adminRateLimit = rateLimitStore;
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 8;
const RATE_LIMIT_BLOCK_MS = 15 * 60 * 1000;

function getClientIp(req?: { headers?: { get?: (name: string) => string | null } }) {
  if (!req?.headers?.get) return "unknown";
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string, now: number) {
  const entry = rateLimitStore.get(ip);
  if (!entry) return false;
  if (entry.blockedUntil && entry.blockedUntil > now) {
    return true;
  }
  if (now - entry.lastAttempt > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.delete(ip);
    return false;
  }
  return entry.count >= RATE_LIMIT_MAX_ATTEMPTS;
}

function recordFailedAttempt(ip: string, now: number) {
  const entry = rateLimitStore.get(ip);
  if (!entry) {
    rateLimitStore.set(ip, { count: 1, lastAttempt: now });
    return;
  }
  entry.count += 1;
  entry.lastAttempt = now;
  if (entry.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    entry.blockedUntil = now + RATE_LIMIT_BLOCK_MS;
  }
}

function clearAttempts(ip: string) {
  rateLimitStore.delete(ip);
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const now = Date.now();
        const ip = getClientIp(req);
        if (isRateLimited(ip, now)) {
          return null;
        }
        if (!credentials?.password) return null;
        if (!process.env.ADMIN_PASSWORD) return null;
        if (credentials.password !== process.env.ADMIN_PASSWORD) {
          recordFailedAttempt(ip, now);
          return null;
        }
        clearAttempts(ip);
        return { id: "admin", email: "admin@summitsisters.org", name: "Admin" };
      }
    })
  ],
  pages: {
    signIn: "/admin"
  },
  session: {
    strategy: "jwt"
  }
};
