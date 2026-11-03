/**
 * Product range by category — drives the Products mega menu, the mobile menu and the range index at the top
 * of /products. Slugs match content/catalog.ts, so a product's COA / MSDS documents attach automatically.
 */
export type RangeItem = {
  slug: string;
  name: string;
  /** full chemical name, shown under abbreviations */
  fullName?: string;
};

export type RangeCategory = { id: string; name: string; items: RangeItem[] };

export const productRange: RangeCategory[] = [
  {
    id: "alcohols",
    name: "Alcohols",
    items: [
      { slug: "methanol", name: "Methanol" },
      { slug: "n-butanol", name: "n-Butanol" },
    ],
  },
  {
    id: "glycols",
    name: "Glycol & Glycol Ethers",
    items: [
      { slug: "meg", name: "MEG", fullName: "Mono Ethylene Glycol" },
      { slug: "deg", name: "DEG", fullName: "Diethylene Glycol" },
      { slug: "teg", name: "TEG", fullName: "Triethylene Glycol" },
      { slug: "crude-glycol", name: "Crude Glycol" },
      { slug: "propylene-glycol", name: "Propylene Glycol" },
    ],
  },
  {
    id: "polymers",
    name: "Polymers",
    items: [
      { slug: "pvc", name: "PVC (Suspension & Paste)" },
      { slug: "upr", name: "UPR", fullName: "Unsaturated Polyester Resin" },
      { slug: "eps", name: "EPS", fullName: "Expandable Polystyrene" },
      { slug: "pet-bottle-grade", name: "PET – Bottle Grade", fullName: "Polyethylene Terephthalate" },
    ],
  },
  {
    id: "monomers",
    name: "Monomers",
    items: [
      { slug: "styrene", name: "Styrene Monomer" },
      { slug: "bam", name: "BAM", fullName: "Butyl Acrylate Monomer" },
      { slug: "vam", name: "VAM", fullName: "Vinyl Acetate Monomer" },
      { slug: "ethyl-acrylate", name: "Ethyl Acrylate" },
    ],
  },
  {
    id: "others",
    name: "Others",
    items: [
      { slug: "phenol", name: "Phenol" },
      { slug: "melamine", name: "Melamine" },
      { slug: "tg-urea", name: "TG Urea", fullName: "Technical Grade Urea" },
      { slug: "def", name: "DEF", fullName: "Diesel Exhaust Fluid" },
    ],
  },
];
