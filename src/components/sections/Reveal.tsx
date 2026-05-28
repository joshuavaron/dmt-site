"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Standard scroll-entry wrapper for grid cards and list items. Reproduces the
// design system's card-grid stagger (fade + 18px rise, index-based delay) as a
// reusable client island so the pages that use it can stay server components.
// `tight` switches to the denser stats/skills timing.

interface RevealProps {
  children: ReactNode;
  /** Position in its grid — drives the stagger delay. */
  index?: number;
  /** Use the tighter stats/skills timing (smaller rise, faster cadence). */
  tight?: boolean;
  className?: string;
}

export function Reveal({ children, index = 0, tight = false, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: tight ? 14 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: tight ? "-60px" : "-80px" }}
      transition={{ delay: index * (tight ? 0.06 : 0.08), duration: tight ? 0.6 : 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
