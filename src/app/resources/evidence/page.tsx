import type { Metadata } from "next";
import Link from "next/link";
import { Container, Heading } from "@/components/ui";
import { EvidencePractice } from "@/components/site/EvidencePractice";
import { fontBody, bodySize } from "@/lib/typography";

export const metadata: Metadata = {
  title: "Rules of Evidence Practice",
  description:
    "An interactive trainer for the Federal Rules of Evidence used in AMTA mock trial rounds — read the testimony, pick the objection, learn the rule.",
};

export default function EvidencePracticePage() {
  return (
    <div className="bg-white text-[#0a0a0a]">
      <Container className="pt-10 md:pt-14">
        <Link
          href="/resources"
          style={{ ...fontBody, fontWeight: 600 }}
          className="inline-flex items-center gap-2 text-[15px] text-[#012169] hover:gap-3 transition-all"
        >
          <span aria-hidden>←</span> Back to resources
        </Link>
      </Container>

      <section className="min-h-[calc(100svh-4rem)]">
        <Container className="py-10 md:py-16">
          <div className="max-w-2xl mb-10 md:mb-12">
            <span
              style={{ ...fontBody, fontWeight: 600 }}
              className="block text-xs uppercase tracking-[0.18em] text-[#012169] mb-5"
            >
              Rules of Evidence Practice
            </span>
            <Heading size="hero" className="mb-6">
              Spot the <span className="text-[#f97316]">objection.</span>
            </Heading>
            <p style={fontBody} className={bodySize.lead}>
              Each card is a moment from a round — a fresh set generated every
              time you practice. Read what just happened, choose how you’d
              respond, and see the Federal Rule behind it. No experience needed
              — that’s the point.
            </p>
          </div>
          <div className="max-w-2xl">
            <EvidencePractice />
          </div>
        </Container>
      </section>
    </div>
  );
}
