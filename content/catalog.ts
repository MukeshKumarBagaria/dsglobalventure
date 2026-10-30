/**
 * Product catalogue — products and their technical documents (COA / MSDS).
 * PDFs live in /public/documents, page-1 previews in /public/documents/previews
 * (regenerate previews with: `qlmanage -t -s 1224 -o <out> file.pdf` then convert to JPEG).
 * Key specifications below are copied from each product's COA (specification sheet).
 */

export type DocType = "COA" | "MSDS";

export type CatalogDoc = {
  id: string;
  type: DocType;
  file: string;
  pages: number;
  sizeKB: number;
};

export type CatalogCategory =
  | "Resin Raw Materials"
  | "Solvents & Alcohols"
  | "Monomers"
  | "Glycols"
  | "Organic Acids"
  | "Waxes";

export type CatalogProduct = {
  slug: string;
  name: string;
  /** label used in the enquiry form */
  label: string;
  cas: string;
  formula: string;
  mw?: string;
  category: CatalogCategory;
  summary: string;
  specs: { label: string; value: string }[];
  uses: string[];
  documents: CatalogDoc[];
  /** product detail page, when one exists */
  href?: string;
};

export const catalogCategories: CatalogCategory[] = [
  "Resin Raw Materials",
  "Solvents & Alcohols",
  "Monomers",
  "Glycols",
  "Organic Acids",
  "Waxes",
];

export const docLabels: Record<DocType, { short: string; long: string }> = {
  COA: { short: "COA", long: "Specification / COA" },
  MSDS: { short: "MSDS", long: "Material Safety Data Sheet" },
};

const doc = (slug: string, type: DocType, name: string, pages: number, sizeKB: number): CatalogDoc => ({
  id: `${slug}-${type.toLowerCase()}`,
  type,
  file: `DSGlobalVenture-${name}-${type}.pdf`,
  pages,
  sizeKB,
});

