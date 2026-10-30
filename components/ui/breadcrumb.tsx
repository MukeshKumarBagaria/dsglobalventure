import { absoluteUrl } from "@/lib/site";
import { jsonLd } from "@/lib/utils";

export type Crumb = { label: string; href: string };

/** BreadcrumbList structured data only — the visible breadcrumb trail is intentionally not rendered. */
export function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />;
}
