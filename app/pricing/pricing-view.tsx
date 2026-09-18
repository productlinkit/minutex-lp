"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { Check, Minus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { plans, type Plan } from "@/lib/plans";
import { cn } from "@/lib/utils";

type Val = boolean | string;
type Row = { label: string; free: Val; pro: Val; business: Val };

const COMPARISON: { group: string; rows: Row[] }[] = [
  {
    group: "Usage",
    rows: [
      { label: "Monthly transcription", free: "300 min", pro: "Unlimited", business: "Unlimited" },
      { label: "Max conversation length", free: "40 min", pro: "4 hours", business: "4 hours" },
      { label: "Conversation history", free: "Last 25", pro: "Unlimited", business: "Unlimited" },
      { label: "Storage", free: "5 GB", pro: "100 GB", business: "1,000 GB" },
    ],
  },
  {
    group: "AI & transcription",
    rows: [
      { label: "AI meeting summary", free: "Basic · 50/mo", pro: "Advanced · Unlimited", business: "Advanced · Unlimited" },
      { label: "Automated action items", free: false, pro: true, business: true },
      { label: "50+ languages & translation", free: true, pro: true, business: true },
    ],
  },
  {
    group: "Collaboration",
    rows: [
      { label: "Speaker identification", free: true, pro: true, business: true },
      { label: "Share", free: true, pro: true, business: true },
      { label: "Auto-join Zoom, Meet & Teams", free: false, pro: true, business: true },
      { label: "Assign & track action items", free: false, pro: true, business: true },
      { label: "Shared team workspace", free: false, pro: false, business: true },
    ],
  },
  {
    group: "Admin & security",
    rows: [
      { label: "Admin console", free: false, pro: false, business: true },
      { label: "SSO / SAML", free: false, pro: false, business: true },
      { label: "Advanced security controls", free: false, pro: false, business: true },
      { label: "Custom data retention", free: false, pro: false, business: true },
      { label: "Usage analytics", free: false, pro: false, business: true },
    ],
  },
  {
    group: "Support",
    rows: [
      { label: "Help center & community", free: true, pro: true, business: true },
      { label: "Priority support", free: false, pro: true, business: true },
      { label: "Dedicated success manager", free: false, pro: false, business: true },
    ],
  },
];

const FAQ = [
  {
    q: "Can I change or cancel my plan anytime?",
    a: "Yes. Upgrade, downgrade, or cancel from your account settings at any time — changes are prorated automatically.",
  },
  {
    q: "What happens when I reach my minutes limit?",
    a: "On the Free plan you'll be prompted to upgrade. Paid plans include generous limits so you rarely have to think about it.",
  },
  {
    q: "Do you offer a free trial of Pro?",
    a: "Every new account can try Pro features free before deciding on a plan — no card required to start.",
  },
  {
    q: "How does per-seat billing work on Business?",
    a: "Business is billed per user. Add or remove seats anytime and we'll automatically prorate the difference.",
  },
  {
    q: "Is my data secure?",
    a: "Your data is encrypted in transit and at rest. Business adds SSO/SAML, admin controls, and custom retention policies.",
  },
];

function Cell({ v }: { v: Val }) {
  if (v === true)
    return <Check className="mx-auto h-5 w-5 text-brand" strokeWidth={2.5} />;
  if (v === false)
    return <Minus className="mx-auto h-4 w-4 text-slate-300" />;
  return <span className="text-[13px] font-semibold text-ink">{v}</span>;
}

function planLink(tier: Plan, yearly: boolean) {
  if (tier.name === "Free") return "/";
  const billing = tier.oneTime ? "once" : yearly ? "yearly" : "monthly";
  return `/checkout?plan=${encodeURIComponent(tier.name)}&billing=${billing}`;
}

