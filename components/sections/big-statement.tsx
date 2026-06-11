"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function BigStatement() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".bs-word", {
        opacity: 0.12,
        y: 8,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: true,
        },
      });
      gsap.to(".bs-orb", {
        y: -20,
        scale: 1.08,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        duration: 4,
      });
    },
    { scope: root }
  );

  const text =
    "Every conversation captured, every decision remembered. With MinuteX, perfect meeting [notes] write themselves.";

  return (
    <section ref={root} className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container relative flex flex-col items-center text-center">
        <div className="bs-orb relative mb-10 h-28 w-28">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-300 via-brand to-brand-700 blur-md" />
          <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-brand-500 to-brand-300 opacity-80 blur-[2px]" />
        </div>

        <h2 className="max-w-4xl text-2xl font-bold leading-snug tracking-tight text-ink sm:text-4xl sm:leading-[1.25]">
          {text.split(" ").map((w, i) => {
            const isBlue = w.includes("[");
            const clean = w.replace("[", "").replace("]", "");
            return (
              <span key={i} className="bs-word inline-block">
                <span className={isBlue ? "text-gradient-blue" : ""}>{clean}</span>
                {" "}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
