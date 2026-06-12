"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    img: "/images/executive-casestudy.webp",
    tag: "Executives",
    title: "Decisions, documented",
    desc: "Walk out of every meeting with action items already assigned and owned.",
  },
  {
    img: "/images/sales-casestudy.webp",
    tag: "Sales",
    title: "Calls into pipeline",
    desc: "Turn every discovery call into a CRM-ready summary in seconds.",
  },
  {
    img: "/images/lawyer-casestudy.webp",
    tag: "Legal",
    title: "Every word on record",
    desc: "Accurate, searchable records of consultations and depositions.",
  },
  {
    img: "/images/clinicians-casestudy.webp",
    tag: "Clinicians",
    title: "Patients, not paperwork",
    desc: "Focus on care while notes write themselves after every visit.",
  },
  {
    img: "/images/team_meeting-casestudy.webp",
    tag: "Team meetings",
    title: "Everyone stays aligned",
    desc: "Shared, searchable minutes keep the whole team on the same page.",
  },
];

export function CaseStudies() {
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

  // Arrow nudge: vertical scroll on desktop (drives the pin), native on mobile.
  const nudge = (dir: 1 | -1) => {
    const step = 420;
    if (window.matchMedia("(min-width: 768px)").matches) {
      window.scrollBy({ top: dir * step, behavior: "smooth" });
    } else {
      wrap.current?.scrollBy({ left: dir * step, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={section}
      id="case-studies"
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#f6f8fc] py-10"
    >
      <div className="container flex shrink-0 flex-col gap-6 pt-20 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
            Case Studies
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.7rem]">
            Conversations into <span className="text-gradient-blue">real outcomes</span>.
          </h2>
        </div>

        {/* desktop nav arrows */}
        <div className="hidden items-center gap-3 sm:flex">
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
      </div>

      {/* horizontal track */}
      <div
        ref={wrap}
        className="mt-10 flex-1 overflow-x-auto md:overflow-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          ref={track}
          className="flex h-full min-h-[460px] items-center gap-5 px-5 sm:px-8 lg:pl-[max(2rem,calc((100vw-72rem)/2+1.25rem))]"
        >
          {cases.map((c, i) => (
            <article
              key={c.tag}
              className="group relative h-[460px] w-[330px] shrink-0 overflow-hidden rounded-[2rem] shadow-card sm:w-[360px] lg:w-[440px]"
            >
              <Image
                src={c.img}
                alt={`${c.tag} using MinuteX`}
                fill
                sizes="(max-width: 640px) 330px, (max-width: 1024px) 360px, 440px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

              <span className="absolute left-5 top-5 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur">
                {c.tag}
              </span>

              <div className="absolute inset-x-5 bottom-5 text-white">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-extrabold leading-tight">
                    {c.title}
                  </h3>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-white group-hover:text-ink">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-1.5 max-w-[15rem] text-[13px] leading-relaxed text-white/85">
                  {c.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
