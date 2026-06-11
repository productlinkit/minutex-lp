# Static Assets

Semua file di folder `public/` dapat diakses langsung dari root URL.
Path-nya **tanpa** kata `public`.

| File di disk                         | Dipanggil di kode      |
| ------------------------------------ | ---------------------- |
| `public/images/hero.png`             | `/images/hero.png`     |
| `public/avatars/emery.jpg`           | `/avatars/emery.jpg`   |
| `public/logos/paypal.svg`            | `/logos/paypal.svg`    |

## Folder

- **images/** — gambar besar (hero, background awan, foto tangan memegang HP)
- **phone/** — screenshot UI aplikasi (bila ingin mengganti mockup komponen dgn gambar asli)
- **avatars/** — foto profil testimonial & recipients
- **logos/** — logo brand (Paypal, Google, Adobe, Netflix, App Store, Google Play)
- **icons/** — ikon kustom, favicon, og-image

## Cara pakai (next/image — direkomendasikan)

```tsx
import Image from "next/image";

<Image src="/images/hero.png" alt="Hero" width={520} height={760} priority />
```

Untuk background CSS:

```tsx
<div style={{ backgroundImage: "url('/images/clouds.png')" }} />
```

> Pakai `next/image` agar otomatis di-optimize (lazy-load, resize, format modern).
> SVG aman dipakai langsung. Untuk foto besar, kompres dulu (mis. WebP/AVIF).
