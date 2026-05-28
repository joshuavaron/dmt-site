import {
  Scale,
  Gavel,
  Trophy,
  Mic,
  Brain,
  MessageSquare,
  BookOpen,
  Users,
  Target,
  Lightbulb,
} from "lucide-react";
import {
  Container,
  Heading,
  PillButton,
  ArrowLink,
  IconTile,
  AnimatedNumber,
} from "@/components/ui";
import {
  DiagonalSpread,
  TestimonialSpread,
  SectionIntro,
  FaqAccordion,
  Reveal,
} from "@/components/sections";
import { fontBody, fontHeading, bodySize } from "@/lib/typography";
import { accentCycle } from "@/lib/colors";
import { scene } from "@/lib/images";

const STATS = [
  { value: "28", label: "Trips to the National Championship" },
  { value: "33", label: "Years competing since 1993" },
  { value: "150+", label: "Alumni across law, business & medicine" },
  { value: "3", label: "Teams fielded every semester" },
];

const PILLARS = [
  {
    icon: Scale,
    title: "What is mock trial?",
    body: "Students argue a full fictional court case — as attorneys and as witnesses — from a record of statements, exhibits, and legal precedent released each year by the American Mock Trial Association.",
    cta: "How it works",
    href: "/about",
    color: "#012169",
  },
  {
    icon: Gavel,
    title: "What is Duke Mock Trial?",
    body: "A student-run program founded in 1993. We field three teams of seven to nine students each fall and spring, practicing two to three times a week in the trial room at Duke Law School.",
    cta: "About the program",
    href: "/about",
    color: "#f97316",
  },
  {
    icon: Trophy,
    title: "How do tournaments work?",
    body: "Teams try four trials a weekend — twice prosecuting or for the plaintiff, twice on defense — at invitationals and playoffs that have taken us to Nashville, New York, D.C., and Los Angeles.",
    cta: "See the season",
    href: "/about",
    color: "#9333ea",
  },
];

const SKILLS = [
  { icon: Mic, title: "Public speaking", body: "Command a room and think on your feet under cross-examination." },
  { icon: Brain, title: "Critical thinking", body: "Weigh evidence, spot the weak link, and build the argument that wins." },
  { icon: MessageSquare, title: "Persuasion", body: "Tell a clear, compelling story to a panel of judges." },
  { icon: BookOpen, title: "Case mastery", body: "Learn a hundred-page record cold and use every detail." },
  { icon: Users, title: "Teamwork", body: "Win as a unit of attorneys and witnesses who trust each other." },
  { icon: Target, title: "Composure", body: "Stay sharp when the other side throws something you didn't expect." },
  { icon: Lightbulb, title: "Quick instinct", body: "Object, adapt, and recover in real time." },
  { icon: Scale, title: "Advocacy", body: "Carry skills that translate straight to law school and beyond." },
];

const FAQS = [
  {
    q: "Do I need any mock trial experience?",
    a: "No. Many of our strongest competitors had never done mock trial before Duke. We teach the rules, the strategy, and the craft from the ground up.",
  },
  {
    q: "Who can try out?",
    a: "Tryouts are open to all first- and second-year undergraduates. They take place the first weekend of September, after our fall info sessions.",
  },
  {
    q: "What is the time commitment?",
    a: "Teams practice two to three times a week, with roughly three tournament weekends each semester. Tournaments run two to three days, usually out of town.",
  },
  {
    q: "Where do you practice?",
    a: "In the trial room at Duke Law School — the same kind of courtroom setting our competitions are held in.",
  },
  {
    q: "How are the teams organized?",
    a: "We field three teams of seven to nine students each fall and spring, balancing veterans and newer members across the program.",
  },
];

