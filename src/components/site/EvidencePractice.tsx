"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/ui";
import { fontBody, fontHeading, bodySize } from "@/lib/typography";

// Interactive Rules of Evidence trainer. Each round of questions is generated
// on demand by Cloudflare Workers AI (via /api/evidence-question); if that route
// is unconfigured or errors, we fall back to the curated bank below so the
// trainer always works. The user picks the correct objection (or "admissible"),
// then sees the governing Federal Rule and why it applies.

type Question = {
  context: string;
  prompt: string;
  options: string[];
  answer: number;
  rule: string;
  explanation: string;
};

// Number of questions per round (also the count requested from the generator).
const ROUND_SIZE = 6;

// Curated safety net — used when the AI route is unavailable.
const FALLBACK_QUESTIONS: Question[] = [
  {
    context: "On direct examination of a bystander, counsel elicits:",
    prompt:
      "“A man I’d never met turned to me and said the blue car ran the red light.” — offered to prove the blue car ran the red light.",
    options: [
      "Objection, hearsay",
      "Objection, leading",
      "Objection, relevance",
      "Admissible — no objection",
    ],
    answer: 0,
    rule: "FRE 801–802 — Hearsay",
    explanation:
      "An out-of-court statement offered to prove the truth of what it asserts (that the car ran the light) is hearsay, and inadmissible unless an exception applies.",
  },
  {
    context: "On direct examination of his own witness, counsel asks:",
    prompt: "“You saw the defendant sign the contract on March 3rd, didn’t you?”",
    options: [
      "Objection, leading",
      "Objection, speculation",
      "Objection, hearsay",
      "Admissible — no objection",
    ],
    answer: 0,
    rule: "FRE 611(c) — Leading Questions",
    explanation:
      "Leading questions suggest the answer and generally aren’t allowed on direct examination (they’re fine on cross). Counsel should ask “What did you see?”",
  },
  {
    context: "In a car-accident negligence case, counsel asks the defendant on cross:",
    prompt: "“Isn’t it true you’ve been divorced twice?”",
    options: [
      "Objection, relevance",
      "Objection, hearsay",
      "Objection, leading",
      "Admissible — no objection",
    ],
    answer: 0,
    rule: "FRE 401–402 — Relevance",
    explanation:
      "The defendant’s marital history has no tendency to make any fact about the accident more or less probable, so it is irrelevant.",
  },
  {
    context: "A witness who was not at the scene testifies:",
    prompt: "“I wasn’t there, but I’m sure the light was green for her.”",
    options: [
      "Objection, lack of personal knowledge / speculation",
      "Objection, relevance",
      "Objection, best evidence",
      "Admissible — no objection",
    ],
    answer: 0,
    rule: "FRE 602 — Personal Knowledge",
    explanation:
      "A witness may testify only to matters they personally perceived. This witness admits they didn’t see the event, so the testimony is speculation.",
  },
  {
    context: "In a battery case, the prosecution’s witness testifies on direct:",
    prompt:
      "“The defendant has always been a violent, short-tempered person, so he probably started the fight.”",
    options: [
      "Objection, improper character evidence",
      "Objection, leading",
      "Objection, hearsay",
      "Admissible — no objection",
    ],
    answer: 0,
    rule: "FRE 404(a) — Character Evidence",
    explanation:
      "Evidence of a person’s character generally can’t be used to prove they acted in conformity with it on a particular occasion (the propensity bar).",
  },
  {
    context: "A lay witness who saw the crash testifies:",
    prompt:
      "“In my opinion, the defendant suffered a complete tear of his ACL from the impact.”",
    options: [
      "Objection, improper lay opinion — calls for an expert",
      "Objection, leading",
      "Objection, relevance",
      "Admissible — no objection",
    ],
    answer: 0,
    rule: "FRE 701–702 — Opinion Testimony",
    explanation:
      "A medical diagnosis requires specialized knowledge. A lay witness may only give opinions rationally based on their own perception — not expert conclusions.",
  },
  {
    context: "In a theft trial, the prosecutor offers a gruesome, unrelated photo:",
    prompt:
      "Exhibit 7 is a graphic image with little bearing on whether the defendant took the property, offered mainly to upset the jury.",
    options: [
      "Objection, unfair prejudice outweighs probative value",
      "Objection, hearsay",
      "Objection, leading",
      "Admissible — no objection",
    ],
    answer: 0,
    rule: "FRE 403 — Unfair Prejudice",
    explanation:
      "Relevant evidence may still be excluded when its probative value is substantially outweighed by the danger of unfair prejudice.",
  },
  {
    context: "A witness describes what an injured pedestrian screamed seconds after being hit:",
    prompt:
      "“Right after the car struck her, she screamed, ‘That truck ran the red light!’” — offered to show the truck ran the light.",
    options: [
      "Admissible — excited utterance",
      "Objection, hearsay (no exception)",
      "Objection, speculation",
      "Objection, relevance",
    ],
    answer: 0,
    rule: "FRE 803(2) — Excited Utterance",
    explanation:
      "Though it is hearsay, a statement made under the stress of a startling event is admissible as an excited utterance.",
  },
  {
    context: "Counsel tries to publish a screenshot of text messages:",
    prompt:
      "“I offer this screenshot into evidence” — before any witness has identified the phone, number, or author.",
    options: [
      "Objection, lack of authentication / foundation",
      "Objection, hearsay",
      "Objection, leading",
      "Admissible — no objection",
    ],
    answer: 0,
    rule: "FRE 901 — Authenticating Evidence",
    explanation:
      "The proponent must first show the item is what they claim it is — here, who sent the texts — before it can be admitted.",
  },
  {
    context: "On cross-examination, counsel snaps at the witness:",
    prompt: "“You expect this jury to believe a word you just said?”",
    options: [
      "Objection, argumentative",
      "Objection, hearsay",
      "Objection, relevance",
      "Admissible — no objection",
    ],
    answer: 0,
    rule: "FRE 611 — Argumentative",
    explanation:
      "The question seeks no facts — it argues with the witness and asks them to vouch for their own credibility. That’s argumentative.",
  },
];

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

