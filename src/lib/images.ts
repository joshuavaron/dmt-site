// Real Duke Mock Trial imagery.
//   - LOGO: the Duke "D" + scales emblem (also the favicon source).
//   - scene.*: photos scraped from the legacy site (/public/site).
//   - sponsor.*: gold/silver/bronze medallions for the ToRo tiers.
//   - team-supplied photos live under /public/images (referenced directly per page).

export const LOGO = "/dmt-logo.png";

export const scene = {
  teamTrophy: "/site/team-trophy.jpg",
  trialAction: "/site/trial-action.jpg",
  celebration: "/site/celebration.jpg",
  campus: "/site/campus.jpg",
  gradAlum: "/site/grad-alum.jpg",
  courthouse: "/site/courthouse.jpg",
} as const;

export const sponsor = {
  gold: "/sponsors/gold.png",
  silver: "/sponsors/silver.png",
  bronze: "/sponsors/bronze.png",
} as const;
