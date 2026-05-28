"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heading } from "@/components/ui";
import { fontBody, fontSerif } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { PHOTOS } from "@/lib/team-photos";
import {
  EXEC,
  MEMBERS_BY_YEAR,
  ALUMNI_BY_YEAR,
  EXEC_COUNT,
  MEMBER_COUNT,
  ALUMNI_COUNT,
  slugify,
  type ClassGroup,
} from "@/lib/team";

// Interactive team directory: a segmented control filters between the
// executive board, the current member roster, and alumni. Each view animates
// in. Every person links to their profile at /team/[slug]; avatars show real
// headshots (falling back to a stable-color initials monogram).

type TabId = "exec" | "members" | "alumni";

const TABS: { id: TabId; label: string; count: number }[] = [
  { id: "exec", label: "Executive Board", count: EXEC_COUNT },
  { id: "members", label: "Members", count: MEMBER_COUNT },
  { id: "alumni", label: "Alumni", count: ALUMNI_COUNT },
];

// High-contrast avatar palette (each reads well as text on its own light tint;
// yellow is omitted because it doesn't).
const AVATAR_COLORS = ["#012169", "#00539b", "#9333ea", "#10b981", "#f97316", "#ec4899"];

function colorFor(name: string) {
  let sum = 0;
  for (const ch of name) sum += ch.charCodeAt(0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function initials(name: string) {
  const tokens = name.replace(/[.,]/g, "").split(/\s+/).filter(Boolean);
  return ((tokens[0]?.[0] ?? "") + (tokens[1]?.[0] ?? "")).toUpperCase();
}

function Avatar({ name, size }: { name: string; size: "sm" | "lg" }) {
  const dim = size === "lg" ? "w-24 h-24" : "w-12 h-12";
  const photo = PHOTOS[name];

  if (photo) {
    const px = size === "lg" ? 96 : 48;
    return (
      <Image
        src={photo}
        alt={name}
        width={px}
        height={px}
        // Bias the crop slightly above center so faces survive the circle on
        // full-body / distant source shots.
        style={{ objectPosition: "50% 28%" }}
        className={cn("rounded-full object-cover bg-neutral-100 shrink-0", dim)}
      />
    );
  }

  const color = colorFor(name);
  return (
    <div
      className={cn("rounded-full flex items-center justify-center shrink-0", dim)}
      style={{ backgroundColor: `${color}14` }}
      aria-hidden
    >
      <span
        style={{ ...fontSerif, color }}
        className={size === "lg" ? "text-3xl" : "text-base"}
      >
        {initials(name)}
      </span>
    </div>
  );
}

function ExecGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
      {EXEC.map((m, i) => (
        <motion.div
          key={m.name}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.5 }}
        >
          <Link
            href={`/team/${slugify(m.name)}`}
            className="group flex flex-col items-center text-center"
          >
            <div className="rounded-full ring-2 ring-transparent group-hover:ring-[#012169]/20 transition-[box-shadow]">
              <Avatar name={m.name} size="lg" />
            </div>
            <Heading
              size="card"
              className="mt-5 mb-1 transition-colors group-hover:text-[#012169]"
            >
              {m.name}
            </Heading>
            <div
              style={{ ...fontBody, fontWeight: 600 }}
              className="text-[15px] text-[#012169]"
            >
              {m.role}
            </div>
            <div style={fontBody} className="mt-1 text-sm text-neutral-500">
              {m.year}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

function YearGroups({ groups }: { groups: ClassGroup[] }) {
  return (
    <div className="max-w-5xl mx-auto">
      {groups.map((g, gi) => (
        <motion.div
          key={g.year}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: gi * 0.05, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-3 md:gap-8 py-7 border-b border-black/5 last:border-b-0"
        >
          <div
            style={{ ...fontBody, fontWeight: 600 }}
            className="text-sm text-[#012169] md:pt-2"
          >
            Class of {g.year}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
            {g.people.map((name) => (
              <Link
                key={name}
                href={`/team/${slugify(name)}`}
                className="group flex items-center gap-3"
              >
                <div className="rounded-full ring-2 ring-transparent group-hover:ring-[#012169]/20 transition-[box-shadow]">
                  <Avatar name={name} size="sm" />
                </div>
                <span
                  style={{ ...fontBody, fontWeight: 500 }}
                  className="text-[15px] text-neutral-800 leading-tight transition-colors group-hover:text-[#012169]"
                >
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function TeamDirectory() {
  const [tab, setTab] = useState<TabId>("exec");

  return (
    <div>
      {/* Segmented control */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 md:mb-16">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-pressed={active}
              style={{ ...fontBody, fontWeight: 600 }}
              className={cn(
                "rounded-full px-5 py-2.5 text-[14px] transition-colors",
                active
                  ? "bg-[#012169] text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
              )}
            >
              {t.label}
              <span className={cn("ml-2", active ? "text-white/60" : "text-neutral-400")}>
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filtered view */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28 }}
        >
          {tab === "exec" && <ExecGrid />}
          {tab === "members" && <YearGroups groups={MEMBERS_BY_YEAR} />}
          {tab === "alumni" && <YearGroups groups={ALUMNI_BY_YEAR} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
