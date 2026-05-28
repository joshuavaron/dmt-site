import type { Metadata } from "next";
import { CalendarCheck, Scale, Sparkles } from "lucide-react";
import {
  Container,
  Heading,
  PillButton,
  ArrowLink,
  IconTile,
} from "@/components/ui";
import {
  DiagonalSpread,
  SectionIntro,
  FaqAccordion,
  Reveal,
} from "@/components/sections";
import { fontBody, fontHeading, bodySize } from "@/lib/typography";
import { accentCycle } from "@/lib/colors";
import { CONTACT_EMAIL, INTEREST_FORM_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Join Us",
  description:
    "Try out for Duke Mock Trial. Tryouts are open to all first- and second-year students each September — no experience required.",
};

const STEPS = [
  {
    n: "01",
    icon: CalendarCheck,
    title: "Attend an info session",
    body: "Come to one of two sessions on Saturday, August 29 or Sunday, August 30. Attendance is required to audition — times and locations go up on our Instagram.",
  },
  {
    n: "02",
    icon: Scale,
    title: "Audition the next weekend",
    body: "Tryouts run the weekend of September 5–6 and are open to all first- and second-years. We will walk you through exactly what to prepare at the info session.",
  },
  {
    n: "03",
    icon: Sparkles,
    title: "Join a team",
    body: "Receive your offer, meet your teammates, and start preparing for the fall season — no prior mock trial experience needed.",
  },
];

const LOOK_FOR = [
  "Smart, creative thinkers",
  "Competitive drive",
  "Comfort speaking up",
  "Every academic background",
];

const FAQS = [
  {
    q: "Do I need mock trial experience?",
    a: "Not at all. Plenty of our members — including national-level competitors — started from scratch at Duke. We teach you everything.",
  },
  {
    q: "Who is eligible to try out?",
    a: "Tryouts are open to all first- and second-year undergraduates.",
  },
  {
    q: "Do I have to attend an info session?",
    a: "Yes. You must attend one of the two info sessions to audition and to receive details on the tryout process.",
  },
  {
    q: "When and where is everything?",
    a: "Info sessions are August 29–30 and tryouts are September 5–6. Specific times and locations are announced on our Instagram.",
  },
  {
    q: "How big is the time commitment?",
    a: "Teams practice two to three times a week, with about three tournament weekends a semester once the season is underway.",
  },
];

export default function JoinPage() {
  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc="/images/IMG_1237.JPG"
        photoAlt="Prospective members at a Duke Mock Trial event"
        photoPriority
        minHeight="min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        <span
          style={{ ...fontBody, fontWeight: 600 }}
          className="text-xs uppercase tracking-[0.18em] text-[#012169] mb-5"
        >
          Recruitment · Class of 2030 welcome
        </span>
        <Heading size="hero">
          Try out for the <span className="text-[#f97316]">win.</span>
        </Heading>
        <p style={fontBody} className={`mt-6 max-w-md ${bodySize.lead}`}>
          Tryouts are open to all first- and second-year students — no experience
          required, just curiosity and a competitive streak.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href={INTEREST_FORM_URL} withArrow>
            Fill out the interest form
          </PillButton>
        </div>
      </DiagonalSpread>

      {/* ───── Steps ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title="How to join."
            subtitle="Three steps from curious first-year to teammate."
            spacing="loose"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} index={i} className="flex flex-col">
                <div className="flex items-center gap-4 mb-5">
                  <IconTile icon={s.icon} color={accentCycle[i % accentCycle.length]} />
                  <span
                    style={{ ...fontHeading, fontWeight: 600 }}
                    className="text-3xl tracking-tight text-neutral-300"
                  >
                    {s.n}
                  </span>
                </div>
                <Heading size="cardLg" className="mb-3">
                  {s.title}
                </Heading>
                <p style={fontBody} className={bodySize.base}>
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── What we look for ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc="/images/IMG_3762.JPG"
        photoAlt="Duke Mock Trial members in the trial room"
        clip="none"
        panelBg="#012169"
        panelText="#ffffff"
        minHeight="md:min-h-[56svh]"
      >
        <Heading size="panel" className="mb-6">
          What we look for.
        </Heading>
        <p style={fontBody} className="text-base md:text-lg text-white/85 leading-relaxed mb-8">
          We recruit smart, creative, and competitive people from every corner of
          campus. The best mock trial teams blend a range of majors, voices, and
          instincts — so we are not looking for one type of person.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {LOOK_FOR.map((item) => (
            <li
              key={item}
              style={fontBody}
              className="flex items-center gap-3 text-white/90 text-[15px]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </DiagonalSpread>

      {/* ───── Express interest ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title="Ready to express interest?"
            subtitle="Two easy ways to get on our radar before the season begins."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Reveal index={0} className="border border-black/10 p-8 flex flex-col">
              <Heading size="micro" className="text-neutral-900 mb-2">
                Email our recruitment chair
              </Heading>
              <p style={fontBody} className={`${bodySize.compact} mb-5`}>
                Reach out to Emma Kavcioglu with any questions about the program or
                the tryout process.
              </p>
              <ArrowLink external={`mailto:${CONTACT_EMAIL}`} className="mt-auto self-start">
                Email Emma
              </ArrowLink>
            </Reveal>
            <Reveal index={1} className="border border-black/10 p-8 flex flex-col">
              <Heading size="micro" className="text-neutral-900 mb-2">
                Follow along on Instagram
              </Heading>
              <p style={fontBody} className={`${bodySize.compact} mb-5`}>
                Info-session times and locations, tryout details, and tournament
                updates all post to @{INSTAGRAM_HANDLE}.
              </p>
              <ArrowLink external={INSTAGRAM_URL} className="mt-auto self-start" color="#f97316">
                Follow @{INSTAGRAM_HANDLE}
              </ArrowLink>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ───── FAQ ───── */}
      <section className="bg-white">
        <Container className="py-12 md:py-16">
          <SectionIntro title="Tryout questions." subtitle="Everything a prospective member usually wants to know." />
          <div className="max-w-3xl mx-auto">
            <FaqAccordion items={FAQS} />
          </div>
        </Container>
      </section>

      {/* ───── CTA ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc="/images/IMG_4862.JPG"
        photoAlt="The Duke Mock Trial team together"
        clip="none"
        minHeight="md:min-h-[60svh]"
        panelClassName="py-12 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          See you in <span className="text-[#f97316]">September.</span>
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9`}>
          Get on the list now and we will make sure you have everything you need
          for info sessions and tryouts.
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton href={INTEREST_FORM_URL} withArrow>
            Get on the list
          </PillButton>
          <PillButton href="/about" tone="outline">
            Learn about the program
          </PillButton>
        </div>
      </DiagonalSpread>
    </div>
  );
}
