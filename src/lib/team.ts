// Team rosters, transcribed from dukemocktrial.org (executive board, current
// member roster, and alumni by class year). Photos are mapped in team-photos.ts.
// The grouped lists below drive the directory; the unified `PEOPLE` model at the
// bottom drives the per-person profile pages at /team/[slug].

import { PHOTOS } from "./team-photos";

export interface ExecMember {
  name: string;
  role: string;
  year: string;
}

export interface ClassGroup {
  year: string;
  people: string[];
}

export const EXEC: ExecMember[] = [
  { name: "Eshaan Dhaliwal", role: "President", year: "Class of 2028" },
  { name: "Ram Asaithambi", role: "Vice President", year: "Class of 2029" },
  { name: "Joshua Varon", role: "Treasurer", year: "Class of 2029" },
  { name: "Emma Kavcioglu", role: "Recruitment & Social Chair", year: "Class of 2029" },
  { name: "Sara Grippo", role: "Team Tournament Chair", year: "Class of 2029" },
  { name: "Jiahan Lyu", role: "Judge Tournament Chair", year: "Class of 2028" },
];

// Current member roster, by graduating class.
export const MEMBERS_BY_YEAR: ClassGroup[] = [
  { year: "2027", people: ["Avneesh Saravanapavan", "Aarav Dagar", "Isaac Toscano"] },
  {
    year: "2028",
    people: [
      "Sophie Brynes",
      "Keith Buenrosto",
      "Lena Nguyen",
      "Kate Westlake",
      "Lauren Blake",
      "Eshaan Dhaliwal",
      "Jiahan Lyu",
    ],
  },
  {
    year: "2029",
    people: [
      "Alex Park",
      "Emma Kavcioglu",
      "Sara Grippo",
      "Ram Asaithambi",
      "Kyra Myers",
      "Joshua Varon",
    ],
  },
];

// Alumni, newest classes first.
export const ALUMNI_BY_YEAR: ClassGroup[] = [
  { year: "2026", people: ["Javan Mayrand", "Timothy Kreinberg", "Haley Geers", "Irene Biju", "Alexandria Thomas"] },
  { year: "2025", people: ["Tori Ely", "Minjee Kim"] },
  { year: "2024", people: ["Evan Chan", "Jacob Hervey", "Heera Rajavel", "Nhu Bui", "John Lee", "Jiewei Li", "Maya Arora", "William Feng"] },
  { year: "2023", people: ["Kaleb Amare", "Lilly Kelemen", "Paul Kim", "Nellie Sun"] },
  { year: "2022", people: ["Juliana Mayer", "Kari Tora", "Matthew Webber", "Emil Zakarian"] },
  { year: "2021", people: ["Seva Castleberry", "A.G. Chancellor IV"] },
  { year: "2020", people: ["Georgia Lala", "Tristan Malhotra", "Sonali Mehta"] },
  { year: "2019", people: ["Riya Dange"] },
  { year: "2018", people: ["Rebecca Blair", "Jamie Dohopolski", "Madeline Matthys"] },
  { year: "2017", people: ["Andrew Legg", "Milton Padilla, Jr.", "Zek Zhang"] },
  { year: "2016", people: ["Andrea Herman", "Brigid Larkin", "Craig Vincent", "Billy Silk"] },
  { year: "2015", people: ["Jeff Campbell", "Ashley Martin"] },
];

const countPeople = (groups: ClassGroup[]) =>
  groups.reduce((n, g) => n + g.people.length, 0);

export const EXEC_COUNT = EXEC.length;
export const MEMBER_COUNT = countPeople(MEMBERS_BY_YEAR);
export const ALUMNI_COUNT = countPeople(ALUMNI_BY_YEAR);

// ─────────────────────────────────────────────────────────────
// Unified person model — one canonical record per person, used for the
// clickable avatars in the directory and the /team/[slug] profile pages.
// ─────────────────────────────────────────────────────────────

export type Group = "Executive Board" | "Member" | "Alumni";

export interface Person {
  name: string;
  slug: string;
  group: Group;
  /** Executive role, if on the board. */
  role?: string;
  /** Four-digit graduating class year. */
  year: string;
  photo?: string;
  /** Optional bio — add real bios here as they come in. */
  bio?: string;
}

// URL-safe slug. Must match the photo filename slugs in /public/team.
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const yearOf = (y: string) => y.match(/\d{4}/)?.[0] ?? y;

// Real bios keyed by exact name. Empty for now — fill in to enrich profiles.
export const BIOS: Record<string, string> = {};

const execByName = new Map(EXEC.map((e) => [e.name, e]));
const peopleBySlug = new Map<string, Person>();

// Current members first (exec members are overlaid with their board role)…
for (const group of MEMBERS_BY_YEAR) {
  for (const name of group.people) {
    const exec = execByName.get(name);
    const slug = slugify(name);
    peopleBySlug.set(slug, {
      name,
      slug,
      group: exec ? "Executive Board" : "Member",
      role: exec?.role,
      year: yearOf(group.year),
      photo: PHOTOS[name],
      bio: BIOS[name],
    });
  }
}
// …then alumni (distinct people; never overwrite a current member).
for (const group of ALUMNI_BY_YEAR) {
  for (const name of group.people) {
    const slug = slugify(name);
    if (peopleBySlug.has(slug)) continue;
    peopleBySlug.set(slug, {
      name,
      slug,
      group: "Alumni",
      year: yearOf(group.year),
      photo: PHOTOS[name],
      bio: BIOS[name],
    });
  }
}

export const PEOPLE: Person[] = [...peopleBySlug.values()];
export const ALL_SLUGS: string[] = [...peopleBySlug.keys()];
export const personBySlug = (slug: string): Person | undefined =>
  peopleBySlug.get(slug);