export default function Home() {
  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc="/images/IMG_4861.JPG"
        photoAlt="The Duke Mock Trial team together at a tournament"
        photoPriority
        objectPosition="50% 40%"
        minHeight="min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        <span
          style={{ ...fontBody, fontWeight: 600 }}
          className="text-xs uppercase tracking-[0.18em] text-[#012169] mb-5"
        >
          Duke University · Est. 1993
        </span>
        <Heading size="hero">
          A competitive <span className="text-[#f97316]">force.</span>
        </Heading>
        <p style={fontBody} className={`mt-6 max-w-md ${bodySize.lead}`}>
          Duke Mock Trial is a program of competitive individuals with a common
          passion for trial advocacy — and among the most successful collegiate
          programs in the country.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href="/join" withArrow>
            Try out
          </PillButton>
          <PillButton href="/about" tone="outline">
            Explore the program
          </PillButton>
        </div>
      </DiagonalSpread>

      {/* ───── Stats ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc="/images/IMG_3760.JPG"
        photoAlt="A Duke Mock Trial team in the courtroom"
        clip="diagonal-reverse"
        minHeight="md:min-h-[72svh]"
        panelClassName="py-12 md:py-16"
      >
        <Heading size="section" className="mb-10">
          The record speaks for itself.
        </Heading>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
          {STATS.map((s, i) => (
            <Reveal key={s.label} index={i} tight>
              <div
                style={{ ...fontHeading, fontWeight: 600 }}
                className="text-4xl md:text-5xl leading-none tracking-tight text-[#012169]"
              >
                <AnimatedNumber value={s.value} />
              </div>
              <div style={fontBody} className="mt-2 text-base md:text-lg text-neutral-600">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
        <p style={fontBody} className={`mt-10 ${bodySize.lead}`}>
          Qualified for Nationals 28 times in 33 years — 2012 National Champions,
          two top-five teams in 2021, and an honorable mention at the 2026
          National Championship.
        </p>
      </DiagonalSpread>

      {/* ───── Three pillars ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title="More than a competition."
            subtitle="Mock trial is part courtroom, part chess match, part theater — here is how it works at Duke."
            spacing="loose"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} index={i} className="h-full flex flex-col">
                <IconTile icon={p.icon} color={p.color} className="mb-6" />
                <Heading size="cardLg" className="mb-4">
                  {p.title}
                </Heading>
                <p style={fontBody} className={`${bodySize.base} mb-6`}>
                  {p.body}
                </p>
                <ArrowLink href={p.href} color={p.color} className="mt-auto self-start">
                  {p.cta}
                </ArrowLink>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── Navy pull-quote ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={scene.celebration}
        photoAlt="Duke Mock Trial members celebrating a win"
        clip="none"
        panelBg="#012169"
        panelText="#ffffff"
        minHeight="md:min-h-[58svh]"
      >
        <Heading size="section" as="blockquote">
          <span className="opacity-50">&ldquo;</span>Among the most successful
          collegiate programs in the country.<span className="opacity-50">&rdquo;</span>
        </Heading>
        <div style={fontBody} className="mt-8 text-base md:text-lg text-white/80">
          28 National Championship appearances · 2012 National Champions
        </div>
      </DiagonalSpread>

      {/* ───── Skills + community pull-quote ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title="What you'll build."
            subtitle="The skills that win trials are the skills that open doors long after the verdict."
            spacing="loose"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {SKILLS.map((s, i) => (
              <Reveal key={s.title} index={i % 4} tight>
                <IconTile
                  icon={s.icon}
                  color={accentCycle[i % accentCycle.length]}
                  size="sm"
                  className="mb-5"
                />
                <Heading size="micro" className="text-neutral-900 mb-2">
                  {s.title}
                </Heading>
                <p style={fontBody} className={bodySize.micro}>
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 md:mt-20 max-w-4xl mx-auto">
            <div className="border-l-2 border-[#012169] pl-6 md:pl-8 py-2">
              <Heading size="sub" className="mb-4 text-neutral-900">
                A team, not just a roster.
              </Heading>
              <p style={fontBody} className={`${bodySize.base} mb-4`}>
                Beyond the trophies, Duke Mock Trial is a community — team dinners,
                parties, intramurals, road trips, and an alumni network that shows
                up for current members long after graduation.
              </p>
              <p style={fontBody} className={bodySize.base}>
                You join as a competitor and leave with friendships, mentors, and a
                network of over 150 alumni in law, business, education, and medicine.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ───── Testimonials ───── */}
      <section className="bg-white">
        <Container className="py-10 md:py-14 text-center">
          <Heading size="section">In their words.</Heading>
          <p style={fontBody} className={`mt-5 max-w-2xl mx-auto ${bodySize.lead}`}>
            What members and alumni take away from the program.
          </p>
        </Container>

        <TestimonialSpread
          bg="#012169"
          photoSide="right"
          photoSrc="/images/IMG_3514.JPG"
          photoAlt="The Duke Mock Trial team celebrating together after a tournament"
          heading="It pushes you, then it has your back."
          quote="I came in terrified of public speaking. Two seasons later I was delivering a closing argument at Nationals — and the whole team was in the gallery cheering."
          attribution="— A team captain, Class of 2025"
        />
        <TestimonialSpread
          bg="#9333ea"
          photoSide="left"
          photoSrc="/images/IMG_0888.JPG"
          photoAlt="Duke Mock Trial members laughing together at a tournament"
          heading="The friendships outlast the season."
          quote="The road trips and team dinners are my favorite part of the program. These are the people I call first, about everything, years later."
          attribution="— A second-year member"
        />
        <TestimonialSpread
          bg="#10b981"
          photoSide="right"
          photoSrc="/images/IMG_4882.JPG"
          photoAlt="Duke Mock Trial members with their tournament awards"
          heading="It opened the door to law."
          quote="Everything I do as a litigator — building a theory of the case, reading a room — I learned first in the trial room at Duke Law."
          attribution="— A 2019 alum, now a trial attorney"
        />
      </section>

      {/* ───── FAQ ───── */}
      <section className="bg-white">
        <Container className="py-12 md:py-16">
          <SectionIntro title="Questions, answered." subtitle="The things prospective members ask us most." />
          <div className="max-w-3xl mx-auto">
            <FaqAccordion items={FAQS} />
          </div>
          <div className="text-center mt-12">
            <p style={fontBody} className="text-base text-neutral-700 mb-2">
              Still have questions?
            </p>
            <ArrowLink href="/join">Learn how to join</ArrowLink>
          </div>
        </Container>
      </section>

      {/* ───── Final CTA ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={scene.teamTrophy}
        photoAlt="Duke Mock Trial holding a tournament trophy"
        clip="none"
        minHeight="md:min-h-[70svh]"
        panelClassName="py-12 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          Join us if you want to <span className="text-[#f97316]">win.</span>
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9`}>
          Tryouts open every September to first- and second-years — no experience
          required. Come find out why we keep ending up at Nationals.
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton href="/join" withArrow>
            Try out
          </PillButton>
          <PillButton href="/team" tone="outline">
            Meet the team
          </PillButton>
        </div>
      </DiagonalSpread>
    </div>
  );
}
