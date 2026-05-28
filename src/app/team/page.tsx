import type { Metadata } from "next";
import {
  Container,
  Heading,
  PillButton,
  ArrowLink,
} from "@/components/ui";
import { DiagonalSpread } from "@/components/sections";
import { TeamDirectory } from "@/components/site/TeamDirectory";
import { fontBody, bodySize } from "@/lib/typography";
import { scene } from "@/lib/images";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet Duke Mock Trial — the executive board, current members, and a decade of alumni.",
};

export default function TeamPage() {
  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero + interactive directory ───── */}
      <section className="bg-white">
        <Container className="pt-14 md:pt-20 pb-16 md:pb-24">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span
              style={{ ...fontBody, fontWeight: 600 }}
              className="block text-xs uppercase tracking-[0.18em] text-[#012169] mb-5"
            >
              Our Team
            </span>
            <Heading size="hero" className="mb-6">
              Meet the <span className="text-[#f97316]">team.</span>
            </Heading>
            <p style={fontBody} className={bodySize.lead}>
              From the executive board that runs the program, to the competitors
              on this season&apos;s roster, to an alumni network spanning more
              than a decade — these are the people who make Duke Mock Trial.
            </p>
          </div>
          <TeamDirectory />
        </Container>
      </section>

      {/* ───── Network spread ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={scene.campus}
        photoAlt="Duke University campus"
        minHeight="md:min-h-[54svh]"
        panelClassName="py-12 md:py-16"
      >
        <Heading size="section" className="mb-5">
          More than a roster.
        </Heading>
        <p style={fontBody} className={`${bodySize.base} mb-6`}>
          Over 150 Duke Mock Trial alumni now work in law, business, education,
          and medicine. They stay connected through a monthly newsletter and a
          standing willingness to mentor the members who came after them — so
          every name above is part of something lasting.
        </p>
        <ArrowLink href="/join">Become part of the next class</ArrowLink>
      </DiagonalSpread>

      {/* ───── CTA ───── */}
      <section className="bg-[#012169]">
        <Container className="py-16 md:py-20 text-center">
          <Heading size="section" className="mb-5 text-white">
            Want to get involved?
          </Heading>
          <p
            style={fontBody}
            className="max-w-xl mx-auto mb-8 text-base md:text-lg text-white/80 leading-relaxed"
          >
            Try out for the team each September, or dig into our practice
            resources any time.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <PillButton href="/join" tone="accent" withArrow>
              Try out
            </PillButton>
            <PillButton
              href="/resources"
              tone="custom"
              color="#ffffff"
              className="!text-[#012169]"
            >
              Explore resources
            </PillButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
