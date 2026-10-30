import type { ImageKey } from "@/lib/images";
import { catalog } from "@/content/catalog";

export type ProductSlug = "phenol" | "paraformaldehyde" | "formaldehyde" | "methanol" | "acetone";

export type Product = {
  slug: ProductSlug;
  name: string;
  category: string;
  cas: string;
  formula: string;
  /** Formula shown in large display (unicode subscripts) */
  formulaDisplay: string;
  molecularWeight: string;
  synonyms: string[];
  hsCode: string;
  physicalForm: string;
  packaging: string;
  transport: string;
  short: string;
  listing: string;
  intro: string;
  applications: string[];
  listingApplications: string[];
  industries: string[];
  safety: string;
  image: ImageKey;
  seoTitle: string;
  seoDescription: string;
};

/** Source: docs/01-WEBSITE-CONTENT.md §4.2 */
export const products: Product[] = [
  {
    slug: "phenol",
    name: "Phenol",
    category: "Industrial Chemical | Chemical Raw Material",
    cas: "108-95-2",
    formula: "C₆H₆O",
    formulaDisplay: "C₆H₅OH",
    molecularWeight: "94.11 g/mol",
    synonyms: ["Carbolic acid", "Hydroxybenzene", "Benzenol"],
    hsCode: "2907 11",
    physicalForm: "Colourless to white crystalline solid; also handled in molten form",
    packaging: "Drums, ISO tanks, bulk tankers",
    transport: "UN 1671 (solid) / UN 2312 (molten) · Class 6.1 (toxic)",
    short: "An important industrial chemical used in phenolic resins, bisphenol-A and various chemical intermediates.",
    listing:
      "Phenol is an important industrial chemical used in the manufacture of phenolic resins, bisphenol-A and various chemical intermediates.",
    intro:
      "Phenol is an important aromatic organic compound used extensively as a chemical raw material and intermediate in various industrial manufacturing processes.",
    applications: [
      "Phenolic resin manufacturing",
      "Adhesives",
      "Laminates",
      "Bisphenol-A production",
      "Chemical intermediates",
      "Industrial chemical manufacturing",
    ],
    listingApplications: ["Phenolic resins", "Adhesives", "Laminates", "Chemical intermediates", "Industrial manufacturing"],
    industries: ["resins-adhesives", "plywood-laminates", "chemical-manufacturing", "rubber-plastics"],
    safety:
      "Phenol is toxic and corrosive. It can be absorbed through the skin and cause severe burns. Handle only with appropriate PPE in well-ventilated areas, and review the SDS before handling, storage or transport.",
    image: "stainlessTanks",
    seoTitle: "Phenol Supplier (CAS 108-95-2) — Industrial Phenol Sourcing",
    seoDescription:
      "Source and buy Phenol (CAS 108-95-2) for phenolic resins, adhesives, laminates and bisphenol-A. Grade, packaging, COA & SDS coordinated to your requirement.",
  },
  {
    slug: "paraformaldehyde",
    name: "Paraformaldehyde",
    category: "Industrial Chemical | Formaldehyde Source",
    cas: "30525-89-4",
    formula: "(CH₂O)ₙ",
    formulaDisplay: "HO(CH₂O)ₙH",
    molecularWeight: "Variable (polymer)",
    synonyms: ["Paraform", "Polyoxymethylene", "Polymerised formaldehyde"],
    hsCode: "2912 60",
    physicalForm: "White crystalline powder, prills or flakes",
    packaging: "Bags, jumbo bags",
    transport: "UN 2213 · Class 4.1 (flammable solid)",
    short: "A polymeric form of formaldehyde used as a formaldehyde source in industrial and chemical manufacturing.",
    listing:
      "Paraformaldehyde is a polymeric form of formaldehyde used as a formaldehyde source in various industrial and chemical manufacturing processes.",
    intro:
      "Paraformaldehyde is a polymeric form of formaldehyde used as a solid formaldehyde source in various industrial and chemical manufacturing processes, where it offers convenient handling compared with aqueous formaldehyde.",
    applications: ["Phenolic resins", "Amino resins", "Adhesives", "Wood-panel industries", "Chemical manufacturing"],
    listingApplications: ["Phenolic resins", "Amino resins", "Adhesives", "Wood-panel industries", "Chemical manufacturing"],
    industries: ["resins-adhesives", "plywood-laminates", "chemical-manufacturing", "construction-chemicals"],
    safety:
      "Paraformaldehyde is a flammable solid that releases formaldehyde gas. It is harmful if swallowed or inhaled and may cause skin sensitisation. Keep away from heat and ignition sources, avoid dust formation and review the SDS before use.",
    image: "sacks",
    seoTitle: "Paraformaldehyde Supplier (CAS 30525-89-4) — Paraform Sourcing",
    seoDescription:
      "Source Paraformaldehyde (CAS 30525-89-4) for phenolic and amino resins, adhesives and wood-panel industries. Packaging, COA & SDS coordinated as applicable.",
  },
  {
    slug: "formaldehyde",
    name: "Formaldehyde",
    category: "Industrial Chemical | Resin Raw Material",
    cas: "50-00-0",
    formula: "CH₂O",
    formulaDisplay: "HCHO",
    molecularWeight: "30.03 g/mol",
    synonyms: ["Methanal", "Formalin (aqueous solution)", "Methyl aldehyde"],
    hsCode: "2912 11",
    physicalForm: "Clear, colourless aqueous solution with a pungent odour",
    packaging: "Bulk tankers, IBCs, drums",
    transport: "UN 2209 (solution ≥25%) · Class 8 (corrosive)",
    short: "An important chemical raw material for resins, adhesives and numerous industrial products.",
    listing:
      "Formaldehyde is an important chemical raw material used in the manufacture of resins, adhesives and numerous industrial products.",
    intro:
      "Formaldehyde is an important chemical raw material used in the manufacture of resins, adhesives and numerous industrial products. It is most commonly supplied as an aqueous solution (formalin).",
    applications: ["Resin manufacturing", "Adhesives", "Plywood", "Laminates", "Chemical intermediates"],
    listingApplications: ["Resin manufacturing", "Adhesives", "Plywood", "Laminates", "Chemical intermediates"],
    industries: ["resins-adhesives", "plywood-laminates", "chemical-manufacturing", "textiles-other", "construction-chemicals"],
    safety:
      "Formaldehyde is toxic, corrosive and a known sensitiser, and is classified as a carcinogen. Use with adequate ventilation and appropriate PPE, and review the SDS before handling, storage or transport.",
    image: "tankerDepot",
    seoTitle: "Formaldehyde Supplier (CAS 50-00-0) — Formalin for Resins & Plywood",
    seoDescription:
      "Source Formaldehyde / Formalin (CAS 50-00-0) for resin manufacturing, adhesives, plywood and laminates. Bulk supply with COA & SDS coordinated as applicable.",
  },
  {
    slug: "methanol",
    name: "Methanol",
    category: "Industrial Solvent | Chemical Feedstock",
    cas: "67-56-1",
    formula: "CH₄O",
    formulaDisplay: "CH₃OH",
    molecularWeight: "32.04 g/mol",
    synonyms: ["Methyl alcohol", "Wood alcohol", "Carbinol"],
    hsCode: "2905 11",
    physicalForm: "Clear, colourless liquid",
    packaging: "Bulk tankers, ISO tanks, drums",
    transport: "UN 1230 · Class 3 (flammable liquid), subsidiary 6.1",
    short: "A versatile industrial chemical used as a solvent, feedstock and chemical intermediate.",
    listing: "Methanol is a versatile industrial chemical used as a solvent, feedstock and chemical intermediate.",
    intro:
      "Methanol is a versatile industrial chemical used as a solvent, feedstock and chemical intermediate across a wide range of manufacturing processes, including formaldehyde production.",
    applications: ["Chemical manufacturing", "Solvents", "Industrial processing", "Chemical intermediates"],
    listingApplications: ["Chemical manufacturing", "Solvents", "Industrial processing", "Chemical intermediates"],
    industries: ["chemical-manufacturing", "pharmaceutical", "paints-coatings", "resins-adhesives"],
    safety:
      "Methanol is highly flammable and toxic if swallowed, inhaled or absorbed through the skin. Store away from ignition sources in approved containers and review the SDS before handling.",
    image: "tankerTrucks",
    seoTitle: "Methanol Supplier (CAS 67-56-1) — Industrial Methanol Sourcing",
    seoDescription:
      "Source Methanol (CAS 67-56-1) as a solvent, feedstock and chemical intermediate. Bulk tankers, ISO tanks or drums — COA & SDS coordinated as applicable.",
  },
  {
    slug: "acetone",
    name: "Acetone",
    category: "Industrial Solvent | Chemical Raw Material",
    cas: "67-64-1",
    formula: "C₃H₆O",
    formulaDisplay: "(CH₃)₂CO",
    molecularWeight: "58.08 g/mol",
    synonyms: ["Propanone", "Dimethyl ketone", "2-Propanone"],
    hsCode: "2914 11",
    physicalForm: "Clear, colourless, volatile liquid",
    packaging: "Drums, IBCs, bulk tankers",
    transport: "UN 1090 · Class 3 (flammable liquid)",
    short: "A widely used industrial solvent and chemical raw material.",
    listing: "Acetone is a widely used industrial solvent and chemical raw material.",
    intro:
      "Acetone is a widely used industrial solvent and chemical raw material, valued for its strong solvency and fast evaporation in coatings, cleaning and chemical processing applications.",
    applications: ["Solvents", "Paints & coatings", "Chemical processing", "Industrial manufacturing"],
    listingApplications: ["Solvents", "Paints & coatings", "Chemical processing", "Industrial manufacturing"],
    industries: ["paints-coatings", "chemical-manufacturing", "pharmaceutical", "rubber-plastics"],
    safety:
      "Acetone is highly flammable and its vapour can form explosive mixtures with air. It causes serious eye irritation. Keep away from heat and ignition sources and review the SDS before handling.",
    image: "drums",
    seoTitle: "Acetone Supplier (CAS 67-64-1) — Industrial Solvent Sourcing",
    seoDescription:
      "Source Acetone (CAS 67-64-1) for solvents, paints & coatings and chemical processing. Drums, IBCs or bulk — COA & SDS coordinated as applicable.",
  },
];

