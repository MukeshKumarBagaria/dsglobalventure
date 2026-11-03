import { Atom, Boxes, Droplet, FlaskConical, FlaskRound, type LucideIcon } from "lucide-react";

/** One icon per product-range category id (content/product-range.ts). */
export const rangeIcons: Record<string, LucideIcon> = {
  alcohols: Droplet,
  glycols: FlaskConical,
  polymers: Boxes,
  monomers: Atom,
  others: FlaskRound,
};
