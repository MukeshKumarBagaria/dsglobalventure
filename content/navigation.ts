import { products } from "@/content/products";

export type NavItem = { label: string; href: string };

export const mainNav: (NavItem & { children?: boolean })[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products", children: true },
  { label: "Industries", href: "/industries" },
  { label: "Sourcing & Supply", href: "/sourcing-supply" },
  { label: "Quality", href: "/quality" },
  { label: "Contact", href: "/contact" },
];

export const productNav = [
  ...products.map((p) => ({ label: p.name, href: `/products/${p.slug}`, meta: `CAS ${p.cas}`, slug: p.slug })),
  { label: "Other Chemicals", href: "/products/other-chemicals", meta: "Send your requirement", slug: "other" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Disclaimer", href: "/disclaimer" },
];
