import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SessionProvider } from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "Summit Sisters | Oregon Women's Outdoor Ministry",
  description: "Epic adventures, faith-building skills, and a rah-rah sisterhood for women to summit their God-given purpose."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>
        <SessionProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </SessionProvider>
      </body>
    </html>
  );
}
