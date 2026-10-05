import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { BetaDownloads } from "@/components/app-download";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden pt-20 sm:pt-28">
      <div className="container relative z-10 flex flex-col items-center text-center">
        <Reveal stagger className="flex flex-col items-center">
          <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            Never take meeting notes again
          </h2>
          <p className="mt-4 max-w-md text-[15px] text-ink-muted">
            Bring MinuteX to your next call. Capture every word, decision, and
            action item — on web, mobile, or the MinuteX device.
          </p>
          <BetaDownloads className="mt-7 items-center" />
        </Reveal>

        <Reveal scale className="mt-14">
          <Image
            src="/images/iphone-mom.png"
            alt="MinuteX app recording a live session"
            width={320}
            height={664}
            className="h-auto w-[260px] sm:w-[300px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
