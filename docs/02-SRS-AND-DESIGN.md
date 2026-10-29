# DS Global Ventures — SRS & Design Documentation

> **Document 2 of 2.** Software Requirements Specification, competitor analysis, design system, page-by-page layout specification and animation system.
> Content (all copy) lives in [`01-WEBSITE-CONTENT.md`](./01-WEBSITE-CONTENT.md).
> Version 1.0 — October 2026.

---

## PART A — SOFTWARE REQUIREMENTS SPECIFICATION

### A1. Purpose
Build a premium, fast, fully responsive corporate website for **DS Global Ventures**, a chemical trading & sourcing company, that:
1. Establishes credibility as an established international trading house (not a generic “chemical lab” site).
2. Presents a focused product portfolio with SEO-ready product detail pages.
3. Converts industrial buyers into qualified enquiries (product + quantity + location + specification).

### A2. Scope
In scope: marketing website (10 public routes + 5 product pages + 3 legal pages), enquiry form with server-side handling, technical SEO, structured data, animations, responsive layouts.
Out of scope (Phase 2): blog/insights, CMS, multilingual, customer portal, live pricing, analytics dashboards.

### A3. Stakeholders & audience
| Persona | Needs | Site response |
|---|---|---|
| Procurement manager (resin / plywood / paint plant) | Quick confirmation of product, CAS, packaging, documents, contact | Product pages with quick-facts table, COA/SDS info, inline quote form |
| Technical / QC head | Specification, SDS, handling | Quality page, safety callouts, “Request SDS” |
| Owner / MD of SME | Trust, responsiveness | Clean corporate design, clear process, WhatsApp/phone everywhere |
| Search engines / AI crawlers | Structured, crawlable content | SSG pages, metadata, JSON-LD, sitemap |

### A4. Competitor analysis

| | **Alfa Solvents** (alfasolvents.com) | **Hazel Mercantile / HML** (hmlindia.com) |
|---|---|---|
| Positioning | “North India’s Leading Petrochemical Distributor — since 1996” | Diversified international trade & distribution group |
| Stack / look | Modern WordPress theme, imagery-led | Dated Bootstrap theme (Poppins), icon-heavy |
| Navigation | About · Products ▾ · Industry Use ▾ · Logistics · Blog · Contact · Enquire Now | Deep mega-menu (About, Group, Business Verticals, Domains, Contact) using `javascript:void(0)` links |
| Homepage flow | Hero → About → Stats → Products → Why trust us → Industries → 5-step process → Logistics → Blog → CTA | Slider → Welcome → Strengths → Advantages → Verticals → Domains → Enquire |
| Product data | Card: CAS, formula, appearance, packaging; detail page: supply capabilities, industries, logistics, FAQ, quote CTAs | No product-level chemical data |
| Conversion | “Request a Quote” repeated after every section, floating WhatsApp, tag-based enquiry form | Single “Enquire Now” form, phone/email |
| Weaknesses observed | Placeholder/empty images, empty alt text, inconsistent product URLs, no breadcrumb, no HS code/SDS/safety info, unbacked “leading” claims | Empty meta description/keywords, TLS chain error, `javascript:` links (not crawlable), no product pages, no WhatsApp, weak mobile UX |

**What we adopt:** repeated, contextual quote CTAs · floating WhatsApp · CAS/formula on cards · 5-step process · industry tiles · per-product FAQ · logistics/supply storytelling.
**How we differentiate:**
1. Richer product pages — CAS, formula, MW, synonyms, HS code, physical form, packaging, transport class, applications, industries, documents, safety, FAQ, inline form, related products, breadcrumb, JSON-LD.
2. Honest, documentation-first positioning (COA/SDS/specification) — no unverifiable claims.
3. Premium navy/teal visual identity with motion design and real industrial photography (tanks, plants, tankers, drums, vessels).
4. Structured enquiry form that captures product, quantity, location and specification → higher-quality leads.
5. Technical excellence: static prerendering, image optimisation (AVIF/WebP), semantic HTML, WCAG 2.1 AA, crawlable links, valid metadata.

