import type { ImageKey } from "@/lib/images";
import type { ProductSlug } from "@/content/products";

/**
 * Blog articles. Body text supports two inline marks: **bold** and [label](/internal-path).
 * Copy follows the site's claims policy — general, verifiable technical guidance; nothing about DS Global
 * Ventures beyond what the rest of the site already states.
 */
export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type BlogPost = {
  slug: string;
  title: string;
  /** <title> / search snippet — keep under ~60 characters */
  seoTitle: string;
  description: string;
  excerpt: string;
  category: string;
  /** ISO date */
  published: string;
  image: ImageKey;
  /** Products discussed — linked from the article sidebar */
  products: ProductSlug[];
  body: BlogBlock[];
};

export const posts: BlogPost[] = [
  {
    slug: "resin-raw-materials-phenol-formaldehyde-paraformaldehyde",
    title: "Phenol, Formaldehyde and Paraformaldehyde: A Buyer’s Guide to Resin Raw Materials",
    seoTitle: "Resin Raw Materials Buyer’s Guide",
    description:
      "How phenol, formaldehyde, paraformaldehyde and methanol fit together in plywood, laminate and moulding resins — and what to specify before buying.",
    excerpt:
      "Plywood, laminates and moulding compounds all depend on formaldehyde-based resins. Here is how phenol, formaldehyde, paraformaldehyde and methanol fit together — and what to check before you order them.",
    category: "Product Knowledge",
    published: "2026-11-01",
    image: "plywood",
    products: ["phenol", "formaldehyde", "paraformaldehyde", "methanol"],
    body: [
      {
        type: "p",
        text: "Walk through a plywood mill, a laminate press or a foundry and you will find formaldehyde-based resins doing the structural work. They bind veneers into panels, harden decorative surfaces and hold sand cores in shape. Behind them sits a short chain of raw materials: [methanol](/products/methanol) is turned into [formaldehyde](/products/formaldehyde), which is then reacted with [phenol](/products/phenol), urea or melamine. [Paraformaldehyde](/products/paraformaldehyde) is the solid form of the same building block.",
      },
      { type: "h2", text: "The supply chain in one line" },
      {
        type: "p",
        text: "Formaldehyde is made by the catalytic oxidation of methanol, usually over a silver or a metal-oxide catalyst, and is sold as an aqueous solution. Resin makers condense it with phenol, urea or melamine. When a plant needs formaldehyde without the water that comes with a solution, it uses paraformaldehyde — a solid polymer that releases formaldehyde as it dissolves and reacts.",
      },
      { type: "h2", text: "Which resin does what" },
      {
        type: "table",
        head: ["Resin family", "Made from", "Typical uses", "Why it is chosen"],
        rows: [
          [
            "Phenol-formaldehyde (PF)",
            "Phenol + formaldehyde",
            "Exterior and marine plywood, laminate core papers, moulding compounds, foundry binders",
            "Strong water and heat resistance once cured",
          ],
          [
            "Urea-formaldehyde (UF)",
            "Urea + formaldehyde",
            "Interior plywood, particleboard and MDF",
            "Low cost and fast curing for indoor panels",
          ],
          [
            "Melamine-formaldehyde (MF)",
            "Melamine + formaldehyde",
            "Decorative laminate surfaces and coated panels",
            "Hard, scratch-resistant, light-coloured finish",
          ],
        ],
      },
      {
        type: "p",
        text: "Many mills blend these systems — melamine-urea-formaldehyde (MUF), for example — to balance cost against moisture resistance.",
      },
      { type: "h2", text: "Resols and novolacs" },
      {
        type: "p",
        text: "Phenolic resins come in two broad types. **Resols** are made with an alkaline catalyst and an excess of formaldehyde; they cure with heat alone, which is why plywood and laminate lines use them. **Novolacs** are made with an acid catalyst and an excess of phenol; they need a hardener — commonly hexamine — to cure, and are typical in moulding powders, friction materials and foundry work. The ratio a plant runs decides how much of each raw material it buys.",
      },
      { type: "h2", text: "Formaldehyde solution or paraformaldehyde?" },
      {
        type: "ul",
        items: [
          "**Formaldehyde solution** is the usual choice for plants with bulk storage. Commercial grades are commonly around 37% formaldehyde by weight, sometimes with methanol added as a stabiliser.",
          "**Paraformaldehyde** carries far less water — its formaldehyde content is typically above 90%. It suits high-solids resins, smaller or intermittent batches, and sites that would rather store a solid in bags than a liquid in tanks.",
          "Whichever form you use, agree the formaldehyde content, methanol content and acidity in the specification: they change how the resin reacts.",
        ],
      },
      { type: "h2", text: "Handling points that affect your order" },
      {
        type: "ul",
        items: [
          "**Phenol** melts at about 41 °C. In bulk it usually moves molten in heated, insulated tanks; smaller quantities arrive as a solid in drums and must be melted before use. It is toxic and readily absorbed through the skin, so handling procedures matter as much as price.",
          "**Formaldehyde solution** can deposit solid paraformaldehyde if it is stored too cold, so tanks and lines are kept within the temperature range given on the safety data sheet. It is also corrosive and a skin sensitiser.",
          "**Paraformaldehyde** is a flammable solid that gives off formaldehyde; store bags dry, cool and away from ignition sources.",
          "**Methanol** is flammable and toxic, and bulk deliveries need properly earthed unloading points.",
        ],
      },
      { type: "h2", text: "What to include in an enquiry" },
      {
        type: "ol",
        items: [
          "Product and grade — formaldehyde content for solutions, for example, or assay for phenol.",
          "The resin or process it is for, so the specification can be matched to it.",
          "Monthly or per-order quantity, and whether supply is one-time or recurring.",
          "The packaging you can receive: drums, IBCs, bags, ISO tanks or road tankers.",
          "Delivery location and the documents you need, such as a COA or SDS.",
        ],
      },
      {
        type: "p",
        text: "Share these details through our [enquiry form](/contact) and we can respond with options that fit your process, rather than a generic price list.",
      },
    ],
  },
  {
    slug: "how-to-read-a-certificate-of-analysis",
    title: "How to Read a Certificate of Analysis for Industrial Chemicals",
    seoTitle: "How to Read a COA for Industrial Chemicals",
    description:
      "A field-by-field guide to the certificate of analysis: how it differs from an SDS, which parameters matter for common chemicals, and warning signs.",
    excerpt:
      "A COA is the quickest way to check that a delivery matches what you ordered — if you know what to look for. A field-by-field guide, with the parameters that matter for common solvents and resin chemicals.",
    category: "Quality & Documents",
    published: "2026-11-01",
    image: "handshake",
    products: ["phenol", "methanol", "acetone", "formaldehyde", "paraformaldehyde"],
    body: [
      {
        type: "p",
        text: "Every consignment of an industrial chemical should be traceable to a tested batch. The certificate of analysis (COA) links the two: it records what the batch was tested for, the method used and the result. Read properly, it tells you in a few minutes whether the material suits your process.",
      },
      { type: "h2", text: "COA, SDS and specification sheet" },
      {
        type: "table",
        head: ["Document", "What it tells you", "Changes with each batch?"],
        rows: [
          ["Certificate of analysis (COA)", "Measured results for one specific batch against agreed limits", "Yes"],
          [
            "Safety data sheet (SDS / MSDS)",
            "Hazards, safe handling, storage, first aid and transport information, in 16 sections",
            "No — revised when the information changes",
          ],
          ["Specification or technical data sheet", "The limits or typical values a grade is sold against", "No"],
        ],
      },
      {
        type: "p",
        text: "You need all three, but only the COA says anything about the material actually in front of you. Our [product catalogue](/product-catalog) includes specification sheets and safety data sheets for many of the products we handle.",
      },
      { type: "h2", text: "The fields to check, in order" },
      {
        type: "ol",
        items: [
          "**Product name and grade** — the exact grade, not just the chemical name. Check the CAS number as well.",
          "**Batch or lot number** — it must match the labels on the drums, bags or tank seals you receive.",
          "**Dates** — the date of manufacture or testing, and a retest or expiry date where the product has one.",
          "**Test parameters and methods** — each parameter should name its method: an ASTM, ISO or IS standard, or the producer’s in-house method.",
          "**Limits and results** — the specification limit beside the measured value, with units.",
          "**Conclusion and sign-off** — a pass statement and the name or signature of whoever released the batch.",
        ],
      },
      { type: "h2", text: "Parameters that matter for common products" },
      {
        type: "table",
        head: ["Product", "Parameters usually reported"],
        rows: [
          ["[Phenol](/products/phenol)", "Purity (assay), freezing point, water content, colour"],
          ["[Methanol](/products/methanol)", "Purity, water content, acidity, colour, permanganate time, specific gravity"],
          ["[Acetone](/products/acetone)", "Purity, water content, acidity, non-volatile residue, colour"],
          ["[Formaldehyde solution](/products/formaldehyde)", "Formaldehyde content, methanol content, acidity (as formic acid), iron"],
          ["[Paraformaldehyde](/products/paraformaldehyde)", "Formaldehyde content, water, ash, physical form"],
        ],
      },
      {
        type: "p",
        text: "Colour is usually given on the platinum-cobalt (APHA or Hazen) scale and water by Karl Fischer titration. If your process is sensitive to a parameter that is not on the certificate, ask for it to be added before you place the order — not after the material arrives.",
      },
      { type: "h2", text: "Warning signs" },
      {
        type: "ul",
        items: [
          "Results written only as “conforms” or “passes”, with no measured values.",
          "No batch number, or a batch number that does not match the packaging.",
          "Results identical to the last decimal across several different batches.",
          "No test methods stated, or a certificate dated long before the shipment.",
          "A grade on the COA that differs from the one on your purchase order.",
        ],
      },
      {
        type: "p",
        text: "None of these proves a problem on its own, but each is a reason to ask questions before the material goes into production.",
      },
      { type: "h2", text: "Make the COA part of the order" },
      {
        type: "p",
        text: "The most reliable approach is to agree the specification — parameters, limits and test methods — at the enquiry stage and reference it on the purchase order. Ask for the COA with the dispatch documents, keep a retained sample from each delivery, and compare results over time. Our [quality page](/quality) explains how documentation is coordinated with each supply.",
      },
    ],
  },
  {
    slug: "choosing-packaging-for-industrial-chemicals",
    title: "Drums, IBCs, ISO Tanks or Road Tankers? Choosing Packaging for Industrial Chemicals",
    seoTitle: "Chemical Packaging: Drums, IBCs, ISO Tanks",
    description:
      "Compare drums, IBCs, bags, ISO tanks and road tankers for industrial chemicals, and match the format to your volumes, storage and transport rules.",
    excerpt:
      "The right pack size cuts handling, storage and per-kilo cost; the wrong one adds to all three. Compare drums, IBCs, bags, ISO tanks and road tankers, and match them to your volumes and your site.",
    category: "Supply & Logistics",
    published: "2026-11-01",
    image: "drums",
    products: ["methanol", "acetone", "phenol", "formaldehyde", "paraformaldehyde"],
    body: [
      {
        type: "p",
        text: "Packaging is often settled at the end of a chemical enquiry, yet it shapes the landed cost, the work your stores team does and how safely the product is handled. The same product can arrive as a few drums or as a full tanker; the right choice depends on how much you use, how you store it and what the product itself needs.",
      },
      { type: "h2", text: "The main options at a glance" },
      {
        type: "table",
        head: ["Format", "Typical size", "Best suited to"],
        rows: [
          ["Drums", "About 200 litres; net weight depends on the product’s density", "Trial lots, low monthly use, several small consumption points"],
          ["IBCs", "About 1,000 litres", "Regular mid-size use — one IBC replaces roughly five drums"],
          ["Bags and jumbo bags", "25 kg bags; jumbo bags of roughly 500–1,000 kg", "Solids such as paraformaldehyde"],
          ["ISO tank containers", "Roughly 20,000–26,000 litres", "International bulk liquids, including heated cargo such as molten phenol"],
          ["Road tankers", "Full or part loads", "Domestic bulk deliveries into your own storage tank"],
        ],
      },
      { type: "h2", text: "Four questions that decide the format" },
      { type: "h3", text: "1. How much do you use, and how often?" },
      {
        type: "p",
        text: "Bulk formats lower the packaging cost per kilogram, but only if you consume the material before storage becomes a problem. A plant using a tanker-load a month is a natural bulk buyer; one using a few drums a quarter is not.",
      },
      { type: "h3", text: "2. What can your site receive and store?" },
      {
        type: "p",
        text: "Road tankers and ISO tanks need a suitable storage tank, a pump or unloading arrangement and — for flammable liquids such as [methanol](/products/methanol) and [acetone](/products/acetone) — earthing and the right hazardous-area equipment. Drums and IBCs need racking, bunded storage and forklift access instead.",
      },
      { type: "h3", text: "3. What does the product need?" },
      {
        type: "p",
        text: "Some products decide the format for you. [Phenol](/products/phenol) is solid at room temperature, so bulk phenol travels molten in heated, insulated tanks, while drummed phenol has to be melted on site. [Formaldehyde solution](/products/formaldehyde) needs temperature control so that solids do not form. [Paraformaldehyde](/products/paraformaldehyde) is a powder or prill and comes in bags. Compatibility matters too: the container, or its lining, must suit the chemical.",
      },
      { type: "h3", text: "4. What do the transport rules require?" },
      {
        type: "p",
        text: "Most of these products are dangerous goods in transport — methanol and acetone as flammable liquids (Class 3), formaldehyde solution as corrosive (Class 8), phenol as toxic (Class 6.1) and paraformaldehyde as a flammable solid (Class 4.1). Packaging has to be approved for the product’s UN number, labelled correctly and accompanied by the right documents, including the safety data sheet.",
      },
      { type: "h2", text: "Hidden costs worth counting" },
      {
        type: "ul",
        items: [
          "**Handling time** — unloading, moving and decanting forty drums takes far longer than connecting one tanker.",
          "**Residues and empties** — drums and IBCs leave heels and empty packaging that must be drained, returned or disposed of properly.",
          "**Storage space** — packed goods use warehouse floor and bunded area; bulk needs a tank but little else.",
          "**Quality risk** — every transfer is a chance for contamination or moisture pick-up, which matters for grades with tight water limits.",
        ],
      },
      { type: "h2", text: "Tell us how you receive material" },
      {
        type: "p",
        text: "When you [send an enquiry](/contact), include your usual pack size, monthly volume, storage set-up and delivery location. Packaging options vary by product and availability, and the format, dispatch and delivery are coordinated against the terms agreed with you. Read more on our [sourcing and supply page](/sourcing-supply).",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

const WORDS_PER_MINUTE = 220;

/** Estimated reading time in whole minutes */
export function readingMinutes(post: BlogPost) {
  const text = post.body
    .flatMap((b) => ("text" in b ? [b.text] : "items" in b ? b.items : [...b.head, ...b.rows.flat()]))
    .join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / WORDS_PER_MINUTE));
}

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function formatPostDate(iso: string) {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}
