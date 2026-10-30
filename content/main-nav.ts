/** Navigation data with no dependencies — safe to import from client components. */
export type NavItem = { label: string; href: string };
export type ProductNavItem = NavItem & { meta: string; slug: string };

export const mainNav: (NavItem & { children?: boolean })[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products", children: true },
  { label: "Industries", href: "/industries" },
  { label: "Sourcing & Supply", href: "/sourcing-supply" },
  { label: "Quality", href: "/quality" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Disclaimer", href: "/disclaimer" },
];
