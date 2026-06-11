import {
  Blocks,
  Languages,
  ListChecks,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/reveal";

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const features: Feature[] = [
  {
    icon: UserCheck,
    title: "Speaker identification",
    desc: "Knows exactly who said what, automatically labelled.",
  },
  {
    icon: Languages,
    title: "50+ languages",
    desc: "Transcribe and translate meetings in real time.",
  },
  {
    icon: Search,
    title: "Smart search",
    desc: "Jump to any moment, decision, or quote in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Private & secure",
    desc: "End-to-end encryption with SOC 2 compliance.",
  },
  {
    icon: ListChecks,
    title: "Action items",
    desc: "Tasks, owners, and due dates detected for you.",
  },
];

const integrations = [
  "Zoom",
  "Google Meet",
  "Teams",
  "Slack",
  "Notion",
  "Calendar",
];

function FeatureCard({ icon: Icon, title, desc }: Feature) {
  return (
    <div className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-1.5 text-[14px] leading-relaxed text-ink-muted">{desc}</p>
    </div>
  );
}

export function KeyFeatures() {
  return (
    <section id="key-features" className="relative bg-white py-20 sm:py-28">
      <div className="container">
        <Reveal stagger className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
            Key Features
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.7rem]">
            Everything you need to never take notes again
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
            One AI that listens, understands, and writes — so your team can stay
            present and let the minutes take care of themselves.
          </p>
        </Reveal>

        <Reveal
          stagger
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(195px,1fr)]"
        >
          {/* highlight card — AI summaries (2x2) */}
          <div className="flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-7 text-white shadow-card md:col-span-2 lg:row-span-2">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <Sparkles className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-2xl font-extrabold leading-tight">
                Instant AI summaries
              </h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/80">
                Turn an hour of conversation into a crisp recap — decisions,
                highlights, and next steps — the moment your meeting ends.
              </p>
            </div>

            {/* mini summary mockup */}
            <div className="mt-6 rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white/80">
                  Meeting Summary
                </span>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold">
                  AI
                </span>
              </div>
              <ul className="mt-3 space-y-2 text-[13px] text-white/90">
                <li className="flex gap-2">
                  <span className="text-white/60">•</span> Q3 roadmap approved by
                  the team
                </li>
                <li className="flex gap-2">
                  <span className="text-white/60">•</span> Design handoff moved to
                  Friday
                </li>
                <li className="flex gap-2">
                  <span className="text-white/60">•</span> Sarah to finalize the
                  budget
                </li>
              </ul>
            </div>
          </div>

          <FeatureCard {...features[0]} />
          <FeatureCard {...features[1]} />
          <FeatureCard {...features[2]} />
          <FeatureCard {...features[3]} />
          <FeatureCard {...features[4]} />

          {/* integrations — full-width band */}
          <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-slate-100 bg-skylight p-7 shadow-soft sm:flex-row sm:items-center md:col-span-2 lg:col-span-3">
            <div className="max-w-md">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand shadow-sm">
                <Blocks className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-2xl font-extrabold leading-tight text-ink">
                Works with your stack
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                Minutes flow straight into the calendar, docs, and chat tools
                your team already lives in.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:max-w-xs sm:justify-end">
              {integrations.map((tool) => (
                <span
                  key={tool}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-brand" />
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
