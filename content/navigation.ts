import { products } from "@/content/products";
import type { ProductNavItem } from "@/content/main-nav";

export { mainNav, legalNav, type NavItem, type ProductNavItem } from "@/content/main-nav";

/** Built on the server and passed to client menus as a prop (keeps product data out of the client bundle). */
export const productNav: ProductNavItem[] = [
  ...products.map((p) => ({ label: p.name, href: `/products/${p.slug}`, meta: `CAS ${p.cas}`, slug: p.slug })),
  { label: "Other Chemicals", href: "/products/other-chemicals", meta: "Send your requirement", slug: "other" },
  { label: "Product Catalogue", href: "/product-catalog", meta: "Spec sheets", slug: "catalog" },
];
