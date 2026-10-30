# DS Global Ventures — Website Content Document

> **Document 1 of 2.** Single source of truth for every word that appears on the website.
> Companion document: [`02-SRS-AND-DESIGN.md`](./02-SRS-AND-DESIGN.md) (requirements, design system, page layouts, animation specs).
>
> | Item | Value |
> |---|---|
> | Company | DS Global Ventures |
> | Industry | Chemical Trading & Sourcing |
> | Primary focus | Industrial chemicals, chemical raw materials and intermediates |
> | Tagline | **Reliable Chemical Sourcing. Trusted Global Trade.** |
> | Descriptor line | Industrial Chemicals \| Chemical Raw Materials \| Sourcing \| Trading \| Supply |
> | Version | 1.0 — October 2026 |
>
> **Implementation note:** the website code reads all content from `content/*.ts` files that mirror this document. When copy changes, update this document first, then the matching file in `content/`.

---

## 0. Editorial rules (apply to every page)

1. **Tone:** calm, precise, corporate. Short sentences. Active voice. No hype words ("best", "No. 1", "leading", "world-class").
2. **Claims policy (mandatory):** Do **not** publish certifications (ISO, GMP, REACH etc.), manufacturer authorisations, distributorships, fixed grades, purity levels, regulatory approvals, client names, years in business or volume statistics unless DS Global Ventures holds supporting documentation. Numbers used on the site must be *countable facts from this document* (e.g. "5 core products", "8 industry sectors", "5-step process").
3. **Availability language:** product information is always qualified with "subject to availability", "as applicable", or "according to agreed specifications".
4. **Safety language:** every product page carries a Safety & Handling note pointing to the SDS.
5. **Spelling:** Indian/British English (specialise, colour, enquiry, catalogue). Units: kg, MT (metric tonnes), KL (kilolitres).
6. **CTA vocabulary (use consistently):** "Request a Quote", "Request {Product} Quote", "Send Your Requirement", "Request Bulk Quote", "Call Now", "WhatsApp Us", "View Product Details".
7. **Placeholders** (must be replaced before go-live — all live in `lib/site.ts`):
   `[PHONE NUMBER]`, `[WHATSAPP NUMBER]`, `[EMAIL ADDRESS]`, `[OFFICE ADDRESS]`, `[GSTIN — optional]`, `[DOMAIN]`.

---

## 1. Global elements

### 1.1 Top utility bar (desktop only)
- Left: `Mon – Sat · 9:30 AM – 6:30 PM` · `[PHONE NUMBER]` · `[EMAIL ADDRESS]`
- Right: `Industrial Chemicals & Raw Materials` · `WhatsApp`

### 1.2 Main navigation
```
HOME
ABOUT US
PRODUCTS ▾
   → Phenol                 CAS 108-95-2
   → Paraformaldehyde       CAS 30525-89-4
   → Formaldehyde           CAS 50-00-0
   → Methanol               CAS 67-56-1
   → Acetone                CAS 67-64-1
   → Other Chemicals        Send your requirement
INDUSTRIES
SOURCING & SUPPLY
QUALITY
CONTACT
                                   [ REQUEST A QUOTE ]   (top-right button)
```

**Products mega-menu feature card**
- Eyebrow: `Can't find your chemical?`
- Text: `Our portfolio can be expanded to your requirement. Share the product name, specification and quantity.`
- Link: `Send Your Requirement →`

### 1.3 Mobile menu
- Same links (Products is an accordion).
- Bottom block: `Call Now` · `WhatsApp Us` · `Request a Quote`
- Footnote: `Mon – Sat · 9:30 AM – 6:30 PM`

### 1.4 Mobile sticky action bar (appears after scrolling past the hero)
`Call` · `WhatsApp` · `Get Quote`

### 1.5 Floating WhatsApp button (desktop)
- Tooltip: `Chat with us on WhatsApp`
- Pre-filled message: `Hello DS Global Ventures, I would like to enquire about an industrial chemical requirement.`

### 1.6 Footer
**Brand column**
- DS GLOBAL VENTURES
- Reliable Chemical Sourcing. Trusted Global Trade.
- Industrial Chemicals | Chemical Raw Materials | Sourcing | Trading | Supply

**Quick Links:** Home · About Us · Products · Industries · Sourcing & Supply · Quality · Contact

**Products:** Phenol · Paraformaldehyde · Formaldehyde · Methanol · Acetone · Other Chemicals

**Contact:** `[PHONE NUMBER]` · `[EMAIL ADDRESS]` · `[OFFICE ADDRESS]` · Mon – Sat, 9:30 AM – 6:30 PM

**Pre-footer CTA band**
- Heading: `Have a chemical requirement?`
- Text: `Share the product, specification, quantity and delivery location. Our team will get back to you with a suitable sourcing solution.`
- Buttons: `Request a Quote` · `WhatsApp Us`

**Bottom bar**
- `© 2026 DS Global Ventures. All Rights Reserved.`
- `Privacy Policy | Terms & Conditions | Disclaimer`
- Small print: `Product information on this website is indicative. Always refer to the supplier SDS and agreed specifications.`

---

## 2. HOME PAGE  (`/`)

**SEO**
- Title: `DS Global Ventures | Industrial Chemical Trading & Sourcing`
- Meta description: `DS Global Ventures supplies and sources industrial chemicals and raw materials — Phenol, Paraformaldehyde, Formaldehyde, Methanol and Acetone — for resin, plywood, paint, pharma and chemical manufacturers.`
- Keywords: industrial chemical supplier, chemical trading company, chemical sourcing, phenol supplier, paraformaldehyde supplier, formaldehyde supplier, methanol supplier, acetone supplier, chemical raw materials

