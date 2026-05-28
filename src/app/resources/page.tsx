import type { Metadata } from "next";
import { Scale, BookOpen, MessageSquare, Trophy } from "lucide-react";
import {
  Container,
  Heading,
  PillButton,
  ArrowLink,
  IconTile,
} from "@/components/ui";
import { DiagonalSpread, SectionIntro, Reveal } from "@/components/sections";
import { fontBody, bodySize } from "@/lib/typography";
import { accentCycle } from "@/lib/colors";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Practice materials and study tools for Duke Mock Trial members — starting with our Rules of Evidence practice trainer.",
};

type Resource = {
  icon: typeof Scale;
  title: string;
  body: string;
  href?: string;
  cta?: string;
};

const RESOURCES: Resource[] = [
  {
    icon: Scale,
    title: "Rules of Evidence Practice",
    body: "Drill the Federal Rules of Evidence used in AMTA rounds. Read a line of testimony, pick the right objection, and learn why it holds — at your own pace.",
    href: "/resources/evidence",
    cta: "Start practicing",
  },
  {
    icon: BookOpen,
    title: "Case Materials & Records",
    body: "Affidavits, exhibits, and the current AMTA case packet, organized for fast reference during prep.",
  },
  {
    icon: MessageSquare,
    title: "Objection Drills",
    body: "Timed scenarios that train you to spot and respond to objections under pressure.",
  },
  {
    icon: Trophy,
    title: "Tournament Prep Guide",
    body: "What to pack, how to read a ballot, and how a competition weekend actually runs.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc="/images/IMG_3512.JPG"
        photoAlt="Duke Mock Trial members preparing in the trial room"
        photoPriority
        minHeight="min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        <span
          style={{ ...fontBody, fontWeight: 600 }}
          className="text-xs uppercase tracking-[0.18em] text-[#012169] mb-5"
        >
          Member Resources
        </span>
        <Heading size="hero">
          Train like it&apos;s <span className="text-[#f97316]">trial day.</span>
        </Heading>
        <p style={fontBody} className={`mt-6 max-w-md ${bodySize.lead}`}>
          Study tools and practice materials for Duke Mock Trial — built to help
          you learn the rules cold and walk into a round ready.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href="/resources/evidence" withArrow>
            Practice the Rules of Evidence
          </PillButton>
        </div>
      </DiagonalSpread>

      {/* ───── Resource grid ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title="What's in the toolkit."
            subtitle="Start with the Rules of Evidence trainer — more practice materials are on the way."
            spacing="loose"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {RESOURCES.map((r, i) => {
              const color = accentCycle[i % accentCycle.length];
              const available = Boolean(r.href);
              return (
                <Reveal key={r.title} index={i}>
                  <div
                    className={`h-full border border-black/10 p-8 flex flex-col ${
                      available ? "" : "bg-neutral-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <IconTile icon={r.icon} color={color} />
                      {!available && (
                        <span
                          style={{ ...fontBody, fontWeight: 600 }}
                          className="text-[11px] uppercase tracking-[0.14em] text-neutral-400"
                        >
                          Coming soon
                        </span>
                      )}
                    </div>
                    <Heading size="cardLg" className="mb-3">
                      {r.title}
                    </Heading>
                    <p style={fontBody} className={`${bodySize.base} mb-6`}>
                      {r.body}
                    </p>
                    {available && (
                      <ArrowLink
                        href={r.href!}
                        color={color}
                        className="mt-auto self-start"
                      >
                        {r.cta}
                      </ArrowLink>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───── CTA ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc="/images/IMG_3765.JPG"
        photoAlt="Duke Mock Trial in the trial room"
        clip="none"
        minHeight="md:min-h-[58svh]"
        panelClassName="py-12 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          New to the <span className="text-[#f97316]">rules?</span>
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9`}>
          You do not need any experience to start. Run the Rules of Evidence
          trainer, then come try out in September.
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton href="/resources/evidence" withArrow>
            Start practicing
          </PillButton>
          <PillButton href="/join" tone="outline">
            Try out
          </PillButton>
        </div>
      </DiagonalSpread>
    </div>
  );
}
