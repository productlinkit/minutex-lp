"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const WORD = "MINUTEX";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video) return;

      // Intro: heading letters rise in, right column fades up.
      gsap.from(".hero-letter", {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.05,
        delay: 0.15,
      });
      gsap.from(".hero-anim", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
        stagger: 0.12,
      });

      let raf = 0;
      const triggers: ScrollTrigger[] = [];
      let onMeta: (() => void) | null = null;

      const build = () => {
        const duration = video.duration || 1;
        let target = 0; // where scroll wants the video to be

        triggers.push(
          ScrollTrigger.create({
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4, // ease the target so motion stays smooth
            onUpdate: (self) => {
              target = self.progress * duration;
            },
          })
        );

        // Fade the hero content out over the first part of the scroll.
        const fade = gsap.to(".hero-content", {
          opacity: 0,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "38% top",
            scrub: true,
          },
        });
        if (fade.scrollTrigger) triggers.push(fade.scrollTrigger);

        // rAF loop: when the decoder is idle, seek straight to the (already
        // eased) target. One seek lands exactly on target — no trailing lag.
        const tick = () => {
          if (video.readyState >= 2 && !video.seeking) {
            if (Math.abs(target - video.currentTime) > 1 / 48) {
              video.currentTime = target;
            }
          }
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        ScrollTrigger.refresh();
      };

      if (video.readyState >= 1) build();
      else {
        onMeta = () => build();
        video.addEventListener("loadedmetadata", onMeta, { once: true });
      }

      return () => {
        cancelAnimationFrame(raf);
        triggers.forEach((t) => t.kill());
        if (onMeta) video.removeEventListener("loadedmetadata", onMeta);
      };
    },
    { scope: root }
  );

  return (
    <section id="home" ref={root} className="relative h-[260vh] bg-[#d7e8fa]">
      {/* sticky stage keeps the video pinned while we scroll through the section */}
      <div className="hero-stage sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/video/hero-hd.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* content: MINUTEX left (dark) — paragraph + CTA right */}
        <div className="hero-content container relative z-10 flex h-full flex-col justify-start pt-28 sm:pt-32">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <h1 className="hero-title overflow-hidden text-ink">
              <span className="block text-[20vw] font-extrabold leading-[0.85] tracking-tight sm:text-[16vw] lg:text-[11vw]">
                {WORD.split("").map((c, i) => (
                  <span key={i} className="hero-letter inline-block">
                    {c}
                  </span>
                ))}
              </span>
            </h1>

            <div className="hero-anim max-w-xs lg:pt-4">
              <p className="text-[15px] font-medium leading-relaxed text-ink/75">
                Minutex turns every meeting into clear, shareable minutes —
                automatically, in seconds.
              </p>
              <Button variant="light" className="mt-5">
                Get Started
              </Button>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div className="hero-content absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ink/60">
          <span className="text-[11px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="flex h-9 w-9 animate-bounce items-center justify-center rounded-full border border-ink/20">
            <ArrowDown className="h-4 w-4" />
          </span>
        </div>
      </div>
    </section>
  );
}