export const catalog: CatalogProduct[] = [
  {
    slug: "phenol",
    name: "Phenol",
    label: "Phenol",
    cas: "108-95-2",
    formula: "C₆H₆O",
    mw: "94.11",
    category: "Resin Raw Materials",
    summary: "Aromatic raw material for PF resins, bisphenol-A, alkylphenols and dyestuff intermediates.",
    specs: [
      { label: "Purity", value: "99.5% min" },
      { label: "Set point", value: "40.5 °C min" },
      { label: "Moisture", value: "0.1% max" },
    ],
    uses: ["PF resins", "Bisphenol-A", "Dyestuffs", "Surfactants"],
    documents: [doc("phenol", "COA", "Phenol", 1, 207), doc("phenol", "MSDS", "Phenol", 4, 246)],
    href: "/products/phenol",
  },
  {
    slug: "methanol",
    name: "Methanol",
    label: "Methanol",
    cas: "67-56-1",
    formula: "CH₄O",
    mw: "32.05",
    category: "Solvents & Alcohols",
    summary:
      "Key feedstock for formaldehyde, paraformaldehyde and MTBE, and a general-purpose solvent for pharma and agrochemicals.",
    specs: [
      { label: "Assay", value: "99.85% min" },
      { label: "Distillation", value: "64.6 ± 0.1 °C" },
      { label: "Moisture", value: "0.1% max" },
    ],
    uses: ["Formaldehyde", "Pharma solvent", "Biodiesel", "Coatings"],
    documents: [doc("methanol", "COA", "Methanol", 1, 122), doc("methanol", "MSDS", "Methanol", 5, 84)],
    href: "/products/methanol",
  },
  {
    slug: "meg",
    name: "Mono Ethylene Glycol",
    label: "MEG (Mono Ethylene Glycol)",
    cas: "107-21-1",
    formula: "C₂H₆O₂",
    mw: "62.07",
    category: "Glycols",
    summary: "Glycol for polyester (PET) fibre, antifreeze and coolants, alkyd resins, brake fluids and printing inks.",
    specs: [
      { label: "Purity", value: "99% min" },
      { label: "DEG content", value: "0.05% max" },
      { label: "Moisture", value: "0.2% max" },
    ],
    uses: ["PET fibre", "Antifreeze", "Alkyd resins", "Printing inks"],
    documents: [doc("meg", "COA", "MEG", 1, 219), doc("meg", "MSDS", "MEG", 5, 78)],
  },
  {
    slug: "styrene",
    name: "Styrene Monomer",
    label: "Styrene Monomer",
    cas: "100-42-5",
    formula: "C₈H₈",
    mw: "104.14",
    category: "Monomers",
    summary: "Monomer for polystyrene, plastics and resins, and styrene-butadiene rubber (SBR).",
    specs: [
      { label: "Purity", value: "99.5% min" },
      { label: "Aldehydes", value: "0.02% max" },
      { label: "Inhibitor", value: "10–15 ppm" },
    ],
    uses: ["Polystyrene", "Resins", "SBR rubber"],
    documents: [doc("styrene", "COA", "Styrene", 1, 108), doc("styrene", "MSDS", "Styrene", 5, 243)],
  },
  {
    slug: "isopropanol",
    name: "Isopropanol",
    label: "Isopropanol (IPA)",
    cas: "67-63-0",
    formula: "C₃H₈O",
    mw: "60.09",
    category: "Solvents & Alcohols",
    summary: "General-purpose solvent for pharma, printing inks and cosmetics, and a raw material for isopropyl esters.",
    specs: [
      { label: "Purity", value: "99.0% min" },
      { label: "Moisture", value: "0.05% max" },
      { label: "Distillation", value: "81–84 °C" },
    ],
    uses: ["Pharma solvent", "Printing inks", "Cosmetics", "Esters"],
    documents: [doc("isopropanol", "COA", "Isopropanol", 1, 214), doc("isopropanol", "MSDS", "Isopropanol", 5, 81)],
  },
  {
    slug: "acetic-acid",
    name: "Acetic Acid (Glacial)",
    label: "Acetic Acid (Glacial)",
    cas: "64-19-7",
    formula: "C₂H₄O₂",
    mw: "60.05",
    category: "Organic Acids",
    summary: "Glacial acetic acid for VAM, PTA, cellulose acetates, acetate salts, pharma and agrochemical synthesis.",
    specs: [
      { label: "Assay", value: "99.5% min" },
      { label: "Water", value: "0.2% max" },
      { label: "Crystallization", value: "15.7 °C min" },
    ],
    uses: ["VAM", "PTA / textiles", "Pharma", "Agrochemicals"],
    documents: [doc("acetic-acid", "COA", "AceticAcid", 1, 215), doc("acetic-acid", "MSDS", "AceticAcid", 5, 154)],
  },
  {
    slug: "adipic-acid",
    name: "Adipic Acid",
    label: "Adipic Acid",
    cas: "124-04-9",
    formula: "C₆H₁₀O₄",
    mw: "146.14",
    category: "Organic Acids",
    summary: "Hexanedioic acid used in nylon 6,6, polyurethanes, polyester polyols and plasticizers.",
    specs: [
      { label: "Content", value: "99%" },
      { label: "EINECS", value: "204-673-3" },
    ],
    uses: ["Nylon 6,6", "Polyurethanes", "Plasticizers"],
    documents: [doc("adipic-acid", "MSDS", "AdipicAcid", 4, 167)],
  },
  {
    slug: "melamine",
    name: "Melamine",
    label: "Melamine",
    cas: "108-78-1",
    formula: "C₃H₆N₆",
    mw: "126.13",
    category: "Resin Raw Materials",
    summary: "High-purity melamine for melamine-formaldehyde (MF) resins and melamine-based adhesives.",
    specs: [
      { label: "Purity", value: "99.8% min" },
      { label: "Moisture", value: "0.1% max" },
      { label: "Bulk density", value: "800–1100 g/L" },
    ],
    uses: ["MF resins", "Adhesives", "Laminates"],
    documents: [doc("melamine", "COA", "Melamine", 1, 110), doc("melamine", "MSDS", "Melamine", 4, 72)],
  },
  {
    slug: "vam",
    name: "Vinyl Acetate Monomer",
    label: "Vinyl Acetate Monomer (VAM)",
    cas: "108-05-4",
    formula: "C₄H₆O₂",
    mw: "86.09",
    category: "Monomers",
    summary: "Vinyl acetate monomer for the manufacture of copolymers and rubber.",
    specs: [
      { label: "Purity", value: "99.8% min" },
      { label: "Distillation", value: "72–73 °C" },
      { label: "HQ inhibitor", value: "15 ppm max" },
    ],
    uses: ["Copolymers", "Nitrile rubber"],
    documents: [doc("vam", "COA", "VAM", 1, 202)],
  },
  {
    slug: "paraffin-wax",
    name: "Paraffin Wax",
    label: "Paraffin Wax",
    cas: "8002-74-2",
    formula: "CₙH₂ₙ₊₂ (C20+)",
    category: "Waxes",
    summary: "White translucent wax for candles and paper, wood waterproofing, varnishes, cosmetics and pharma.",
    specs: [
      { label: "Solidification", value: "58–60 °C" },
      { label: "Sulphated ash", value: "0.1% max" },
    ],
    uses: ["Candles & paper", "Waterproofing", "Cosmetics", "Pharma"],
    documents: [doc("paraffin-wax", "COA", "ParaffinWax", 1, 111), doc("paraffin-wax", "MSDS", "ParaffinWax", 4, 226)],
  },
  {
    slug: "paraformaldehyde",
    name: "Paraformaldehyde",
    label: "Paraformaldehyde",
    cas: "30525-89-4",
    formula: "(CH₂O)ₙ",
    category: "Resin Raw Materials",
    summary: "Polymeric form of formaldehyde used as a solid formaldehyde source in resins, adhesives and wood-panel industries.",
    specs: [],
    uses: ["Phenolic resins", "Amino resins", "Adhesives"],
    documents: [],
    href: "/products/paraformaldehyde",
  },
  {
    slug: "formaldehyde",
    name: "Formaldehyde",
    label: "Formaldehyde",
    cas: "50-00-0",
    formula: "CH₂O",
    mw: "30.03",
    category: "Resin Raw Materials",
    summary: "Chemical raw material for resins, adhesives, plywood and laminates, typically supplied as formalin.",
    specs: [],
    uses: ["Resins", "Plywood", "Laminates"],
    documents: [],
    href: "/products/formaldehyde",
  },
  {
    slug: "acetone",
    name: "Acetone",
    label: "Acetone",
    cas: "67-64-1",
    formula: "C₃H₆O",
    mw: "58.08",
    category: "Solvents & Alcohols",
    summary: "Widely used industrial solvent for paints and coatings, chemical processing and manufacturing.",
    specs: [],
    uses: ["Solvents", "Paints & coatings", "Chemical processing"],
    documents: [],
    href: "/products/acetone",
  },
];

export const documentUrl = (d: CatalogDoc) => `/documents/${d.file}`;
export const previewUrl = (d: CatalogDoc) => `/documents/previews/${d.file.replace(/\.pdf$/, ".jpg")}`;
/** preview JPEG dimensions (qlmanage at 1224px) */
export const PREVIEW_SIZE = { width: 945, height: 1224 } as const;

export const catalogDocuments = catalog.flatMap((p) => p.documents.map((d) => ({ ...d, product: p })));

export function getCatalogProduct(slug: string) {
  return catalog.find((p) => p.slug === slug);
}

export function getDocumentsFor(slug: string) {
  return getCatalogProduct(slug)?.documents ?? [];
}
