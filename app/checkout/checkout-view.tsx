"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  Smartphone,
  Sparkles,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { getPlan, formatUsd } from "@/lib/plans";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  "Indonesia",
  "Singapore",
  "Malaysia",
  "United States",
  "United Kingdom",
  "Australia",
];

const LANGUAGES = [
  "English",
  "Bahasa Indonesia",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Chinese",
];

const FAQ = [
  {
    q: "How is pricing calculated?",
    a: "Pricing is per user. Paying yearly bills 12 months up front at a 20% discount; paying monthly bills one month at a time.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes — upgrade, downgrade, or cancel anytime from your account settings. Changes are prorated automatically.",
  },
  {
    q: "Which payment methods are accepted?",
    a: "All major credit and debit cards (Visa, Mastercard, JCB, Discover), processed securely by Stripe.",
  },
];

const groupCard = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
};

/** Derive a display name from an email's local part (dummy account lookup). */
const deriveName = (mail: string) => {
  const local = mail.split("@")[0] ?? "";
  const name = local
    .split(/[._-]+/)
    .map((p) => p.replace(/\d+/g, ""))
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return name || "MinuteX Member";
};

type Mode = "signup" | "login" | "authed";

function CardBrands() {
  const card = "h-[18px] w-[27px]";
  const frame = { x: 0.5, y: 0.5, width: 39, height: 25, rx: 3.5 } as const;
  return (
    <span className="pointer-events-none flex items-center gap-1">
      {/* Visa */}
      <svg viewBox="0 0 40 26" className={card} role="img" aria-label="Visa">
        <rect {...frame} fill="#fff" stroke="#E6E8EC" />
        <text
          x="20"
          y="17.5"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="12"
          fontStyle="italic"
          fontWeight="700"
          letterSpacing="-0.3"
          fill="#1434CB"
        >
          VISA
        </text>
      </svg>

      {/* Mastercard */}
      <svg viewBox="0 0 40 26" className={card} role="img" aria-label="Mastercard">
        <rect {...frame} fill="#fff" stroke="#E6E8EC" />
        <circle cx="16" cy="13" r="7" fill="#EB001B" />
        <circle cx="24" cy="13" r="7" fill="#F79E1B" />
        <path d="M20 7.3a7 7 0 0 1 0 11.4 7 7 0 0 1 0-11.4Z" fill="#FF5F00" />
      </svg>

      {/* JCB */}
      <svg viewBox="0 0 40 26" className={card} role="img" aria-label="JCB">
        <rect {...frame} fill="#fff" stroke="#E6E8EC" />
        {[
          ["#0F4C96", 8, "J", 11.65],
          ["#BE1833", 16.3, "C", 19.95],
          ["#0A8140", 24.6, "B", 28.25],
        ].map(([fill, x, letter, tx]) => (
          <g key={letter as string}>
            <rect
              x={x as number}
              y="6"
              width="7.4"
              height="14"
              rx="1.5"
              fill={fill as string}
            />
            <text
              x={tx as number}
              y="16"
              textAnchor="middle"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="7"
              fontWeight="700"
              fill="#fff"
            >
              {letter as string}
            </text>
          </g>
        ))}
      </svg>

      {/* Discover */}
      <svg viewBox="0 0 40 26" className={card} role="img" aria-label="Discover">
        <rect {...frame} fill="#fff" stroke="#E6E8EC" />
        <circle cx="30.5" cy="9" r="3.6" fill="#F76B1C" />
        <text
          x="20"
          y="18.5"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="5"
          fontWeight="800"
          letterSpacing="0.1"
          fill="#1A1A1A"
        >
          DISCOVER
        </text>
      </svg>
    </span>
  );
}

