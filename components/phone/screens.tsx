import { Check, Languages, ListChecks, Sparkles } from "lucide-react";

/* ------------------------------------------------------------------ */
/* shared bits                                                         */
/* ------------------------------------------------------------------ */

function StatusBar({ dark = false }: { dark?: boolean }) {
  const tone = dark ? "bg-white/80" : "bg-ink/70";
  return (
    <div
      className={`flex items-center justify-between px-5 pt-3 text-[10px] font-semibold ${
        dark ? "text-white/90" : "text-ink/80"
      }`}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className={`inline-block h-2 w-3 rounded-[2px] ${tone}`} />
        <span className={`inline-block h-2 w-2 rounded-[2px] ${tone}`} />
        <span className={`inline-block h-2 w-4 rounded-[3px] ${tone}`} />
      </span>
    </div>
  );
}

function Avatar({
  initials,
  className = "",
}: {
  initials: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-brand-300 to-brand-600 text-[9px] font-bold text-white ${className}`}
    >
      {initials}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing — MinuteX Pro plan                                          */
/* ------------------------------------------------------------------ */

export function PricingScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-brand-500 to-brand-700 text-white">
      <StatusBar dark />
      <div className="px-5 pt-5">
        <p className="text-[10px] font-medium text-white/80">Pro Plan</p>
        <div className="mt-1 flex items-end gap-1">
          <p className="text-[30px] font-extrabold leading-none">$12</p>
          <span className="pb-1 text-[9px] text-white/75">/month</span>
        </div>
      </div>

      <div className="mx-4 mt-5 flex-1 rounded-2xl bg-white p-4 text-ink">
        <p className="text-[10px] font-bold">Everything you need</p>
        <div className="mt-3 space-y-2.5">
          {[
            "Unlimited meetings",
            "Speaker identification",
            "50+ languages",
            "Action items & summaries",
            "All integrations",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-50 text-brand">
                <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
              </span>
              <span className="text-[9px] text-ink-muted">{f}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex h-9 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
          Get Started
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Meeting notes — live capture + AI summary                          */
/* ------------------------------------------------------------------ */

export function MeetingScreen() {
  const transcript = [
    { who: "Sarah", i: "SA", text: "Let's ship the beta next Friday." },
    { who: "James", i: "JA", text: "I'll own the release notes." },
    { who: "Mia", i: "MI", text: "Design handoff is ready to go." },
  ];
  return (
    <div className="flex h-full flex-col bg-[#f4f8fe]">
      <StatusBar />
      <div className="flex items-center justify-between px-5 pt-4">
        <div>
          <p className="text-[12px] font-bold text-ink">Team Standup</p>
          <p className="text-[8px] text-ink-soft">3 participants</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-2 py-1 text-[8px] font-bold text-red-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
          REC 12:04
        </span>
      </div>

      {/* live transcript */}
      <div className="mt-3 space-y-2 px-4">
        {transcript.map((t) => (
          <div
            key={t.who}
            className="flex items-start gap-2 rounded-xl bg-white p-2 shadow-sm"
          >
            <Avatar initials={t.i} className="mt-0.5 h-6 w-6 text-[8px]" />
            <div className="leading-tight">
              <p className="text-[8px] font-bold text-brand">{t.who}</p>
              <p className="text-[9px] text-ink">{t.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* AI summary */}
      <div className="mx-4 mt-3 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 p-3 text-white">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3 w-3" />
          <span className="text-[9px] font-bold">AI Summary</span>
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[8px] text-white/90">
            <ListChecks className="h-2.5 w-2.5" /> Beta ships Friday — James on
            notes
          </div>
          <div className="flex items-center gap-1.5 text-[8px] text-white/90">
            <Languages className="h-2.5 w-2.5" /> Translated to 3 languages
          </div>
        </div>
      </div>
    </div>
  );
}
