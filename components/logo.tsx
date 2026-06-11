import Image from "next/image";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logos/logo-text.png"
      alt="Minutex"
      width={320}
      height={72}
      priority
      className={cn("h-7 w-auto", className)}
    />
  );
}
