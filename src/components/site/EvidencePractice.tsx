"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/ui";
import { fontBody, fontHeading, bodySize } from "@/lib/typography";
import { EVIDENCE_QUESTIONS, type Question } from "@/lib/evidence-questions";

// Interactive Rules of Evidence trainer. It draws from a large curated bank and
// reshuffles forever, so there is no round, no progress bar, and no end screen —
// the practice just keeps coming. The user picks the correct objection (or
// "admissible"), then sees the governing Federal Rule and why it applies.

const LETTERS = ["A", "B", "C", "D"];
const CORRECT = "#10b981";
const WRONG = "#dc2626";
const NAVY = "#012169";

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Shuffle the four answer choices and remap the correct index, so the right
// answer isn't always in the same slot (the authored bank leans toward one).
function shuffleOptions(q: Question): Question {
  const order = shuffle(q.options.map((_, i) => i));
  return {
    ...q,
    options: order.map((i) => q.options[i]),
    answer: order.indexOf(q.answer),
  };
}

function buildDeck(): Question[] {
  return shuffle(EVIDENCE_QUESTIONS).map(shuffleOptions);
}

export function EvidencePractice() {
  // Start with the raw bank so the server-rendered and first client render
  // match, then shuffle on mount. Reshuffling when the deck runs out keeps it
  // endless; shuffling options keeps the answer position unpredictable.
  const [deck, setDeck] = useState<Question[]>(EVIDENCE_QUESTIONS);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  useEffect(() => {
    setDeck(buildDeck());
  }, []);

  const q = deck[idx];
  const revealed = selected !== null;

  function choose(i: number) {
    if (revealed || !q) return;
    setSelected(i);
    setAnswered((n) => n + 1);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function next() {
    setSelected(null);
    if (idx + 1 >= deck.length) {
      // Reshuffle, avoiding an immediate repeat of the question just seen.
      const reshuffled = buildDeck();
      if (reshuffled[0].prompt === q?.prompt && reshuffled.length > 1) {
        [reshuffled[0], reshuffled[1]] = [reshuffled[1], reshuffled[0]];
      }
      setDeck(reshuffled);
      setIdx(0);
    } else {
      setIdx((i) => i + 1);
    }
  }

  if (!q) return null;

  return (
    <div>
      {/* Running score only — no progress indicator, so the practice feels endless. */}
      {answered > 0 && (
        <div className="flex items-center justify-end mb-3">
          <span
            style={{ ...fontBody, fontWeight: 600 }}
            className="text-xs uppercase tracking-[0.16em] text-[#012169]"
          >
            {score} / {answered} correct
          </span>
        </div>
      )}

      {/* Question */}
      <div className="border border-black/10 p-7 md:p-9">
        <span
          style={{ ...fontBody, fontWeight: 600 }}
          className="block text-[11px] uppercase tracking-[0.16em] text-neutral-400 mb-3"
        >
          {q.context}
        </span>
        <p
          style={{ ...fontHeading, fontWeight: 500 }}
          className="text-xl md:text-2xl leading-snug text-neutral-900 mb-7"
        >
          {q.prompt}
        </p>

        <div className="flex flex-col gap-3">
          {q.options.map((opt, i) => {
            const isAnswer = i === q.answer;
            const isChosen = i === selected;
            let border = "border-black/15";
            let bg = "bg-white";
            let accent = NAVY;
            if (revealed && isAnswer) {
              border = "border-[#10b981]";
              bg = "bg-[#10b981]/[0.06]";
              accent = CORRECT;
            } else if (revealed && isChosen && !isAnswer) {
              border = "border-[#dc2626]";
              bg = "bg-[#dc2626]/[0.06]";
              accent = WRONG;
            }
            return (
              <button
                key={opt}
                type="button"
                onClick={() => choose(i)}
                disabled={revealed}
                aria-pressed={isChosen}
                className={cn(
                  "group flex items-center gap-4 border px-4 py-3.5 text-left transition-colors",
                  border,
                  bg,
                  !revealed && "hover:border-[#012169] cursor-pointer",
                  revealed && !isAnswer && !isChosen && "opacity-55",
                )}
              >
                <span
                  style={{ ...fontHeading, fontWeight: 600, color: accent }}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[13px]"
                >
                  {revealed && isAnswer
                    ? "✓"
                    : revealed && isChosen
                      ? "✕"
                      : LETTERS[i]}
                </span>
                <span style={fontBody} className="text-[15px] text-neutral-800">
                  {opt}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {revealed && (
          <div className="mt-7 border-t border-black/10 pt-6">
            <span
              style={{ ...fontBody, fontWeight: 600 }}
              className="inline-block mb-3 text-[11px] uppercase tracking-[0.14em] text-[#012169]"
            >
              {q.rule}
            </span>
            <p style={fontBody} className={bodySize.base}>
              {selected === q.answer ? (
                <span className="font-semibold text-[#10b981]">Correct. </span>
              ) : (
                <span className="font-semibold text-[#dc2626]">Not quite. </span>
              )}
              {q.explanation}
            </p>
            <div className="mt-6">
              <PillButton onClick={next} withArrow>
                Next question
              </PillButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