### A5. Information architecture / sitemap
```
/                                Home
/about                           About Us
/products                        Products listing
/products/phenol                 Product detail (SSG)
/products/paraformaldehyde       Product detail (SSG)
/products/formaldehyde           Product detail (SSG)
/products/methanol               Product detail (SSG)
/products/acetone                Product detail (SSG)
/products/other-chemicals        Other chemicals / requirement page
/industries                      Industries (anchors: #resins-adhesives …)
/sourcing-supply                 Sourcing & Supply
/quality                         Quality & Documentation
/contact                         Contact + Request a Quote (?product=slug&type=bulk)
/privacy-policy  /terms-and-conditions  /disclaimer
/sitemap.xml  /robots.txt  /manifest.webmanifest  /opengraph-image
```

### A6. Functional requirements
| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Global header with nav, products mega-menu, “Request a Quote” button; sticky with background change on scroll | Must |
| FR-02 | Mobile full-screen menu with products accordion and Call / WhatsApp / Quote actions | Must |
| FR-03 | Footer with brand, quick links, products, contact, legal links | Must |
| FR-04 | Home page with all sections in content §2 | Must |
| FR-05 | Product listing + five SSG product detail pages driven by one data file | Must |
| FR-06 | Product detail inline enquiry form with product pre-selected | Must |
| FR-07 | `/contact?product={slug}` pre-selects the product; `?type=bulk` pre-fills a bulk note | Must |
| FR-08 | Enquiry form: client validation, honeypot spam field, server-side re-validation, delivery by email, success & failure states | Must |
| FR-09 | Failure / not-configured fallback: one-click WhatsApp and mailto with the enquiry pre-composed (no lead lost) | Must |
| FR-10 | Click-to-call (`tel:`), WhatsApp (`wa.me`) and `mailto:` links site-wide from one config | Must |
| FR-11 | Floating WhatsApp (desktop) + sticky action bar (mobile) | Should |
| FR-12 | Industries page with anchors and product cross-links | Must |
| FR-13 | Breadcrumbs on all inner pages (+ BreadcrumbList JSON-LD) | Must |
| FR-14 | FAQ accordions (home + product pages) | Should |
| FR-15 | Legal pages and custom 404 | Must |
| FR-16 | sitemap.xml, robots.txt, web manifest, dynamic Open Graph image, favicon | Must |

