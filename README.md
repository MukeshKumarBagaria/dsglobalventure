# DS Global Ventures — Website

Corporate website for **DS Global Ventures**, a chemical trading & sourcing company.
*Reliable Chemical Sourcing. Trusted Global Trade.*

- **Content (all copy):** [`docs/01-WEBSITE-CONTENT.md`](docs/01-WEBSITE-CONTENT.md)
- **SRS, design system, page layouts & motion spec:** [`docs/02-SRS-AND-DESIGN.md`](docs/02-SRS-AND-DESIGN.md)

## Stack

Next.js 16.4 (App Router, Cache Components, Partial Prefetching) · React 19.3 · TypeScript · Tailwind CSS v4 · Motion · GSAP ScrollTrigger · Lenis · lucide-react.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes prerendered)
npm run lint
```

## Before go-live

1. **Replace placeholders** in [`lib/site.ts`](lib/site.ts): phone, WhatsApp, email, office address.
2. **Set the domain:** `NEXT_PUBLIC_SITE_URL` (used for canonical URLs, sitemap and Open Graph).
3. **Enquiry email delivery** (see `.env.example`):
   - `RESEND_API_KEY` — transactional email API key (provision via Vercel Marketplace → Messaging).
   - `ENQUIRY_TO_EMAIL` — inbox(es) that receive enquiries (comma-separated).
   - `ENQUIRY_FROM_EMAIL` — verified sender, e.g. `DS Global Ventures <enquiries@yourdomain.com>`.

   Without these, enquiries are logged to the server console in development. In production, the form shows a
   one-click WhatsApp / email fallback with the enquiry pre-filled, so no lead is lost.
4. Replace the typographic logo mark in [`components/layout/logo.tsx`](components/layout/logo.tsx) and
   [`app/icon.svg`](app/icon.svg) if a brand logo is supplied.
5. Confirm the product list matches what is actually traded ([`content/products.ts`](content/products.ts)).

## Product catalogue (COA & MSDS)

`/product-catalog` lists every product with its documents and opens PDFs in an in-page viewer (react-pdf / PDF.js).
To add or replace a document: put the PDF in `public/documents/`, generate a page-1 preview into
`public/documents/previews/` (macOS: `qlmanage -t -s 1224 -o /tmp/out file.pdf`, then convert to JPEG), and update
`content/catalog.ts`. The PDF.js worker is copied automatically by `scripts/copy-pdf-worker.mjs`.

## Project structure

```
app/            routes (home, about, products, products/[slug], industries, sourcing-supply, quality, contact, legal)
components/     layout/ · sections/ · home/ · ui/ · molecules/ · forms/ · providers/
content/        products, industries, company copy, navigation — mirrors docs/01-WEBSITE-CONTENT.md
lib/            site config, image registry, validation, server action (actions/enquiry.ts)
assets/images/  photography (Unsplash licence — credits in docs/02-SRS-AND-DESIGN.md §F1)
docs/           content + SRS/design documentation
```
