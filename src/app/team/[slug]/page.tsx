import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Heading, PillButton } from "@/components/ui";
import { fontBody, fontSerif, bodySize } from "@/lib/typography";
import { personBySlug, ALL_SLUGS, type Person } from "@/lib/team";

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

const GROUP_LABEL: Record<Person["group"], string> = {
  "Executive Board": "Executive Board",
  Member: "Current Member",
  Alumni: "Alumni",
};

// A factual one-liner derived only from known facts — used until a real bio is
// added to BIOS in src/lib/team.ts.
function descriptor(p: Person): string {
  if (p.group === "Executive Board") {
    return `${p.name} serves as ${p.role} on the Duke Mock Trial executive board, and competes for the program as a member of the Class of ${p.year}.`;
  }
  if (p.group === "Member") {
    return `${p.name} is a competitor on Duke Mock Trial, Class of ${p.year}.`;
  }
  return `${p.name} competed for Duke Mock Trial and graduated in the Class of ${p.year}.`;
}

function monogram(name: string) {
  const tokens = name.replace(/[.,]/g, "").split(/\s+/).filter(Boolean);
  return ((tokens[0]?.[0] ?? "") + (tokens[1]?.[0] ?? "")).toUpperCase();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = personBySlug(slug);
  if (!p) return { title: "Team" };
  return {
    title: p.name,
    description: descriptor(p),
  };
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = personBySlug(slug);
  if (!person) notFound();

  return (
    <div className="bg-white text-[#0a0a0a]">
      <Container className="pt-10 md:pt-14">
        <Link
          href="/team"
          style={{ ...fontBody, fontWeight: 600 }}
          className="inline-flex items-center gap-2 text-[15px] text-[#012169] hover:gap-3 transition-all"
        >
          <span aria-hidden>←</span> Back to the team
        </Link>
      </Container>

      <Container className="py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,340px)_1fr] gap-10 md:gap-16 items-start max-w-5xl">
          {/* Photo */}
          <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
            {person.photo ? (
              <Image
                src={person.photo}
                alt={person.name}
                fill
                sizes="(min-width:768px) 340px, 100vw"
                style={{ objectPosition: "50% 22%" }}
                className="object-cover"
                priority
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center bg-[#012169]/[0.06]"
                aria-hidden
              >
                <span
                  style={{ ...fontSerif, color: "#012169" }}
                  className="text-7xl"
                >
                  {monogram(person.name)}
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <span
              style={{ ...fontBody, fontWeight: 600 }}
              className="block text-xs uppercase tracking-[0.18em] text-[#012169] mb-4"
            >
              {GROUP_LABEL[person.group]}
            </span>
            <Heading size="section" className="mb-3">
              {person.name}
            </Heading>
            {person.role && (
              <div
                style={{ ...fontBody, fontWeight: 600 }}
                className="text-base md:text-lg text-[#012169]"
              >
                {person.role}
              </div>
            )}
            <div style={fontBody} className="mt-1 text-sm text-neutral-500">
              Class of {person.year}
            </div>

            <p
              style={fontBody}
              className={`mt-7 max-w-xl ${bodySize.base}`}
            >
              {person.bio ?? descriptor(person)}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <PillButton href="/join" tone="accent" withArrow>
                Join the team
              </PillButton>
              <PillButton href="/team" tone="outline">
                See the full team
              </PillButton>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
