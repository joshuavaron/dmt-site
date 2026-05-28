import { NextResponse } from "next/server";

// On-demand Rules of Evidence question generator, backed by Cloudflare Workers
// AI. Called by the EvidencePractice client component. The API token stays on
// the server (env vars) and is never shipped to the browser. If the env vars
// aren't set or the model errors, this returns a non-200 and the client falls
// back to its curated question bank.
//
// Env vars (set in .env.local for dev, and as Cloudflare project secrets in prod):
//   CLOUDFLARE_ACCOUNT_ID   — your account id
//   CLOUDFLARE_API_TOKEN    — token with "Workers AI" run permission
//
// If you deploy on Cloudflare with the native Workers AI binding instead of a
// token, you can swap the fetch() below for `env.AI.run(MODEL, { ... })`.

export const dynamic = "force-dynamic";

// Quality/cost trade-off lives here — swap to "@cf/meta/llama-3.1-8b-instruct"
// for a cheaper/faster (lower-accuracy) model if you hit the free daily limit.
const MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

const RULE_TOPICS = [
  "hearsay and its exceptions (FRE 801-807)",
  "relevance and unfair prejudice (FRE 401-403)",
  "leading questions and improper form (FRE 611)",
  "personal knowledge and speculation (FRE 602)",
  "character and propensity evidence (FRE 404-405)",
  "lay vs. expert opinion (FRE 701-702)",
  "authentication and foundation (FRE 901)",
  "the best evidence rule (FRE 1002)",
  "impeachment and prior statements (FRE 607-613)",
  "narrative, argumentative, and asked-and-answered objections",
];

type Question = {
  context: string;
  prompt: string;
  options: string[];
  answer: number;
  rule: string;
  explanation: string;
};

const SYSTEM_PROMPT = `You write multiple-choice practice questions about the Federal Rules of Evidence (FRE) as applied in American Mock Trial Association (AMTA) college rounds.

Each question is a short, realistic moment from a trial: a line of testimony or a question asked by counsel. The student picks the single best response — usually the correct objection, or "Admissible — no objection" when the testimony is proper.

Rules for every question:
- "context": one short sentence setting the scene, e.g. "On direct examination of his own witness, counsel asks:".
- "prompt": the exact line of testimony or question in quotation marks, plus what it is offered to prove when relevant. Under ~40 words.
- "options": exactly 4 distinct choices. Most should be plausible objections like "Objection, hearsay" or "Objection, leading". Include "Admissible — no objection" as a choice in roughly a third of questions, and make it the correct answer when the testimony really is proper.
- "answer": the 0-based index of the single correct option.
- "rule": the governing rule formatted like "FRE 802 — Hearsay".
- "explanation": 1-2 plain-language sentences a first-year student understands.

Accuracy is critical: the answer must be unambiguously correct under the FRE and the rule must match. Vary the rules and scenarios across the set. Output ONLY valid JSON — no preamble, no markdown fences.`;

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          context: { type: "string" },
          prompt: { type: "string" },
          options: { type: "array", items: { type: "string" } },
          answer: { type: "integer" },
          rule: { type: "string" },
          explanation: { type: "string" },
        },
        required: ["context", "prompt", "options", "answer", "rule", "explanation"],
      },
    },
  },
  required: ["questions"],
};

function isQuestion(value: unknown): value is Question {
  if (typeof value !== "object" || value === null) return false;
  const q = value as Record<string, unknown>;
  return (
    typeof q.context === "string" && q.context.trim() !== "" &&
    typeof q.prompt === "string" && q.prompt.trim() !== "" &&
    Array.isArray(q.options) &&
    q.options.length === 4 &&
    q.options.every((o) => typeof o === "string" && o.trim() !== "") &&
    Number.isInteger(q.answer) && (q.answer as number) >= 0 && (q.answer as number) <= 3 &&
    typeof q.rule === "string" && q.rule.trim() !== "" &&
    typeof q.explanation === "string" && q.explanation.trim() !== ""
  );
}

function parseMaybeJson(value: unknown): unknown {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    const match = value.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return null;
      }
    }
    return null;
  }
}

function extractQuestions(payload: unknown): Question[] {
  const parsed = parseMaybeJson(payload);
  let list: unknown[] = [];
  if (Array.isArray(parsed)) {
    list = parsed;
  } else if (parsed && typeof parsed === "object") {
    const maybe = (parsed as Record<string, unknown>).questions;
    if (Array.isArray(maybe)) list = maybe;
  }
  return list.filter(isQuestion);
}

export async function POST(req: Request) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) {
    return NextResponse.json({ error: "ai_unconfigured" }, { status: 503 });
  }

  let count = 6;
  try {
    const body = (await req.json()) as { count?: unknown };
    if (Number.isInteger(body.count)) {
      count = Math.min(Math.max(body.count as number, 1), 10);
    }
  } catch {
    // no body / bad JSON — use the default count
  }

  // Rotate emphasis so successive rounds feel different.
  const topics = [...RULE_TOPICS]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, RULE_TOPICS.length))
    .join("; ");

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: `Generate ${count} distinct questions, emphasizing these areas where they fit naturally: ${topics}. Return JSON shaped as {"questions": [...]}.`,
            },
          ],
          response_format: { type: "json_schema", json_schema: RESPONSE_SCHEMA },
          temperature: 0.8,
          max_tokens: 4096,
        }),
        signal: AbortSignal.timeout(25000),
      },
    );

    if (!res.ok) {
      return NextResponse.json({ error: "ai_error" }, { status: 502 });
    }

    const data = (await res.json()) as { result?: { response?: unknown } };
    const questions = extractQuestions(data.result?.response).slice(0, count);

    if (questions.length === 0) {
      return NextResponse.json({ error: "ai_empty" }, { status: 502 });
    }
    return NextResponse.json({ questions });
  } catch {
    return NextResponse.json({ error: "ai_unreachable" }, { status: 502 });
  }
}
