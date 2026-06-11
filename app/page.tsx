import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { KeyFeatures } from "@/components/sections/key-features";
import { BigStatement } from "@/components/sections/big-statement";
import { CaseStudies } from "@/components/sections/case-studies";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <ProductShowcase />
      <KeyFeatures />
      <BigStatement />
      <CaseStudies />
      <Pricing />
      <Testimonials />

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
