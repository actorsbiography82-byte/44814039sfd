# Zeeshan Portfolio — Renewed v2

Minimal, performance-focused portfolio built with Next.js, TypeScript and Framer Motion.

## What changed in v2

- Warm ivory + graphite + muted sage visual system
- Reduced visual noise and calmer motion
- Removed loading screen and cursor-follow glow
- Improved keyboard focus states and skip navigation
- Improved FAQ ARIA semantics
- Replaced raw project/profile images with `next/image`
- Added Open Graph image generation
- Added canonical metadata, Twitter/Open Graph metadata and robots directives
- Added JSON-LD structured data for Person, ProfessionalService and WebSite
- Added `robots.txt` and `sitemap.xml` routes
- Removed render-blocking Google Fonts CSS import
- Added AVIF/WebP image optimization configuration
- Added deployment-friendly `NEXT_PUBLIC_SITE_URL` support

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Important before the new Vercel launch

Set this environment variable in Vercel after the final project URL/domain is known:

```bash
NEXT_PUBLIC_SITE_URL=https://your-new-domain-or-project.vercel.app
```

This automatically keeps canonical URLs, sitemap URLs, robots host information and structured data aligned with the production domain.

## Before final launch

- Replace temporary project image URLs with final optimized local screenshots.
- Add the final live project URLs and case-study pages.
- Add only verified metrics/testimonials.
- Connect final social profiles.
- Add analytics and Google Search Console after deployment.
- Run Lighthouse on the production URL because network/CDN performance cannot be measured accurately from source code alone.

## Main editing locations

- Portfolio content and interactions: `app/page.tsx`
- Styling and responsive behavior: `app/globals.css`
- Global SEO metadata + schema: `app/layout.tsx`
- Sitemap: `app/sitemap.ts`
- Robots: `app/robots.ts`
- Social preview image: `app/opengraph-image.tsx`
