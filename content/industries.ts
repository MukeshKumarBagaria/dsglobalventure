import type { ImageKey } from "@/lib/images";
import type { ProductSlug } from "@/content/products";

export type Industry = {
  slug: string;
  name: string;
  description: string;
  products: ProductSlug[];
  image: ImageKey;
  icon: "Layers" | "Trees" | "PaintBucket" | "Factory" | "Pill" | "CircleDot" | "Building2" | "Shirt";
};

/** Source: docs/01-WEBSITE-CONTENT.md §5 */
export const industries: Industry[] = [
  {
    slug: "resins-adhesives",
    name: "Resins & Adhesives",
    description:
      "Chemical raw materials for resin and adhesive manufacturing, including products used in phenolic and other resin systems.",
    products: ["phenol", "paraformaldehyde", "formaldehyde", "methanol"],
    image: "processPlant",
    icon: "Layers",
  },
  {
    slug: "plywood-laminates",
    name: "Plywood & Laminates",
    description:
      "Chemical raw materials used in the manufacture of plywood, laminates, wood panels and related products.",
    products: ["formaldehyde", "phenol", "paraformaldehyde"],
    image: "plywood",
    icon: "Trees",
  },
  {
    slug: "paints-coatings",
    name: "Paints & Coatings",
    description:
      "Industrial solvents and chemical raw materials used in paints, coatings and surface-treatment applications.",
    products: ["acetone", "methanol"],
    image: "paint",
    icon: "PaintBucket",
  },
  {
    slug: "chemical-manufacturing",
    name: "Chemical Manufacturing",
    description: "Raw materials and intermediates required for industrial chemical production.",
    products: ["phenol", "formaldehyde", "methanol", "acetone", "paraformaldehyde"],
    image: "petrochemPlant",
    icon: "Factory",
  },
  {
    slug: "pharmaceutical",
    name: "Pharmaceutical Industry",
    description:
      "Selected chemical raw materials for industrial and manufacturing requirements, subject to applicable specifications and compliance requirements.",
    products: ["methanol", "acetone"],
    image: "pharma",
    icon: "Pill",
  },
  {
    slug: "rubber-plastics",
    name: "Rubber & Plastics",
    description: "Chemical products and raw materials used across rubber and plastic manufacturing processes.",
    products: ["phenol", "formaldehyde", "acetone"],
    image: "pellets",
    icon: "CircleDot",
  },
  {
    slug: "construction-chemicals",
    name: "Construction Chemicals",
    description:
      "Raw materials used in adhesives, coatings, sealants and other construction-related chemical products.",
    products: ["formaldehyde", "paraformaldehyde", "acetone"],
    image: "construction",
    icon: "Building2",
  },
  {
    slug: "textiles-other",
    name: "Textiles & Other Industries",
    description:
      "We also support chemical requirements across other industrial sectors based on product specifications and sourcing feasibility.",
    products: ["formaldehyde", "methanol", "acetone"],
    image: "textile",
    icon: "Shirt",
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
