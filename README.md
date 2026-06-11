# MinuteX — AI Meeting Notetaker Landing Page

Marketing landing page for **MinuteX**, an AI meeting notetaker available across **web, mobile, and a physical clip-on device**. It auto-joins your calls, transcribes every word with speaker labels, and turns conversations into clean, searchable, shareable minutes.

Built with a modern animated stack and a scroll-driven, video-first hero.

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** primitives (`Button`)
- **GSAP** + `@gsap/react` + `ScrollTrigger` for scroll-scrubbed video, pinned horizontal scroll, and cross-fade panels
- **Spline** (`@splinetool/react-spline`) for the interactive 3D device
- **lucide-react** icons, **Plus Jakarta Sans** via `next/font`
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
  icon.png            # favicon (logo-only)
components/
  navbar.tsx          # sticky navbar (transparent → glass on scroll, mobile menu)
  logo.tsx
  reveal.tsx          # reusable GSAP ScrollTrigger fade-up wrapper
  sky-backdrop.tsx    # blurred decorative clouds
  spline-device.tsx   # error-boundary wrapper for the 3D device
  spline-inner.tsx    # code-split Spline scene loader
  ui/button.tsx       # shadcn button (default / dark / light / outline / ghost variants)
  sections/
    hero.tsx            # scroll-scrubbed video + giant MINUTEX wordmark
    problem-solution.tsx# pinned horizontal scroll (messy meetings → clear minutes)
    product-showcase.tsx# cross-fade panels: web app → mobile app → 3D device
    key-features.tsx    # bento grid of capabilities + integrations band
    big-statement.tsx   # word-by-word scrub reveal
    case-studies.tsx    # pinned horizontal scroll across 5 personas
    pricing.tsx         # 4 tiers, monthly/yearly toggle
    testimonials.tsx    # wall of love
    final-cta.tsx       # "Never take meeting notes again" + iPhone mockup
    footer.tsx          # closing CTA + footer (shared sky background)
```

## Key Interactions

- **Hero** — a scroll-scrubbed HD video pinned in a sticky stage; scroll position seeks the video frame-by-frame while the "MINUTEX" wordmark and intro copy fade out.
- **Problem & Solution / Case Studies** — sections pin and translate a card track horizontally as you scroll vertically (native horizontal swipe on mobile).
- **Product Showcase** — three panels (web app, mobile app, Spline 3D device) cross-fade and slide bottom-to-top, with the device panel held for interactive drag/zoom.
- **Big statement** — word-by-word scrub reveal tied to scroll.
- **Everything else** — `<Reveal>` fade-up powered by `ScrollTrigger`, with optional per-child stagger.

## Deploy

Push to a Git repo and import in Vercel, or run `vercel --prod`.
