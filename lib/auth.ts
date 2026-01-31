import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    return null;
  }
  return session;
}

export function isAdminEmail(email: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    return false;
  }
  return email.toLowerCase() === adminEmail.toLowerCase();
}