### 2.1 Hero
- Eyebrow: `DS GLOBAL VENTURES`
- Sub-eyebrow: `Industrial Chemicals & Raw Materials`
- H1: **Reliable Chemical Sourcing.** **Trusted Global Trade.**
- Lead: `We supply and source industrial chemicals, chemical raw materials and intermediates — matched to your specification, quantity, packaging and delivery schedule.`
- Primary CTA: `Request a Quote`
- Secondary CTA: `Explore Products`
- Hero chips (small glass pills): `Specification-led sourcing` · `COA & SDS coordination` · `Bulk & recurring supply`
- Scroll cue: `Scroll`

**Trading ticker (marquee under the hero)**
`PHENOL · CAS 108-95-2` — `PARAFORMALDEHYDE · CAS 30525-89-4` — `FORMALDEHYDE · CAS 50-00-0` — `METHANOL · CAS 67-56-1` — `ACETONE · CAS 67-64-1` — `OTHER CHEMICALS · ON REQUEST`

### 2.2 Capability strip (4 pillars)
| Icon | Title | Text |
|---|---|---|
| Target | Specification-Led | We start with your grade, purity, packaging and application — not a price list. |
| FileCheck | Documentation Support | COA, SDS/MSDS and specification sheets coordinated as applicable. |
| Boxes | Bulk & Recurring Supply | One-time, monthly or contract quantities for industrial buyers. |
| Headset | Responsive Coordination | One point of contact from enquiry to dispatch and delivery. |

### 2.3 About intro
- Eyebrow: `About DS Global Ventures`
- H2: `Connecting Reliable Chemical Sources with Industrial Buyers`
- Body 1: `DS Global Ventures is a chemical trading and sourcing company engaged in the supply of industrial chemicals, chemical raw materials and intermediates.`
- Body 2: `Our objective is simple — to make chemical procurement more reliable, transparent and efficient for industrial customers.`
- Checklist: `Technical specifications understood first` · `Quantity & packaging matched to your plant` · `Dispatch coordinated to your schedule`
- Link: `More About Us →`
- Image badge (floating card on the photo): `Reliable · Transparent · Efficient`

### 2.4 Key facts (animated counters — factual only)
| Value | Label |
|---|---|
| 05 | Core chemical products |
| 08 | Industry sectors served |
| 05 | Step sourcing process |
| 06 | Days a week support (Mon – Sat) |

### 2.5 Products showcase
- Eyebrow: `Our Products`
- H2: `Industrial Chemicals & Chemical Raw Materials`
- Intro: `A focused portfolio of high-demand industrial chemicals. Grade, specification, packaging and minimum order quantity vary by product and supply requirement.`
- Cards (one per product — see §4 for data): name, CAS No., formula, one-line description, 3 application tags, `View Details` + `Request Quote`.
- Sixth card — **Other Chemicals**: `Looking for a chemical that is not listed? Send us the product name, specification and quantity.` → `Send Your Requirement`
- Section link: `View All Products →`

### 2.6 What we do (services bento)
- Eyebrow: `What We Do`
- H2: `End-to-End Chemical Procurement Support`

| Service | Text |
|---|---|
| Chemical Trading | Supply of industrial chemicals and raw materials according to customer requirements. |
| Chemical Sourcing | Identification and procurement of products from suitable sources based on specification, quantity and destination. |
| Bulk Supply | Solutions for customers requiring commercial and industrial quantities. |
| Supply Coordination | Coordination of packaging, dispatch and delivery requirements. |
| Customer Support | Professional assistance from enquiry through order and delivery coordination. |

### 2.7 Industries preview
- Eyebrow: `Industries We Serve`
- H2: `Chemical Solutions for Diverse Industries`
- Intro: `Different industries have different chemical requirements. We work across multiple industrial sectors to source and supply suitable raw materials.`
- 8 image tiles (titles from §5) → link to `/industries#{slug}`
- Link: `Explore Industries →`

### 2.8 Sourcing process
- Eyebrow: `How We Work`
- H2: `A Clear, Five-Step Sourcing Process`
- Steps: see §6.2 (01 Requirement → 05 Supply).
- CTA: `Start With Your Requirement`

### 2.9 Quality & documentation highlight (dark section)
- Eyebrow: `Quality & Documentation`
- H2: `Product Information You Can Rely On`
- Body: `Chemical procurement requires accurate product information and appropriate documentation. We coordinate relevant documents with customers and suppliers as applicable to the product and transaction.`
- Document stack labels: `Certificate of Analysis (COA)` · `Safety Data Sheet (SDS/MSDS)` · `Product Specification` · `Packing Details` · `Batch Information`
- Link: `Quality & Documentation →`

### 2.10 Commitment statement (scroll-revealed quote)
> “Successful chemical trading is not only about price. It is about reliability, communication, product specifications, documentation and timely execution.”

- Attribution: `— Our Commitment, DS Global Ventures`

### 2.11 Global trade band (parallax ship image)
- Eyebrow: `Supply Coordination`
- H2: `From Enquiry to Delivery — Coordinated`
- Text: `Packaging, dispatch and delivery requirements are coordinated according to agreed terms, so your production schedule stays on track.`
- Three mini-points: `Drums, bags, IBCs & bulk options*` · `Domestic & international enquiries` · `Delivery-location based commercials`
- Footnote: `*Subject to product and availability.`

