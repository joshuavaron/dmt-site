"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container, PillButton } from "@/components/ui";
import { NAV } from "@/lib/nav";
import { LOGO } from "@/lib/images";
import { fontBody, fontSerif } from "@/lib/typography";
import { cn } from "@/lib/utils";

// Sticky translucent header: Duke "D" logo + serif wordmark on the left, nav +
// a Try Out pill on the right. Collapses to a hamburger panel below the `nav`
// breakpoint (900px). Height is 4rem — the hero subtracts it via calc(100svh-4rem).

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-black/5">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <Image
            src={LOGO}
            alt="Duke Mock Trial"
            width={41}
            height={34}
            priority
            className="h-9 w-auto"
          />
          <span
            style={{ ...fontSerif, fontWeight: 500 }}
            className="hidden sm:inline text-xl md:text-2xl tracking-tight text-[#012169] leading-none"
          >
            Duke Mock Trial
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden nav:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ ...fontBody, fontWeight: 500 }}
              className={cn(
                "text-[15px] transition-colors",
                isActive(item.href)
                  ? "text-[#012169]"
                  : "text-neutral-600 hover:text-[#012169]",
              )}
            >
              {item.label}
            </Link>
          ))}
          <PillButton href="/join" size="sm" tone="accent">
            Try Out
          </PillButton>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="nav:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-[#012169]"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      {/* Mobile panel */}
      {open && (
        <nav className="nav:hidden border-t border-black/5 bg-white">
          <Container className="py-4 flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ ...fontBody, fontWeight: 500 }}
                className={cn(
                  "py-3 text-base border-b border-black/5 transition-colors",
                  isActive(item.href)
                    ? "text-[#012169]"
                    : "text-neutral-700 hover:text-[#012169]",
                )}
              >
                {item.label}
              </Link>
            ))}
            <PillButton
              href="/join"
              tone="accent"
              size="md"
              className="mt-5 self-start"
            >
              Try Out
            </PillButton>
          </Container>
        </nav>
      )}
    </header>
  );
}
