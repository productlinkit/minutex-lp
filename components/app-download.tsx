import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

const APPLE_PATH =
  "M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z";

const ANDROID_PATH =
  "M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.1185-9.4396";

function BetaButton({
  href,
  path,
  viewBox,
  title,
  note,
  dark,
}: {
  href: string;
  path: string;
  viewBox: string;
  title: string;
  note: string;
  dark?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-white shadow-soft transition-transform hover:-translate-y-0.5",
        dark ? "bg-ink" : "bg-brand"
      )}
    >
      <svg
        viewBox={viewBox}
        aria-hidden="true"
        className="h-6 w-6 shrink-0 fill-current"
      >
        <path d={path} />
      </svg>
      <span className="flex flex-col items-start leading-tight">
        <span className="whitespace-nowrap text-[13px] font-bold">{title}</span>
        <span className="whitespace-nowrap text-[11px] text-white/65">
          {note}
        </span>
      </span>
      <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/70" />
    </a>
  );
}

/** "Try the beta version" label plus the TestFlight / APK download buttons. */
export function BetaDownloads({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
        <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
          Beta
        </span>
        Try the beta version
      </p>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <BetaButton
          dark
          href="#"
          path={APPLE_PATH}
          viewBox="0 0 384 512"
          title="Download for iOS"
          note="via TestFlight"
        />
        <BetaButton
          href="#"
          path={ANDROID_PATH}
          viewBox="0 0 24 24"
          title="Download for Android"
          note="APK · via Google Drive"
        />
      </div>
    </div>
  );
}

/** Official-style App Store + Google Play badges. */
export function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-2", className)}>
      <a
        href="#"
        aria-label="Download on the App Store"
        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-ink px-3 py-2 text-white transition-transform hover:-translate-y-0.5"
      >
        <svg
          viewBox="0 0 384 512"
          aria-hidden="true"
          className="h-5 w-5 shrink-0 fill-current"
        >
          <path d={APPLE_PATH} />
        </svg>
        <span className="flex flex-col items-start leading-none">
          <span className="text-[8px] font-medium tracking-wide">
            Download on the
          </span>
          <span className="text-[13px] font-semibold leading-tight">
            App Store
          </span>
        </span>
      </a>

      <a
        href="#"
        aria-label="Get it on Google Play"
        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-ink px-3 py-2 text-white transition-transform hover:-translate-y-0.5"
      >
        <Image
          src="/icons/icon-playstore.png"
          alt=""
          width={24}
          height={24}
          className="h-5 w-5 shrink-0"
        />
        <span className="flex flex-col items-start leading-none">
          <span className="text-[8px] font-medium uppercase tracking-wide">
            Get it on
          </span>
          <span className="text-[13px] font-semibold leading-tight">
            Google Play
          </span>
        </span>
      </a>
    </div>
  );
}
