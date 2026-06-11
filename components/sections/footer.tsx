import { Reveal } from "@/components/reveal";
import { Logo } from "@/components/logo";

const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Press"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Community", "Guides", "API Docs"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "Cookies"],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-24">
      <div className="container relative">
        {/* big CTA headline that runs into the footer */}
        <Reveal className="text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            Great meetings start with MinuteX
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-10 border-t border-white/60 pt-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ink-muted">
              The AI meeting notetaker for web, mobile, and in-person — capturing
              every word so your team can stay present.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-bold text-ink">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[13px] text-ink-muted transition-colors hover:text-brand"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/60 py-7 text-[13px] text-ink-soft sm:flex-row">
          <p>© 2026 Minutex. All rights reserved.</p>
          <p>Built for teams who love being present.</p>
        </div>
      </div>
    </footer>
  );
}