### 2.12 Home FAQ
1. **What products does DS Global Ventures supply?** — We currently focus on Phenol, Paraformaldehyde, Formaldehyde, Methanol and Acetone. Other industrial chemicals can be sourced on request, subject to feasibility.
2. **Do you supply bulk quantities?** — Yes. We work with commercial and industrial quantities, including regular monthly requirements. Share your quantity and schedule for a suitable sourcing solution.
3. **Can you provide COA and SDS?** — Relevant documentation such as COA and SDS/MSDS is coordinated as applicable to the product and transaction.
4. **How do I get a price?** — Prices depend on product, grade, quantity, packaging and delivery location. Send your requirement through the enquiry form, phone or WhatsApp.
5. **Which industries do you serve?** — Resins & adhesives, plywood & laminates, paints & coatings, chemical manufacturing, pharmaceutical, rubber & plastics, construction chemicals, textiles and other industries.

### 2.13 Final CTA
- H2: `Let’s Discuss Your Chemical Requirement`
- Text: `Looking for Phenol, Paraformaldehyde or another industrial chemical? Send us your requirement and our team will get in touch with you.`
- Buttons: `Request a Quote` · `Call Now` · `WhatsApp Us`

---

## 3. ABOUT US  (`/about`)

**SEO** — Title: `About Us | DS Global Ventures` · Description: `DS Global Ventures is a chemical trading and sourcing company making chemical procurement reliable, transparent and efficient for industrial customers.`

### 3.1 Page hero
- Breadcrumb: Home / About Us
- Eyebrow: `About DS Global Ventures`
- H1: `Connecting Reliable Chemical Sources with Industrial Buyers`
- Lead: `A chemical trading and sourcing company engaged in the supply of industrial chemicals, chemical raw materials and intermediates.`

### 3.2 Who we are
- H2: `Who We Are`
- `DS Global Ventures is a chemical trading and sourcing company engaged in the supply of industrial chemicals, chemical raw materials and intermediates.`
- `Our objective is simple — to make chemical procurement more reliable, transparent and efficient for industrial customers.`
- `We work with customers to understand their technical specifications, quantity requirements, packaging preferences and delivery schedules, and then coordinate suitable sourcing solutions.`
- Three value chips: `Reliable` · `Transparent` · `Efficient`

### 3.3 Vision & Mission
**Our Vision** — `To build DS Global Ventures into a trusted and professionally recognized chemical trading company with strong sourcing capabilities and long-term customer relationships.`

**Our Mission** — Our mission is to:
1. Provide reliable chemical sourcing solutions.
2. Develop strong and dependable supplier relationships.
3. Offer competitive commercial solutions.
4. Support customers with timely supply coordination.
5. Maintain professional standards in documentation and communication.
6. Build long-term relationships with customers and suppliers.

### 3.4 What we do
- H2: `What We Do` — five services (same copy as §2.6), each with icon and number 01–05.

### 3.5 How we work (principles)
| Principle | Text |
|---|---|
| Understand first | Specification, application, quantity and destination are clarified before sourcing begins. |
| Source responsibly | Supply options are identified from suitable sources based on the stated requirement. |
| Document properly | COA, SDS and specification documents are coordinated as applicable. |
| Communicate clearly | One point of contact and timely updates from enquiry to delivery. |
| Execute on time | Dispatch and delivery are coordinated according to agreed terms. |
| Build relationships | We value long-term partnerships with customers and suppliers over one-off transactions. |

### 3.6 Our commitment
- H2: `Our Commitment`
- `At DS Global Ventures, we believe that successful chemical trading is not only about price.`
- `It is about reliability, communication, product specifications, documentation and timely execution.`
- `We aim to create long-term value for our customers and suppliers through professional business practices and dependable service.`
- Signature: `DS GLOBAL VENTURES — Reliable Chemical Sourcing. Trusted Global Trade.`

### 3.7 CTA — `Work With DS Global Ventures` · `Request a Quote`

---

## 4. PRODUCTS

### 4.1 Products listing  (`/products`)

**SEO** — Title: `Products | Industrial Chemicals & Raw Materials | DS Global Ventures` · Description: `Phenol, Paraformaldehyde, Formaldehyde, Methanol, Acetone and other industrial chemicals sourced and supplied to your specification.`

- Breadcrumb: Home / Products
- Eyebrow: `Our Products`
- H1: `Industrial Chemicals & Chemical Raw Materials`
- Lead: `DS Global Ventures supplies and sources a range of industrial chemicals and chemical raw materials for customers across multiple industries.`
- Availability note (info callout): `Product availability, grade, specification, packaging and minimum order quantity may vary according to the product and supply requirement.`
- Each product = a large catalogue row: molecule illustration · name · CAS · formula · HS code · description · application list · `View Product Details` · `Request {Product} Quote`.
- Strip: **Information available with every enquiry** — Product grade · Purity/specification · Packaging · Quantity · COA · SDS/MSDS · Delivery location · Commercial terms
- Other chemicals block:
  - H2: `Other Chemicals`
  - `Our product portfolio can be expanded according to market requirements.`
  - `If you are looking for a specific industrial chemical that is not listed here, contact our team with the product name, required specification and quantity.`
  - CTA: `Send Your Requirement`

### 4.2 Product data (used by cards, listing and detail pages)

> Identifiers below are standard published chemical data. Physical form/packaging/transport class are **typical** and **indicative** — final values come from the supplier SDS/COA for the specific grade.

#### PHENOL — `/products/phenol`
| Field | Value |
|---|---|
| Category line | Industrial Chemical \| Chemical Raw Material |
| CAS No. | 108-95-2 |
| Molecular formula | C₆H₅OH (C₆H₆O) |
| Molecular weight | 94.11 g/mol |
| Synonyms | Carbolic acid, Hydroxybenzene, Benzenol |
| HS code (indicative) | 2907 11 |
| Typical physical form | Colourless to white crystalline solid; also handled in molten form |
| Typical packaging* | Drums, ISO tanks, bulk tankers |
| Transport (typical) | UN 1671 (solid) / UN 2312 (molten) · Class 6.1 (toxic) |

