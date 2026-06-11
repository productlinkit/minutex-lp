# Payno — Fintech Landing Page

Pixel-faithful slice of the **payno** fintech landing page design, built with a modern animated stack.

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** primitives (`Button`)
- **GSAP** + `@gsap/react` + `ScrollTrigger` for entrance & scroll animations
- **lucide-react** icons
- Ready to deploy on **Vercel**

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
app/
  layout.tsx          # Plus Jakarta Sans font + metadata
  page.tsx            # composes all sections
  globals.css         # design tokens, sky/cloud backgrounds
components/
  navbar.tsx          # sticky glass navbar (responsive + mobile menu)
  logo.tsx
  reveal.tsx          # reusable GSAP ScrollTrigger fade-up wrapper
  sky-backdrop.tsx    # blurred decorative clouds
  ui/button.tsx       # shadcn button (brand / dark / light / outline variants)
  phone/
    phone-frame.tsx   # iPhone-style device frame
    screens.tsx       # 5 in-app screens (dashboard, earning, send, pricing, chart)
  sections/
    hero.tsx
    finance-simple.tsx
    big-statement.tsx
    built-for-simplicity.tsx
    pricing.tsx
    testimonials.tsx
    final-cta.tsx
    footer.tsx
```

## Animations

- **Hero** — GSAP timeline: heading stagger → phone scale-in → floating stat cards, with an infinite float loop.
- **Big statement** — word-by-word scrub reveal tied to scroll, with a floating gradient orb.
- **All other sections** — `<Reveal>` fade-up with `ScrollTrigger` (`start: top 85%`), supporting per-child stagger.

## Deploy

Push to a Git repo and import in Vercel, or `vercel --prod`.
