"use client";

import { useEffect, useRef, useState } from "react";
import {
  BatteryCharging,
  Bluetooth,
  Check,
  Feather,
  Hand,
  MicVocal,
  MousePointerClick,
  Sparkles,
  Tag,
  Usb,
  Waves,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SplineDevice } from "@/components/spline-device";

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const FEATURES: Feature[] = [
  {
    icon: Feather,
    title: "Clip-on & pocket-sized",
    desc: "Lighter than a car key. Clip it to your shirt or set it on the table — it disappears into the room.",
  },
  {
    icon: BatteryCharging,
    title: "20+ hours of battery",
    desc: "Record back-to-back meetings all day and charge overnight. A full day of conversations on a single charge.",
  },
  {
    icon: MicVocal,
    title: "Studio-grade mics",
    desc: "A beam-forming array locks onto voices and cuts room noise, so every speaker comes through clearly.",
  },
  {
    icon: MousePointerClick,
    title: "One simple button",
    desc: "Press once to record, press again to stop. No app to fumble with, no screen to wake — just start talking.",
  },
  {
    icon: Bluetooth,
    title: "Instant sync",
    desc: "The moment you reconnect, recordings upload over Bluetooth or USB and MinuteX writes them up automatically.",
  },
  {
    icon: Sparkles,
    title: "Same AI, in the room",
    desc: "In-person conversations get the exact same transcript, speaker labels, and AI summaries as your online calls.",
  },
];

const STEPS = [
  {
    step: "01",
    icon: Hand,
    title: "Clip it on",
    desc: "Attach the device or drop it on the table before your meeting starts.",
  },
  {
    step: "02",
    icon: MicVocal,
    title: "Press record",
    desc: "One press captures the whole conversation — no laptop, no phone, no setup.",
  },
  {
    step: "03",
    icon: Waves,
    title: "Sync & summarize",
    desc: "Reconnect and MinuteX turns the audio into clean, shareable minutes in seconds.",
  },
];

const SPECS: { label: string; value: string }[] = [
  { label: "Battery life", value: "20+ hours recording" },
  { label: "Charging", value: "USB-C · full charge in 90 min" },
  { label: "Microphones", value: "4-mic beam-forming array" },
  { label: "Connectivity", value: "Bluetooth 5.3 & USB-C" },
  { label: "Storage", value: "32 GB on-device (≈ 200 hours)" },
  { label: "Weight", value: "18 g · 42 × 42 × 9 mm" },
  { label: "Controls", value: "Single multi-function button" },
  { label: "In the box", value: "Device, magnetic clip, USB-C cable" },
];

function DeviceWaitlist({ id }: { id?: string }) {
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
      <div
        id={id}
        className="flex items-center gap-2.5 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
        You&apos;re on the list — we&apos;ll email your 20% launch discount.
      </div>
    );
  }

  if (!open) {
    return (
      <Button id={id} className="gap-2" onClick={() => setOpen(true)}>
        Join the waitlist
        <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
          <Tag className="h-3 w-3" /> 20% off
        </span>
      </Button>
    );
  }

  return (
    <form id={id} onSubmit={submit} className="max-w-md">
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

export function DeviceView() {
  const heroRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const [showSpline, setShowSpline] = useState(false);

  // While the pointer is over the 3D device, the wheel should drive the model
  // (Spline zoom) instead of scrolling the page — so swallow the page scroll.
  useEffect(() => {
    const el = deviceRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (window.matchMedia("(min-width: 1024px)").matches) e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Lazy-mount the Spline scene only once the hero approaches the viewport.
  useEffect(() => {
    const el = heroRef.current;
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

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section ref={heroRef} className="relative overflow-hidden">
        {/* cloud sky background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/bg-footer.webp')" }}
        />
        <div className="absolute inset-0 bg-white/45" />

        <div className="container relative z-10 grid items-center gap-12 pb-16 pt-32 sm:pt-36 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-40">
          <Reveal stagger>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Perfect minutes for
              <br />
              the room you&apos;re in.
            </h1>
            <p className="mt-5 max-w-md text-[15px] font-medium leading-relaxed text-ink/75">
              A clip-on recorder for in-person meetings — no laptop, no phone.
              All-day battery and instant sync mean real-world conversations get
              the same flawless notes as your online calls.
            </p>
            <div className="mt-8">
              <DeviceWaitlist />
            </div>
          </Reveal>

          <Reveal scale>
            <div
              ref={deviceRef}
              className="group relative mx-auto aspect-square w-full max-w-[560px] cursor-grab overflow-hidden active:cursor-grabbing [&_canvas]:!cursor-[inherit]"
            >
              {showSpline && (
                <SplineDevice
                  zoom={4.2}
                  className="absolute inset-0 h-full w-full"
                />
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="relative bg-white py-20 sm:py-28">
        <div className="container">
          <Reveal stagger className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
              Built for the real world
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.7rem]">
              Everything the room needs, nothing you don&apos;t
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
              A single purpose-built device that captures in-person meetings
              beautifully — then hands them straight to MinuteX.
            </p>
          </Reveal>

          <Reveal
            stagger
            className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-muted">
                  {f.desc}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="relative bg-skylight py-20 sm:py-28">
        <div className="container">
          <Reveal stagger className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.7rem]">
              Three steps, zero effort
            </h2>
          </Reveal>

          <Reveal stagger className="mt-14 grid gap-4 md:grid-cols-3">
            {STEPS.map((s) => (
              <div
                key={s.step}
                className="relative flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="text-4xl font-extrabold text-slate-100">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-muted">
                  {s.desc}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------- SPECS ---------------- */}
      <section className="relative bg-white py-20 sm:py-28">
        <div className="container grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
              Tech specs
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              Small device, serious hardware
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
              Engineered to sit quietly through your longest days and capture
              every voice at the table with clarity.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-sm">
                <Usb className="h-4 w-4 text-brand" /> USB-C
              </span>
              <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-sm">
                <Bluetooth className="h-4 w-4 text-brand" /> Bluetooth 5.3
              </span>
              <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-sm">
                <MicVocal className="h-4 w-4 text-brand" /> 4-mic array
              </span>
            </div>
          </Reveal>

          <Reveal className="overflow-hidden rounded-3xl border border-slate-100 shadow-soft">
            <dl className="divide-y divide-slate-100">
              {SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between gap-6 px-6 py-4"
                >
                  <dt className="text-[14px] font-medium text-ink-muted">
                    {spec.label}
                  </dt>
                  <dd className="text-right text-[14px] font-semibold text-ink">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CTA BAND ---------------- */}
      <section className="relative bg-white pb-20 sm:pb-28">
        <div className="container">
          <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-14 text-center text-white shadow-card sm:px-12 sm:py-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.22em] backdrop-blur">
              <Tag className="h-3.5 w-3.5" /> Launching soon
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.7rem]">
              Be first to record the room with MinuteX
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-white/80">
              Join the waitlist today and lock in an exclusive 20% launch
              discount on your MinuteX Device.
            </p>
            <div className="mt-8 flex justify-center [&_input]:text-ink">
              <DeviceWaitlist />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
