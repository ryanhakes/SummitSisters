"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/Logo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/adventures", label: "Adventures" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-mist/95 backdrop-blur border-b border-sand">
      <div className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-24">
        <Link href="/" className="text-xl font-bold text-pine inline-flex items-center">
          <Logo className="h-20 w-auto" />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-pine">
              {item.label}
            </Link>
          ))}
          <Link href="/events" className="rounded-full bg-sunrise px-4 py-2 text-sm font-semibold text-white">
            Join the Adventure
          </Link>
        </nav>
        <div className="md:hidden flex items-center gap-3">
          <Link href="/events" className="rounded-full bg-sunrise px-4 py-2 text-sm font-semibold text-white">
            Join
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand bg-white text-pine"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`md:hidden overflow-hidden border-t border-sand bg-white/95 backdrop-blur transition-all duration-300 ease-out ${
          menuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2 px-6 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-pine hover:bg-sand/60"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/events"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full bg-sunrise px-4 py-2 text-center text-sm font-semibold text-white"
          >
            Join the Adventure
          </Link>
        </nav>
      </div>
    </header>
  );
}