- Short description (cards): `An important industrial chemical used in phenolic resins, bisphenol-A and various chemical intermediates.`
- Detail intro: `Phenol is an important aromatic organic compound used extensively as a chemical raw material and intermediate in various industrial manufacturing processes.`
- Listing description: `Phenol is an important industrial chemical used in the manufacture of phenolic resins, bisphenol-A and various chemical intermediates.`
- Applications (detail): Phenolic resin manufacturing · Adhesives · Laminates · Bisphenol-A production · Chemical intermediates · Industrial chemical manufacturing
- Applications (listing): Phenolic resins · Adhesives · Laminates · Chemical intermediates · Industrial manufacturing
- Industries: Resins & Adhesives · Plywood & Laminates · Chemical Manufacturing · Rubber & Plastics
- Safety note: `Phenol is toxic and corrosive. It can be absorbed through the skin and cause severe burns. Handle only with appropriate PPE in well-ventilated areas, and review the SDS before handling, storage or transport.`
- CTA: `Request Phenol Quote`

#### PARAFORMALDEHYDE — `/products/paraformaldehyde`
| Field | Value |
|---|---|
| Category line | Industrial Chemical \| Formaldehyde Source |
| CAS No. | 30525-89-4 |
| Molecular formula | (CH₂O)ₙ — HO(CH₂O)ₙH |
| Molecular weight | Variable (polymer) |
| Synonyms | Paraform, Polyoxymethylene, Polymerised formaldehyde |
| HS code (indicative) | 2912 60 |
| Typical physical form | White crystalline powder, prills or flakes |
| Typical packaging* | Bags, jumbo bags |
| Transport (typical) | UN 2213 · Class 4.1 (flammable solid) |

- Short: `A polymeric form of formaldehyde used as a formaldehyde source in industrial and chemical manufacturing.`
- Detail intro: `Paraformaldehyde is a polymeric form of formaldehyde used as a solid formaldehyde source in various industrial and chemical manufacturing processes, where it offers convenient handling compared with aqueous formaldehyde.`
- Applications: Phenolic resins · Amino resins · Adhesives · Wood-panel industries · Chemical manufacturing
- Industries: Resins & Adhesives · Plywood & Laminates · Chemical Manufacturing · Construction Chemicals
- Safety note: `Paraformaldehyde is a flammable solid that releases formaldehyde gas. It is harmful if swallowed or inhaled and may cause skin sensitisation. Keep away from heat and ignition sources, avoid dust formation and review the SDS before use.`
- CTA: `Request Paraformaldehyde Quote`

#### FORMALDEHYDE — `/products/formaldehyde`
| Field | Value |
|---|---|
| Category line | Industrial Chemical \| Resin Raw Material |
| CAS No. | 50-00-0 |
| Molecular formula | CH₂O (HCHO) |
| Molecular weight | 30.03 g/mol |
| Synonyms | Methanal, Formalin (aqueous solution), Methyl aldehyde |
| HS code (indicative) | 2912 11 |
| Typical physical form | Clear, colourless aqueous solution with a pungent odour |
| Typical packaging* | Bulk tankers, IBCs, drums |
| Transport (typical) | UN 2209 (solution ≥25%) · Class 8 (corrosive) |

- Short: `An important chemical raw material for resins, adhesives and numerous industrial products.`
- Detail intro: `Formaldehyde is an important chemical raw material used in the manufacture of resins, adhesives and numerous industrial products. It is most commonly supplied as an aqueous solution (formalin).`
- Applications: Resin manufacturing · Adhesives · Plywood · Laminates · Chemical intermediates
- Industries: Resins & Adhesives · Plywood & Laminates · Chemical Manufacturing · Textiles & Other Industries · Construction Chemicals
- Safety note: `Formaldehyde is toxic, corrosive and a known sensitiser, and is classified as a carcinogen. Use with adequate ventilation and appropriate PPE, and review the SDS before handling, storage or transport.`
- CTA: `Request Formaldehyde Quote`

#### METHANOL — `/products/methanol`
| Field | Value |
|---|---|
| Category line | Industrial Solvent \| Chemical Feedstock |
| CAS No. | 67-56-1 |
| Molecular formula | CH₃OH (CH₄O) |
| Molecular weight | 32.04 g/mol |
| Synonyms | Methyl alcohol, Wood alcohol, Carbinol |
| HS code (indicative) | 2905 11 |
| Typical physical form | Clear, colourless liquid |
| Typical packaging* | Bulk tankers, ISO tanks, drums |
| Transport (typical) | UN 1230 · Class 3 (flammable liquid), subsidiary 6.1 |

- Short: `A versatile industrial chemical used as a solvent, feedstock and chemical intermediate.`
- Detail intro: `Methanol is a versatile industrial chemical used as a solvent, feedstock and chemical intermediate across a wide range of manufacturing processes, including formaldehyde production.`
- Applications: Chemical manufacturing · Solvents · Industrial processing · Chemical intermediates
- Industries: Chemical Manufacturing · Pharmaceutical Industry · Paints & Coatings · Resins & Adhesives
- Safety note: `Methanol is highly flammable and toxic if swallowed, inhaled or absorbed through the skin. Store away from ignition sources in approved containers and review the SDS before handling.`
- CTA: `Request Methanol Quote`

