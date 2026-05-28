import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui";
import { NAV, CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/nav";
import { LOGO } from "@/lib/images";
import { fontBody, fontSerif } from "@/lib/typography";

// Dark slate footer: wordmark + blurb, an Explore column mirroring the nav, and
// a Connect column. Bottom rule carries the copyright + founding year.

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-white">
      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src={LOGO}
                alt="Duke Mock Trial"
                width={48}
                height={40}
                className="h-10 w-auto"
              />
              <span
                style={{ ...fontSerif, fontWeight: 500 }}
                className="text-2xl tracking-tight text-white"
              >
                Duke Mock Trial
              </span>
            </div>
            <p
              style={fontBody}
              className="mt-4 max-w-sm text-sm leading-relaxed text-white/60"
            >
              A competitive force in collegiate mock trial since 1993. Student-run,
              based out of the trial room at Duke Law School.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3
              style={{ ...fontBody, fontWeight: 600 }}
              className="text-xs uppercase tracking-[0.14em] text-white/40 mb-4"
            >
              Explore
            </h3>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={fontBody}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3
              style={{ ...fontBody, fontWeight: 600 }}
              className="text-xs uppercase tracking-[0.14em] text-white/40 mb-4"
            >
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  style={fontBody}
                  className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Recruitment`}
                  style={fontBody}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Recruitment — Emma Kavcioglu
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=ToRo%20Sponsorship`}
                  style={fontBody}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Sponsorship — Joshua Varon
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  style={fontBody}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Instagram @{INSTAGRAM_HANDLE}
                </a>
              </li>
              <li>
                <span style={fontBody} className="text-sm text-white/50">
                  Duke University · Durham, NC
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p style={fontBody} className="text-xs text-white/40">
            © {year} Duke Mock Trial. All rights reserved.
          </p>
          <p style={fontBody} className="text-xs text-white/40">
            Established 1993 · Durham, North Carolina
          </p>
        </div>
      </Container>
    </footer>
  );
}
