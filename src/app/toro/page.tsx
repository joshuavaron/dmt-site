import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import {
  Container,
  Heading,
  PillButton,
  AnimatedNumber,
} from "@/components/ui";
import {
  DiagonalSpread,
  SectionIntro,
  Reveal,
} from "@/components/sections";
import { fontBody, fontHeading, bodySize } from "@/lib/typography";
import { sponsor } from "@/lib/images";
import { CONTACT_EMAIL } from "@/lib/nav";

export const metadata: Metadata = {
  title: "ToRo — Tobacco Road Invitational",
  description:
    "The Tobacco Road Invitational is Duke Mock Trial's annual tournament, co-hosted with UNC and now in its 20th year. Sponsorship supports trial advocacy and equitable access.",
};

const STATS = [
  { value: "20", label: "Years running" },
  { value: "250", label: "Competitors each year" },
  { value: "2", label: "Host schools — Duke & UNC" },
];

const TIERS = [
  {
    name: "Bronze",
    price: "$500",
    badge: sponsor.bronze,
    featured: false,
    benefits: [
      "Your logo published on our website",
      "Your logo printed in the tournament packet",
      "Seen by all 250 competitors",
    ],
  },
  {
    name: "Silver",
    price: "$750",
    badge: sponsor.silver,
    featured: false,
    benefits: [
      "Everything in Bronze",
      "Your biography in the tournament packet",
      "Your business card printed for all 250 competitors",
    ],
  },
  {
    name: "Gold",
    price: "$1,000",
    badge: sponsor.gold,
    featured: true,
    benefits: [
      "Everything in Silver",
      "Biography & business card in tournament materials",
      "Address participants at opening or closing ceremonies",
      "Or host a booth at the courthouse",
    ],
  },
];

export default function ToroPage() {
  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc="/images/IMG_3764.JPG"
        photoAlt="The Tobacco Road Invitational tournament"
        photoPriority
        minHeight="min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        <span
          style={{ ...fontBody, fontWeight: 600 }}
          className="text-xs uppercase tracking-[0.18em] text-[#012169] mb-5"
        >
          The Tobacco Road Invitational
        </span>
        <Heading size="hero">
          Twenty years of <span className="text-[#f97316]">ToRo.</span>
        </Heading>
        <p style={fontBody} className={`mt-6 max-w-md ${bodySize.lead}`}>
          Each year Duke and UNC co-host the Tobacco Road Invitational — now in
          its 20th year and drawing roughly 250 competitors to Durham.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href={`mailto:${CONTACT_EMAIL}`} tone="accent" withArrow>
            Become a sponsor
          </PillButton>
        </div>
      </DiagonalSpread>

      {/* ───── Stats ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            {STATS.map((s, i) => (
              <Reveal key={s.label} index={i} tight>
                <div
                  style={{ ...fontHeading, fontWeight: 600 }}
                  className="text-4xl md:text-6xl leading-none tracking-tight text-[#012169]"
                >
                  <AnimatedNumber value={s.value} />
                </div>
                <div style={fontBody} className="mt-3 text-sm md:text-base text-neutral-600">
                  {s.label}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── Why sponsor ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc="/images/IMG_3769.JPG"
        photoAlt="Competitors at the Tobacco Road Invitational"
        clip="none"
        panelBg="#012169"
        panelText="#ffffff"
        minHeight="md:min-h-[58svh]"
      >
        <Heading size="panel" className="mb-6">
          Why sponsor ToRo?
        </Heading>
        <p style={fontBody} className="text-base md:text-lg text-white/85 leading-relaxed mb-5">
          Although we are lucky to receive support from Duke, running a strong
          invitational and competing year-round comes at a significant cost —
          travel, lodging, and registration fees that exceed our university
          funding.
        </p>
        <p style={fontBody} className="text-base md:text-lg text-white/85 leading-relaxed">
          Sponsoring puts your name in front of hundreds of future lawyers —
          including many who will go on to practice in the Research Triangle — and
          directly supports equitable access to trial advocacy training.
        </p>
      </DiagonalSpread>

      {/* ───── Sponsorship tiers ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title="Sponsorship tiers."
            subtitle="Every level reaches all 250 competitors in the tournament packet. Choose the visibility that fits."
            spacing="loose"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {TIERS.map((t, i) => (
              <Reveal key={t.name} index={i} className="h-full">
                <div
                  className={`h-full flex flex-col p-8 border ${
                    t.featured
                      ? "bg-[#012169] border-[#012169] text-white"
                      : "bg-white border-black/10 text-neutral-900"
                  }`}
                >
                  <Image
                    src={t.badge}
                    alt={`${t.name} sponsor medallion`}
                    width={64}
                    height={64}
                    className="mb-5 h-16 w-16"
                  />
                  {t.featured && (
                    <span
                      style={{ ...fontBody, fontWeight: 600 }}
                      className="inline-block self-start mb-4 text-[11px] uppercase tracking-[0.14em] text-[#f97316]"
                    >
                      Most visible
                    </span>
                  )}
                  <Heading
                    size="card"
                    className={`mb-1 ${t.featured ? "text-white" : "text-neutral-900"}`}
                  >
                    {t.name}
                  </Heading>
                  <div
                    style={{ ...fontHeading, fontWeight: 600 }}
                    className={`text-4xl tracking-tight mb-6 ${
                      t.featured ? "text-[#f97316]" : "text-[#012169]"
                    }`}
                  >
                    {t.price}
                  </div>
                  <ul className="flex flex-col gap-3 mb-8">
                    {t.benefits.map((b) => (
                      <li
                        key={b}
                        style={fontBody}
                        className={`flex items-start gap-3 text-[15px] leading-snug ${
                          t.featured ? "text-white/90" : "text-neutral-700"
                        }`}
                      >
                        <Check
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            t.featured ? "text-[#f97316]" : "text-[#012169]"
                          }`}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    {t.featured ? (
                      <PillButton
                        href={`mailto:${CONTACT_EMAIL}`}
                        tone="accent"
                        size="md"
                        className="w-full"
                        withArrow
                      >
                        Sponsor as {t.name}
                      </PillButton>
                    ) : (
                      <PillButton
                        href={`mailto:${CONTACT_EMAIL}`}
                        tone="outline"
                        size="md"
                        className="w-full"
                      >
                        Sponsor as {t.name}
                      </PillButton>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p style={fontBody} className={`text-center mt-12 max-w-2xl mx-auto ${bodySize.compact}`}>
            To sponsor, or to ask about a custom arrangement, reach out to Joshua
            Varon — we will get back to you quickly.
          </p>
        </Container>
      </section>

      {/* ───── CTA ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc="/images/IMG_4865.JPG"
        photoAlt="Awards at the Tobacco Road Invitational"
        clip="none"
        minHeight="md:min-h-[58svh]"
        panelClassName="py-12 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          Put your name on <span className="text-[#f97316]">ToRo.</span>
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9`}>
          Reach hundreds of future lawyers and support trial advocacy at Duke.
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton href={`mailto:${CONTACT_EMAIL}`} tone="accent" withArrow>
            Become a sponsor
          </PillButton>
          <PillButton href="/join" tone="outline">
            Join the team
          </PillButton>
        </div>
      </DiagonalSpread>
    </div>
  );
}