#### ACETONE — `/products/acetone`
| Field | Value |
|---|---|
| Category line | Industrial Solvent \| Chemical Raw Material |
| CAS No. | 67-64-1 |
| Molecular formula | (CH₃)₂CO (C₃H₆O) |
| Molecular weight | 58.08 g/mol |
| Synonyms | Propanone, Dimethyl ketone, 2-Propanone |
| HS code (indicative) | 2914 11 |
| Typical physical form | Clear, colourless, volatile liquid |
| Typical packaging* | Drums, IBCs, bulk tankers |
| Transport (typical) | UN 1090 · Class 3 (flammable liquid) |

- Short: `A widely used industrial solvent and chemical raw material.`
- Detail intro: `Acetone is a widely used industrial solvent and chemical raw material, valued for its strong solvency and fast evaporation in coatings, cleaning and chemical processing applications.`
- Applications: Solvents · Paints & coatings · Chemical processing · Industrial manufacturing
- Industries: Paints & Coatings · Chemical Manufacturing · Pharmaceutical Industry · Rubber & Plastics
- Safety note: `Acetone is highly flammable and its vapour can form explosive mixtures with air. It causes serious eye irritation. Keep away from heat and ignition sources and review the SDS before handling.`
- CTA: `Request Acetone Quote`

`*` Typical packaging = commonly used formats in the market, offered **subject to product and availability**.

### 4.3 Product detail page template (`/products/{slug}`)

Section order and copy pattern (example: Phenol):

1. **Breadcrumb:** Home / Products / Phenol
2. **Hero:** `PHENOL` · `Industrial Chemical | Chemical Raw Material` · CAS chip `CAS No. 108-95-2` · detail intro · buttons `Request a Quote` + `WhatsApp Enquiry` · animated molecule.
3. **Quick facts** (table from §4.2).
4. **Applications** — H2 `Applications` · `Phenol is commonly used in:` + application cards.
5. **Supply** — H2 `Supply` · `DS Global Ventures can source and supply Phenol according to customer requirements, subject to product availability and agreed specifications.`
6. **Available Information** — H2 `Available Information` · checklist: Product grade · Purity/specification · Packaging · Quantity · COA · SDS/MSDS · Delivery location · Commercial terms · Footer line: `For current availability and pricing, please contact our sales team.`
7. **Industries using Phenol** — chips linking to `/industries#…`.
8. **Safety & Handling** — amber callout with the product safety note + `Request SDS` link (opens enquiry with message “Please share the SDS for Phenol”).
9. **Inline enquiry form** — H2 `Need Phenol?` · `Send us your required quantity and delivery location.` · fields: Product (prefilled, locked), Quantity, Delivery Location, Requirement, Name, Company, Mobile, Email · button `Request a Quote`.
10. **Product FAQ** (pattern, product name substituted):
    - `What is {Product} used for?` → applications sentence.
    - `What is the CAS number of {Product}?` → `The CAS number of {Product} is {CAS}.`
    - `Can you provide COA and SDS for {Product}?` → `Yes — COA, SDS/MSDS and specification details are coordinated as applicable to the product and transaction.`
    - `What packaging options are available?` → `{Typical packaging}, subject to product and availability. Share your preferred packaging in the enquiry.`
    - `What is the minimum order quantity?` → `Minimum order quantity depends on the product, packaging and supply source. Share your requirement and we will confirm.`
11. **Related products** — the other four products.

### 4.4 Other Chemicals  (`/products/other-chemicals`)
- SEO — Title: `Other Industrial Chemicals — Send Your Requirement | DS Global Ventures`
- Eyebrow: `Other Chemicals`
- H1: `Looking for a Specific Industrial Chemical?`
- Lead: `Our product portfolio can be expanded according to market requirements. Tell us what you need — product name, required specification and quantity.`
- “What to include” list: Product name / CAS No. · Grade & specification · Quantity (one-time or monthly) · Packaging preference · Delivery location · Target timeline
- How it works (3 steps): `Share your requirement` → `We evaluate sourcing feasibility` → `We respond with a suitable option`
- Form: full enquiry form with Product = “Other”.
- Note: `Sourcing is subject to feasibility, specification and applicable regulations.`

---

## 4A. PRODUCT CATALOGUE  (`/product-catalog`)

**SEO** — Title: `Product Catalogue — COA & MSDS Documents | DS Global Ventures` · Description: `Browse specifications (COA) and material safety data sheets (MSDS) … View instantly or request a quotation.`

- Breadcrumb: Home / Products / Product Catalogue
- Eyebrow: `Product Catalogue` · H1: `Product Catalogue & Technical Documents`
- Lead: `Specifications (COA) and Material Safety Data Sheets (MSDS) for our product range. Open any document instantly, download it, or request a quotation in one click.`
- Stats: `13 Products · 18 Documents · 2 Doc types` · note `Documents open instantly in the built-in viewer — no download needed.`
- Toolbar: search (`Search product, CAS no. or application`), category chips (Resin Raw Materials · Solvents & Alcohols · Monomers · Glycols · Organic Acids · Waxes), document filter (All · COA · MSDS), `Showing X of 13 products`, empty state `No products match your search`.
- Product card: category · name · formula · MW · CAS chip · one-line summary · up to 3 key specs **taken from the product's own COA** · two document tiles (COA, MSDS) or `Available on request` tiles · `Request Quotation` · WhatsApp · `Product details` (core products).
- Viewer: document title, COA/MSDS tabs, zoom, page counter, Download, Open in new tab, `Request Quotation`, Close. Deep links: `/product-catalog#doc=<product>-coa|msds`, `/product-catalog#quote=<product>`.
- Quotation dialog: `Request a Quotation — <Product>` with the enquiry form (product pre-selected and locked).
- Info section `What You’ll Find in Each Document`: Specification / COA · Material Safety Data Sheet · Batch documents on request.

