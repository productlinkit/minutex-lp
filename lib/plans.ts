export type Plan = {
  name: string;
  desc: string;
  /** short display prices used on the pricing cards, e.g. "Rp 149K" */
  monthly: string;
  yearly: string;
  /** numeric rupiah amounts (per month) used by the checkout page */
  monthlyN: number;
  yearlyN: number;
  period: string;
  perUser?: boolean;
  oneTime?: boolean;
  note?: string;
  features: string[];
  cta: string;
  variant: "outline" | "default";
  highlight?: boolean;
  badge?: string;
};

export const plans: Plan[] = [
  {
    name: "Free",
    desc: "For trying things out",
    monthly: "$0",
    yearly: "$0",
    monthlyN: 0,
    yearlyN: 0,
    period: "forever",
    features: ["300 minutes / month", "Web + Mobile apps", "Basic AI summary"],
    cta: "Get started",
    variant: "outline",
  },
  {
    name: "Pro",
    desc: "For power users",
    monthly: "$15",
    yearly: "$12",
    monthlyN: 15,
    yearlyN: 12,
    period: "/month",
    note: "per month, billed yearly",
    features: [
      "Unlimited minutes",
      "All AI features",
      "Integrations",
      "Priority support",
    ],
    cta: "Buy Now",
    variant: "default",
    highlight: true,
    badge: "Most popular",
  },
  {
    name: "Business",
    desc: "For growing teams",
    monthly: "$30",
    yearly: "$24",
    monthlyN: 30,
    yearlyN: 24,
    period: "/user/month",
    note: "per user, billed yearly",
    perUser: true,
    features: [
      "Everything in Pro",
      "Admin console",
      "SSO / SAML",
      "Custom retention",
    ],
    cta: "Buy Now",
    variant: "outline",
  },
];

export const getPlan = (name: string | null | undefined) =>
  plans.find((p) => p.name.toLowerCase() === (name ?? "").toLowerCase());

/** Format a USD amount as "$144" (or "$8.33" when it has cents). */
export const formatUsd = (n: number) =>
  "$" + (Number.isInteger(n) ? n.toLocaleString("en-US") : n.toFixed(2));