export function CheckoutView() {
  const params = useSearchParams();
  const plan = getPlan(params.get("plan"));
  const oneTime = !!plan?.oneTime;

  const [yearly, setYearly] = useState(params.get("billing") !== "monthly");
  const [users, setUsers] = useState(1);
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState("");

  const [mode, setMode] = useState<Mode>("signup");
  const [account, setAccount] = useState<{ name: string; email: string } | null>(
    null
  );
  const [checking, setChecking] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [payError, setPayError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [language, setLanguage] = useState("English");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [country, setCountry] = useState("Indonesia");

  const [status, setStatus] = useState<"form" | "processing" | "success">(
    "form"
  );
  const [orderId, setOrderId] = useState("");
  const [renewDate, setRenewDate] = useState("");

  const qty = plan?.perUser ? users : 1;

  const totals = useMemo(() => {
    if (!plan) return null;
    if (oneTime) return { total: plan.monthlyN, original: 0, save: 0 };
    const perMonth = yearly ? plan.yearlyN : plan.monthlyN;
    const billed = yearly ? perMonth * 12 : perMonth;
    const total = billed * qty;
    const original = yearly ? plan.monthlyN * 12 * qty : 0;
    const save =
      plan.monthlyN > 0
        ? Math.round((1 - plan.yearlyN / plan.monthlyN) * 100)
        : 0;
    return { total, original, save };
  }, [plan, oneTime, yearly, qty]);

  useEffect(() => {
    if (oneTime) return;
    const d = new Date();
    if (yearly) d.setFullYear(d.getFullYear() + 1);
    else d.setMonth(d.getMonth() + 1);
    setRenewDate(
      d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, [yearly, oneTime]);

  if (!plan || plan.name === "Free") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-lg font-bold text-ink">No plan selected</p>
        <p className="text-sm text-ink-muted">
          Pick a paid plan to continue to checkout.
        </p>
        <Button asChild>
          <Link href="/#pricing">Back to pricing</Link>
        </Button>
      </div>
    );
  }

  const cardDigits = card.replace(/\D/g, "");
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const cardOk =
    cardDigits.length >= 16 &&
    expiry.replace(/\D/g, "").length >= 4 &&
    cvc.length >= 3;
  const loginOk = emailOk && password.length >= 6;
  const signupOk =
    emailOk && password.length >= 6 && first.trim() !== "" && last.trim() !== "" && cardOk;
  const purchaseOk =
    mode === "signup" ? signupOk : mode === "login" ? emailOk && cardOk : cardOk;

  // "Log in" validates the account (dummy: any valid credentials → found).
  const doLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginOk) return setLoginError("Enter your email and password.");
    setLoginError(null);
    setChecking(true);
    window.setTimeout(() => {
      setChecking(false);
      setAccount({ name: deriveName(email), email });
      setMode("authed");
    }, 1200);
  };

  const purchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purchaseOk) {
      const missing: string[] = [];
      if (!emailOk) missing.push("a valid email");
      if (password.length < 6)
        missing.push("a password with at least 6 characters");
      if (mode === "signup" && (!first.trim() || !last.trim()))
        missing.push("your name");
      if (!cardOk) missing.push("complete card details");
      setPayError(`Please add ${missing.join(", ")} to continue.`);
      return;
    }
    setPayError(null);
    setStatus("processing");
    // Dummy Stripe: replace with a real stripe.confirmPayment() call.
    window.setTimeout(() => {
      setOrderId("MX-" + Math.random().toString(36).slice(2, 8).toUpperCase());
      setStatus("success");
    }, 1700);
  };

  const perMonthLabel = formatUsd(yearly ? plan.yearlyN : plan.monthlyN);
  const titleVerb = mode === "authed" ? "Upgrade to" : "Subscribe to";

  // Success-screen details.
  const last4 = cardDigits.slice(-4);
  const brandName = /^4/.test(cardDigits)
    ? "Visa"
    : /^(5[1-5]|2[2-7])/.test(cardDigits)
      ? "Mastercard"
      : /^3[47]/.test(cardDigits)
        ? "Amex"
        : /^35/.test(cardDigits)
          ? "JCB"
          : /^(6011|64|65)/.test(cardDigits)
            ? "Discover"
            : "Card";
  const firstName = (account?.name || first || "").split(" ")[0];
  const receiptRows: [string, string][] = [
    ["Plan", `MinuteX ${plan.name}`],
    [
      "Billing",
      oneTime
        ? "One-time payment"
        : `${yearly ? "Yearly" : "Monthly"}${renewDate ? ` · renews ${renewDate}` : ""}`,
    ],
    ...(plan.perUser
      ? ([["Seats", `${users} ${users > 1 ? "seats" : "seat"}`]] as [
          string,
          string,
        ][])
      : []),
    ["Payment method", `${brandName} •••• ${last4}`],
    ["Billing address", country],
  ];
  const nextSteps: { icon: LucideIcon; title: string; desc: string }[] = [
    {
      icon: Smartphone,
      title: "Download the app",
      desc: "Get MinuteX on iOS, Android, web, and desktop.",
    },
    {
      icon: Users,
      title: "Invite your team",
      desc: "Add teammates so everyone stays in sync.",
    },
    {
      icon: Sparkles,
      title: "Record your first meeting",
      desc: "Add MinuteX to your next Zoom, Meet, or Teams call.",
    },
  ];

  return (
    <main className="relative min-h-screen pb-24">
      {/* sky background, like the home page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/bg-footer.webp')" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/70 via-white/60 to-white/75"
      />

      {/* top bar: logo + (when logged in) account chip */}
      <div className="flex items-center justify-between px-6 pt-6 sm:px-10">
        <Logo />
        {mode === "authed" && account && (
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-ink-soft">
              <User className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-bold text-ink">{account.name}</p>
              <p className="text-[12px] text-ink-soft">{account.email}</p>
            </div>
          </div>
        )}
      </div>

      {/* header — hidden on the success screen */}
      {status !== "success" && (
        <div className="relative mx-auto mt-4 max-w-5xl px-6">
          <Link
            href="/#pricing"
            className="absolute left-6 top-1 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <h1 className="text-center text-2xl font-bold text-brand sm:text-3xl">
            {titleVerb} MinuteX {plan.name}
          </h1>
        </div>
      )}

      {status === "success" ? (
        <div className="mx-auto mt-12 max-w-lg px-6">
          {/* header */}
          <div className="flex flex-col items-center text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
              <Check className="h-10 w-10" strokeWidth={3} />
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-emerald-600">
              Payment confirmed
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
              You&apos;re all set{firstName ? `, ${firstName}` : ""}!
            </h2>
            <p className="mt-2 text-[15px] text-ink-muted">
              Welcome to MinuteX {plan.name}. Your receipt and login details are
              on the way to{" "}
              <span className="font-semibold text-ink">
                {account?.email || email}
              </span>
              .
            </p>
          </div>

          {/* receipt */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
            <div className="flex items-center justify-between bg-slate-50 px-5 py-4">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-ink-soft">
                  Order
                </p>
                <p className="font-bold text-ink">{orderId}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                <Check className="h-3.5 w-3.5" strokeWidth={3} /> Paid
              </span>
            </div>
            <dl className="px-5">
              {receiptRows.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between gap-4 border-t border-slate-100 py-3 text-sm first:border-t-0"
                >
                  <dt className="text-ink-soft">{k}</dt>
                  <dd className="text-right font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex items-center justify-between border-t border-dashed border-slate-300 bg-slate-50/60 px-5 py-4">
              <span className="font-bold text-ink">Total paid</span>
              <span className="text-xl font-extrabold text-ink">
                {formatUsd(totals!.total)}{" "}
                <span className="text-sm font-semibold text-ink-soft">USD</span>
              </span>
            </div>
          </div>

          {/* what's next */}
          <p className="mt-8 text-sm font-bold text-ink">What&apos;s next</p>
          <div className="mt-3 space-y-2.5">
            {nextSteps.map((s) => (
              <div
                key={s.title}
                className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3.5 transition-shadow hover:shadow-soft"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand">
                  <s.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-ink">
                    {s.title}
                  </p>
                  <p className="text-[12.5px] leading-relaxed text-ink-muted">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="flex-1 gap-2">
              <Link href="/">
                Go to dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1 gap-2">
              <Link href="/">
                <Download className="h-4 w-4" /> Download receipt
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-5xl px-6">
         <div className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8 lg:grid-cols-2 lg:gap-0">
          {/* LEFT — order summary */}
          <section className="lg:pr-12">
            <h2 className="text-2xl font-bold text-ink">Order summary</h2>

            {!oneTime && (
              <>
                <p className="mt-7 text-[15px] font-semibold text-ink">
                  Billing Cycle
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <BillingOption
                    active={yearly}
                    onClick={() => setYearly(true)}
                    title="Yearly"
                    badge={totals?.save ? `save ${totals.save}%` : undefined}
                    price={formatUsd(plan.yearlyN)}
                    unit={plan.perUser ? "user/month" : "month"}
                    sub={`(billed ${formatUsd(plan.yearlyN * 12)} yearly)`}
                  />
                  <BillingOption
                    active={!yearly}
                    onClick={() => setYearly(false)}
                    title="Monthly"
                    price={formatUsd(plan.monthlyN)}
                    unit={plan.perUser ? "user/month" : "month"}
                    sub={`(billed ${formatUsd(plan.monthlyN)} monthly)`}
                  />
                </div>
              </>
            )}

            <p className="mt-8 text-[15px] font-semibold text-ink">
              {plan.perUser ? "Number of users" : "Plan"}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {plan.perUser ? (
                  <select
                    value={users}
                    onChange={(e) => setUsers(Number(e.target.value))}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-ink outline-none focus:border-brand"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                ) : null}
                <span className="text-sm text-ink">
                  {plan.perUser
                    ? "Users"
                    : oneTime
                      ? "One-time purchase"
                      : `MinuteX ${plan.name} · ${perMonthLabel}/mo`}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {totals!.original > 0 && (
                  <span className="text-ink-soft line-through">
                    {formatUsd(totals!.original)}
                  </span>
                )}
                <span className="font-semibold text-ink">
                  {formatUsd(totals!.total)}
                </span>
              </div>
            </div>

            {oneTime && plan.note && (
              <p className="mt-2 text-[13px] text-ink-soft">{plan.note}</p>
            )}

            <div className="mt-5">
              {couponOpen ? (
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink outline-none focus:border-brand"
                  />
                  <Button variant="outline" size="sm" type="button">
                    Apply
                  </Button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setCouponOpen(true)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-brand"
                >
                  <Plus className="h-4 w-4" /> Coupon code
                </button>
              )}
            </div>

            <div className="mt-6 border-t border-slate-200 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-ink">Total</span>
                <span className="text-lg font-bold text-ink">
                  {formatUsd(totals!.total)}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[13px] text-ink-soft">
                <span>
                  {oneTime
                    ? "One-time payment"
                    : renewDate
                      ? `Auto renews on ${renewDate}`
                      : ""}
                </span>
                <span>USD</span>
              </div>
            </div>
          </section>

          {/* RIGHT — account + payment */}
          <form
            onSubmit={purchase}
            className="lg:border-l lg:border-slate-100 lg:pl-12"
          >
            {mode !== "authed" && (
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-ink">
                  {mode === "login" ? "Log in" : "Create your account"}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === "login" ? "signup" : "login");
                    setLoginError(null);
                  }}
                  className="text-[13px] font-semibold text-brand hover:underline"
                >
                  {mode === "login"
                    ? "New here? Create account"
                    : "Already a MinuteX user? Log in"}
                </button>
              </div>
            )}

            <div className={cn("space-y-4", mode !== "authed" && "mt-5")}>
              {/* account identity */}
              {mode === "authed" ? (
                <Field label="Your name">
                  <input
                    value={account?.name ?? ""}
                    readOnly
                    aria-readonly
                    className={cn(
                      inputCls,
                      "cursor-not-allowed bg-slate-100 text-ink-muted"
                    )}
                  />
                </Field>
              ) : (
                <>
                  <Field label="Email">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Password">
                    <div className="relative">
                      <input
                        type={showPw ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className={cn(inputCls, "pr-10")}
                      />
                      <button
                        type="button"
                        aria-label={showPw ? "Hide password" : "Show password"}
                        onClick={() => setShowPw((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink"
                      >
                        {showPw ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </Field>
                </>
              )}

              {mode === "signup" && (
                <>
                  <Field label="Name">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        value={first}
                        onChange={(e) => setFirst(e.target.value)}
                        placeholder="First"
                        className={inputCls}
                      />
                      <input
                        value={last}
                        onChange={(e) => setLast(e.target.value)}
                        placeholder="Last"
                        className={inputCls}
                      />
                    </div>
                  </Field>

                  <Field label="Preferred language">
                    <div className="relative">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className={cn(inputCls, "appearance-none bg-white pr-10")}
                      >
                        {LANGUAGES.map((l) => (
                          <option key={l}>{l}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
                    </div>
                  </Field>
                </>
              )}
            </div>

            {/* login form has its own button; validates the account first */}
            {mode === "login" && (
              <>
                {loginError && (
                  <p className="mt-3 text-[12px] font-medium text-rose-600">
                    {loginError}
                  </p>
                )}
                <Button
                  type="button"
                  onClick={doLogin}
                  size="lg"
                  className="mt-5 w-full gap-2"
                  disabled={checking}
                >
                  {checking ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Checking…
                    </>
                  ) : (
                    "Log in"
                  )}
                </Button>
              </>
            )}

            {/* payment form — has its own Purchase button */}
            <p className="mt-6 text-[15px] font-bold text-ink">Payment</p>
            <div className="mt-3 space-y-4">
              <Field label="Card number">
                <div className="relative">
                  <input
                    inputMode="numeric"
                    value={card}
                    onChange={(e) => setCard(groupCard(e.target.value))}
                    placeholder="1234 1234 1234 1234"
                    className={cn(inputCls, "pr-32")}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    <CardBrands />
                  </span>
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Expiration date">
                  <input
                    inputMode="numeric"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM / YY"
                    className={inputCls}
                  />
                </Field>
                <Field label="Security code">
                  <input
                    inputMode="numeric"
                    value={cvc}
                    onChange={(e) =>
                      setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    placeholder="CVC"
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Billing address">
                <div className="relative">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={cn(inputCls, "appearance-none bg-white pr-10")}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
                </div>
              </Field>
            </div>

            {payError && (
              <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-[13px] font-medium text-rose-600">
                {payError}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="mt-4 w-full gap-2"
              disabled={status === "processing"}
            >
              {status === "processing" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Processing…
                </>
              ) : (
                "Purchase"
              )}
            </Button>

            <p className="mt-3 text-center text-[12px] text-ink-soft">
              By clicking purchase, you agree to the{" "}
              <a href="#" className="underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              . Payments secured by{" "}
              <span className="font-semibold text-ink">Stripe</span>.
            </p>
          </form>
         </div>
        </div>
      )}

      {/* FAQ — shown once the account is signed in, like the reference */}
      {mode === "authed" && status !== "success" && (
        <section className="mx-auto mt-20 max-w-3xl px-6">
          <h2 className="text-center text-2xl font-bold text-ink-soft sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y divide-slate-200 border-t border-slate-200">
            {FAQ.map((f) => (
              <div key={f.q} className="py-5">
                <p className="text-[15px] font-bold text-ink">{f.q}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-muted">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-brand focus:ring-2 focus:ring-brand/20";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-ink">
        {label}
      </span>
      {children}
    </label>
  );
}

function BillingOption({
  active,
  onClick,
  title,
  badge,
  price,
  unit,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  badge?: string;
  price: string;
  unit: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border p-4 text-left transition-colors",
        active
          ? "border-brand bg-brand-50/50 ring-1 ring-brand"
          : "border-slate-200 hover:border-slate-300"
      )}
    >
      <span className="flex items-center gap-2">
        <span
          className={cn(
            "flex h-4 w-4 items-center justify-center rounded-full border-2",
            active ? "border-brand" : "border-slate-300"
          )}
        >
          {active && <span className="h-2 w-2 rounded-full bg-brand" />}
        </span>
        <span className="font-bold text-ink">{title}</span>
        {badge && (
          <span className="rounded bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {badge}
          </span>
        )}
      </span>
      <span className="mt-2 block text-sm">
        <span className="font-bold text-brand">{price}</span>{" "}
        <span className="text-ink-soft">{unit}</span>
      </span>
      <span className="block text-[12px] text-ink-soft">{sub}</span>
    </button>
  );
}
