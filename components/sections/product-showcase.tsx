"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, Hand, MousePointerClick, Tag, ZoomIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SplineDevice } from "@/components/spline-device";

gsap.registerPlugin(ScrollTrigger);

type PanelMeta = {
  step: string;
  label: string;
  title: string;
  desc: string;
  features: string[];
  cta: string;
  /** Render the email waitlist flow instead of a plain CTA button. */
  waitlist?: boolean;
};

const WEB: PanelMeta = {
  step: "01",
  label: "Web App",
  title: "Sit in on every Zoom & Meet — without lifting a finger",
  desc: "Minutex quietly joins your online calls, captures every word, and turns the conversation into a clean, searchable record the moment the meeting ends.",
  features: [
    "Auto-joins Zoom & Google Meet",
    "Live, accurate transcript",
    "Real-time translation",
    "Speaker identification",
    "One-click AI summary",
  ],
  cta: "Try the web app",
};

const MOBILE: PanelMeta = {
  step: "02",
  label: "Mobile App",
  title: "Capture any conversation in a single tap",
  desc: "From hallway chats to client calls, never lose a great idea again. Tap once to record on the go — Minutex uploads and writes it up the moment you reconnect.",
  features: [
    "One-tap recording",
    "Automatic upload & sync",
    "Works fully offline",
    "Share polished notes in seconds",
  ],
  cta: "Download the app",
};

const DEVICE: PanelMeta = {
  step: "03",
  label: "Device",
  title: "Flawless minutes for the room you're actually in",
  desc: "A clip-on recorder for in-person meetings — no laptop required. All-day battery and instant sync mean real-world conversations get the same perfect notes.",
  features: [
    "Clip-on, pocket-sized design",
    "20+ hours of battery life",
    "One simple physical button",
    "Sync via Bluetooth or USB",
  ],
  cta: "Join the waitlist",
  waitlist: true,
};

function WaitlistForm() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  // Front-end only flow: validates the email and confirms. Wire `email` to your
  // signup API / list provider here when the backend is ready.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setDone(true);
  };

  if (done) {
    return (
      <div className="mt-8 flex items-center gap-2.5 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
        You&apos;re on the list — we&apos;ll email your 20% launch discount.
      </div>
    );
  }

  if (!open) {
    return (
      <Button className="mt-8 gap-2" onClick={() => setOpen(true)}>
        Join the waitlist
        <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
          <Tag className="h-3 w-3" /> 20% off
        </span>
      </Button>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8 max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        <Button type="submit" className="h-11 shrink-0 gap-1.5">
          <Tag className="h-4 w-4" /> Get 20% off
        </Button>
      </div>
      <p className="mt-2.5 text-xs text-ink-soft">
        Join the waitlist and we&apos;ll send an exclusive 20% launch discount.
        No spam, unsubscribe anytime.
      </p>
    </form>
  );
}

function PanelText({ meta }: { meta: PanelMeta }) {
  return (
    <div className="max-w-lg">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
        {meta.step} — {meta.label}
      </p>
      <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.7rem]">
        {meta.title}
      </h2>
      <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">
        {meta.desc}
      </p>
      <ul className="mt-7 grid gap-3">
        {meta.features.map((f) => (
          <li key={f} className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <span className="text-[15px] text-ink">{f}</span>
          </li>
        ))}
      </ul>
      {meta.waitlist ? (
        <WaitlistForm />
      ) : (
        <Button className="mt-8">{meta.cta}</Button>
      )}
    </div>
  );
}