// Fetch one round of questions. Pure data — never touches React state — so the
// effect/handlers below can call it and setState only in the resolved callback.
async function fetchRound(): Promise<{
  questions: Question[];
  source: "ai" | "bank";
}> {
  try {
    const res = await fetch("/api/evidence-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: ROUND_SIZE }),
    });
    if (!res.ok) throw new Error("unavailable");
    const data: { questions?: Question[] } = await res.json();
    const questions = data.questions ?? [];
    if (questions.length === 0) throw new Error("empty");
    return { questions, source: "ai" };
  } catch {
    return { questions: shuffle(FALLBACK_QUESTIONS).slice(0, ROUND_SIZE), source: "bank" };
  }
}

export function EvidencePractice() {
  const [pool, setPool] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"ai" | "bank">("ai");

  useEffect(() => {
    let cancelled = false;
    fetchRound().then(({ questions, source: src }) => {
      if (cancelled) return;
      setPool(questions);
      setSource(src);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const total = pool.length;
  const q = pool[idx];
  const revealed = selected !== null;
  const isLast = idx === total - 1;
  const progress = total ? ((idx + (revealed ? 1 : 0)) / total) * 100 : 0;

  function choose(i: number) {
    if (revealed || !q) return;
    setSelected(i);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIdx((i) => i + 1);
    setSelected(null);
  }

  function restart() {
    setIdx(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setLoading(true);
    setPool([]);
    fetchRound().then(({ questions, source: src }) => {
      setPool(questions);
      setSource(src);
      setLoading(false);
    });
  }

  if (loading && total === 0) {
    return (
      <div className="border border-black/10 p-7 md:p-9" aria-busy="true">
        <span
          style={{ ...fontBody, fontWeight: 600 }}
          className="block text-[11px] uppercase tracking-[0.16em] text-[#012169] mb-6"
        >
          Generating fresh questions…
        </span>
        <div className="animate-pulse space-y-4">
          <div className="h-3 w-1/3 bg-neutral-200" />
          <div className="h-6 w-4/5 bg-neutral-200" />
          <div className="h-6 w-2/3 bg-neutral-200" />
          <div className="mt-7 space-y-3">
            <div className="h-12 w-full border border-black/10 bg-neutral-100" />
            <div className="h-12 w-full border border-black/10 bg-neutral-100" />
            <div className="h-12 w-full border border-black/10 bg-neutral-100" />
            <div className="h-12 w-full border border-black/10 bg-neutral-100" />
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / total) * 100);
    const verdict =
      pct >= 80
        ? "Sustained. You know the rules cold."
        : pct >= 50
          ? "A solid case — a little more prep and you’re trial-ready."
          : "Overruled — run it again and the rules will stick.";
    return (
      <div className="border border-black/10 p-8 md:p-12 text-center">
        <span
          style={{ ...fontBody, fontWeight: 600 }}
          className="block text-xs uppercase tracking-[0.18em] text-[#012169] mb-5"
        >
          Practice complete
        </span>
        <div
          style={{ ...fontHeading, fontWeight: 600 }}
          className="text-6xl md:text-7xl tracking-tight text-[#012169]"
        >
          {score}
          <span className="text-neutral-300">/{total}</span>
        </div>
        <p style={fontBody} className={`mt-5 max-w-md mx-auto ${bodySize.lead}`}>
          {verdict}
        </p>
        <div className="mt-9 flex flex-wrap gap-3 justify-center">
          <PillButton onClick={restart} withArrow>
            Practice again
          </PillButton>
          <PillButton href="/resources" tone="outline">
            Back to resources
          </PillButton>
        </div>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div>
      {/* Progress + score */}
      <div className="flex items-center justify-between mb-3">
        <span
          style={{ ...fontBody, fontWeight: 600 }}
          className="text-xs uppercase tracking-[0.16em] text-neutral-500"
        >
          Question {idx + 1} of {total}
        </span>
        <span
          style={{ ...fontBody, fontWeight: 600 }}
          className="text-xs uppercase tracking-[0.16em] text-[#012169]"
        >
          Score {score}
        </span>
      </div>
      <div className="h-1 w-full bg-neutral-200 mb-3 overflow-hidden">
        <div
          className="h-full bg-[#012169] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p
        style={fontBody}
        className="mb-8 text-[11px] uppercase tracking-[0.14em] text-neutral-400"
      >
        {source === "ai" ? "Freshly generated · AI" : "From the practice bank"}
      </p>

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
                <span
                  style={fontBody}
                  className="text-[15px] text-neutral-800"
                >
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
                <span className="font-semibold text-[#dc2626]">
                  Not quite.{" "}
                </span>
              )}
              {q.explanation}
            </p>
            <div className="mt-6">
              <PillButton onClick={next} withArrow>
                {isLast ? "See your score" : "Next question"}
              </PillButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
