"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "#home" },
  { label: "Product", href: "#product" },
  { label: "Features", href: "#key-features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#testimonials" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto mt-3 flex max-w-6xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5",
          scrolled
            ? "bg-white/80 shadow-soft backdrop-blur-md"
            : "bg-transparent"
        )}
        style={{ width: "min(100% - 1.5rem, 72rem)" }}
      >
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink transition-colors hover:text-brand"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button>Get Started</Button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-ink backdrop-blur md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* mobile menu */}
      <div
        className={cn(
          "mx-auto mt-2 overflow-hidden rounded-3xl bg-white/90 px-2 shadow-soft backdrop-blur-md transition-all duration-300 md:hidden",
          open ? "max-h-96 py-2 opacity-100" : "max-h-0 py-0 opacity-0"
        )}
        style={{ width: "min(100% - 1.5rem, 72rem)" }}
      >
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={() => setOpen(false)}
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-ink-muted hover:bg-brand-50 hover:text-ink"
          >
            {l.label}
          </a>
        ))}
        <div className="p-2">
          <Button className="w-full">Get Started</Button>
        </div>
      </div>
    </header>
  );
}
