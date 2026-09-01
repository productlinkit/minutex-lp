"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

gsap.registerPlugin(ScrollTrigger);

// Hero headline, split into lines → words so each word can rise in and be
// masked by its line wrapper.
const TITLE_LINES = [
  ["Stay", "present."],
  ["We'll", "take", "notes."],
];

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // The scroll-scrubbed video hero only runs on desktop. On mobile we show
      // a static phone-frame hero instead (no pin, no scrubbing).
      mm.add("(min-width: 1024px)", () => {
        const video = videoRef.current;
        if (!video) return;

        // The <video> ships with preload="none" so mobile (which shows a static
        // image hero instead) never downloads this ~8 MB file. Only here, on
        // desktop, do we actually begin loading it.
        video.preload = "auto";
        video.load();

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

        // On load the video auto-plays from 0 up to this fraction of its
        // length, so the hero isn't empty on first visit. After that (or once
        // the user scrolls) the scroll position drives the rest of the video.
        const INTRO_FRACTION = 0.5;

        let raf = 0;
        const triggers: ScrollTrigger[] = [];
        let onMeta: (() => void) | null = null;
        let onIntro: (() => void) | null = null;

        const build = () => {
          const duration = video.duration || 1;
          const introEnd = duration * INTRO_FRACTION;
          let introDone = false;
          let target = introEnd; // scroll picks up where the intro left off

          // Intro autoplay: play 0 → introEnd at a faster rate so the laptop
          // appears quickly, then hand off to scroll.
          const INTRO_SPEED = 2.5;
          const finishIntro = () => {
            if (introDone) return;
            introDone = true;
            video.pause();
            video.playbackRate = 1;
          };
          onIntro = () => {
            if (!introDone && video.currentTime >= introEnd) {
              video.currentTime = introEnd;
              finishIntro();
            }
          };
          try {
            video.currentTime = 0;
          } catch {
            /* not seekable yet */
          }
          video.playbackRate = INTRO_SPEED;
          video.addEventListener("timeupdate", onIntro);
          // If autoplay is blocked, hand straight over to scroll control.
          video.play().catch(() => finishIntro());

          triggers.push(
            ScrollTrigger.create({
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
              onUpdate: (self) => {
                target = introEnd + self.progress * (duration - introEnd);
                if (self.progress > 0.001) finishIntro();
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

          const tick = () => {
            if (introDone && video.readyState >= 2 && !video.seeking) {
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
          if (onIntro) video.removeEventListener("timeupdate", onIntro);
        };
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      id="home"
      ref={root}
      className="relative bg-[#d7e8fa] lg:h-[260vh]"
    >
      {/* ---------- MOBILE: static phone-frame hero on a cloud sky ---------- */}
      <div className="relative overflow-hidden lg:hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/bg-footer.webp')" }}
        />
        <div className="absolute inset-0 bg-white/25" />

        <div className="container relative z-10 flex flex-col items-center pb-14 pt-28 text-center sm:pt-32">
          <Reveal stagger className="flex flex-col items-center">
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Stay present.
              <br />
              We&apos;ll take notes.
            </h1>
            <p className="mt-4 max-w-sm text-[15px] font-medium leading-relaxed text-ink/75">
              MinuteX turns every meeting into clear, shareable minutes —
              automatically, in seconds.
            </p>
            <Button variant="light" className="mt-6">
              Get Started
            </Button>
          </Reveal>

          <Reveal scale className="mt-12">
            <Image
              src="/images/iphone-mom.png"
              alt="MinuteX app recording a live session"
              width={320}
              height={664}
              className="h-auto w-[240px] drop-shadow-2xl sm:w-[280px]"
            />
          </Reveal>
        </div>
      </div>

      {/* ---------- DESKTOP: scroll-scrubbed video hero ---------- */}
      <div className="hero-stage sticky top-0 hidden h-screen w-full overflow-hidden lg:block">
        <video
          ref={videoRef}
          src="/video/hero-hd.mp4"
          muted
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* content: MINUTEX left (dark) — paragraph + CTA right */}
        <div className="hero-content container relative z-10 flex h-full flex-col justify-start pt-20 sm:pt-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <h1 className="hero-title text-ink">
              {TITLE_LINES.map((line, li) => (
                <span key={li} className="block overflow-hidden pb-[0.08em]">
                  <span className="block text-[12vw] font-extrabold leading-[0.95] tracking-tight sm:text-[9vw] lg:text-[5.5rem]">
                    {line.map((w, wi) => (
                      <span
                        key={wi}
                        className="hero-letter mr-[0.22em] inline-block"
                      >
                        {w}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </h1>

            <div className="hero-anim max-w-xs lg:pt-4">
              <p className="text-[15px] font-medium leading-relaxed text-ink/75">
                MinuteX turns every meeting into clear, shareable minutes —
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
