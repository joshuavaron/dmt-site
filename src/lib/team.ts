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
  { year: "2026", people: ["Javan Mayrand", "Timothy Kreinberg", "Travis Swafford", "Haley Geers", "Irene Biju", "Alexandria Thomas"] },
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

// Real bios keyed by exact name, transcribed from each member's profile page on
// dukemocktrial.org. Members without a profile page (and alumni) have no bio.
export const BIOS: Record<string, string> = {
  "Aarav Dagar":
    `Aarav Dagar is a junior hailing from Tampa, FL. A big fan of the South, he has relocated to Durham, NC, where he's a budding sellout, studying Public Policy and Markets and Management. He joined Mock Trial because nothing says "future lawyer" quite like pretending to be one. When he's not in class (which is most of the time), Aarav can be found walking his slightly obese dog Rocky or giggling at "skibidi toilet" jokes while eating Taco Bell.`,
  "Alex Park":
    `Alex is a freshman from South Korea. He applied to DMT with the mission of ensuring that there is at least one Korean on the roster at all times (we miss you Minjee). Thankfully, the mock trial gods were with him during his audition and helped him prevent the extinction of the gens Coreana. Alex would always love to watch Cubs games with you, but he prefers that you ask for permission to approach the bench when his beloved Cubbies are losing. You are sure to win his affection if you ask him about his favorite UFC fighter and manage to sit through his subsequent rant about why it's Dustin "The Diamond" Poirier.`,
  "Avneesh Saravanapavan":
    `Avneesh is a Junior majoring in Biology and Global Health. You might be reading this on the DMT website thinking, "Oh cool, maybe he wants to go into bio consulting." Nope. He just really liked mock trial in high school and stuck with it for one reason: the love of the game. Tripping up opposing attorneys on cross is his favorite part, not for the satisfaction of doing well, but for the even better feeling of knowing they didn't. Outside of mock and school, you'll probably find him playing soccer or getting mated in 7 on online chess.`,
  "Emma Kavcioglu":
    `Emma is a freshman from Granada Hills, CA. She fell in love with Mock Trial her sophomore year of high school and never looked back. When she is not working on Mock Trial, Emma spends her time at spin class (even though she can't ride a real bike), re-reading the Hunger Games Series at Perkins, counting down the minutes till Bad Bunny Superbowl, and watching baseball (GO DODGERS).`,
  "Eshaan Dhaliwal":
    `Eshaan is a sophomore from Sacramento, California. He is undeniably DMT's best character witness (just ask anyone and they can confirm) and can usually be found spending (very) late nights in the library grinding chemistry. It's frankly not possible to contact him in the early hours of the morning before a tournament (he's probably memorizing all his content).`,
  "Isaac Toscano":
    `Isaac is a junior from the beautiful state Massachusetts. After doing mock trial for 2 years in high school, he decided to do it in college without realizing they're all just collegiate larpers. Isaac has become too attached to his fellow larpers and now has no means of leaving his pals. During the 4 hours a day when Isaac is not doing mock trial, he enjoys playing a round of golf with his buddy Doc, talking with a heavy boston accent, and being sarcastic. His favorite flavor donut is Boston Crème. If you ask him to say anything in a Boston accent he will walk away. Wish him luck.`,
  "Kate Westlake":
    `Kate contracted the mock trial disease freshman year of high school and, despite the sheer amount of lentil soup she consumes, has unfortunately yet to recover. She loves the rain, hates caves, and is conflicted in her feelings towards fireworks.`,
  "Keith Buenrosto":
    `Feather you believe it or not, Keith is a sophomore swooping in from the great state of California. He say he's fly and un-beak-lievably funny—others say it's up for debate. In his free time, you can find him sniffing various objects, watching Coraline, dancing for dom dolla, and babysitting his parrot, carrot.`,
  "Kyra Myers":
    `Kyra is a freshman from the college spring break hotspot, Fort Lauderdale. Her journey with mock trial started all the way in middle school, and she's ready to be back at it again. When she isn't doing legal role-play, she enjoys playing her ukulele, watching trashy reality TV shows, and online shopping.`,
  "Lauren Blake":
    `Lauren auditioned for DMT not 100% sure what mock trial was, but 100% sure it seemed like a good time! One year later, and she hasn't looked back! Except for the time there was a sticky note stuck to her heel while crossing a witness (and he pointed it out). There was some regret in that moment. When she's not lurking in the law school, you can find her running between East and West, hitting curbs in her Kia Soul, or falling asleep in Perkins 4th floor.`,
  "Lena Nguyen":
    `Lena is a sophomore from Tucson, Arizona and prides herself on being from the West Coast (she actually hates it, and AZ is landlocked)! If you ever get food with her, you'll notice she spends copious amounts of time rearranging the cutlery and tableware to take what she thinks is an artistic photo. Ask her what her red flag is, and she'll start spitting bars for you!`,
  "Ram Asaithambi":
    `Ram proudly hails from the country roads of West Virginia. When he's not knee-deep in biomedical engineering, he's playing piano, blowing his food points on mozzarella sticks at Gothic, or convincing himself that watching movies counts as "research". This is his first year of mock trial, but after binge-watching every legal drama known to man, he now believes he crosses like Tom Cruise in A Few Good Men—except Ram does his stunts behind counsel table.`,
  "Sara Grippo":
    `Sara Grippo is a freshman from a small town in Tennessee. Her high school graduating class was twenty-two people, so the only extracurricular they had enough people for was mock trial. Outside of mock, Sara can be found talking about how she backpacked 500 miles last summer, signing autographs (she's a micro-celebrity on Pinterest), or yelling at people as a coxswain during early morning rowing practices!`,
  "Sophie Brynes":
    `Sophie is an extremely serious mock-lete from Baltimore, Maryland. She's majoring in public policy and maybe Arabic. In her free time Sophie workshops horrible jokes to share during practice and memorizes the words to American Pie.`,
};

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
