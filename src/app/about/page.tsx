import type { Metadata } from "next";
import { Calendar, Scale, Plane, Trophy } from "lucide-react";
import {
  Container,
  Heading,
  PillButton,
  IconTile,
  AnimatedNumber,
} from "@/components/ui";
import {
  DiagonalSpread,
  TestimonialSpread,
  SectionIntro,
  Reveal,
} from "@/components/sections";
import { fontBody, fontHeading, bodySize } from "@/lib/typography";
import { accentCycle } from "@/lib/colors";
import { scene } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "What mock trial is, what Duke Mock Trial is, and how a tournament season works — from a student-run program founded in 1993.",
};

const NUMBERS = [
  { value: "1993", label: "Founded at Duke" },
  { value: "3", label: "Teams each fall and spring" },
  { value: "7–9", label: "Students per team" },
  { value: "150+", label: "Alumni in the network" },
];

const TOURNAMENT = [
  {
    icon: Calendar,
    title: "Three weekends a semester",
    body: "Fall is invitational season; spring runs through the AMTA playoff series toward the National Championship.",
  },
  {
    icon: Scale,
    title: "Four trials, both sides",
    body: "Each tournament a team tries four full trials — twice for the prosecution or plaintiff, twice on defense.",
  },
  {
    icon: Plane,
    title: "On the road",
    body: "Tournaments run two to three days and have taken us to Nashville, Atlanta, Washington D.C., New York, and Los Angeles.",
  },
  {
    icon: Trophy,
    title: "We host, too",
    body: "Every year Duke and UNC co-host the Tobacco Road Invitational, now in its 20th year and drawing around 250 competitors.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc="/images/IMG_1236.JPG"
        photoAlt="Duke Mock Trial members at a tournament"
        photoPriority
        minHeight="min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        <span
          style={{ ...fontBody, fontWeight: 600 }}
          className="text-xs uppercase tracking-[0.18em] text-[#012169] mb-5"
        >
          Our program
        </span>
        <Heading size="hero">
          Built to compete — and to{" "}
          <span className="text-[#f97316]">belong.</span>
        </Heading>
        <p style={fontBody} className={`mt-6 max-w-md ${bodySize.lead}`}>
          A student-run program since 1993, Duke Mock Trial pairs serious
          competitive ambition with a community that lasts well beyond
          graduation.
        </p>
      </DiagonalSpread>

      {/* ───── What is mock trial ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={scene.trialAction}
        photoAlt="Attorneys at the counsel table during a trial"
        clip="diagonal-reverse"
        minHeight="md:min-h-[60svh]"
        panelClassName="py-14 md:py-16"
      >
        <Heading size="section" className="mb-6">
          What is mock trial?
        </Heading>
        <p style={fontBody} className={`${bodySize.base} mb-4`}>
          Mock trial is an activity in which students compete in fictional court
          cases as attorneys and witnesses. Each year the American Mock Trial
          Association releases a case — witness statements, depositions, exhibits,
          and legal precedent — that teams argue from on both sides.
        </p>
        <p style={fontBody} className={bodySize.base}>
          The result is part courtroom, part chess match, part theater: you learn
          a record cold, build a theory of the case, and persuade a panel of
          judges in real time.
        </p>
      </DiagonalSpread>

      {/* ───── What is DMT ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc="/images/IMG_3511.JPG"
        photoAlt="Duke Mock Trial in the trial room"
        minHeight="md:min-h-[60svh]"
        panelClassName="py-14 md:py-16"
      >
        <Heading size="section" className="mb-6">
          What is Duke Mock Trial?
        </Heading>
        <p style={fontBody} className={`${bodySize.base} mb-4`}>
          Established in 1993, Duke Mock Trial is a fully student-run group. We
          field three teams of seven to nine students each fall and spring, and
          practice two to three times a week in the trial room at Duke Law School.
        </p>
        <p style={fontBody} className={bodySize.base}>
          We look for smart, creative, and competitive people from every academic
          background — no prior mock trial experience required.
        </p>
      </DiagonalSpread>

      {/* ───── By the numbers ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title="By the numbers."
            subtitle="A snapshot of the program today."
            spacing="default"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {NUMBERS.map((n, i) => (
              <Reveal key={n.label} index={i} tight className="text-center">
                <div
                  style={{ ...fontHeading, fontWeight: 600 }}
                  className="text-4xl md:text-5xl leading-none tracking-tight text-[#012169]"
                >
                  <AnimatedNumber value={n.value} />
                </div>
                <div style={fontBody} className="mt-3 text-sm md:text-base text-neutral-600">
                  {n.label}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── How a tournament works ───── */}
      <section className="bg-white">
        <Container className="pb-14 md:pb-20">
          <SectionIntro
            title="How a tournament works."
            subtitle="A season of mock trial, from the first invitational to the National Championship."
            spacing="loose"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto">
            {TOURNAMENT.map((t, i) => (
              <Reveal key={t.title} index={i} className="flex gap-5">
                <IconTile
                  icon={t.icon}
                  color={accentCycle[i % accentCycle.length]}
                  className="mt-1"
                />
                <div>
                  <Heading size="micro" className="text-neutral-900 mb-2">
                    {t.title}
                  </Heading>
                  <p style={fontBody} className={bodySize.compact}>
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── Pull-quote ───── */}
      <TestimonialSpread
        bg="#012169"
        photoSide="left"
        photoSrc={scene.gradAlum}
        photoAlt="A Duke Mock Trial alum at graduation"
        heading="The network shows up for you."
        quote="Our alumni — over 150 of them, in law, business, education, and medicine — stay close through a monthly newsletter and a habit of showing up when current members need them."
        attribution="— On the Duke Mock Trial alumni network"
      />

      {/* ───── CTA ───── */}
      <section className="bg-white">
        <Container className="py-16 md:py-24 text-center">
          <Heading size="section" className="mb-5">
            Want to be part of it?
          </Heading>
          <p style={fontBody} className={`max-w-xl mx-auto mb-8 ${bodySize.lead}`}>
            Tryouts open each September to first- and second-year students.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <PillButton href="/join" withArrow>
              Try out
            </PillButton>
            <PillButton href="/team" tone="outline">
              Meet the team
            </PillButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