| Product | CAS | Documents |
|---|---|---|
| Phenol | 108-95-2 | COA (1 p) · MSDS (4 p) |
| Methanol | 67-56-1 | COA (1 p) · MSDS (5 p) |
| Mono Ethylene Glycol (MEG) | 107-21-1 | COA (1 p) · MSDS (5 p) |
| Styrene Monomer | 100-42-5 | COA (1 p) · MSDS (5 p) |
| Isopropanol (IPA) | 67-63-0 | COA (1 p) · MSDS (5 p) |
| Acetic Acid (Glacial) | 64-19-7 | COA (1 p) · MSDS (5 p) |
| Adipic Acid | 124-04-9 | MSDS (4 p) — COA on request |
| Melamine | 108-78-1 | COA (1 p) · MSDS (4 p) |
| Vinyl Acetate Monomer (VAM) | 108-05-4 | COA (1 p) — MSDS on request |
| Paraffin Wax | 8002-74-2 | COA (1 p) · MSDS (4 p) |
| Paraformaldehyde · Formaldehyde · Acetone | — | on request |

> **Client action:** the MSDS PDFs still contain the placeholders `[Registered office address]`, `[Phone number]` and `[Email address]` in Section 1 — replace them in the source documents and re-export.

---

## 5. INDUSTRIES  (`/industries`)

**SEO** — Title: `Industries We Serve | DS Global Ventures` · Description: `Chemical raw materials for resins & adhesives, plywood & laminates, paints & coatings, chemical manufacturing, pharmaceuticals, rubber & plastics, construction chemicals and textiles.`

- Eyebrow: `Industries We Serve`
- H1: `Chemical Solutions for Diverse Industries`
- Lead: `Different industries have different chemical requirements. DS Global Ventures works with customers across multiple industrial sectors to source and supply suitable chemical raw materials.`

| # | Slug | Industry | Description | Relevant products |
|---|---|---|---|---|
| 01 | resins-adhesives | Resins & Adhesives | Chemical raw materials for resin and adhesive manufacturing, including products used in phenolic and other resin systems. | Phenol, Paraformaldehyde, Formaldehyde, Methanol |
| 02 | plywood-laminates | Plywood & Laminates | Chemical raw materials used in the manufacture of plywood, laminates, wood panels and related products. | Formaldehyde, Phenol, Paraformaldehyde |
| 03 | paints-coatings | Paints & Coatings | Industrial solvents and chemical raw materials used in paints, coatings and surface-treatment applications. | Acetone, Methanol |
| 04 | chemical-manufacturing | Chemical Manufacturing | Raw materials and intermediates required for industrial chemical production. | Phenol, Formaldehyde, Methanol, Acetone, Paraformaldehyde |
| 05 | pharmaceutical | Pharmaceutical Industry | Selected chemical raw materials for industrial and manufacturing requirements, subject to applicable specifications and compliance requirements. | Methanol, Acetone |
| 06 | rubber-plastics | Rubber & Plastics | Chemical products and raw materials used across rubber and plastic manufacturing processes. | Phenol, Formaldehyde, Acetone |
| 07 | construction-chemicals | Construction Chemicals | Raw materials used in adhesives, coatings, sealants and other construction-related chemical products. | Formaldehyde, Paraformaldehyde, Acetone |
| 08 | textiles-other | Textiles & Other Industries | We also support chemical requirements across other industrial sectors based on product specifications and sourcing feasibility. | Formaldehyde, Methanol, Acetone |

- Closing CTA: H2 `Looking for a specific chemical?` · `Tell us what you need.` · `Send Your Requirement`

---

## 6. SOURCING & SUPPLY  (`/sourcing-supply`)

**SEO** — Title: `Chemical Sourcing & Supply | DS Global Ventures` · Description: `Your procurement partner for industrial chemicals — a clear five-step sourcing process and bulk supply solutions for industrial buyers.`

### 6.1 Hero & intro
- Eyebrow: `Chemical Sourcing & Supply`
- H1: `Your Procurement Partner for Industrial Chemicals`
- Lead: `Finding the right chemical at the right specification, quantity and commercial terms can be challenging.`
- Body: `DS Global Ventures works to simplify this process by connecting industrial buyers with suitable chemical supply sources.`
- Challenge cards (“Why procurement is hard”): `Specification match` · `Reliable sources` · `Commercial terms` · `Delivery coordination` — each answered by “How we help”.

### 6.2 Our sourcing process
| Step | Title | Text |
|---|---|---|
| 01 | Requirement | Share your product name, specification, quantity and delivery location. |
| 02 | Sourcing | We identify suitable supply options based on your requirement. |
| 03 | Specification | Product specifications and relevant documentation are reviewed as applicable. |
| 04 | Commercials | We work toward competitive commercial terms based on quantity, product and destination. |
| 05 | Supply | After confirmation of the order, dispatch and delivery coordination is carried out according to agreed terms. |

### 6.3 Bulk & industrial requirements
- H2: `Bulk & Industrial Requirements`
- `We understand that industrial customers may require regular or bulk quantities.`
- `For large-volume requirements, customers can contact our team with:` Product name · Required grade/specification · Monthly/one-time quantity · Packaging requirement · Delivery location · Required delivery schedule
- `Our team will evaluate the requirement and provide a suitable sourcing solution.`
- CTA: `Request Bulk Quote` (→ `/contact?type=bulk`)

### 6.4 Supply models
| Model | Text |
|---|---|
| One-time requirement | Spot purchase for a specific production run or project. |
| Regular / monthly supply | Planned quantities on an agreed schedule for continuous production. |
| Project / contract supply | Larger volumes coordinated across multiple dispatches. |