export function ProductShowcase() {
  const section = useRef<HTMLElement>(null);
  const webRef = useRef<HTMLVideoElement>(null);
  const mobRef = useRef<HTMLVideoElement>(null);
  const [showSpline, setShowSpline] = useState(false);

  // Lazy-mount the Spline scene only once the section approaches the viewport.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShowSpline(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ---- Desktop: pin the stage; panels slide up; snap between slides.
      mm.add("(min-width: 1024px)", () => {
        const webV = webRef.current;
        const mobV = mobRef.current;
        let raf = 0;
        let tl: gsap.core.Timeline | null = null;
        let killed = false;

        const seekIdle = (v: HTMLVideoElement | null, t: number) => {
          if (v && v.readyState >= 2 && !v.seeking) {
            if (Math.abs(t - v.currentTime) > 1 / 48) {
              try {
                v.currentTime = t;
              } catch {
                /* not seekable yet */
              }
            }
          }
        };

        const build = () => {
          if (killed) return;
          const webDur = webV && isFinite(webV.duration) ? webV.duration : 6;
          const mobDur = mobV && isFinite(mobV.duration) ? mobV.duration : 6;
          const wp = { t: 0 };
          const mp = { t: 0 };

          tl = gsap.timeline({
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
            },
          });

          // Three equal "scrub / hold" windows with a very short slide-up
          // between them, so each switch reads as instant — you never rest in
          // a half-transition.
          tl.set(".sc-web", { yPercent: 0, autoAlpha: 1 }, 0)
            .set(".sc-mobile", { yPercent: 100, autoAlpha: 1 }, 0)
            .set(".sc-device", { yPercent: 100, autoAlpha: 1 }, 0)
            // web video scrub
            .to(wp, { t: webDur, ease: "none", duration: 0.3 }, 0)
            // web -> mobile (snappy slide up)
            .to(
              ".sc-web",
              { yPercent: -100, ease: "power3.inOut", duration: 0.03 },
              0.3,
            )
            .to(
              ".sc-mobile",
              { yPercent: 0, ease: "power3.inOut", duration: 0.03 },
              0.3,
            )
            // mobile video scrub
            .to(mp, { t: mobDur, ease: "none", duration: 0.3 }, 0.33)
            // mobile -> device (snappy slide up)
            .to(
              ".sc-mobile",
              { yPercent: -100, ease: "power3.inOut", duration: 0.03 },
              0.63,
            )
            .to(
              ".sc-device",
              { yPercent: 0, ease: "power3.inOut", duration: 0.03 },
              0.63,
            )
            // device hold (room to interact with the 3D model)
            .to(".sc-device", { yPercent: 0, duration: 0.34 }, 0.66);

          const tick = () => {
            seekIdle(webV, wp.t);
            seekIdle(mobV, mp.t);
            raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          ScrollTrigger.refresh();
        };

        const ready = (v: HTMLVideoElement | null) =>
          v && v.readyState >= 1
            ? Promise.resolve()
            : new Promise<void>((res) =>
                v?.addEventListener("loadedmetadata", () => res(), {
                  once: true,
                }),
              );

        Promise.all([ready(webV), ready(mobV)]).then(() => {
          if (!killed) build();
        });

        return () => {
          killed = true;
          cancelAnimationFrame(raf);
          if (tl) {
            tl.scrollTrigger?.kill();
            tl.kill();
          }
        };
      });

      // ---- Mobile / tablet: panels stack normally, videos just loop.
      mm.add("(max-width: 1023px)", () => {
        const play = (v: HTMLVideoElement | null) => {
          if (!v) return;
          v.loop = true;
          v.play().catch(() => {});
        };
        play(webRef.current);
        play(mobRef.current);
        return () => {
          webRef.current?.pause();
          mobRef.current?.pause();
        };
      });

      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="product"
      className="relative bg-white lg:h-[360vh]">
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        {/* WEB */}
        <div className="sc-web sc-panel relative flex items-center py-24 lg:absolute lg:inset-0 lg:py-0">
          <div className="container grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <PanelText meta={WEB} />
            <div className="relative mx-auto w-full max-w-[540px]">
              <div className="overflow-hidden rounded-[1.8rem] border border-slate-200/70 shadow-card">
                <video
                  ref={webRef}
                  src="/video/desktop-mom-hd.mp4"
                  muted
                  playsInline
                  preload="auto"
                  className="aspect-square w-full bg-slate-50 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE */}
        <div className="sc-mobile sc-panel relative flex items-center py-24 lg:invisible lg:absolute lg:inset-0 lg:py-0">
          <div className="container grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <PanelText meta={MOBILE} />
            <div className="relative mx-auto w-full max-w-[460px]">
              <div className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-50 shadow-card">
                <video
                  ref={mobRef}
                  src="/video/mobile-mom-hd.mp4"
                  muted
                  playsInline
                  preload="auto"
                  className="aspect-square w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* DEVICE */}
        <div className="sc-device sc-panel relative flex items-center py-24 lg:invisible lg:absolute lg:inset-0 lg:py-0">
          <div className="container grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <PanelText meta={DEVICE} />
            <div className="group relative mx-auto aspect-square w-full max-w-[560px] cursor-grab overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-50 via-white to-slate-100 active:cursor-grabbing [&_canvas]:!cursor-[inherit]">
              {showSpline && (
                <SplineDevice className="absolute inset-0 h-full w-full" />
              )}

              {/* mask the "Built with Spline" watermark in the bottom-right
                  corner; blends with the panel's gradient and blocks its link */}
              <div className="absolute bottom-0 right-0 z-10 h-16 w-full rounded-br-[2rem] bg-slate-100" />

              {/* interaction hints */}
              <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex flex-wrap items-center justify-center gap-2 px-4">
                <span className="flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold text-ink shadow-soft backdrop-blur">
                  <Hand className="h-3.5 w-3.5 text-brand" /> Drag to rotate
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold text-ink shadow-soft backdrop-blur">
                  <ZoomIn className="h-3.5 w-3.5 text-brand" /> Scroll to zoom
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold text-ink shadow-soft backdrop-blur">
                  <MousePointerClick className="h-3.5 w-3.5 text-brand" /> Click
                  to explore
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
