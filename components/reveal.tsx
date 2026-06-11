"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** stagger child elements instead of the container itself */
  stagger?: boolean;
  delay?: number;
  y?: number;
  /** scale slightly while fading in */
  scale?: boolean;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  as: Tag = "div",
  stagger = false,
  delay = 0,
  y = 32,
  scale = false,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = stagger
        ? (gsap.utils.toArray<HTMLElement>(el.children) as HTMLElement[])
        : [el];

      gsap.set(targets, {
        opacity: 0,
        y,
        scale: scale ? 0.94 : 1,
      });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