### 6.5 Packaging & dispatch (indicative)
`Drums` · `Bags & jumbo bags` · `IBCs` · `Bulk tankers / ISO tanks` — `Packaging options depend on product, grade and supply source.`

---

## 7. QUALITY & DOCUMENTATION  (`/quality`)

**SEO** — Title: `Quality & Documentation | COA, SDS & Specifications | DS Global Ventures` · Description: `COA, SDS/MSDS, product specifications and batch information coordinated as applicable — plus guidance on responsible chemical handling.`

- Eyebrow: `Quality & Documentation`
- H1: `Product Information You Can Rely On`
- Lead: `Chemical procurement requires accurate product information and appropriate documentation.`
- Body: `DS Global Ventures works with customers and suppliers to coordinate relevant product documentation as applicable to the product and transaction.`

### 7.1 Documentation
`Depending on the product and supply, relevant documentation may include:`
| Document | Helper text |
|---|---|
| Certificate of Analysis (COA) | Batch-wise test results against the agreed specification. |
| Safety Data Sheet (SDS/MSDS) | Hazards, handling, storage, PPE and emergency measures. |
| Product specification | Grade, purity / concentration and key parameters. |
| Packing details | Packaging type, net weight and marking information. |
| Batch information | Batch / lot identification for traceability. |
| Other documentation | Other applicable commercial or technical documentation. |

### 7.2 Product specifications
`Before finalizing a supply, customers can communicate their required:` Grade · Purity · Concentration · Packaging · Quantity · Application · Delivery location
`This allows us to identify a supply option appropriate to the stated requirement.`

### 7.3 Responsible chemical handling
- `Chemical products should be handled, stored and transported in accordance with applicable safety requirements, product documentation and applicable laws and regulations.`
- `Customers should review the relevant SDS and technical documentation before handling or using any chemical product.`
- Handling icons: `Read the SDS` · `Use appropriate PPE` · `Store as specified` · `Transport per regulations`

### 7.4 CTA — `Need documentation for a product?` · `Request COA / SDS`

---

## 8. CONTACT  (`/contact`)

**SEO** — Title: `Contact Us | Request a Quote | DS Global Ventures` · Description: `Send your chemical requirement to DS Global Ventures — product, quantity and delivery location — and our team will get in touch.`

- Eyebrow: `Contact DS Global Ventures`
- H1: `Let’s Discuss Your Chemical Requirement`
- Lead: `Looking for Phenol, Paraformaldehyde or another industrial chemical? Send us your requirement and our team will get in touch with you.`

### 8.1 Request a Quote form
| Field | Placeholder | Rules |
|---|---|---|
| Name* | Enter name | 2–80 chars |
| Company Name* | Enter company | 2–120 chars |
| Mobile Number* | Enter mobile | 7–15 digits, `+`, spaces allowed |
| Email Address* | Enter email | valid email |
| Product Required* | Select product | Phenol / Paraformaldehyde / Formaldehyde / Methanol / Acetone / Other Chemical |
| Required Quantity | Enter quantity (e.g. 20 MT / month) | optional, ≤ 80 chars |
| Delivery Location* | Enter location (city, state, country) | 2–120 chars |
| Message / Specification | Enter requirement — grade, purity, packaging, schedule | optional, ≤ 2000 chars |
| Consent (checkbox)* | `I agree to be contacted by DS Global Ventures regarding this enquiry.` | required |

- Submit button: `Submit Enquiry` (loading: `Sending…`)
- Validation messages: `Please enter your name.` · `Please enter your company name.` · `Please enter a valid mobile number.` · `Please enter a valid email address.` · `Please select a product.` · `Please enter the delivery location.` · `Please confirm we may contact you.`
- Success: **`Thank you — your enquiry has been received.`** `Our team will review your requirement and get back to you shortly. For urgent requirements, call or WhatsApp us.` · `Send another enquiry`
- Failure / not configured: `We couldn’t send your enquiry online right now.` `Please send the same details on WhatsApp or email — we have prepared the message for you.` · `Send via WhatsApp` · `Send via Email`

### 8.2 Contact information card
- DS GLOBAL VENTURES
- Phone: `[PHONE NUMBER]`
- Email: `[EMAIL ADDRESS]`
- Address: `[OFFICE ADDRESS]`
- Business Hours: `Monday – Saturday, 9:30 AM – 6:30 PM`
- WhatsApp: `[WHATSAPP NUMBER]`

### 8.3 Quick enquiry
- H3: `Quick Enquiry`
- `For urgent requirements, contact us directly by phone or WhatsApp.`
- Buttons: `Call Now` · `WhatsApp Us`

### 8.4 Response note
`We typically respond within one business day.` *(Only publish if the team can commit to it.)*

---

## 9. LEGAL PAGES

### 9.1 Privacy Policy (`/privacy-policy`)
1. **Introduction** — This Privacy Policy explains how DS Global Ventures (“we”, “us”) collects and uses information submitted through this website.
2. **Information we collect** — Information you provide in enquiry forms (name, company, mobile number, email, product requirement, quantity, delivery location and message) and basic technical data (browser type, pages visited) collected through standard server logs.
3. **How we use information** — To respond to enquiries, prepare quotations, coordinate supply, improve the website, and comply with legal obligations. We do not sell personal information.
4. **Sharing** — Information may be shared with suppliers, logistics partners or service providers only as necessary to respond to or fulfil your requirement, and where required by law.
5. **Retention** — Enquiry data is retained only as long as needed for the purposes above or as required by law.
6. **Security** — Reasonable technical and organisational measures are used to protect information. No internet transmission is completely secure.
7. **Your choices** — You may request access, correction or deletion of your information by writing to `[EMAIL ADDRESS]`.
8. **Cookies** — The website uses only essential cookies/storage required for it to function. If analytics is added later, this policy will be updated.
9. **Changes** — This policy may be updated from time to time. Last updated: October 2026.
10. **Contact** — `[EMAIL ADDRESS]` · `[OFFICE ADDRESS]`

