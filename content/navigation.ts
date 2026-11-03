import { documentUrl, getDocumentsFor } from "@/content/catalog";
import { getProduct, products } from "@/content/products";
import { productRange } from "@/content/product-range";
import type { ProductMenuCategory, ProductNavItem } from "@/content/main-nav";

export {
  mainNav,
  legalNav,
  type NavItem,
  type ProductMenuCategory,
  type ProductMenuItem,
  type ProductNavItem,
} from "@/content/main-nav";

/** Built on the server and passed to client menus as a prop (keeps product data out of the client bundle). */
export const productNav: ProductNavItem[] = [
  ...products.map((p) => ({ label: p.name, href: `/products/${p.slug}`, meta: `CAS ${p.cas}`, slug: p.slug })),
  { label: "Other Chemicals", href: "/products/other-chemicals", meta: "Send your requirement", slug: "other" },
  { label: "Product Catalogue", href: "/product-catalog", meta: "Spec sheets", slug: "catalog" },
];

/** Products menu by category: items open their detail page when one exists, else their row on /products. */
export const productMenu: ProductMenuCategory[] = productRange.map((c) => ({
  id: c.id,
  label: c.name,
  href: `/products#${c.id}`,
  items: c.items.map((item) => {
    const docs = getDocumentsFor(item.slug);
    return {
      slug: item.slug,
      label: item.name,
      href: getProduct(item.slug) ? `/products/${item.slug}` : `/products#${item.slug}`,
      doc: docs[0] ? { id: docs[0].id, url: documentUrl(docs[0]), types: docs.map((d) => d.type) } : undefined,
    };
  }),
}));
