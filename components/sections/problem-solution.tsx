"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  FileText,
  ListChecks,
  Send,
  Sparkles,
  Video,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Card = {
  tag: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  tone: "brand" | "light";
};

const cards: Card[] = [
  {
    tag: "Auto Transcription",
    title: "Never miss a word",
    desc: "Real-time, speaker-aware transcription for every meeting.",
    icon: FileText,
    tone: "light",
  },
  {
    tag: "Action Items",
    title: "Tasks, captured",
    desc: "Every action, owner, and deadline detected automatically.",
    icon: ListChecks,
    tone: "brand",
  },
  {
    tag: "Smart Summaries",
    title: "The gist in seconds",
    desc: "AI condenses an hour of talk into a clear recap.",
    icon: Sparkles,
    tone: "light",
  },
  {
    tag: "Shareable Minutes",
    title: "One click to share",
    desc: "Send polished, structured minutes to your whole team.",
    icon: Send,
    tone: "light",
  },
];

function Hl({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-brand/15 px-1.5 py-0.5 font-semibold text-brand">
      {children}
    </span>
  );
}

export function ProblemSolution() {
  const section = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and translate the card track to the left.
      mm.add("(min-width: 768px)", () => {
        const distance = () =>
          Math.max(
            0,
            (track.current?.scrollWidth ?? 0) -
              (wrap.current?.clientWidth ?? 0) +
              24
          );

        gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: section }
  );

  // Arrow nudge: vertical scroll on desktop (drives the pin), native scroll on mobile.
  const nudge = (dir: 1 | -1) => {
    const step = 380;
    if (window.matchMedia("(min-width: 768px)").matches) {
      window.scrollBy({ top: dir * step, behavior: "smooth" });
    } else {
      wrap.current?.scrollBy({ left: dir * step, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={section}
      id="problem-solution"
      className="relative flex min-h-screen flex-col overflow-hidden bg-white py-10"
    >
      <div className="container shrink-0 pt-20">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
          Problem &amp; Solution
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
          From messy meetings to clear minutes.
        </h2>
      </div>

      {/* horizontal track */}
      <div
        ref={wrap}
        className="mt-10 flex-1 overflow-x-auto md:overflow-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          ref={track}
          className="flex h-full min-h-[340px] items-center gap-5 px-5 sm:px-8 lg:pl-[max(2rem,calc((100vw-72rem)/2+1.25rem))]"
        >
          {/* featured card */}
          <article className="relative h-[340px] w-[320px] shrink-0 overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-500 to-brand-700 p-6 text-white sm:w-[400px]">
            <div className="pointer-events-none absolute -right-16 -top-10 h-56 w-56 rounded-full border border-white/20" />
            <div className="pointer-events-none absolute -right-6 top-16 h-40 w-40 rounded-full border border-dashed border-white/25" />

            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">
              <Video className="h-3.5 w-3.5" /> Works everywhere
            </span>

            <div className="absolute inset-x-6 bottom-6">
              <div className="mb-3 flex items-center gap-2">
                {["Zoom", "Meet"].map((p) => (
                  <span
                    key={p}
                    className="rounded-lg border border-white/30 bg-white/15 px-2.5 py-1 text-[11px] font-semibold backdrop-blur"
                  >
                    {p}
                  </span>
                ))}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">
                  +5
                </span>
              </div>
              <h3 className="text-2xl font-extrabold leading-tight">
                Add the bot to any call
              </h3>
              <p className="mt-1.5 max-w-[15rem] text-sm text-white/80">
                Drop Minutex into Zoom, Google Meet, or Teams in one click — it
                joins and takes the minutes for you.
              </p>
              <button className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand transition-transform hover:-translate-y-0.5">
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
          </article>

          {/* solution cards */}
          {cards.map((c) => (
            <article
              key={c.tag}
              className={cn(
                "relative flex h-[340px] w-[260px] shrink-0 flex-col rounded-[2rem] p-6 sm:w-[290px]",
                c.tone === "brand"
                  ? "bg-brand text-white"
                  : "border border-slate-100 bg-white text-ink"
              )}
            >
              <span
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-2xl",
                  c.tone === "brand"
                    ? "bg-white/15 text-white"
                    : "bg-gradient-to-br from-brand-100 to-brand-50 text-brand"
                )}
              >
                <c.icon className="h-6 w-6" />
              </span>

              <div className="mt-auto">
                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wider",
                    c.tone === "brand" ? "text-white/70" : "text-brand"
                  )}
                >
                  {c.tag}
                </p>
                <h3 className="mt-2 text-xl font-extrabold leading-tight">
                  {c.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm leading-relaxed",
                    c.tone === "brand" ? "text-white/80" : "text-ink-muted"
                  )}
                >
                  {c.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* footer: arrows left, paragraph + read more right */}
      <div className="container flex shrink-0 flex-col items-start justify-between gap-6 pb-8 pt-10 sm:flex-row sm:items-end">
        <div className="flex items-center gap-3">
          <button
            aria-label="Previous"
            onClick={() => nudge(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            onClick={() => nudge(1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-white"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="max-w-md sm:text-right">
          <p className="text-lg leading-relaxed text-ink">
            We turn every meeting into <Hl>clear minutes</Hl> so your team always
            knows <Hl>what was decided</Hl> and what happens next.
          </p>
        </div>
      </div>
    </section>
  );
}