### 9.2 Terms & Conditions (`/terms-and-conditions`)
1. **Use of website** — The website provides general information about DS Global Ventures and its products and services. By using it, you agree to these terms.
2. **No offer** — Website content does not constitute an offer to sell. All supplies are subject to written quotation, order confirmation and agreed commercial terms.
3. **Product information** — Specifications, packaging and availability are indicative and may change without notice. Agreed specifications and supplier documentation prevail.
4. **Pricing** — Prices are provided only on enquiry and depend on product, grade, quantity, packaging, destination and market conditions.
5. **Compliance** — Customers are responsible for lawful use, storage and handling of chemical products, including any licences or permits required for controlled substances.
6. **Intellectual property** — Website content, design and branding belong to DS Global Ventures unless otherwise stated. Photography is used under the Unsplash licence.
7. **Limitation of liability** — DS Global Ventures is not liable for any loss arising from reliance on website information.
8. **Governing law** — These terms are governed by the laws of India; courts at `[CITY]` have jurisdiction.

### 9.3 Disclaimer (`/disclaimer`)
- `The information on this website is provided in good faith for general information only.`
- `Chemical identifiers (CAS numbers, formulas, HS codes) are standard published data. Physical form, packaging and transport classifications are indicative and may vary by grade, concentration and supplier.`
- `DS Global Ventures does not claim certifications, manufacturer authorisations, or regulatory approvals unless expressly stated with supporting documentation.`
- `Always refer to the supplier Safety Data Sheet (SDS) and agreed specifications before handling, storing, transporting or using any chemical product.`
- `Product names and trademarks, if any, belong to their respective owners.`

---

## 10. 404 page
- Big number: `404`
- H1: `This page has evaporated.`
- Text: `The page you are looking for may have been moved or no longer exists.`
- Buttons: `Back to Home` · `View Products`

---

## 11. Image alt-text register
| File (`assets/images/`) | Alt text | Used on |
|---|---|---|
| hero-refinery-blue-hour.jpg | Chemical processing plant and storage tank at blue hour | Home hero |
| refinery-blue-dusk.jpg | Industrial chemical plant illuminated at dusk | About / Contact hero |
| plant-night-gold.jpg | Chemical manufacturing plant lit up at night | CTA backgrounds |
| refinery-night-moon.jpg | Process plant at night under a full moon | 404 / Quality |
| storage-tanks-sky.jpg | Large industrial storage tanks against a blue sky | About |
| stainless-tanks-mono.jpg | Stainless steel chemical storage tanks | Phenol |
| tank-farm-aerial.jpg | Aerial view of a tank farm at sunrise | Sourcing |
| tanker-trucks.jpg | Stainless steel road tankers for bulk liquid transport | Methanol / Supply |
| tanker-truck-depot.jpg | Bulk tanker truck at a loading depot | Formaldehyde |
| blue-chemical-drums.jpg | Stacked blue industrial chemical drums | Acetone / Packaging |
| chemical-sacks-pallets.jpg | Palletised sacks of solid chemical product | Paraformaldehyde |
| tanker-ship-aerial.jpg | Aerial view of a chemical tanker vessel at sea | Sourcing hero |
| container-ship-teal.jpg | Container ship sailing through teal waters | Home global band |
| port-container-ship.jpg | Container ship arriving at an industrial port | Industries hero |
| container-terminal.jpg | Container terminal with cranes and stacked containers | Sourcing |
| warehouse-forklift.jpg | Warehouse with forklift and palletised goods | Supply coordination |
| handshake-documents.jpg | Business handshake over signed documents | About commitment |
| stainless-process-plant.jpg | Stainless steel process equipment and pipework | Resins & Adhesives |
| stainless-pipework.jpg | Stainless steel pipework in a processing facility | Products hero |
| stainless-vessel.jpg | Stainless steel process vessel | Quality |
| plywood-layers.jpg | Stacked plywood sheets showing veneer layers | Plywood & Laminates |
| wood-veneer.jpg | Curved wood veneer sheets | Plywood (alt) |
| paint-tubs.jpg | Open tubs of coloured industrial paint | Paints & Coatings |
| petrochemical-plant.jpg | Chemical manufacturing plant with distillation columns | Chemical Manufacturing |
| industrial-complex.jpg | Large industrial complex with pipes and tanks | Other chemicals |
| pharma-production.jpg | Pharmaceutical production staff in a clean manufacturing area | Pharmaceutical |
| polymer-pellets.jpg | Close-up of polymer pellets | Rubber & Plastics |
| construction-site-dusk.jpg | Construction site with cranes at dusk | Construction Chemicals |
| textile-mill.jpg | Rows of spinning machines in a textile mill | Textiles |

Photography source: Unsplash (Unsplash Licence — free for commercial use). Credits listed in `02-SRS-AND-DESIGN.md §9.4`.

---

## 12. Client inputs still required before go-live
- [ ] Phone, WhatsApp, email, office address, city for jurisdiction
- [ ] Final domain (currently assumed `https://www.dsglobalventures.com`)
- [ ] Logo files (SVG) — a typographic placeholder mark is used until supplied
- [ ] Confirmation of which products are actively traded (remove any that are not)
- [ ] Email inbox that should receive enquiries + email provider credentials
- [ ] GSTIN / registered entity name (optional, for footer)
- [ ] Legal review of Privacy Policy, Terms and Disclaimer
