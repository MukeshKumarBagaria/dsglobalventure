/** Navigation data with no dependencies — safe to import from client components. */
export type NavItem = { label: string; href: string };
export type ProductNavItem = NavItem & { meta: string; slug: string };

export type ProductMenuItem = NavItem & {
  slug: string;
  /** the product's first PDF — the viewer opens it with the product's other documents as tabs */
  doc?: { id: string; url: string; types: string[] };
};

/** A product-range category as shown in the Products mega menu and mobile menu */
export type ProductMenuCategory = NavItem & { id: string; items: ProductMenuItem[] };

export type BusinessNavItem = NavItem & { meta: string };

/** Sister businesses in the DS Global Ventures group — the "Our Other Businesses" menu */
export const businessNav: BusinessNavItem[] = [
  { label: "DS Construction", href: "/ds-construction", meta: "Premium & government construction" },
];

export type InsightNavItem = NavItem & { meta: string; icon: "prices" | "blog" };

/** The "Insights" menu — market data and articles */
export const insightsNav: InsightNavItem[] = [
  { label: "Chemical Prices", href: "/chemical-prices", meta: "Daily China spot prices, with the change", icon: "prices" },
  { label: "Blog", href: "/blog", meta: "Guides on sourcing, documents and packaging", icon: "blog" },
];

export const mainNav: (NavItem & { children?: "products" | "insights" | "businesses" })[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products", children: "products" },
  { label: "Industries", href: "/industries" },
  { label: "Sourcing & Supply", href: "/sourcing-supply" },
  { label: "Quality", href: "/quality" },
  { label: "Insights", href: "/chemical-prices", children: "insights" },
  { label: "Our Other Businesses", href: "/ds-construction", children: "businesses" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Disclaimer", href: "/disclaimer" },
];
