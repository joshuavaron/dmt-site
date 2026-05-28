// Brand palette for the design system.
//
// The design uses raw hex at the call site (e.g. `text-[#012169]`,
// `panelBg="#f97316"`) rather than Tailwind color utilities, so the colors
// stay visible where they're used. These constants are the single source of
// truth — re-theme the whole site by changing them here and updating the
// matching CSS variables in `globals.css`.
//
// Themed for Duke Mock Trial: the primary is Duke Navy (#012169) with the
// lighter Duke Blue (#00539B) as a secondary accent, kept alongside the
// design system's warm orange / purple / emerald for variety.

export const palette = {
  /** Primary — Duke Navy. Buttons, links, the navy testimonial panel. */
  blue: "#012169",
  /** Primary hover / dark. */
  blueDark: "#001a4d",
  /** Secondary — lighter Duke Blue, used as an accent. */
  blueLight: "#00539b",
  /** Accent — highlights, orange testimonial panel, Sponsor CTA. */
  orange: "#f97316",
  /** Accent hover / dark. */
  orangeDark: "#ea580c",
  /** Theme purple — purple testimonial panel. */
  purple: "#9333ea",
  /** Theme emerald — emerald testimonial panel. */
  emerald: "#10b981",
  /** Body text on light backgrounds. */
  ink: "#0a0a0a",
  /** Footer / dark sections. */
  slate900: "#0f172a",
} as const;

// Accent cycle for skill / feature grids. Each card's IconTile and ArrowLink
// take the next color in the cycle so a long grid stays visually varied.
export const accentCycle = [
  "#012169", // duke navy
  "#f97316", // orange
  "#9333ea", // purple
  "#10b981", // emerald
  "#00539b", // duke blue
  "#eab308", // yellow
  "#ec4899", // pink
  "#f97316", // orange
] as const;
