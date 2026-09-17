import Image from "next/image";

import { Reveal } from "@/components/reveal";

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
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              aria-label="Download on the App Store"
              className="inline-flex items-center gap-3 rounded-xl bg-ink px-5 py-2.5 text-white transition-transform hover:-translate-y-0.5"
            >
              <svg
                viewBox="0 0 384 512"
                aria-hidden="true"
                className="h-[26px] w-[26px] fill-current"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <span className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-medium tracking-wide">
                  Download on the
                </span>
                <span className="text-lg font-semibold leading-tight">
                  App Store
                </span>
              </span>
            </a>
            <a
              href="#"
              aria-label="Get it on Google Play"
              className="inline-flex items-center gap-3 rounded-xl bg-ink px-5 py-2.5 text-white transition-transform hover:-translate-y-0.5"
            >
              <Image
                src="/icons/icon-playstore.png"
                alt=""
                width={26}
                height={26}
                className="h-[26px] w-[26px]"
              />
              <span className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-medium uppercase tracking-wide">
                  Get it on
                </span>
                <span className="text-lg font-semibold leading-tight">
                  Google Play
                </span>
              </span>
            </a>
          </div>
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
