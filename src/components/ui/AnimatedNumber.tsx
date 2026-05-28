"use client";

import { useRef, useEffect, useState, memo } from "react";
import { useInView } from "framer-motion";

// Counts up to a target when scrolled into view. Accepts strings like
// "500+" or "$70K+" — the numeric part animates, the prefix/suffix stay put.
// Non-numeric strings (e.g. "7–9") simply render as-is.

interface AnimatedNumberProps {
  value: string;
  duration?: number;
}

interface Parsed {
  target: number;
  prefix: string;
  suffix: string;
}

function parse(value: string): Parsed | null {
  const match = value.match(/[\d,]+/);
  if (!match) return null;
  const raw = match[0];
  const at = value.indexOf(raw);
  return {
    target: parseInt(raw.replace(/,/g, ""), 10),
    prefix: value.slice(0, at),
    suffix: value.slice(at + raw.length),
  };
}

function AnimatedNumberComponent({ value, duration = 2000 }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  // Numeric values start at "0" and count up; non-numeric values render as-is.
  const [displayValue, setDisplayValue] = useState(() =>
    parse(value) ? "0" : value,
  );

  useEffect(() => {
    if (!isInView) return;
    const parsed = parse(value);
    if (!parsed) return; // non-numeric — initial state already shows `value`

    const { target, prefix, suffix } = parsed;
    const steps = Math.max(30, Math.floor(duration / 33)); // ~30fps
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Ease out quart for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(target * easeOutQuart);

      setDisplayValue(`${prefix}${current.toLocaleString()}${suffix}`);

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
}

export const AnimatedNumber = memo(AnimatedNumberComponent);