export function PricingView() {
  const [yearly, setYearly] = useState(true);

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      {/* hero */}
      <section className="container text-center">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
          Pricing
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          Find the plan that fits the way you meet
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-muted">
          Start free, upgrade when you need more. Every plan captures your
          conversations automatically — on web, mobile, and in person.
        </p>

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
      </section>

      {/* plan cards */}
      <section className="container mt-12">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((tier) => {
            const price = yearly ? tier.yearly : tier.monthly;
            const discounted = yearly && tier.yearly !== tier.monthly;
            return (
              <div
                key={tier.name}
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-6 shadow-soft",
                  tier.highlight
                    ? "border-brand bg-brand-50/60 lg:shadow-card"
                    : "border-slate-100 bg-white"
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
                  <span className="pb-1.5 text-[13px] text-ink-soft">
                    {tier.period}
                  </span>
                  {discounted && (
                    <span className="mb-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
                      Save 20%
                    </span>
                  )}
                </div>
                <p className="mt-1 h-4 text-[11px] text-ink-soft">
                  {discounted && tier.note ? tier.note : ""}
                </p>

                <Button
                  asChild
                  variant={tier.variant}
                  className="mt-5 w-full"
                >
                  <Link href={planLink(tier, yearly)}>{tier.cta}</Link>
                </Button>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-[13px] text-ink"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* enterprise band */}
        <div className="mx-auto mt-5 flex max-w-4xl flex-col items-start justify-between gap-4 rounded-3xl bg-ink px-7 py-6 text-white sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-base font-bold">Enterprise</p>
              <p className="text-[13px] text-white/70">
                Custom volume, security reviews, onboarding, and a dedicated
                success manager for large teams.
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="light"
            className="shrink-0 whitespace-nowrap"
          >
            <Link href="/checkout?plan=Business&billing=yearly">
              Contact sales
            </Link>
          </Button>
        </div>
      </section>

      {/* comparison table */}
      <section className="container mt-24">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Compare every feature
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-[15px] text-ink-muted">
          A detailed look at what&apos;s included in each MinuteX plan.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr>
                <th className="w-[34%] py-4 text-left align-bottom" />
                {plans.map((tier) => {
                  const price = yearly ? tier.yearly : tier.monthly;
                  return (
                    <th
                      key={tier.name}
                      className={cn(
                        "px-4 py-4 text-center align-bottom",
                        tier.highlight && "rounded-t-2xl bg-brand-50/60"
                      )}
                    >
                      <span className="block text-sm font-bold text-ink">
                        {tier.name}
                      </span>
                      <span className="mt-1 block text-lg font-extrabold text-ink">
                        {price}
                        <span className="text-xs font-medium text-ink-soft">
                          {tier.period}
                        </span>
                      </span>
                      <Button
                        asChild
                        size="sm"
                        variant={tier.highlight ? "default" : "outline"}
                        className="mt-3"
                      >
                        <Link href={planLink(tier, yearly)}>{tier.cta}</Link>
                      </Button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((section) => (
                <Fragment key={section.group}>
                  <tr>
                    <td
                      colSpan={4}
                      className="border-b border-slate-100 pb-2 pt-8 text-xs font-bold uppercase tracking-[0.18em] text-brand"
                    >
                      {section.group}
                    </td>
                  </tr>
                  {section.rows.map((row) => (
                    <tr key={row.label} className="group">
                      <td className="border-b border-slate-100 py-3.5 pr-4 text-sm text-ink">
                        {row.label}
                      </td>
                      <td className="border-b border-slate-100 px-4 py-3.5 text-center">
                        <Cell v={row.free} />
                      </td>
                      <td className="border-b border-slate-100 bg-brand-50/40 px-4 py-3.5 text-center">
                        <Cell v={row.pro} />
                      </td>
                      <td className="border-b border-slate-100 px-4 py-3.5 text-center">
                        <Cell v={row.business} />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mt-24">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Pricing FAQ
        </h2>
        <div className="mx-auto mt-10 max-w-2xl divide-y divide-slate-200 border-y border-slate-200">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-bold text-ink">
                {f.q}
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 text-ink-soft transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