/** Enquiry-form options: core products first, then the rest of the catalogue. */
export const productOptions = [
  ...products.map((p) => ({ value: p.slug as string, label: p.name })),
  ...catalog
    .filter((c) => !products.some((p) => p.slug === c.slug))
    .map((c) => ({ value: c.slug, label: c.label })),
  { value: "other", label: "Other Chemical" },
];

export const availableInformation = [
  "Product grade",
  "Purity / specification",
  "Packaging",
  "Quantity",
  "COA",
  "SDS / MSDS",
  "Delivery location",
  "Commercial terms",
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productFaqs(p: Product) {
  return [
    {
      q: `What is ${p.name} used for?`,
      a: `${p.name} is commonly used in ${p.applications
        .map((a) => a.replace(/^\w/, (c) => c.toLowerCase()))
        .join(", ")
        .replace(/, ([^,]*)$/, " and $1")}.`,
    },
    { q: `What is the CAS number of ${p.name}?`, a: `The CAS number of ${p.name} is ${p.cas}.` },
    {
      q: `Can you provide COA and SDS for ${p.name}?`,
      a: "Yes — COA, SDS/MSDS and specification details are coordinated as applicable to the product and transaction.",
    },
    {
      q: "What packaging options are available?",
      a: `${p.packaging}, subject to product and availability. Share your preferred packaging in the enquiry.`,
    },
    {
      q: "What is the minimum order quantity?",
      a: "Minimum order quantity depends on the product, packaging and supply source. Share your requirement and we will confirm.",
    },
  ];
}
