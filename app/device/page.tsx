import type { Metadata } from "next";

import { Navbar } from "@/components/navbar";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { DeviceView } from "./device-view";

export const metadata: Metadata = {
  title: "MinuteX Device — Perfect minutes for the room you're in",
  description:
    "A clip-on recorder for in-person meetings. All-day battery, studio-grade mics, and instant sync — real-world conversations get the same flawless AI notes as your online calls.",
};

export default function DevicePage() {
  return (
    <main className="relative bg-white">
      <Navbar />
      <DeviceView />

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
