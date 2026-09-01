"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { plans, type Plan } from "@/lib/plans";
import { cn } from "@/lib/utils";

function PlanCard({
  tier,
  yearly,
  onSelect,
}: {
  tier: Plan;
  yearly: boolean;
  onSelect: (tier: Plan) => void;
}) {
  const isOneTime = tier.period === "one-time";
  const price = yearly ? tier.yearly : tier.monthly;
  const discounted = yearly && tier.yearly !== tier.monthly;
  const showNote = tier.note && (isOneTime || discounted);
  const isPaid = price !== "Rp 0";

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-3xl border p-6 shadow-soft transition-transform duration-300",
        tier.highlight
          ? "border-brand bg-brand-50/60 lg:-translate-y-3 lg:shadow-card"
          : "border-slate-100 bg-white hover:-translate-y-1"
      )}
    >
      {tier.badge && (
        <span className="absolute right-5 top-5 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          {tier.badge}
        </span>
      )}

      <p className="text-sm font-bold text-ink">{tier.name}</p>
      <p className="mt-1 text-[13px] text-ink-soft">{tier.desc}</p>

      <div className="mt-5 flex flex-wrap items-end gap-x-2 gap-y-1">
        <span className="text-3xl font-extrabold tracking-tight text-ink">
          {price}
        </span>
        <span className="pb-1.5 text-[13px] text-ink-soft">{tier.period}</span>
        {discounted && (
          <span className="mb-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
            Save 20%
          </span>
        )}
      </div>
      <p className="mt-1 h-4 text-[11px] text-ink-soft">
        {showNote ? tier.note : ""}
      </p>

      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13px] text-ink">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <Button
        variant={tier.variant}
        className="mt-6 w-full"
        onClick={isPaid ? () => onSelect(tier) : undefined}
      >
        {tier.cta}
      </Button>
    </div>
  );
}

export function Pricing() {
  const [yearly, setYearly] = useState(true); // yearly is the default
  const router = useRouter();

  const goToCheckout = (tier: Plan) => {
    const billing = tier.oneTime ? "once" : yearly ? "yearly" : "monthly";
    router.push(
      `/checkout?plan=${encodeURIComponent(tier.name)}&billing=${billing}`
    );
  };

  return (
    <section id="pricing" className="relative bg-white py-20 sm:py-28">
      <div className="container">
        <Reveal stagger className="flex flex-col items-center text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
            Pricing
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.7rem]">
            Simple pricing that scales with you
          </h2>

          {/* billing toggle */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-full bg-slate-100 p-1">
            <button
              onClick={() => setYearly(false)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition-all",
                !yearly ? "bg-white text-ink shadow-sm" : "text-ink-soft"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all",
                yearly ? "bg-white text-ink shadow-sm" : "text-ink-soft"
              )}
            >
              Yearly
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                Save 20%
              </span>
            </button>
          </div>
        </Reveal>

        <Reveal
          stagger
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mx-auto lg:max-w-4xl lg:grid-cols-3"
        >
          {plans.map((tier) => (
            <PlanCard
              key={tier.name}
              tier={tier}
              yearly={yearly}
              onSelect={goToCheckout}
            />
          ))}
        </Reveal>

        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-600"
          >
            Compare all plans &amp; features
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
