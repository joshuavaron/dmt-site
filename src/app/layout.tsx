import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import "./globals.css";

// Fraunces is the warm editorial serif used for all display headings (hero,
// section titles, panel headings, pull-quotes) — a free stand-in for the
// design system's Freight Text Pro. Self-hosted at build time by next/font and
// exposed via the --font-fraunces CSS variable (see src/lib/typography.ts →
// fontSerif). Inter + Outfit load from /public/fonts via globals.css.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#012169",
};

export const metadata: Metadata = {
  title: {
    default: "Duke Mock Trial — A Competitive Force",
    template: "%s · Duke Mock Trial",
  },
  description:
    "Duke Mock Trial is among the most successful collegiate mock trial programs in the country — a community of competitive, creative students who argue fictional court cases as attorneys and witnesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={fraunces.variable}>
      <head>
        <link
          rel="preload"
          href="/fonts/inter-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/outfit-600.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
