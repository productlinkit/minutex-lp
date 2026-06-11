import { Quote, Star } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "MinuteX changed how our team works. Everyone stays present while it captures every decision — and the recap lands before we even leave the room.",
    name: "Emery George",
    role: "Product Manager, Lumen",
    initials: "EG",
    featured: false,
  },
  {
    quote:
      "I've tried every notetaker out there and nothing comes close. Transcripts are accurate, speaker labels are spot on, and it just works automatically.",
    name: "Grayson Carter",
    role: "Engineering Lead, Northwind",
    initials: "GC",
    featured: true,
  },
  {
    quote:
      "From client calls to in-person workshops, MinuteX captures it all. Our notes are finally consistent, searchable, and shared in seconds.",
    name: "Karen Mitchell",
    role: "Operations Director, Brightpath",
    initials: "KM",
    featured: false,
  },
];

function Stars({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-0.5", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#f6f8fc] py-20 sm:py-28"
    >
      <div className="container">
        <Reveal stagger className="flex flex-col items-center text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
            Wall of love
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.7rem]">
            Loved by teams who never miss a detail
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
            From fast-moving startups to global enterprises, professionals rely
            on MinuteX every single day.
          </p>

          {/* trust row */}
          <div className="mt-7 flex items-center gap-3">
            <div className="flex -space-x-3">
              {["EG", "GC", "KM", "AL", "RS"].map((i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f6f8fc] bg-gradient-to-br from-brand-300 to-brand-600 text-[10px] font-bold text-white"
                >
                  {i}
                </span>
              ))}
            </div>
            <div className="text-left">
              <Stars />
              <p className="mt-0.5 text-xs font-medium text-ink-muted">
                4.9/5 from 2,000+ teams
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5",
                t.featured
                  ? "bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-card"
                  : "border border-slate-100 bg-white shadow-soft hover:shadow-card"
              )}
            >
              {/* watermark quote */}
              <Quote
                className={cn(
                  "absolute -right-2 -top-2 h-20 w-20 rotate-180",
                  t.featured ? "text-white/10" : "text-brand/5"
                )}
                strokeWidth={1.5}
              />

              <Stars className="relative" />

              <blockquote
                className={cn(
                  "relative mt-4 flex-1 text-[15px] leading-relaxed",
                  t.featured ? "text-white/95" : "text-ink"
                )}
              >
                “{t.quote}”
              </blockquote>

              <figcaption
                className={cn(
                  "relative mt-6 flex items-center gap-3 border-t pt-5",
                  t.featured ? "border-white/20" : "border-slate-100"
                )}
              >
                <span
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold ring-2",
                    t.featured
                      ? "bg-white/15 text-white ring-white/30"
                      : "bg-gradient-to-br from-brand-300 to-brand-600 text-white ring-brand-100"
                  )}
                >
                  {t.initials}
                </span>
                <div className="leading-tight">
                  <p
                    className={cn(
                      "text-sm font-bold",
                      t.featured ? "text-white" : "text-ink"
                    )}
                  >
                    {t.name}
                  </p>
                  <p
                    className={cn(
                      "text-[12px]",
                      t.featured ? "text-white/70" : "text-ink-soft"
                    )}
                  >
                    {t.role}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