### A7. Non-functional requirements
| Area | Requirement |
|---|---|
| Performance | Lighthouse ≥ 90 (mobile) for Performance, ≥ 95 Accessibility/SEO/Best Practices. LCP < 2.5 s on 4G; CLS < 0.05. All pages statically prerendered. Hero image preloaded; all others lazy with blur placeholders. |
| Responsiveness | Fluid from 320 px to 2560 px. Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`. No horizontal scroll at any width. Touch targets ≥ 44 px. |
| Accessibility | WCAG 2.1 AA: contrast ≥ 4.5:1 body text, visible focus rings, skip-link, semantic landmarks, labelled form fields with `aria-describedby` errors, keyboard-operable menus/accordions, `prefers-reduced-motion` honoured (animations reduced to opacity or disabled; smooth scroll disabled). |
| SEO | Unique title/description per page, canonical URLs, OG/Twitter tags, JSON-LD (Organization, WebSite, Product, BreadcrumbList, FAQPage), descriptive alt text, crawlable `<a href>` links only. |
| Security | Server-side validation and length limits; honeypot; escape all user content in emails; secrets only in env vars; no client exposure of API keys; JSON-LD sanitised (`<` → `<`); security headers (X-Content-Type-Options, Referrer-Policy, X-Frame-Options, Permissions-Policy). |
| Browser support | Chrome/Edge/Firefox 111+, Safari 16.4+ (Next.js 16 baseline). |
| Maintainability | All copy in `content/*.ts`; all contact data in `lib/site.ts`; strongly typed data; reusable components. |

### A8. Technology stack
| Layer | Choice |
|---|---|
| Framework | **Next.js 16.4 (App Router)** — `cacheComponents` + `partialPrefetching` enabled; Turbopack |
| UI | React 19.3, TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 (`@theme` tokens in `app/globals.css`), `clsx` + `tailwind-merge` (`cn()`), `class-variance-authority` for button variants |
| Motion | **Zero animation libraries.** CSS keyframes (hero entrances), CSS transitions, CSS scroll-driven animations (`animation-timeline: view()/scroll()` — parallax, progress bar, process line, quote, document fan-out) and one inline IntersectionObserver boot script (reveals, molecule drawing). Native smooth scrolling. |
| Icons | `lucide-react` 1.x (+ custom WhatsApp SVG; brand icons are not in lucide v1) |
| Fonts | Self-hosted via `next/font/local`, subset to the glyphs used: **Montserrat** variable (display, 24 KB), **Inter** variable (body, 28 KB); technical labels use the system monospace stack |
| Images | Server-rendered `<Img>` built on `getImageProps` (AVIF/WebP srcset, lazy by default, no hydration cost); hero photos art-directed to ≥1024 px only (`<picture>`), `qualities: [70, 75, 85]` |
| Forms | Client component + React Server Action (`lib/actions/enquiry.ts`) |
| Email | Transactional email API via `fetch` (Resend-compatible REST, env `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`). Provision via Vercel Marketplace (Messaging category) at deployment |
| Hosting | Vercel (recommended) — static assets on CDN, server action on Fluid Compute (Node.js) |

**Cache Components rules applied:** no `searchParams` / `cookies()` / `headers()` / `new Date()` in server components (keeps every route fully static). URL query values are read client-side after mount. Copyright year is a constant.

### A9. Project structure
```
app/
  layout.tsx            Root layout: fonts, metadata, providers, header/footer, JSON-LD
  globals.css           Tailwind v4 + design tokens + utilities + keyframes
  page.tsx              Home
  about/ products/ products/[slug]/ products/other-chemicals/
  industries/ sourcing-supply/ quality/ contact/
  privacy-policy/ terms-and-conditions/ disclaimer/
  not-found.tsx  sitemap.ts  robots.ts  manifest.ts  opengraph-image.tsx  icon.svg
components/
  layout/   header, mega-menu, mobile-menu, top-bar, footer, floating-actions, scroll-progress
  sections/ home + shared page sections (hero, process, cta, faq, …)
  ui/       button, container, section-heading, reveal, split-text, counter, marquee, badge, breadcrumb, accordion
  molecules/ animated SVG chemical structures
  forms/    enquiry-form
  providers/ smooth-scroll (Lenis + GSAP), motion-config
content/    products.ts industries.ts services.ts process.ts faqs.ts navigation.ts pages.ts
lib/        site.ts (contact config) · images.ts (image registry) · utils.ts · seo.ts · validation.ts · actions/enquiry.ts
assets/images/  optimised source photography
docs/       this documentation
```

### A10. Enquiry flow (sequence)
```
User fills form ─► client validation (instant, inline errors)
               ─► Server Action submitEnquiry(FormData)
                   ├─ honeypot filled? → return ok (silently drop)
                   ├─ re-validate & normalise (lengths, email, phone, product)
                   ├─ email provider configured? ── yes → POST provider API (HTML + text, reply-to = customer)
                   │                                       ├─ 2xx → { ok: true }
                   │                                       └─ error → { ok:false, reason:"delivery" }
                   └─ not configured → dev: log + ok · prod: { ok:false, reason:"not_configured" }
UI: ok → animated success card · fail → fallback card with pre-composed WhatsApp + mailto links
```

### A11. Acceptance criteria
1. Every route returns 200 and is prerendered (`○`/`●` in `next build` output).
2. `next build` and `eslint` pass with zero errors.
3. All nav, footer and CTA links resolve (no 404s); unknown `/products/foo` → custom 404.
4. Form: empty submit shows all required errors; valid submit shows success (dev) / sends email (prod with env).
5. Layout verified at 375 px, 768 px, 1280 px, 1920 px with no horizontal overflow.
6. With `prefers-reduced-motion: reduce`, no parallax/scroll-scrub animations run.
7. Each page has unique `<title>`, description, canonical and OG image.

---

## PART B — DESIGN SYSTEM

### B1. Design direction
**“Bright, established international trading house” — light theme (revised v1.1).**
The site is fully light: white and soft mist/sky surfaces, deep-blue text (never black), teal as the signal colour, and real industrial photography that *fades into white* behind copy instead of dark overlays. Near-black surfaces are not used anywhere (client direction, Oct 2026). Chemistry is expressed through precise teal line-art molecular structures and technical mono labels (CAS, formula).

Keywords: *bright · precise · calm · global · trustworthy*.

### B2. Colour tokens (v1.2 — professional blue + soft-blue surfaces)
| Token | Hex | Use |
|---|---|---|
| `ink` | `#0F2A4F` | Headings & strong text (deep navy-blue — never black) |
| `body` | `#475A78` | Body text (≥ 7:1 on white) |
| `muted` | `#5F6F88` | Captions, meta (≥ 4.6:1 on white — WCAG AA) |
| `line` | `#DFE8F4` | Borders |
| `white` | `#FFFFFF` | Base surface |
| `mist` | `#F4F8FE` | Alternate sections, footer |
| `sky` | `#EAF2FD` | Supply band |
| `brandwash` | `#E8F1FE` | Icon tiles, soft buttons, chips |
| `brand-50 / 100 / 200` | `#F2F7FF / #E3EEFE / #C7DCFD` | Soft-blue tints |
| `brand-300 / 400 / 500` | `#9CC3FB / #5B9BF5 / #2F7DED` | Glows, dots, lines, accents |
| `brand-600 / 700` | `#1E63D6 / #174EAD` | Primary buttons (white text, AA), links, eyebrows |
| `amber-400` | `#F5A524` | Safety callouts only |

Surfaces: `surface-soft` (white → soft-blue gradient with light glows), `surface-blue` (pale blue gradient for CTA/quality/enquiry panels). Glows are cheap radial gradients (no CSS `blur()` filters). Primary button: `brand-600 → brand-700` gradient, white text.

### B3. Typography
| Role | Font | Size (mobile → desktop) | Weight / tracking |
|---|---|---|---|
| Display (hero H1) | Montserrat | `clamp(2.5rem, 6vw, 5.25rem)` / lh 1.02 | 700, −0.035em |
| H1 inner pages | Montserrat | `clamp(2.25rem, 5vw, 4rem)` / 1.05 | 700, −0.03em |
| H2 | Montserrat | `clamp(1.875rem, 3.6vw, 3rem)` / 1.1 | 700, −0.025em |
| H3 | Montserrat | 1.25–1.5rem | 600, −0.01em |
| Eyebrow | Inter | 0.75rem uppercase | 600, +0.18em, teal, with 24 px leading line |
| Body L | Inter | 1.125–1.25rem / 1.7 | 400 |
| Body | Inter | 1rem / 1.7 | 400 |
| Technical label | JetBrains Mono | 0.75–0.8125rem | 500, +0.04em (CAS, formula, HS) |

### B4. Spacing, radius, elevation
- 4 px base grid. Section padding: `py-20 md:py-28 lg:py-32`. Container: `max-w-7xl` (1280 px) + `px-4 sm:px-6 lg:px-8`; wide hero container `max-w-[1440px]`.
- Radius: `sm 8` (inputs), `md 12` (chips), `lg 16` (cards), `xl 24` (feature panels), `full` (pills, buttons).
- Shadows: `card` `0 1px 2px rgba(11,19,36,.04), 0 12px 32px -12px rgba(11,19,36,.12)`; `lift` `0 30px 60px -20px rgba(11,19,36,.25)`; `glow` `0 0 0 1px rgba(47,199,180,.35), 0 20px 50px -15px rgba(47,199,180,.35)`.
- Borders: 1 px `line` on light; `white/10` on dark.

### B5. Core components
| Component | Spec |
|---|---|
| **Button** | Variants: `primary` (teal-600→700 gradient, white text, arrow slides 4 px), `soft` (tealwash bg, teal-700 text), `outline` (white bg, ink/15 border), `glass` (white/75 frosted), `white`, `whatsapp`, `link`. Sizes sm 36 / md 44 / lg 52 px, rounded-full, icon slot. Focus ring 2 px teal-400 offset 2. |
| **Eyebrow** | Teal line (24 px) + uppercase label. |
| **SectionHeading** | Eyebrow + H2 + lead, align left/center, light/dark tone. Words of H2 reveal with stagger. |
| **ProductCard** | White card, 1 px line, molecule SVG top-left on mist tile, CAS mono chip top-right, name H3, formula mono, description (2 lines), 3 application tags, footer actions. Hover: lift −6 px, teal border glow following the cursor (CSS radial gradient via `--mx/--my`), molecule redraw. |
| **IndustryTile** | Photo with navy gradient, index number, title; hover: image scale 1.06, description slides up, arrow appears. |
| **ProcessStep** | Big mono number, title, text, connector line; active state teal. |
| **DocCard** | Paper-like card with document icon, title, helper text; stacked with slight rotation on the home highlight. |
| **Accordion** | Bordered rows, plus→minus icon rotation, height animation (motion). |
| **Breadcrumb** | Mono small caps on dark hero, `/` separators. |
| **PageHero** | Inner-page hero: photo + navy overlay, breadcrumb, eyebrow, H1, lead, optional actions; height `min-h-[62vh]` desktop, auto mobile. |
| **CTA Band** | Pale teal-gradient panel, light grid, photo fading in from the right, heading, text, 3 buttons. |
| **Form fields** | 48 px height, rounded-xl, 1 px line border, focus teal ring, floating error text in red-600 with icon, labels above. |
| **Molecule** | Inline SVG line-art (stroke 2, round caps) — benzene ring + OH for Phenol, etc.; atoms as small circles with element letters; draws in with `pathLength`. |

### B6. Iconography & imagery
- Lucide icons, 1.5 stroke, inside 44–48 px rounded squares (`teal-500/10` on light, `white/5` on dark).
- Photography treatment: navy gradient overlays (≥ 55% opacity at text side), slight desaturation on secondary images, `object-cover`, rounded-2xl, subtle grain.
- Decorative layers: thin hex-grid / dot-grid SVG patterns at 4–8% opacity, teal radial glows.

---

## PART C — PAGE-BY-PAGE LAYOUT SPECIFICATION

> D = desktop (≥1024), T = tablet (768–1023), M = mobile (<768).

### C0. Global chrome
- **Top bar** (D only, 36 px, mist/90 frosted, body text, teal icons): hours · phone · email | descriptor · WhatsApp. Collapses when the header becomes sticky.
- **Header** (72 px): frosted white/55 over the light heroes → on scroll > 24 px becomes `white/85` with `backdrop-blur-xl`, soft shadow and `line` border; ink nav text, teal-700 active. Logo left (DS monogram tile + wordmark), nav centre, “Request a Quote” right. Hides on scroll down after 400 px, reappears on scroll up (motion).
- **Mega-menu** (Products): 2-column panel 760 px wide — left grid of 5 products (molecule mini-icon, name, CAS mono), right feature card (Other Chemicals). Opens on hover/focus with fade + 8 px rise, 180 ms; closes on Escape/blur.
- **Mobile menu**: full-screen light `surface-soft` overlay, links stagger in (60 ms), products accordion, bottom actions. Body scroll locked, Lenis stopped.
- **Scroll progress**: 2 px teal gradient bar at the very top.
- **Floating WhatsApp** (D/T): 56 px green circle bottom-right with soft pulse ring; tooltip on hover.
- **Mobile action bar** (M): fixed bottom, 3 equal buttons, appears after 60 vh scroll, `safe-area-inset-bottom` padding.

### C1. Home
1. **Hero** — 100svh (min 640). Background photo (blue-hour refinery) with Ken Burns scale 1.12→1 over 2.4 s and scroll parallax (y +18%). Overlay gradient left→right. Content left-aligned in 7/12 columns: eyebrow, sub-eyebrow, H1 (two lines, second line teal gradient text; lines reveal from a mask, 90 ms stagger), lead, buttons, chips. Right side (D): glass “molecule card” — animated phenol structure drawing in, label `C₆H₅OH · CAS 108-95-2`, small floating spec rows. Bottom: scroll cue + ticker marquee (mono, white/60, separators ◆, 40 s loop, pauses on hover). M: content stacked, molecule card hidden, buttons full width.
2. **Capability strip** — overlapping the hero bottom on D (−mt-16), 4 cards in a white rounded-3xl panel with dividers; M: 2×2 grid → 1 column on <400 px.
3. **About intro** — 2 columns: left image collage (large tank image + smaller drums image offset, floating badge card), right text + checklist + link. Images parallax at different speeds. M: image first, then text.
4. **Key facts** — 4 counters in a row on mist background, numbers in Montserrat 64 px with teal suffix, count-up on view.
5. **Products** — heading row (heading left, “View All” right), grid 3 columns (D), 2 (T), 1 (M); 6 cards (5 products + Other). Cards stagger in (80 ms).
6. **What we do** — light `surface-soft` section, white bento cards: 1 large card (Chemical Trading with tanker photo) + 4 smaller; numbers 01–05; hover border glow.
7. **Industries** — 4×2 grid of image tiles (D), 2 columns (T), horizontal snap-scroll carousel (M) with peek of next card.
8. **Process** — 5 steps horizontal on D with a connecting line that fills (GSAP ScrollTrigger scrub) as the section scrolls into view; each node lights up teal when reached. T/M: vertical timeline with line on the left.
9. **Quality highlight** — pale teal `surface-teal` section, left text + link, right stacked document cards (5) fanned out with rotation; on scroll they spread apart.
10. **Commitment statement** — large centred quote (Montserrat 40–56 px), words fade from 15% to 100% opacity as the user scrolls (scroll-linked).
11. **Global band** — full-bleed container-ship photo (parallax), navy overlay, text left, 3 mini-points.
12. **FAQ** — 2 columns: left heading + contact prompt, right accordion.
13. **Final CTA** — CTA Band (light teal) with storage-tank photo.

### C2. About
PageHero (storage tanks, light wash) → Who we are (text left, image + value chips right) → Vision & Mission (two cards: Vision on pale teal gradient with large quote mark; Mission white with numbered checklist) → What we do (5 numbered rows, hover reveals teal line) → How we work (3×2 principles grid with icons) → Commitment (split: handshake image + statement) → CTA Band.

### C3. Products listing
PageHero (stainless pipework) → availability callout → catalogue rows: alternating layout (molecule panel left/right) on D, stacked on M; each row shows mono data strip (CAS · Formula · HS) → “Information available” strip (8 checklist chips) → Other Chemicals panel (pale teal, industrial-complex photo fading in from the right) → CTA.

### C4. Product detail (template)
- **Hero** (light, photo wash): breadcrumb, category line, H1 (product name, 64–80 px), CAS chip, intro, buttons; right side: large animated molecule in a frosted white panel with formula and MW; background: product photo on the right fading into white.
- **Quick facts**: definition-list table in a white card overlapping hero (−mt-12), 2 columns on D.
- **Applications**: 3-column icon cards.
- **Supply + Available information**: split — left supply paragraph with photo, right checklist card.
- **Industries**: chip links.
- **Safety & Handling**: amber-bordered callout with TriangleAlert icon.
- **Enquiry**: 2 columns — left “Need {Product}?” text + contact options, right form card.
- **FAQ** accordion, **Related products** (4 cards).

### C5. Other Chemicals
PageHero (industrial complex) → “What to include” checklist card + 3-step mini process → full form.

### C6. Industries
PageHero (port) → intro → 8 industry rows alternating image/text (D) with index number, description and “Relevant products” chips; sticky side index on D (xl) highlighting the current industry → CTA “Looking for a specific chemical?”.

### C7. Sourcing & Supply
PageHero (tank farm aerial, light wash) → intro + 4 challenge cards → **Process**: sticky left column (heading + progress) with steps scrolling on the right (D); vertical on M → Bulk requirements (white panel: checklist + CTA “Request Bulk Quote”) → Supply models (3 cards) → Packaging (4 icon tiles + container-terminal image) → CTA.

### C8. Quality & Documentation
PageHero (stainless vessel) → documentation grid (3×2 doc cards) → specifications (7 pill chips + explanatory text, mist panel) → Responsible handling (warm amber-to-sky light panel with 4 white icon cards) → CTA “Request COA / SDS”.

### C9. Contact
PageHero (compact, 50vh, plant at night) → 12-col grid: form card (7 cols) + sticky info column (5 cols): contact card (phone, email, address, hours, WhatsApp — each row icon + label + value, hover teal), Quick Enquiry card (Call / WhatsApp buttons), response note. M: form first, info after.

### C10. Legal & 404
Legal: compact hero + prose column (max-w-3xl) with numbered headings. 404: full-height dark page, giant outline “404”, drifting molecule, two buttons.

---

## PART D — MOTION SYSTEM

### D1. Principles
Motion should feel **engineered and calm**: short distances (8–24 px), expo-out easing, nothing bouncy. Motion communicates hierarchy (headline → lead → actions) and progress (process line, counters).

| Token | Value |
|---|---|
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| Durations | micro 150 ms · UI 250 ms · reveal 700–900 ms · hero 1200 ms |
| Stagger | 60–90 ms |

### D2. Library responsibilities
- **Lenis** — global smooth scroll (lerp 0.1), disabled for reduced motion and on touch devices’ native momentum (`syncTouch: false`); drives `ScrollTrigger.update`; `gsap.ticker` runs Lenis RAF.
- **GSAP + ScrollTrigger** — scroll-scrubbed timelines: process line fill and node activation, hero parallax.
- **Motion** — enter/exit and state animation: reveals (`whileInView`, once, 15% margin), word-split headings, mega/mobile menus (`AnimatePresence`), accordion height, counters, header hide/show, form state transitions, molecule `pathLength` drawing, scroll-linked quote words (`useScroll` + `useTransform`).
- **CSS** — marquee, pulse ring, gradient sheen, hover lifts, cursor-follow glow.

### D3. Animation inventory
| Element | Trigger | Animation |
|---|---|---|
| Hero image | load + scroll | scale 1.12→1 (2.4 s), translateY 0→18% scrubbed |
| Hero H1 lines | load | y 110%→0 inside overflow-hidden mask, 1.0 s, stagger 0.09 |
| Hero lead/buttons/chips | load | fade + y 16→0, delays 0.5/0.65/0.8 s |
| Molecule | in view | bonds draw `pathLength 0→1` (1.6 s), atoms scale-in |
| Ticker | always | translateX loop 40 s linear (paused on hover / reduced motion) |
| Section headings | in view | words y 40%→0 + fade, stagger 0.04 |
| Cards / tiles | in view | fade + y 28→0, stagger 0.08 |
| Counters | in view | 0→value over 1.6 s, expo-out |
| Process line | scroll | scaleX 0→1 scrubbed; nodes switch to teal at thresholds |
| Doc stack | scroll | rotation/offset spreads as section progresses |
| Quote words | scroll | opacity 0.15→1 per word across section progress |
| Header | scroll | bg/blur on >24 px; hide on down-scroll >400 px |
| Buttons | hover | arrow x +4 px; primary bg lighten; 200 ms |
| Product card | hover | y −6 px, shadow lift, teal border glow follows cursor |
| Industry tile | hover | image scale 1.06 (700 ms), description reveal |
| Floating WhatsApp | idle | pulse ring every 2.5 s |
| Page change | navigation | content fade-up 400 ms (template) & scroll reset |

### D4. Reduced motion
`MotionConfig reducedMotion="user"` · Lenis not initialised · GSAP timelines skipped via `matchMedia` · marquee and pulses stopped via CSS media query · content always visible (no opacity-0 dead ends).

---

## PART E — SEO & STRUCTURED DATA
- `metadataBase` from `NEXT_PUBLIC_SITE_URL` (fallback `https://www.dsglobalventures.com`).
- Title template: `%s | DS Global Ventures`; per-page titles/descriptions per content doc.
- Canonical on every page; OG image generated at `/opengraph-image` (1200×630, navy + molecule + tagline).
- JSON-LD: `Organization` + `WebSite` (layout), `Product` with `additionalProperty` (CAS, formula, HS) and `BreadcrumbList` (product pages), `FAQPage` (home & products), `BreadcrumbList` (inner pages).
- `sitemap.ts` lists all static routes and product slugs with priorities; `robots.ts` allows all and references the sitemap.

---

## PART F — DEPLOYMENT & OPERATIONS
1. `npm run build` → verify all routes static.
2. Deploy to Vercel; set `NEXT_PUBLIC_SITE_URL`.
3. Provision email: `vercel link` → `vercel integration discover --category messaging` → `vercel integration add <provider>` → `vercel env pull`. Set `ENQUIRY_TO_EMAIL` (inbox receiving leads) and `ENQUIRY_FROM_EMAIL` (verified sender domain).
4. Replace placeholders in `lib/site.ts`; replace logo mark if a brand logo is provided.
5. Submit sitemap in Google Search Console; verify rich results.

### F1. Image credits (Unsplash Licence)
| File | Photographer |
|---|---|
| hero-refinery-blue-hour, refinery-blue-dusk | mos design |
| plant-night-gold | PilMo Kang |
| refinery-night-moon | American Public Power Association |
| storage-tanks-sky | Bruno Guerrero |
| stainless-tanks-mono | Richard Williams |
| tank-farm-aerial | Kay Mayer |
| tanker-trucks | Jason Mitrione |
| tanker-truck-depot | Zemos |
| blue-chemical-drums | engin akyurt |
| chemical-sacks-pallets | Mark Owen Wilkinson Hughes |
| tanker-ship-aerial | Shaah Shahidh |
| container-ship-teal | Venti Views |
| port-container-ship | william william |
| container-terminal | Ali Mkumbwa |
| warehouse-forklift | AFINIS Group |
| handshake-documents | Amina Atar |
| stainless-process-plant, stainless-pipework, stainless-vessel | Crystal Kwok |
| plywood-layers | LUCIA LU |
| wood-veneer | Tim Meyer |
| paint-tubs | Ximena Balderas |
| petrochemical-plant | Julia Taubitz |
| industrial-complex | Hazel J |
| pharma-production | Walter Otto |
| polymer-pellets | Alexander Grey |
| construction-site-dusk | Samuel Regan-Asante |
| textile-mill | Prince Prabhakaran |


---

## PART G — PERFORMANCE ENGINEERING (v1.2)

Measured with Lighthouse 12 against the production build (`next build && next start`).

| Page | Mobile (Perf / A11y / BP / SEO) | Desktop |
|---|---|---|
| Home | 93 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| About | 94 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Products | 94 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Phenol (product) | 94 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Industries | 94 / 100 / 100 / 100 | 99 / 100 / 100 / 100 |
| Sourcing & Supply | 95 / 100 / 100 / 100 | 99 / 100 / 100 / 100 |
| Quality | 94 / 100 / 100 / 100 | 99 / 100 / 100 / 100 |
| Contact | 95 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |

CLS = 0 on every page. Observed (unthrottled) LCP 0.4–0.65 s.

Rules that keep it there:
1. **No client-side animation libraries.** Use CSS (keyframes, transitions, scroll-driven animations) and the boot script attributes `data-reveal`, `data-stagger`, `data-words`, `data-draw`.
2. **Client components only where interaction is needed** (header, menus, accordion, form, counter, industry index). Use `@/lib/cx` (clsx) in client components; `cn` (tailwind-merge) stays server-side.
3. **Images:** use `<Img>` (`components/ui/img.tsx`); never import static images with blur placeholders; hero photos `desktopOnly`.
4. **Above-the-fold text is never hidden behind JavaScript** (hero entrances are CSS and the LCP paragraph is not animated).
5. **`content-visibility: auto`** on every section except `[data-hero]`.
6. CSS is inlined (`experimental.inlineCss`); fonts self-hosted and subset.
7. Avoid position offsets based on a percentage of an element's height (layout shift) and avoid Suspense placeholders on fully static pages.
