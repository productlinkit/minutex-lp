import type { Metadata } from "next";

import { Navbar } from "@/components/navbar";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { PricingView } from "./pricing-view";

export const metadata: Metadata = {
  title: "Pricing — MinuteX",
  description:
    "Compare MinuteX plans and features. Start free, upgrade to Pro or Business for unlimited transcription, AI summaries, integrations, and admin controls.",
};

export default function PricingPage() {
  return (
    <main className="relative bg-white">
      <Navbar />
      <PricingView />

      {/* shared sky background across the closing CTA + footer */}
      <div
        className="relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg-footer.webp')" }}
      >
        <div className="absolute inset-0 bg-white/35" />
        <div className="relative z-10">
          <FinalCta />
          <Footer />
        </div>
      </div>
    </main>
  );
}
